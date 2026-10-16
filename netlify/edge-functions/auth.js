const COOKIE_NAME = "ddb_access";
const LOGIN_PATH = "/__unlock";

function htmlPage(message = "") {
  const safeMessage = message ? `<p class="message">${message}</p>` : "";
  return `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Deadlock Blind Draft — Вход</title><style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 50% 0%,#1e2438 0%,transparent 70%),#0c0e14;color:#f1f5f9;font-family:system-ui,-apple-system,Segoe UI,sans-serif;padding:20px}.card{width:min(420px,100%);background:#141722;border:1px solid #3b4763;border-radius:16px;padding:30px;box-shadow:0 24px 80px #0008}.kicker{font-size:.75rem;letter-spacing:.18em;color:#38bdf8;font-weight:800}.title{font-size:1.7rem;font-weight:900;margin:10px 0}.sub{color:#94a3b8;margin-bottom:22px;font-size:.95rem}label{display:block;font-size:.85rem;margin-bottom:8px;color:#cbd5e1}input{width:100%;padding:13px 14px;border:1px solid #3b4763;border-radius:8px;background:#080b12;color:white;font-size:1rem;outline:none}input:focus{border-color:#38bdf8}button{width:100%;margin-top:14px;padding:13px;border:0;border-radius:8px;background:linear-gradient(135deg,#2563eb,#7c3aed);color:white;font-weight:800;font-size:1rem;cursor:pointer}button:hover{filter:brightness(1.12)}.message{color:#fca5a5;font-size:.9rem;margin:0 0 14px}
</style></head><body><main class="card"><div class="kicker">CUSTOM MATCH SETUP</div><h1 class="title">DEADLOCK BLIND DRAFT</h1><p class="sub">Введите кодовое слово, чтобы открыть драфт.</p>${safeMessage}<form method="POST" action="${LOGIN_PATH}"><label for="code">Кодовое слово</label><input id="code" name="code" type="password" autocomplete="current-password" required autofocus><button type="submit">Войти</button></form></main></body></html>`;
}

function base64url(bytes) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))));
}

async function validCookie(request, secret) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.split(";").map(v => v.trim()).find(v => v.startsWith(`${COOKIE_NAME}=`));
  if (!match) return false;
  const token = decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = await sign(payload, secret);
  if (signature.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < signature.length; i++) diff |= signature.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return false;
  try {
    const data = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return data.exp > Date.now() && data.v === 1;
  } catch { return false; }
}

export default async (request, context) => {
  const codeWord = Netlify.env.get("DRAFT_CODE_WORD");
  const sessionSecret = Netlify.env.get("DRAFT_SESSION_SECRET");
  if (!codeWord || !sessionSecret) {
    return new Response("Настройте DRAFT_CODE_WORD и DRAFT_SESSION_SECRET в переменных окружения Netlify.", { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  const url = new URL(request.url);
  if (url.pathname === LOGIN_PATH && request.method === "POST") {
    let submitted = "";
    try { submitted = (await request.formData()).get("code")?.toString() || ""; } catch {}
    if (submitted !== codeWord) {
      return new Response(htmlPage("Кодовое слово неверное. Попробуйте ещё раз."), { status: 401, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
    }
    const payload = base64url(new TextEncoder().encode(JSON.stringify({ v: 1, exp: Date.now() + 12 * 60 * 60 * 1000 })));
    const signature = await sign(payload, sessionSecret);
    return new Response(null, { status: 303, headers: { "location": "/", "set-cookie": `${COOKIE_NAME}=${payload}.${signature}; Path=/; HttpOnly; Secure; SameSite=Lax`, "cache-control": "no-store" } });
  }

  if (await validCookie(request, sessionSecret)) return context.next();
  return new Response(htmlPage(), { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" } });
};
