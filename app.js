/* ==========================================================================
   DEADLOCK RANDOM DRAFT BO5 — ОСНОВНОЙ СКРИПТ (app.js)
   ========================================================================== */

const EMBEDDED_HEROES_FALLBACK = [
  {"id":"abrams","name":"Abrams","role":"Tank / Brawler","image":"images/heroes/abrams.webp","has_ability_charges":false},
  {"id":"apollo","name":"Apollo","role":"Skirmisher / Assassin","image":"images/heroes/apollo.webp","has_ability_charges":false},
  {"id":"baba","name":"Baba","role":"Controller / Disruptor","image":"images/heroes/baba.webp","has_ability_charges":true},
  {"id":"bebop","name":"Bebop","role":"Disruptor / Brawler","image":"images/heroes/bebop.webp","has_ability_charges":false},
  {"id":"billy","name":"Billy","role":"Brawler / Skirmisher","image":"images/heroes/billy.webp","has_ability_charges":true},
  {"id":"calico","name":"Calico","role":"Skirmisher / Flanker","image":"images/heroes/calico.webp","has_ability_charges":false},
  {"id":"celeste","name":"Celeste","role":"Disruptor / Controller","image":"images/heroes/celeste.webp","has_ability_charges":true},
  {"id":"deadman_danny","name":"Deadman Danny","role":"Gunner / Nuker","image":"images/heroes/deadman_danny.webp","has_ability_charges":false},
  {"id":"the_doorman","name":"The Doorman","role":"Support / Controller","image":"images/heroes/the_doorman.webp","has_ability_charges":true},
  {"id":"drifter","name":"Drifter","role":"Assassin / Skirmisher","image":"images/heroes/drifter.webp","has_ability_charges":false},
  {"id":"dynamo","name":"Dynamo","role":"Support / Initiator","image":"images/heroes/dynamo.webp","has_ability_charges":true},
  {"id":"graves","name":"Graves","role":"Controller / Nuker","image":"images/heroes/graves.webp","has_ability_charges":true},
  {"id":"grey_talon","name":"Grey Talon","role":"Marksman / Nuker","image":"images/heroes/grey_talon.webp","has_ability_charges":true},
  {"id":"haze","name":"Haze","role":"Assassin / Carry","image":"images/heroes/haze.webp","has_ability_charges":true},
  {"id":"holliday","name":"Holliday","role":"Disruptor / Gunner","image":"images/heroes/holliday.webp","has_ability_charges":true},
  {"id":"infernus","name":"Infernus","role":"Skirmisher / DoT","image":"images/heroes/infernus.webp","has_ability_charges":true},
  {"id":"ivy","name":"Ivy","role":"Support / Enchanter","image":"images/heroes/ivy.webp","has_ability_charges":true},
  {"id":"kelvin","name":"Kelvin","role":"Support / Controller","image":"images/heroes/kelvin.webp","has_ability_charges":true},
  {"id":"lady_geist","name":"Lady Geist","role":"Nuker / Drainer","image":"images/heroes/lady_geist.webp","has_ability_charges":true},
  {"id":"lash","name":"Lash","role":"Initiator / Brawler","image":"images/heroes/lash.webp","has_ability_charges":true},
  {"id":"mcginnis","name":"McGinnis","role":"Tactician / Pusher","image":"images/heroes/mcginnis.webp","has_ability_charges":true},
  {"id":"mina","name":"Mina","role":"Skirmisher / Harasser","image":"images/heroes/mina.webp","has_ability_charges":false},
  {"id":"mirage","name":"Mirage","role":"Skirmisher / Teleporter","image":"images/heroes/mirage.webp","has_ability_charges":true},
  {"id":"mo_and_krill","name":"Mo & Krill","role":"Initiator / Tank","image":"images/heroes/mo_and_krill.webp","has_ability_charges":false},
  {"id":"paige","name":"Paige","role":"Support / Controller","image":"images/heroes/paige.webp","has_ability_charges":true},
  {"id":"paradox","name":"Paradox","role":"Disruptor / Controller","image":"images/heroes/paradox.webp","has_ability_charges":true},
  {"id":"pocket","name":"Pocket","role":"Mage / Nuker","image":"images/heroes/pocket.webp","has_ability_charges":false},
  {"id":"rat_king","name":"Rat King","role":"Skirmisher / Brawler","image":"images/heroes/rat_king.webp","has_ability_charges":true},
  {"id":"rem","name":"Rem","role":"Support / Disruptor","image":"images/heroes/rem.webp","has_ability_charges":true},
  {"id":"seven","name":"Seven","role":"Mage / Carry","image":"images/heroes/seven.webp","has_ability_charges":true},
  {"id":"shiv","name":"Shiv","role":"Brawler / Assassin","image":"images/heroes/shiv.webp","has_ability_charges":true},
  {"id":"silver","name":"Silver","role":"Skirmisher / Brawler","image":"images/heroes/silver.webp","has_ability_charges":false},
  {"id":"sinclair","name":"Sinclair","role":"Mage / Trickster","image":"images/heroes/sinclair.webp","has_ability_charges":true},
  {"id":"solomon","name":"Solomon","role":"Strategist / Controller","image":"images/heroes/solomon.webp","has_ability_charges":false},
  {"id":"venator","name":"Venator","role":"Marksman / Gunner","image":"images/heroes/venator.webp","has_ability_charges":true},
  {"id":"victor","name":"Victor","role":"Brawler / Tank","image":"images/heroes/victor.webp","has_ability_charges":true},
  {"id":"vindicta","name":"Vindicta","role":"Sniper / Marksman","image":"images/heroes/vindicta.webp","has_ability_charges":true},
  {"id":"viscous","name":"Viscous","role":"Support / Tank","image":"images/heroes/viscous.webp","has_ability_charges":true},
  {"id":"vyper","name":"Vyper","role":"Gunner / Skirmisher","image":"images/heroes/vyper.webp","has_ability_charges":true},
  {"id":"warden","name":"Warden","role":"Tank / Enforcer","image":"images/heroes/warden.webp","has_ability_charges":false},
  {"id":"wraith","name":"Wraith","role":"Gunner / Assassin","image":"images/heroes/wraith.webp","has_ability_charges":true},
  {"id":"yamato","name":"Yamato","role":"Assassin / Brawler","image":"images/heroes/yamato.webp","has_ability_charges":true},
  {"id":"violet","name":"Violet","role":"Caster / Controller","image":"images/heroes/violet.webp","has_ability_charges":true}
];

const EMBEDDED_ITEMS_FALLBACK = [
  {"id":"close_quarters","name":"Close Quarters","tier":1,"category":"Gun","image":"images/close_quarters.webp","console_command":"giveitem upgrade_close_range","requires_ability_slot":false,"is_active":false},
  {"id":"extended_magazine","name":"Extended Magazine","tier":1,"category":"Gun","image":"images/extended_magazine.webp","console_command":"giveitem upgrade_clip_size","requires_ability_slot":false,"is_active":false},
  {"id":"headshot_booster","name":"Headshot Booster","tier":1,"category":"Gun","image":"images/headshot_booster.webp","console_command":"giveitem upgrade_headshot_booster","requires_ability_slot":false,"is_active":false},
  {"id":"high_velocity_rounds","name":"High-Velocity Rounds","tier":1,"category":"Gun","image":"images/high_velocity_rounds.webp","console_command":"giveitem upgrade_high_velocity_mag","requires_ability_slot":false,"is_active":false},
  {"id":"monster_rounds","name":"Monster Rounds","tier":1,"category":"Gun","image":"images/monster_rounds.webp","console_command":"giveitem upgrade_non_player_bonus","requires_ability_slot":false,"is_active":false},
  {"id":"rapid_rounds","name":"Rapid Rounds","tier":1,"category":"Gun","image":"images/rapid_rounds.webp","console_command":"giveitem upgrade_rapid_rounds","requires_ability_slot":false,"is_active":false},
  {"id":"restorative_shot","name":"Restorative Shot","tier":1,"category":"Gun","image":"images/restorative_shot.webp","console_command":"giveitem upgrade_medic_bullets","requires_ability_slot":false,"is_active":false},
  {"id":"active_reload","name":"Active Reload","tier":2,"category":"Gun","image":"images/active_reload.webp","console_command":"giveitem upgrade_active_reload","requires_ability_slot":false,"is_active":false},
  {"id":"fleetfoot","name":"Fleetfoot","tier":2,"category":"Gun","image":"images/fleetfoot.webp","console_command":"giveitem upgrade_fleetfoot_boots","requires_ability_slot":false,"is_active":true},
  {"id":"intensifying_magazine","name":"Intensifying Magazine","tier":2,"category":"Gun","image":"images/intensifying_magazine.webp","console_command":"giveitem upgrade_intensifying_clip","requires_ability_slot":false,"is_active":false},
  {"id":"kinetic_dash","name":"Kinetic Dash","tier":2,"category":"Gun","image":"images/kinetic_dash.webp","console_command":"giveitem upgrade_kinetic_sash","requires_ability_slot":false,"is_active":false},
  {"id":"long_range","name":"Long Range","tier":2,"category":"Gun","image":"images/long_range.webp","console_command":"giveitem upgrade_long_range","requires_ability_slot":false,"is_active":false},
  {"id":"melee_charge","name":"Melee Charge","tier":2,"category":"Gun","image":"images/melee_charge.webp","console_command":"giveitem upgrade_melee_charge","requires_ability_slot":false,"is_active":false},
  {"id":"mystic_shot","name":"Mystic Shot","tier":2,"category":"Gun","image":"images/mystic_shot.webp","console_command":"giveitem upgrade_crackshot","requires_ability_slot":false,"is_active":false},
  {"id":"opening_rounds","name":"Opening Rounds","tier":2,"category":"Gun","image":"images/opening_rounds.webp","console_command":"giveitem upgrade_pristine_emblem","requires_ability_slot":false,"is_active":false},
  {"id":"recharging_rush","name":"Recharging Rush","tier":2,"category":"Gun","image":"images/recharging_rush.webp","console_command":"giveitem upgrade_rechargingbullets","requires_ability_slot":false,"requires_ability_charges":true,"is_active":false},
  {"id":"slowing_bullets","name":"Slowing Bullets","tier":2,"category":"Gun","image":"images/slowing_bullets.webp","console_command":"giveitem upgrade_slowing_bullets","requires_ability_slot":false,"is_active":false},
  {"id":"spirit_shredder","name":"Spirit Shredder","tier":2,"category":"Gun","image":"images/spirit_shredder.webp","console_command":"giveitem upgrade_tech_defense_shredders","requires_ability_slot":false,"is_active":false},
  {"id":"split_shot","name":"Split Shot","tier":2,"category":"Gun","image":"images/split_shot.webp","console_command":"giveitem upgrade_split_shot","requires_ability_slot":false,"is_active":true},
  {"id":"stalker","name":"Stalker","tier":2,"category":"Gun","image":"images/stalker.webp","console_command":"giveitem upgrade_weapon_backstabber","requires_ability_slot":false,"is_active":false},
  {"id":"swift_striker","name":"Swift Striker","tier":2,"category":"Gun","image":"images/swift_striker.webp","console_command":"giveitem upgrade_blitz_bullets","requires_ability_slot":false,"is_active":false},
  {"id":"titanic_magazine","name":"Titanic Magazine","tier":2,"category":"Gun","image":"images/titanic_magazine.webp","console_command":"giveitem upgrade_titan_round","requires_ability_slot":false,"is_active":false},
  {"id":"weakening_headshot","name":"Weakening Headshot","tier":2,"category":"Gun","image":"images/weakening_headshot.webp","console_command":"giveitem upgrade_headshot_booster2","requires_ability_slot":false,"is_active":false},
  {"id":"alchemical_fire","name":"Alchemical Fire","tier":3,"category":"Gun","image":"images/alchemical_fire.webp","console_command":"giveitem upgrade_thermal_detonator","requires_ability_slot":false,"is_active":true},
  {"id":"ballistic_enchantment","name":"Ballistic Enchantment","tier":3,"category":"Gun","image":"images/ballistic_enchantment.webp","console_command":"giveitem upgrade_bulletshredimbue 0","console_command_base":"giveitem upgrade_bulletshredimbue","console_command_template":"giveitem upgrade_bulletshredimbue {ability_slot}","requires_ability_slot":true,"is_active":false},
  {"id":"berserker","name":"Berserker","tier":3,"category":"Gun","image":"images/berserker.webp","console_command":"giveitem upgrade_berserker","requires_ability_slot":false,"is_active":false},
  {"id":"blood_tribute","name":"Blood Tribute","tier":3,"category":"Gun","image":"images/blood_tribute.webp","console_command":"giveitem upgrade_blood_tribute","requires_ability_slot":false,"is_active":true},
  {"id":"burst_fire","name":"Burst Fire","tier":3,"category":"Gun","image":"images/burst_fire.webp","console_command":"giveitem upgrade_burst_fire","requires_ability_slot":false,"is_active":false},
  {"id":"cultist_sacrifice","name":"Cultist Sacrifice","tier":3,"category":"Gun","image":"images/cultist_sacrifice.webp","console_command":"giveitem upgrade_non_player_bonus_sacrifice","requires_ability_slot":false,"is_active":false},
  {"id":"escalating_resilience","name":"Escalating Resilience","tier":3,"category":"Gun","image":"images/escalating_resilience.webp","console_command":"giveitem upgrade_reinforcing_casings","requires_ability_slot":false,"is_active":false},
  {"id":"express_shot","name":"Express Shot","tier":3,"category":"Gun","image":"images/express_shot.webp","console_command":"giveitem upgrade_express_shot","requires_ability_slot":false,"is_active":false},
  {"id":"headhunter","name":"Headhunter","tier":3,"category":"Gun","image":"images/headhunter.webp","console_command":"giveitem upgrade_headhunter","requires_ability_slot":false,"is_active":false},
  {"id":"heroic_aura","name":"Heroic Aura","tier":3,"category":"Gun","image":"images/heroic_aura.webp","console_command":"giveitem upgrade_dps_aura","requires_ability_slot":false,"is_active":true},
  {"id":"hollow_point","name":"Hollow Point","tier":3,"category":"Gun","image":"images/hollow_point.webp","console_command":"giveitem upgrade_hollow_point_rounds","requires_ability_slot":false,"is_active":false},
  {"id":"hunters_aura","name":"Hunter's Aura","tier":3,"category":"Gun","image":"images/hunters_aura.webp","console_command":"giveitem upgrade_bullet_armor_reduction_aura","requires_ability_slot":false,"is_active":false},
  {"id":"point_blank","name":"Point Blank","tier":3,"category":"Gun","image":"images/point_blank.webp","console_command":"giveitem upgrade_close_quarter_combat","requires_ability_slot":false,"is_active":false},
  {"id":"shadow_weave","name":"Shadow Weave","tier":3,"category":"Gun","image":"images/shadow_weave.webp","console_command":"giveitem upgrade_cloaking_device_active","requires_ability_slot":false,"is_active":true},
  {"id":"sharpshooter","name":"Sharpshooter","tier":3,"category":"Gun","image":"images/sharpshooter.webp","console_command":"giveitem upgrade_sharpshooter","requires_ability_slot":false,"is_active":false},
  {"id":"spirit_rend","name":"Spirit Rend","tier":3,"category":"Gun","image":"images/spirit_rend.webp","console_command":"giveitem upgrade_spellslinger_headshots","requires_ability_slot":false,"is_active":false},
  {"id":"tesla_bullets","name":"Tesla Bullets","tier":3,"category":"Gun","image":"images/tesla_bullets.webp","console_command":"giveitem upgrade_chain_lightning","requires_ability_slot":false,"is_active":false},
  {"id":"toxic_bullets","name":"Toxic Bullets","tier":3,"category":"Gun","image":"images/toxic_bullets.webp","console_command":"giveitem upgrade_toxic_bullets","requires_ability_slot":false,"is_active":false},
  {"id":"weighted_shots","name":"Weighted Shots","tier":3,"category":"Gun","image":"images/weighted_shots.webp","console_command":"giveitem upgrade_weighted_shots","requires_ability_slot":false,"is_active":false},
  {"id":"armor_piercer","name":"Armor Piercer","tier":4,"category":"Gun","image":"images/armor_piercer.webp","console_command":"giveitem upgrade_aprounds","requires_ability_slot":false,"is_active":false},
  {"id":"capacitor","name":"Capacitor","tier":4,"category":"Gun","image":"images/capacitor.webp","console_command":"giveitem upgrade_capacitor","requires_ability_slot":false,"is_active":true},
  {"id":"crippling_headshot","name":"Crippling Headshot","tier":4,"category":"Gun","image":"images/crippling_headshot.webp","console_command":"giveitem upgrade_banshee_slugs","requires_ability_slot":false,"is_active":false},
  {"id":"crushing_fists","name":"Crushing Fists","tier":4,"category":"Gun","image":"images/crushing_fists.webp","console_command":"giveitem upgrade_crushing_fists","requires_ability_slot":false,"is_active":false},
  {"id":"frenzy","name":"Frenzy","tier":4,"category":"Gun","image":"images/frenzy.webp","console_command":"giveitem upgrade_fervor","requires_ability_slot":false,"is_active":false},
  {"id":"glass_cannon","name":"Glass Cannon","tier":4,"category":"Gun","image":"images/glass_cannon.webp","console_command":"giveitem upgrade_glass_cannon","requires_ability_slot":false,"is_active":false},
  {"id":"lucky_shot","name":"Lucky Shot","tier":4,"category":"Gun","image":"images/lucky_shot.webp","console_command":"giveitem upgrade_critshot","requires_ability_slot":false,"is_active":false},
  {"id":"ricochet","name":"Ricochet","tier":4,"category":"Gun","image":"images/ricochet.webp","console_command":"giveitem upgrade_ricochet","requires_ability_slot":false,"is_active":false},
  {"id":"silencer","name":"Silencer","tier":4,"category":"Gun","image":"images/silencer.webp","console_command":"giveitem upgrade_proc_silence","requires_ability_slot":false,"is_active":false},
  {"id":"spellslinger","name":"Spellslinger","tier":4,"category":"Gun","image":"images/spellslinger.webp","console_command":"giveitem upgrade_enchanted_holsters","requires_ability_slot":false,"is_active":false},
  {"id":"spiritual_overflow","name":"Spiritual Overflow","tier":4,"category":"Gun","image":"images/spiritual_overflow.webp","console_command":"giveitem upgrade_tech_overflow","requires_ability_slot":false,"is_active":false},

  /* 17 ЛЕГЕНДАРНЫХ ПРЕДМЕТОВ STREET BRAWL (TIER 4) */
  {"id":"haunting_shot","name":"Haunting Shot","tier":4,"category":"Gun","image":"images/haunting_shot.webp","console_command":"giveitem upgrade_eldritch_shot","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"infinite_rounds","name":"Infinite Rounds","tier":4,"category":"Gun","image":"images/infinite_rounds.webp","console_command":"giveitem upgrade_infinite_rounds","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"runed_gauntlets","name":"Runed Gauntlets","tier":4,"category":"Gun","image":"images/runed_gauntlets.webp","console_command":"giveitem upgrade_runed_gauntlets","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"celestial_blessing","name":"Celestial Blessing","tier":4,"category":"Vitality","image":"images/celestial_blessing.webp","console_command":"giveitem upgrade_celestial_guidance","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"cloak_of_opportunity","name":"Cloak of Opportunity","tier":4,"category":"Vitality","image":"images/cloak_of_opportunity.webp","console_command":"giveitem upgrade_cloak_of_opportunity","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"electric_slippers","name":"Electric Slippers","tier":4,"category":"Vitality","image":"images/electric_slippers.webp","console_command":"giveitem upgrade_electric_slippers","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"eternal_gift","name":"Eternal Gift","tier":4,"category":"Vitality","image":"images/eternal_gift.webp","console_command":"giveitem upgrade_eternal_gift","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"nullification_burst","name":"Nullification Burst","tier":4,"category":"Vitality","image":"images/nullification_burst.webp","console_command":"giveitem upgrade_nullification_aura","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"seraphim_wings","name":"Seraphim Wings","tier":4,"category":"Vitality","image":"images/seraphim_wings.webp","console_command":"giveitem upgrade_icarus_wings","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"shadow_strike","name":"Shadow Strike","tier":4,"category":"Vitality","image":"images/shadow_strike.webp","console_command":"giveitem upgrade_shadow_strike","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"frostbite_charm","name":"Frostbite Charm","tier":4,"category":"Spirit","image":"images/frostbite_charm.webp","console_command":"giveitem upgrade_shivas_bracelet 0","console_command_base":"giveitem upgrade_shivas_bracelet","console_command_template":"giveitem upgrade_shivas_bracelet {ability_slot}","requires_ability_slot":true,"is_active":false,"is_street_brawl":true},
  {"id":"mystic_conduit","name":"Mystic Conduit","tier":4,"category":"Spirit","image":"images/mystic_conduit.webp","console_command":"giveitem upgrade_patrons_blessing","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"mystical_piano","name":"Mystical Piano","tier":4,"category":"Spirit","image":"images/mystical_piano.webp","console_command":"giveitem upgrade_mystical_piano","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"omnicharge_signet","name":"Omnicharge Signet","tier":4,"category":"Spirit","image":"images/omnicharge_signet.webp","console_command":"giveitem upgrade_omnicharge_pendant 0","console_command_base":"giveitem upgrade_omnicharge_pendant","console_command_template":"giveitem upgrade_omnicharge_pendant {ability_slot}","requires_ability_slot":true,"is_active":false,"is_street_brawl":true},
  {"id":"prism_blast","name":"Prism Blast","tier":4,"category":"Spirit","image":"images/prism_blast.webp","console_command":"giveitem upgrade_prism_blast","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"shrink_ray","name":"Shrink Ray","tier":4,"category":"Spirit","image":"images/shrink_ray.webp","console_command":"giveitem upgrade_shrink_ray","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},
  {"id":"unstable_concoction","name":"Unstable Concoction","tier":4,"category":"Spirit","image":"images/unstable_concoction.webp","console_command":"giveitem upgrade_unstable_concoction","requires_ability_slot":false,"is_active":false,"is_street_brawl":true},

  {"id":"extra_health","name":"Extra Health","tier":1,"category":"Vitality","image":"images/extra_health.webp","console_command":"giveitem upgrade_health","requires_ability_slot":false,"is_active":false},
  {"id":"extra_regen","name":"Extra Regen","tier":1,"category":"Vitality","image":"images/extra_regen.webp","console_command":"giveitem upgrade_endurance","requires_ability_slot":false,"is_active":false},
  {"id":"extra_stamina","name":"Extra Stamina","tier":1,"category":"Vitality","image":"images/extra_stamina.webp","console_command":"giveitem upgrade_improved_stamina","requires_ability_slot":false,"is_active":false},
  {"id":"grit","name":"Grit","tier":1,"category":"Vitality","image":"images/grit.webp","console_command":"giveitem upgrade_grit","requires_ability_slot":false,"is_active":true},
  {"id":"healing_rite","name":"Healing Rite","tier":1,"category":"Vitality","image":"images/healing_rite.webp","console_command":"giveitem upgrade_health_stimpak","requires_ability_slot":false,"is_active":true},
  {"id":"melee_lifesteal","name":"Melee Lifesteal","tier":1,"category":"Vitality","image":"images/melee_lifesteal.webp","console_command":"giveitem upgrade_lifestrike_gauntlets","requires_ability_slot":false,"is_active":false},
  {"id":"rebuttal","name":"Rebuttal","tier":1,"category":"Vitality","image":"images/rebuttal.webp","console_command":"giveitem upgrade_melee_rebuttal","requires_ability_slot":false,"is_active":false},
  {"id":"sprint_boots","name":"Sprint Boots","tier":1,"category":"Vitality","image":"images/sprint_boots.webp","console_command":"giveitem upgrade_sprint_booster","requires_ability_slot":false,"is_active":false},
  {"id":"battle_vest","name":"Battle Vest","tier":2,"category":"Vitality","image":"images/battle_vest.webp","console_command":"giveitem upgrade_regenerating_bullet_shield","requires_ability_slot":false,"is_active":false},
  {"id":"bullet_lifesteal","name":"Bullet Lifesteal","tier":2,"category":"Vitality","image":"images/bullet_lifesteal.webp","console_command":"giveitem upgrade_vampire","requires_ability_slot":false,"is_active":false},
  {"id":"debuff_reducer","name":"Debuff Reducer","tier":2,"category":"Vitality","image":"images/debuff_reducer.webp","console_command":"giveitem upgrade_debuff_reducer","requires_ability_slot":false,"is_active":false},
  {"id":"enchanters_emblem","name":"Enchanter's Emblem","tier":2,"category":"Vitality","image":"images/enchanters_emblem.webp","console_command":"giveitem upgrade_magic_shield","requires_ability_slot":false,"is_active":false},
  {"id":"enduring_speed","name":"Enduring Speed","tier":2,"category":"Vitality","image":"images/enduring_speed.webp","console_command":"giveitem upgrade_cardio_calibrator","requires_ability_slot":false,"is_active":false},
  {"id":"guardian_ward","name":"Guardian Ward","tier":2,"category":"Vitality","image":"images/guardian_ward.webp","console_command":"giveitem upgrade_guardian_ward","requires_ability_slot":false,"is_active":true},
  {"id":"healbane","name":"Healbane","tier":2,"category":"Vitality","image":"images/healbane.webp","console_command":"giveitem upgrade_healbane","requires_ability_slot":false,"is_active":false},
  {"id":"healing_booster","name":"Healing Booster","tier":2,"category":"Vitality","image":"images/healing_booster.webp","console_command":"giveitem upgrade_healing_booster","requires_ability_slot":false,"is_active":false},
  {"id":"reactive_barrier","name":"Reactive Barrier","tier":2,"category":"Vitality","image":"images/reactive_barrier.webp","console_command":"giveitem upgrade_vex_barrier","requires_ability_slot":false,"is_active":false},
  {"id":"restorative_locket","name":"Restorative Locket","tier":2,"category":"Vitality","image":"images/restorative_locket.webp","console_command":"giveitem upgrade_restorative_locket","requires_ability_slot":false,"is_active":false},
  {"id":"return_fire","name":"Return Fire","tier":2,"category":"Vitality","image":"images/return_fire.webp","console_command":"giveitem upgrade_return_fire","requires_ability_slot":false,"is_active":false},
  {"id":"spirit_lifesteal","name":"Spirit Lifesteal","tier":2,"category":"Vitality","image":"images/spirit_lifesteal.webp","console_command":"giveitem upgrade_health_stealing_magic","requires_ability_slot":false,"is_active":false},
  {"id":"spirit_shielding","name":"Spirit Shielding","tier":2,"category":"Vitality","image":"images/spirit_shielding.webp","console_command":"giveitem upgrade_spirit_bubble","requires_ability_slot":false,"is_active":false},
  {"id":"trophy_collector","name":"Trophy Collector","tier":2,"category":"Vitality","image":"images/trophy_collector.webp","console_command":"giveitem upgrade_trophy_collector","requires_ability_slot":false,"is_active":false},
  {"id":"weapon_shielding","name":"Weapon Shielding","tier":2,"category":"Vitality","image":"images/weapon_shielding.webp","console_command":"giveitem upgrade_weapon_shielding","requires_ability_slot":false,"is_active":false},
  {"id":"bullet_resilience","name":"Bullet Resilience","tier":3,"category":"Vitality","image":"images/bullet_resilience.webp","console_command":"giveitem upgrade_improved_bullet_armor","requires_ability_slot":false,"is_active":false},
  {"id":"counterspell","name":"Counterspell","tier":3,"category":"Vitality","image":"images/counterspell.webp","console_command":"giveitem upgrade_counterspell","requires_ability_slot":false,"is_active":false},
  {"id":"dispel_magic","name":"Dispel Magic","tier":3,"category":"Vitality","image":"images/dispel_magic.webp","console_command":"giveitem upgrade_reduce_debuff_duration","requires_ability_slot":false,"is_active":true},
  {"id":"fortitude","name":"Fortitude","tier":3,"category":"Vitality","image":"images/fortitude.webp","console_command":"giveitem upgrade_chonky","requires_ability_slot":false,"is_active":false},
  {"id":"fury_trance","name":"Fury Trance","tier":3,"category":"Vitality","image":"images/fury_trance.webp","console_command":"giveitem upgrade_fury_trance","requires_ability_slot":false,"is_active":false},
  {"id":"healing_nova","name":"Healing Nova","tier":3,"category":"Vitality","image":"images/healing_nova.webp","console_command":"giveitem upgrade_health_nova","requires_ability_slot":false,"is_active":true},
  {"id":"lifestrike","name":"Lifestrike","tier":3,"category":"Vitality","image":"images/lifestrike.webp","console_command":"giveitem upgrade_boxing_glove","requires_ability_slot":false,"is_active":false},
  {"id":"majestic_leap","name":"Majestic Leap","tier":3,"category":"Vitality","image":"images/majestic_leap.webp","console_command":"giveitem upgrade_rocket_booster","requires_ability_slot":false,"is_active":true},
  {"id":"metal_skin","name":"Metal Skin","tier":3,"category":"Vitality","image":"images/metal_skin.webp","console_command":"giveitem upgrade_metal_skin","requires_ability_slot":false,"is_active":true},
  {"id":"rescue_beam","name":"Rescue Beam","tier":3,"category":"Vitality","image":"images/rescue_beam.webp","console_command":"giveitem upgrade_rescue_beam","requires_ability_slot":false,"is_active":true},
  {"id":"spirit_resilience","name":"Spirit Resilience","tier":3,"category":"Vitality","image":"images/spirit_resilience.webp","console_command":"giveitem upgrade_tech_purge","requires_ability_slot":false,"is_active":false},
  {"id":"stamina_mastery","name":"Stamina Mastery","tier":3,"category":"Vitality","image":"images/stamina_mastery.webp","console_command":"giveitem upgrade_superior_stamina","requires_ability_slot":false,"is_active":false},
  {"id":"veil_walker","name":"Veil Walker","tier":3,"category":"Vitality","image":"images/veil_walker.webp","console_command":"giveitem upgrade_veil_walker","requires_ability_slot":false,"is_active":false},
  {"id":"warp_stone","name":"Warp Stone","tier":3,"category":"Vitality","image":"images/warp_stone.webp","console_command":"giveitem upgrade_warp_stone","requires_ability_slot":false,"is_active":true},
  {"id":"cheat_death","name":"Cheat Death","tier":4,"category":"Vitality","image":"images/cheat_death.webp","console_command":"giveitem upgrade_cheat_death","requires_ability_slot":false,"is_active":false},
  {"id":"colossus","name":"Colossus","tier":4,"category":"Vitality","image":"images/colossus.webp","console_command":"giveitem upgrade_colossus","requires_ability_slot":false,"is_active":true},
  {"id":"divine_barrier","name":"Divine Barrier","tier":4,"category":"Vitality","image":"images/divine_barrier.webp","console_command":"giveitem upgrade_divine_barrier","requires_ability_slot":false,"is_active":true},
  {"id":"diviners_kevlar","name":"Diviner's Kevlar","tier":4,"category":"Vitality","image":"images/diviners_kevlar.webp","console_command":"giveitem upgrade_diviners_kevlar","requires_ability_slot":false,"is_active":false},
  {"id":"healing_tempo","name":"Healing Tempo","tier":4,"category":"Vitality","image":"images/healing_tempo.webp","console_command":"giveitem upgrade_healbuff","requires_ability_slot":false,"is_active":false},
  {"id":"indomitable","name":"Indomitable","tier":4,"category":"Vitality","image":"images/indomitable.webp","console_command":"giveitem upgrade_auto_cleanse","requires_ability_slot":false,"is_active":false},
  {"id":"infuser","name":"Infuser","tier":4,"category":"Vitality","image":"images/infuser.webp","console_command":"giveitem upgrade_infuser","requires_ability_slot":false,"is_active":true},
  {"id":"inhibitor","name":"Inhibitor","tier":4,"category":"Vitality","image":"images/inhibitor.webp","console_command":"giveitem upgrade_inhibitor","requires_ability_slot":false,"is_active":false},
  {"id":"juggernaut","name":"Juggernaut","tier":4,"category":"Vitality","image":"images/juggernaut.webp","console_command":"giveitem upgrade_juggernaut","requires_ability_slot":false,"is_active":false},
  {"id":"leech","name":"Leech","tier":4,"category":"Vitality","image":"images/leech.webp","console_command":"giveitem upgrade_damage_recycler","requires_ability_slot":false,"is_active":false},
  {"id":"phantom_strike","name":"Phantom Strike","tier":4,"category":"Vitality","image":"images/phantom_strike.webp","console_command":"giveitem upgrade_phantom_strike","requires_ability_slot":false,"is_active":true},
  {"id":"plated_armor","name":"Plated Armor","tier":4,"category":"Vitality","image":"images/plated_armor.webp","console_command":"giveitem upgrade_deflecting_armor","requires_ability_slot":false,"is_active":false},
  {"id":"siphon_bullets","name":"Siphon Bullets","tier":4,"category":"Vitality","image":"images/siphon_bullets.webp","console_command":"giveitem upgrade_siphon_bullets","requires_ability_slot":false,"is_active":false},
  {"id":"spellbreaker","name":"Spellbreaker","tier":4,"category":"Vitality","image":"images/spellbreaker.webp","console_command":"giveitem upgrade_spellbreaker","requires_ability_slot":false,"is_active":false},
  {"id":"unstoppable","name":"Unstoppable","tier":4,"category":"Vitality","image":"images/unstoppable.webp","console_command":"giveitem upgrade_unstoppable","requires_ability_slot":false,"is_active":true},
  {"id":"vampiric_burst","name":"Vampiric Burst","tier":4,"category":"Vitality","image":"images/vampiric_burst.webp","console_command":"giveitem upgrade_surging_power","requires_ability_slot":false,"is_active":false},
  {"id":"witchmail","name":"Witchmail","tier":4,"category":"Vitality","image":"images/witchmail.webp","console_command":"giveitem upgrade_absorbing_armor","requires_ability_slot":false,"is_active":false},
  {"id":"extra_charge","name":"Extra Charge","tier":1,"category":"Spirit","image":"images/extra_charge.webp","console_command":"giveitem upgrade_extra_charge","requires_ability_slot":false,"requires_ability_charges":true,"is_active":false},
  {"id":"extra_spirit","name":"Extra Spirit","tier":1,"category":"Spirit","image":"images/extra_spirit.webp","console_command":"giveitem upgrade_improved_spirit","requires_ability_slot":false,"is_active":false},
  {"id":"mystic_burst","name":"Mystic Burst","tier":1,"category":"Spirit","image":"images/mystic_burst.webp","console_command":"giveitem upgrade_magic_burst","requires_ability_slot":false,"is_active":false},
  {"id":"mystic_expansion","name":"Mystic Expansion","tier":1,"category":"Spirit","image":"images/mystic_expansion.webp","console_command":"giveitem upgrade_magic_reach 0","console_command_base":"giveitem upgrade_magic_reach","console_command_template":"giveitem upgrade_magic_reach {ability_slot}","requires_ability_slot":true,"is_active":false},
  {"id":"mystic_regeneration","name":"Mystic Regeneration","tier":1,"category":"Spirit","image":"images/mystic_regeneration.webp","console_command":"giveitem upgrade_mystic_regeneration","requires_ability_slot":false,"is_active":false},
  {"id":"rusted_barrel","name":"Rusted Barrel","tier":1,"category":"Spirit","image":"images/rusted_barrel.webp","console_command":"giveitem upgrade_withering_whip","requires_ability_slot":false,"is_active":false},
  {"id":"spirit_strike","name":"Spirit Strike","tier":1,"category":"Spirit","image":"images/spirit_strike.webp","console_command":"giveitem upgrade_acolytes_glove","requires_ability_slot":false,"is_active":false},
  {"id":"arcane_surge","name":"Arcane Surge","tier":2,"category":"Spirit","image":"images/arcane_surge.webp","console_command":"giveitem upgrade_arcane_surge","requires_ability_slot":false,"is_active":false},
  {"id":"bullet_resist_shredder","name":"Bullet Resist Shredder","tier":2,"category":"Spirit","image":"images/bullet_resist_shredder.webp","console_command":"giveitem upgrade_bullet_resist_shredder","requires_ability_slot":false,"is_active":false},
  {"id":"cold_front","name":"Cold Front","tier":2,"category":"Spirit","image":"images/cold_front.webp","console_command":"giveitem upgrade_cold_front","requires_ability_slot":false,"is_active":true},
  {"id":"compress_cooldown","name":"Compress Cooldown","tier":2,"category":"Spirit","image":"images/compress_cooldown.webp","console_command":"giveitem upgrade_magic_tempo 0","console_command_base":"giveitem upgrade_magic_tempo","console_command_template":"giveitem upgrade_magic_tempo {ability_slot}","requires_ability_slot":true,"is_active":false},
  {"id":"duration_extender","name":"Duration Extender","tier":2,"category":"Spirit","image":"images/duration_extender.webp","console_command":"giveitem upgrade_arcane_extension 0","console_command_base":"giveitem upgrade_arcane_extension","console_command_template":"giveitem upgrade_arcane_extension {ability_slot}","requires_ability_slot":true,"is_active":false},
  {"id":"improved_spirit","name":"Improved Spirit","tier":2,"category":"Spirit","image":"images/improved_spirit.webp","console_command":"giveitem upgrade_improved_spirit","requires_ability_slot":false,"is_active":false},
  {"id":"mystic_slow","name":"Mystic Slow","tier":2,"category":"Spirit","image":"images/mystic_slow.webp","console_command":"giveitem upgrade_magic_slow","requires_ability_slot":false,"is_active":false},
  {"id":"mystic_vulnerability","name":"Mystic Vulnerability","tier":2,"category":"Spirit","image":"images/mystic_vulnerability.webp","console_command":"giveitem upgrade_magic_vulnerability","requires_ability_slot":false,"is_active":false},
  {"id":"quicksilver_reload","name":"Quicksilver Reload","tier":2,"category":"Spirit","image":"images/quicksilver_reload.webp","console_command":"giveitem upgrade_quick_silver 0","console_command_base":"giveitem upgrade_quick_silver","console_command_template":"giveitem upgrade_quick_silver {ability_slot}","requires_ability_slot":true,"is_active":false},
  {"id":"slowing_hex","name":"Slowing Hex","tier":2,"category":"Spirit","image":"images/slowing_hex.webp","console_command":"giveitem upgrade_containment","requires_ability_slot":false,"is_active":true},
  {"id":"spirit_sap","name":"Spirit Sap","tier":2,"category":"Spirit","image":"images/spirit_sap.webp","console_command":"giveitem upgrade_spirit_sap","requires_ability_slot":false,"is_active":true},
  {"id":"suppressor","name":"Suppressor","tier":2,"category":"Spirit","image":"images/suppressor.webp","console_command":"giveitem upgrade_suppressor","requires_ability_slot":false,"is_active":false},
  {"id":"decay","name":"Decay","tier":3,"category":"Spirit","image":"images/decay.webp","console_command":"giveitem upgrade_rupture","requires_ability_slot":false,"is_active":true},
  {"id":"disarming_hex","name":"Disarming Hex","tier":3,"category":"Spirit","image":"images/disarming_hex.webp","console_command":"giveitem upgrade_greater_withering_whip","requires_ability_slot":false,"is_active":true},
  {"id":"greater_expansion","name":"Greater Expansion","tier":3,"category":"Spirit","image":"images/greater_expansion.webp","console_command":"giveitem upgrade_tech_range","requires_ability_slot":false,"is_active":false},
  {"id":"knockdown","name":"Knockdown","tier":3,"category":"Spirit","image":"images/knockdown.webp","console_command":"giveitem upgrade_target_stun","requires_ability_slot":false,"is_active":true},
  {"id":"radiant_regeneration","name":"Radiant Regeneration","tier":3,"category":"Spirit","image":"images/radiant_regeneration.webp","console_command":"giveitem upgrade_resonant_healing","requires_ability_slot":false,"is_active":false},
  {"id":"rapid_recharge","name":"Rapid Recharge","tier":3,"category":"Spirit","image":"images/rapid_recharge.webp","console_command":"giveitem upgrade_rapid_recharge","requires_ability_slot":false,"requires_ability_charges":true,"is_active":false},
  {"id":"silence_wave","name":"Silence Wave","tier":3,"category":"Spirit","image":"images/silence_wave.webp","console_command":"giveitem upgrade_targeted_silence","requires_ability_slot":false,"is_active":true},
  {"id":"spirit_snatch","name":"Spirit Snatch","tier":3,"category":"Spirit","image":"images/spirit_snatch.webp","console_command":"giveitem upgrade_spirit_snatch","requires_ability_slot":false,"is_active":false},
  {"id":"superior_cooldown","name":"Superior Cooldown","tier":3,"category":"Spirit","image":"images/superior_cooldown.webp","console_command":"giveitem upgrade_cooldown_reduction","requires_ability_slot":false,"is_active":false},
  {"id":"superior_duration","name":"Superior Duration","tier":3,"category":"Spirit","image":"images/superior_duration.webp","console_command":"giveitem upgrade_imbued_duration_extender","requires_ability_slot":false,"is_active":false},
  {"id":"surge_of_power","name":"Surge of Power","tier":3,"category":"Spirit","image":"images/surge_of_power.webp","console_command":"giveitem upgrade_magic_storm 0","console_command_base":"giveitem upgrade_magic_storm","console_command_template":"giveitem upgrade_magic_storm {ability_slot}","requires_ability_slot":true,"is_active":false},
  {"id":"tankbuster","name":"Tankbuster","tier":3,"category":"Spirit","image":"images/tankbuster.webp","console_command":"giveitem upgrade_magic_shock","requires_ability_slot":false,"is_active":false},
  {"id":"torment_pulse","name":"Torment Pulse","tier":3,"category":"Spirit","image":"images/torment_pulse.webp","console_command":"giveitem upgrade_tech_damage_pulse","requires_ability_slot":false,"is_active":false},
  {"id":"arctic_blast","name":"Arctic Blast","tier":4,"category":"Spirit","image":"images/arctic_blast.webp","console_command":"giveitem upgrade_arctic_blast","requires_ability_slot":false,"is_active":true},
  {"id":"boundless_spirit","name":"Boundless Spirit","tier":4,"category":"Spirit","image":"images/boundless_spirit.webp","console_command":"giveitem upgrade_boundless_spirit","requires_ability_slot":false,"is_active":false},
  {"id":"cursed_relic","name":"Cursed Relic","tier":4,"category":"Spirit","image":"images/cursed_relic.webp","console_command":"giveitem upgrade_glitch","requires_ability_slot":false,"is_active":true},
  {"id":"echo_shard","name":"Echo Shard","tier":4,"category":"Spirit","image":"images/echo_shard.webp","console_command":"giveitem upgrade_ability_power_shard 0","console_command_base":"giveitem upgrade_ability_power_shard","console_command_template":"giveitem upgrade_ability_power_shard {ability_slot}","requires_ability_slot":true,"is_active":true},
  {"id":"escalating_exposure","name":"Escalating Exposure","tier":4,"category":"Spirit","image":"images/escalating_exposure.webp","console_command":"giveitem upgrade_escalating_exposure","requires_ability_slot":false,"is_active":false},
  {"id":"ethereal_shift","name":"Ethereal Shift","tier":4,"category":"Spirit","image":"images/ethereal_shift.webp","console_command":"giveitem upgrade_self_bubble","requires_ability_slot":false,"is_active":false},
  {"id":"focus_lens","name":"Focus Lens","tier":4,"category":"Spirit","image":"images/focus_lens.webp","console_command":"giveitem upgrade_focus_lens","requires_ability_slot":false,"is_active":true},
  {"id":"lightning_scroll","name":"Lightning Scroll","tier":4,"category":"Spirit","image":"images/lightning_scroll.webp","console_command":"giveitem upgrade_ultimate_burst","requires_ability_slot":false,"is_active":false},
  {"id":"magic_carpet","name":"Magic Carpet","tier":4,"category":"Spirit","image":"images/magic_carpet.webp","console_command":"giveitem upgrade_magic_carpet","requires_ability_slot":false,"is_active":false},
  {"id":"mercurial_magnum","name":"Mercurial Magnum","tier":4,"category":"Spirit","image":"images/mercurial_magnum.webp","console_command":"giveitem upgrade_ethereal_bullets 0","console_command_base":"giveitem upgrade_ethereal_bullets","console_command_template":"giveitem upgrade_ethereal_bullets {ability_slot}","requires_ability_slot":true,"is_active":false},
  {"id":"mystic_reverb","name":"Mystic Reverb","tier":4,"category":"Spirit","image":"images/mystic_reverb.webp","console_command":"giveitem upgrade_mystic_reverb 0","console_command_base":"giveitem upgrade_mystic_reverb","console_command_template":"giveitem upgrade_mystic_reverb {ability_slot}","requires_ability_slot":true,"is_active":false},
  {"id":"refresher","name":"Refresher","tier":4,"category":"Spirit","image":"images/refresher.webp","console_command":"giveitem upgrade_ability_refresher","requires_ability_slot":false,"is_active":true},
  {"id":"scourge","name":"Scourge","tier":4,"category":"Spirit","image":"images/scourge.webp","console_command":"giveitem upgrade_discord","requires_ability_slot":false,"is_active":true},
  {"id":"spirit_burn","name":"Spirit Burn","tier":4,"category":"Spirit","image":"images/spirit_burn.webp","console_command":"giveitem upgrade_spirit_burn","requires_ability_slot":false,"is_active":false},
  {"id":"transcendent_cooldown","name":"Transcendent Cooldown","tier":4,"category":"Spirit","image":"images/transcendent_cooldown.webp","console_command":"giveitem upgrade_transcendent_cooldown","requires_ability_slot":false,"is_active":false},
  {"id":"vortex_web","name":"Vortex Web","tier":4,"category":"Spirit","image":"images/vortex_web.webp","console_command":"giveitem upgrade_aoe_root","requires_ability_slot":false,"is_active":true}
];

const STREET_BRAWL_ITEM_IDS = new Set([
  'haunting_shot',
  'infinite_rounds',
  'runed_gauntlets',
  'celestial_blessing',
  'cloak_of_opportunity',
  'electric_slippers',
  'eternal_gift',
  'nullification_burst',
  'seraphim_wings',
  'shadow_strike',
  'frostbite_charm',
  'mystic_conduit',
  'mystical_piano',
  'omnicharge_signet',
  'prism_blast',
  'shrink_ray',
  'unstable_concoction'
]);

function isStreetBrawlItem(item) {
  return item.is_street_brawl === true ||
         STREET_BRAWL_ITEM_IDS.has(item.id);
}

const ITEM_UPGRADE_GRAPH = {
  "close_quarters": ["point_blank"],
  "extended_magazine": ["titanic_magazine", "escalating_resilience"],
  "headshot_booster": ["headhunter"],
  "high_velocity_rounds": ["opening_rounds", "sharpshooter", "express_shot", "armor_piercer"],
  "long_range": ["sharpshooter"],
  "monster_rounds": ["cultist_sacrifice"],
  "rapid_rounds": ["swift_striker", "burst_fire"],
  "spirit_shredder": ["spirit_rend"],
  "extra_health": ["fortitude", "colossus"],
  "extra_regen": ["healing_booster"],
  "healing_booster": ["healing_tempo"],
  "extra_stamina": ["arcane_surge", "kinetic_dash", "stamina_mastery"],
  "healing_rite": ["healing_nova", "rescue_beam"],
  "melee_lifesteal": ["lifestrike"],
  "sprint_boots": ["enduring_speed", "trophy_collector", "shadow_weave", "veil_walker"],
  "enduring_speed": ["juggernaut"],
  "grit": ["weapon_shielding", "spirit_shielding", "reactive_barrier", "guardian_ward"],
  "reactive_barrier": ["indomitable"],
  "guardian_ward": ["divine_barrier"],
  "bullet_lifesteal": ["fury_trance", "leech", "vampiric_burst"],
  "debuff_reducer": ["unstoppable", "spellbreaker"],
  "extra_spirit": ["improved_spirit", "surge_of_power"],
  "improved_spirit": ["boundless_spirit"],
  "extra_charge": ["rapid_recharge"],
  "mystic_burst": ["tankbuster"],
  "mystic_expansion": ["greater_expansion", "ballistic_enchantment"],
  "mystic_regeneration": ["radiant_regeneration"],
  "rusted_barrel": ["disarming_hex"],
  "spirit_strike": ["spirit_snatch"],
  "cold_front": ["arctic_blast"],
  "compress_cooldown": ["superior_cooldown"],
  "superior_cooldown": ["transcendent_cooldown"],
  "duration_extender": ["superior_duration"],
  "mystic_slow": ["lightning_scroll"],
  "mystic_vulnerability": ["escalating_exposure"],
  "tesla_bullets": ["capacitor"],
  "weakening_headshot": ["crippling_headshot"],
  "melee_charge": ["crushing_fists"],
  "slowing_bullets": ["weighted_shots"],
  "spirit_sap": ["focus_lens"],
  "slowing_hex": ["vortex_web"],
  "quicksilver_reload": ["mercurial_magnum"]
};

function getDescendants(itemId) {
  const result = new Set();
  const queue = [itemId];
  while (queue.length > 0) {
    const curr = queue.shift();
    const children = ITEM_UPGRADE_GRAPH[curr] || [];
    for (const ch of children) {
      if (!result.has(ch)) { result.add(ch); queue.push(ch); }
    }
  }
  return result;
}

let REVERSE_UPGRADE_GRAPH = null;
function getAncestors(itemId) {
  if (!REVERSE_UPGRADE_GRAPH) {
    REVERSE_UPGRADE_GRAPH = {};
    for (const p in ITEM_UPGRADE_GRAPH) {
      for (const ch of ITEM_UPGRADE_GRAPH[p]) {
        if (!REVERSE_UPGRADE_GRAPH[ch]) REVERSE_UPGRADE_GRAPH[ch] = [];
        REVERSE_UPGRADE_GRAPH[ch].push(p);
      }
    }
  }
  const result = new Set();
  const queue = [itemId];
  while (queue.length > 0) {
    const curr = queue.shift();
    const parents = REVERSE_UPGRADE_GRAPH[curr] || [];
    for (const p of parents) {
      if (!result.has(p)) { result.add(p); queue.push(p); }
    }
  }
  return result;
}

function isUpgradeOf(newItemId, existingItemId) {
  if (newItemId === existingItemId) return false;
  return getDescendants(existingItemId).has(newItemId);
}

function isDowngradeOrSame(newItemId, existingItemId) {
  if (newItemId === existingItemId) return true;
  return getAncestors(existingItemId).has(newItemId);
}

/* ==========================================================================
   ПРОВЕРКА СОВМЕСТИМОСТИ ПРЕДМЕТА И ГЕРОЯ
   ========================================================================== */
function checkItemHeroCompatibility(hero, item, teamNumber = null) {
  if (item.requires_ability_charges && hero.has_ability_charges === false) {
    return { compatible: false, reason: "Этот предмет требует способности с зарядами и недоступен выбранному герою" };
  }

  if (item.is_street_brawl) {
    if (hero.items.some(i => isStreetBrawlItem(i))) {
      return { compatible: false, reason: "У этого героя уже есть легендарный предмет (лимит: 1 легендарка на игрока за серию)" };
    }

    if (state.series.round === 3 && teamNumber) {
      const teamHeroes = state.series.heroes[`team${teamNumber}`] || [];
      const teamAlreadyTookBrawlInR3 = teamHeroes.some(h => h.items.some(i => isStreetBrawlItem(i) && i.round === 3));
      if (teamAlreadyTookBrawlInR3) {
        return { compatible: false, reason: "Ваша команда уже взяла 1 легендарный предмет в 3-м раунде (лимит: 1 на команду)" };
      }
    }
  }

  for (const ex of hero.items) {
    if (isDowngradeOrSame(item.id, ex.id)) {
      return { compatible: false, reason: `У героя уже есть равный или более высокий предмет этой цепочки (${ex.name})` };
    }
  }

  const itemToReplace = hero.items.find(ex => isUpgradeOf(item.id, ex.id)) || null;

  let simulated = hero.items.filter(i => !itemToReplace || i.id !== itemToReplace.id);
  simulated.push(item);
  const activeCount = simulated.filter(i => i.is_active).length;
  if (item.is_active && activeCount > 4) {
    return { compatible: false, reason: "У героя уже есть 4 активных предмета (лимит активных слотов)" };
  }

  if (!itemToReplace && hero.items.length >= 12) {
    return { compatible: false, reason: "Достигнут максимальный лимит предметов героя (12/12)" };
  }

  return { compatible: true, itemToReplace: itemToReplace };
}

const CATEGORY_NAMES = { 'Gun': 'Оружие', 'Vitality': 'Выживаемость', 'Spirit': 'Способности' };

/* ==========================================================================
   ПРАВИЛА ПРОГРЕССИИ ТИРОВ
   ========================================================================== */
const TIER_PROGRESSION_RULES = {
  1: { 
    badge: 'РАУНД 1: T1 + T2', 
    desc: 'Открыты T1 и T2 • Цель: 40% T1, 60% T2', 
    unlockedTiers: [1, 2], 
    percentages: { 1: 0.40, 2: 0.60 } 
  },
  2: { 
    badge: 'РАУНД 2: T2 + T3', 
    desc: 'Открыты T2 и T3 (T1 исключены из пула) • Цель: 50% T2, 50% T3', 
    unlockedTiers: [2, 3], 
    percentages: { 2: 0.50, 3: 0.50 } 
  },
  3: { 
    badge: 'РАУНД 3: T2–T4', 
    desc: 'В сетке 2 легендарных предмета (макс. 1 на команду, без бана) • T2, T3, T4 (T1 исключены)', 
    unlockedTiers: [2, 3, 4], 
    percentages: { 2: 0.30, 3: 0.40, 4: 0.30 } 
  },
  4: { 
    badge: 'РАУНД 4: T3 + T4', 
    desc: 'Открыты только T3 и T4 (T1 и T2 исключены) • Без легендарных предметов', 
    unlockedTiers: [3, 4], 
    percentages: { 3: 0.50, 4: 0.50 } 
  },
  5: { 
    badge: 'РАУНД 5: ФИНАЛ T3 + T4', 
    desc: 'Финал серии • Только T3, T4 и легендарки (T1 и T2 исключены)', 
    unlockedTiers: [3, 4], 
    percentages: { 3: 0.40, 4: 0.60 } 
  }
};

const ROUND_LEVELUP_GOLD = {
  1: 'givelevelupgold 10',
  2: 'givelevelupgold 16',
  3: 'givelevelupgold 22',
  4: 'givelevelupgold 29',
  5: 'givelevelupgold 36'
};

let itemsCatalog = [];
let heroesCatalog = [];
let shouldAnimateFlip = true;
let rerollInProgress = false;

let state = {
  activePhase: 'character_draft',
  characterDraft: {
    mode: '2x2',
    stepIndex: 0,
    gridHeroes: [],
    bans: { team1: [], team2: [] },
    picks: { team1: [], team2: [] },
    completed: false,
    history: [],
    sequence: []
  },
  series: {
    mode: '2x2',
    round: 1,
    score: { team1: 0, team2: 0 },
    seriesWinner: null,
    usedItemIds: [],
    heroes: { team1: [], team2: [] },
    bans: { team1: [], team2: [] },
    history: [],
    scouting: { team1: 0, team2: 0 }
  },
  roundState: {
    gridItems: [],
    stepIndex: 0,
    roundFinished: false,
    roundWinner: null,
    roundBans: { team1: [], team2: [] },
    rerollsUsed: { team1: 0, team2: 0 },
    rerolledGridItemIds: [],
    sequence: []
  },
  actionStack: []
};

let pendingPickItem = null;
let selectedHeroForAssignment = null;
let activeCategory = 'all';
let activeTier = 'all';
let searchQuery = '';

/* ==========================================================================
   ИНИЦИАЛИЗАЦИЯ И ЗАГРУЗКА
   ========================================================================== */
window.addEventListener('DOMContentLoaded', async () => {
  await loadCatalogs();
  initFloatingModeBackground();
  initFilterEvents();
  initControlEvents();

  try {
    const saved = localStorage.getItem('deadlock_draft_bo5_state_final');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.characterDraft && parsed.characterDraft.sequence && parsed.characterDraft.sequence.length > 0) {
        state = parsed;
        if (state.activePhase === 'character_draft') {
          // Новая версия драфта героев: без банов, реролла и разведки.
          state.characterDraft.sequence = buildCharacterDraftSequence(state.characterDraft.mode || '2x2');
          state.characterDraft.stepIndex = 0;
          state.characterDraft.bans = { team1: [], team2: [] };
          state.characterDraft.picks = { team1: [], team2: [] };
          state.characterDraft.completed = false;
          state.characterDraft.history = [];
          state.actionStack = (state.actionStack || []).filter(a => a.phase !== 'character_draft');
        }
        if (state.roundState) {
          if (!state.roundState.rerollsUsed) state.roundState.rerollsUsed = { team1: 0, team2: 0 };
          if (!state.roundState.rerolledGridItemIds) state.roundState.rerolledGridItemIds = [];
          if (!state.series.scouting) state.series.scouting = { team1: 0, team2: 0 };
          if (!state.roundState.revealedItems) state.roundState.revealedItems = {};
          if (state.series.scouting.team1 === 0 && state.series.scouting.team2 === 0 && state.series.round === 1) { state.series.scouting.team1 = getTeamSize(1) * 3; state.series.scouting.team2 = getTeamSize(2) * 3; }
        }
      }
    }
  } catch (e) {
    localStorage.removeItem('deadlock_draft_bo5_state_final');
  }

  if (!state.characterDraft || !state.characterDraft.sequence || state.characterDraft.sequence.length === 0) {
    document.getElementById('modeModal').style.display = 'flex';
  } else {
    if (!state.characterDraft.gridHeroes || state.characterDraft.gridHeroes.length === 0) {
      state.characterDraft.gridHeroes = generateHeroPool(state.characterDraft.mode || '2x2');
    }
    checkAndAutoRerollDeadlocks();
    renderAll();
  }
});

async function loadCatalogs() {
  heroesCatalog = EMBEDDED_HEROES_FALLBACK;
  try {
    let resH = await fetch('heroes.json');
    if (!resH.ok) resH = await fetch('heroes_with_ability_charges.json');
    if (resH && resH.ok) {
      const hData = await resH.json();
      if (Array.isArray(hData) && hData.length > 0) heroesCatalog = hData;
    }
  } catch (err) {}

  itemsCatalog = EMBEDDED_ITEMS_FALLBACK;
  try {
    let resI = await fetch('items_with_street_brawl.json');
    if (!resI.ok) resI = await fetch('items.json');
    if (!resI.ok) resI = await fetch('Items.txt');
    if (!resI.ok) resI = await fetch('deadlock_item_console_commands.json');
    if (resI && resI.ok) {
      const iData = await resI.json();
      if (Array.isArray(iData) && iData.length > 0) itemsCatalog = iData;
    }
  } catch (err) {}

  itemsCatalog.forEach(i => {
    if (['extra_charge', 'rapid_recharge', 'recharging_rush'].includes(i.id)) {
      i.requires_ability_charges = true;
    }
    if (i.is_active === undefined) i.is_active = false;
    if (isStreetBrawlItem(i) === undefined) isStreetBrawlItem(i) = false;
  });
}

function saveState() {
  localStorage.setItem('deadlock_draft_bo5_state_final', JSON.stringify(state));
}

function buildCharacterDraftSequence(mode) {
  const picks = mode === '1x1' ? [1, 2]
    : mode === '2x2' ? [1, 2, 2, 1]
    : mode === '3x3' ? [1, 2, 2, 1, 1, 2]
    : [1, 2, 2, 1, 1, 2, 2, 1];
  return picks.map((team, index) => ({ step: index + 1, team, type: 'pick' }));
}

const ROLE_TRANSLATIONS = {
  Assassin: 'Убийца', Tank: 'Танк', Brawler: 'Боец', Skirmisher: 'Застрельщик',
  Support: 'Поддержка', Controller: 'Контролёр', Disruptor: 'Дезорганизатор',
  Gunner: 'Стрелок', Marksman: 'Меткий стрелок', Sniper: 'Снайпер', Carry: 'Керри',
  Initiator: 'Инициатор', Nuker: 'Маг взрывного урона', Mage: 'Маг', Enchanter: 'Усилитель',
  Tactician: 'Тактик', Pusher: 'Специалист по сносу построек', Flanker: 'Обходчик',
  Harasser: 'Преследователь', DoT: 'Урон со временем', Drainer: 'Истощатель',
  Teleporter: 'Телепортер', Trickster: 'Обманщик', Strategist: 'Стратег', Enforcer: 'Каратель'
};

function getLocalizedHeroRole(hero) {
  return String(hero?.role || 'Неизвестная роль').split(' / ').map(role => ROLE_TRANSLATIONS[role.trim()] || role.trim()).join(' / ');
}

function getHeroGridSize(mode) {
  if (mode === '1x1') return 12;
  if (mode === '2x2') return 16;
  if (mode === '3x3') return 20;
  if (mode === '4x4') return 24;
  return 16;
}

function generateHeroPool(mode) {
  const targetSize = Math.min(getHeroGridSize(mode), heroesCatalog.length);
  const catalogCopy = [...heroesCatalog];
  shuffleArray(catalogCopy);

  const chargeHeroes = catalogCopy.filter(h => h.has_ability_charges);
  const nonChargeHeroes = catalogCopy.filter(h => !h.has_ability_charges);

  shuffleArray(chargeHeroes);
  shuffleArray(nonChargeHeroes);

  const minCharges = Math.min(3, chargeHeroes.length);
  const selected = chargeHeroes.splice(0, minCharges);

  const remainingNeeded = targetSize - selected.length;
  const remainingPool = [...chargeHeroes, ...nonChargeHeroes];
  shuffleArray(remainingPool);

  selected.push(...remainingPool.splice(0, remainingNeeded));
  shuffleArray(selected);

  return selected;
}

function rerollHeroPool() {
  if (state.activePhase !== 'character_draft' || state.characterDraft.stepIndex > 0) return;
  state.characterDraft.gridHeroes = generateHeroPool(state.characterDraft.mode);
  shouldAnimateFlip = true;
  saveState();
  renderAll();
  showToast('Сгенерирован новый случайный пул героев!');
}

function getGridSize(roundNum, mode) {
  // В 3-м и 5-м раундах на героя приходится по 3 предмета.
  // Сетка должна вместить все пики и 4 бана, чтобы после банов
  // командам всё ещё хватило карточек на выбор.
  const heroesPerTeam = ({ '1x1': 1, '2x2': 2, '3x3': 3, '4x4': 4 })[mode] || 2;
  if (roundNum === 3 || roundNum === 5) {
    return heroesPerTeam * 2 * 3 + 4;
  }

  if (mode === '1x1') return 8;
  if (mode === '4x4') return 20;
  if (mode === '3x3') return 16;
  return 12;
}

function getRoundHeroItemLimit(roundNum) {
  return (roundNum === 3 || roundNum === 5) ? 3 : 2;
}

function buildItemDraftSequence(roundNum, mode) {
  const startTeam = (roundNum % 2 === 1) ? 1 : 2;
  const otherTeam = (startTeam === 1) ? 2 : 1;
  let seq = [];
  let step = 1;

  seq.push({ step: step++, team: startTeam, type: 'ban' });
  seq.push({ step: step++, team: otherTeam, type: 'ban' });
  seq.push({ step: step++, team: startTeam, type: 'ban' });
  seq.push({ step: step++, team: otherTeam, type: 'ban' });

  const heroesPerTeam = {
    '1x1': 1,
    '2x2': 2,
    '3x3': 3,
    '4x4': 4
}[mode] || 2;

  const itemsPerHeroThisRound = getRoundHeroItemLimit(roundNum);
  const totalPicks = heroesPerTeam * itemsPerHeroThisRound * 2;

  for (let i = 0; i < totalPicks; i++) {
    let teamToPick;
    if (i === 0) teamToPick = startTeam;
    else {
      const mod = (i - 1) % 4;
      teamToPick = (mod === 0 || mod === 1) ? otherTeam : startTeam;
    }
    seq.push({ step: step++, team: teamToPick, type: 'pick' });
  }
  return seq;
}

/* ==========================================================================
   ГЕНЕРАЦИЯ СЕТКИ ПРЕДМЕТОВ ДЛЯ РАУНДА
   ========================================================================== */
function generateGridForRound(roundNum, mode, usedIdsArray) {
  const targetSize = getGridSize(roundNum, mode);
  const rule = TIER_PROGRESSION_RULES[roundNum] || TIER_PROGRESSION_RULES[5];
  const usedSet = new Set(usedIdsArray);

  const allDraftedHeroes = [...(state.series.heroes.team1 || []), ...(state.series.heroes.team2 || [])];
  const anyHeroHasCharges = allDraftedHeroes.some(h => h.has_ability_charges);

  let targetStreetBrawlCount = 0;

  if (roundNum === 3) {
    targetStreetBrawlCount = 2;
  } else if (roundNum === 4) {
    targetStreetBrawlCount = 0;
  } else if (roundNum === 5) {
    const unequippedCount = allDraftedHeroes.filter(h => !h.items.some(i => isStreetBrawlItem(i))).length;
    targetStreetBrawlCount = unequippedCount;
  }

  let selectedBrawlItems = [];
  if (targetStreetBrawlCount > 0) {
    let availableBrawl = itemsCatalog.filter(i => isStreetBrawlItem(i) && !usedSet.has(i.id));
    if (availableBrawl.length < targetStreetBrawlCount) {
      availableBrawl = itemsCatalog.filter(i => isStreetBrawlItem(i));
    }
    shuffleArray(availableBrawl);
    selectedBrawlItems = availableBrawl.slice(0, targetStreetBrawlCount);
  }

  const regularNeededSize = targetSize - selectedBrawlItems.length;
  const regularAvailableByTier = {};

  rule.unlockedTiers.forEach(t => {
    regularAvailableByTier[t] = itemsCatalog.filter(i => {
      if (i.tier !== t || usedSet.has(i.id)) return false;
      if (isStreetBrawlItem(i)) return false;
      if (!anyHeroHasCharges && i.requires_ability_charges) return false;
      return true;
    });
  });

  const quotas = {};
  let allocated = 0;
  const remainders = [];

  rule.unlockedTiers.forEach(t => {
    const floatVal = regularNeededSize * (rule.percentages[t] || 0);
    const floorVal = Math.floor(floatVal);
    quotas[t] = floorVal;
    allocated += floorVal;
    remainders.push({ tier: t, rem: floatVal - floorVal });
  });

  remainders.sort((a, b) => b.rem - a.rem);
  let diff = regularNeededSize - allocated;
  for (let i = 0; i < diff; i++) {
    quotas[remainders[i % remainders.length].tier]++;
  }

  let selectedRegular = [];
  rule.unlockedTiers.forEach(t => {
    const pool = [...regularAvailableByTier[t]];
    shuffleArray(pool);
    const take = Math.min(quotas[t], pool.length);
    selectedRegular.push(...pool.splice(0, take));
    regularAvailableByTier[t] = pool;
  });

  if (selectedRegular.length < regularNeededSize) {
    let leftoverPool = [];
    rule.unlockedTiers.forEach(t => leftoverPool.push(...regularAvailableByTier[t]));
    shuffleArray(leftoverPool);
    const deficit = regularNeededSize - selectedRegular.length;
    selectedRegular.push(...leftoverPool.slice(0, deficit));
  }

  const finalGrid = [...selectedBrawlItems, ...selectedRegular];
  shuffleArray(finalGrid);
  return finalGrid;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* ==========================================================================
   СИСТЕМА ЗАЩИТЫ ОТ ТУПИКА ДРАФТА (DEADLOCK PREVENTION & REROLL)
   ========================================================================== */
function rerollGridItem(oldItemId, reason = "тупик драфта") {
  const itemIndex = state.roundState.gridItems.findIndex(i => i.id === oldItemId);
  if (itemIndex === -1) return null;
  const oldItem = state.roundState.gridItems[itemIndex];

  const rule = TIER_PROGRESSION_RULES[state.series.round] || TIER_PROGRESSION_RULES[5];
  const usedSet = new Set(state.series.usedItemIds);
  const currentGridSet = new Set(state.roundState.gridItems.map(i => i.id));

  const allMatchHeroes = [...state.series.heroes.team1, ...state.series.heroes.team2];
  const anyHeroHasCharges = allMatchHeroes.some(h => h.has_ability_charges);

  let eligibleHeroesForCurrentTurn = [];
  let currentTeamNum = null;
  if (state.roundState.sequence && state.roundState.stepIndex < state.roundState.sequence.length) {
    const currentTurn = state.roundState.sequence[state.roundState.stepIndex];
    if (currentTurn && currentTurn.type === 'pick') {
      currentTeamNum = currentTurn.team;
      const roundLimit = getRoundHeroItemLimit(state.series.round);
      const teamHeroes = state.series.heroes[`team${currentTurn.team}`] || [];
      eligibleHeroesForCurrentTurn = teamHeroes.filter(h => h.items.filter(i => i.round === state.series.round).length < roundLimit);
    }
  }

  let candidatePool = itemsCatalog.filter(i => {
    if (i.id === oldItemId || isStreetBrawlItem(i)) return false;
    if (usedSet.has(i.id) || currentGridSet.has(i.id)) return false;
    if (i.tier !== oldItem.tier) return false;
    if (!rule.unlockedTiers.includes(i.tier)) return false;
    if (!anyHeroHasCharges && i.requires_ability_charges) return false;
    return true;
  });

  if (eligibleHeroesForCurrentTurn.length > 0) {
    const compatibleCandidates = candidatePool.filter(it => 
      eligibleHeroesForCurrentTurn.some(h => checkItemHeroCompatibility(h, it, currentTeamNum).compatible)
    );
    if (compatibleCandidates.length > 0) {
      candidatePool = compatibleCandidates;
    }
  }

  if (candidatePool.length === 0) {
    candidatePool = itemsCatalog.filter(i => {
      if (i.id === oldItemId || isStreetBrawlItem(i)) return false;
      if (usedSet.has(i.id) || currentGridSet.has(i.id)) return false;
      if (!rule.unlockedTiers.includes(i.tier)) return false;
      if (!anyHeroHasCharges && i.requires_ability_charges) return false;
      return true;
    });

    if (eligibleHeroesForCurrentTurn.length > 0) {
      const compatibleCandidates = candidatePool.filter(it => 
        eligibleHeroesForCurrentTurn.some(h => checkItemHeroCompatibility(h, it, currentTeamNum).compatible)
      );
      if (compatibleCandidates.length > 0) {
        candidatePool = compatibleCandidates;
      }
    }
  }

  if (candidatePool.length === 0) {
    candidatePool = itemsCatalog.filter(i => !isStreetBrawlItem(i) && rule.unlockedTiers.includes(i.tier) && !usedSet.has(i.id) && !currentGridSet.has(i.id));
  }

  if (candidatePool.length === 0) {
    showToast('Не удалось найти предмет для замены в каталоге!');
    return null;
  }

  shuffleArray(candidatePool);
  const newItem = candidatePool[0];

  state.roundState.gridItems[itemIndex] = newItem;

  state.actionStack.push({
    phase: 'item_draft',
    type: 'ITEM_REROLL',
    oldItem: oldItem,
    newItem: newItem,
    itemIndex: itemIndex
  });

  showToast(`🎲 Реролл: «${oldItem.name}» заменён на «${newItem.name}» (${reason})`);
  saveState();
  renderAll();
  return newItem;
}

function getTeamRerollLimit(teamNum) {
  return (state.series.heroes[`team${teamNum}`] || []).length;
}

function getTeamRerollsRemaining(teamNum) {
  if (!state.roundState.rerollsUsed) state.roundState.rerollsUsed = { team1: 0, team2: 0 };
  return Math.max(0, getTeamRerollLimit(teamNum) - (state.roundState.rerollsUsed[`team${teamNum}`] || 0));
}

function canManuallyRerollItem(item) {
  if (rerollInProgress) return false;
  // Легендарные предметы с пометкой Street Brawl нельзя рероллить.
  if (!item || isStreetBrawlItem(item) || state.activePhase !== 'item_draft' || state.roundState.roundFinished || state.series.seriesWinner) return false;
  if (state.roundState.stepIndex >= state.roundState.sequence.length) return false;
  const turn = state.roundState.sequence[state.roundState.stepIndex];
  if (!turn || turn.type !== 'pick' || getTeamRerollsRemaining(turn.team) <= 0) return false;
  if (getItemRoundStatus(item.id)) return false;
  if (!state.roundState.rerolledGridItemIds) state.roundState.rerolledGridItemIds = [];
          if (!state.series.scouting) state.series.scouting = { team1: 0, team2: 0 };
          if (!state.roundState.revealedItems) state.roundState.revealedItems = {};
          if (state.series.scouting.team1 === 0 && state.series.scouting.team2 === 0 && state.series.round === 1) { state.series.scouting.team1 = getTeamSize(1) * 3; state.series.scouting.team2 = getTeamSize(2) * 3; }
  return !state.roundState.rerolledGridItemIds.includes(item.id);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function manuallyRerollGridItem(itemId, cardElement) {
  const itemIndex = state.roundState.gridItems.findIndex(i => i.id === itemId);
  if (itemIndex < 0) return;
  const oldItem = state.roundState.gridItems[itemIndex];
  if (!canManuallyRerollItem(oldItem)) {
    showToast('Реролл сейчас недоступен или лимит команды исчерпан.');
    return;
  }

  const turn = state.roundState.sequence[state.roundState.stepIndex];
  const teamKey = `team${turn.team}`;
  const rule = TIER_PROGRESSION_RULES[state.series.round] || TIER_PROGRESSION_RULES[5];
  const usedSet = new Set(state.series.usedItemIds || []);
  const gridSet = new Set(state.roundState.gridItems.map(i => i.id));
  const allHeroes = [...(state.series.heroes.team1 || []), ...(state.series.heroes.team2 || [])];
  const anyHeroHasCharges = allHeroes.some(h => h.has_ability_charges);
  const teamHeroes = state.series.heroes[teamKey] || [];
  const roundLimit = getRoundHeroItemLimit(state.series.round);
  const eligibleHeroes = teamHeroes.filter(h => (h.items || []).filter(i => i.round === state.series.round).length < roundLimit);

  let candidates = itemsCatalog.filter(candidate => {
    if (
        candidate.id === oldItem.id ||
        candidate.is_street_brawl === true ||
        STREET_BRAWL_ITEM_IDS.has(candidate.id) ||
        candidate.tier !== oldItem.tier
    ) return false;
    if (usedSet.has(candidate.id)) return false;
    if (gridSet.has(candidate.id)) return false;
    if (!rule.unlockedTiers.includes(candidate.tier)) return false;
    if (!anyHeroHasCharges && candidate.requires_ability_charges) return false;
    return true;
  });

  // Prefer candidates that at least one currently eligible hero can receive.
  const compatible = candidates.filter(candidate => eligibleHeroes.some(hero => checkItemHeroCompatibility(hero, candidate, turn.team).compatible));
  if (compatible.length) candidates = compatible;
  if (!candidates.length) {
    showToast(`Нет доступных предметов T${oldItem.tier} для реролла.`);
    return;
  }

  shuffleArray(candidates);
  const newItem = candidates[0];
  const previousUsed = state.roundState.rerollsUsed ? { ...state.roundState.rerollsUsed } : { team1: 0, team2: 0 };
  const previousRerolledIds = [...(state.roundState.rerolledGridItemIds || [])];

  // Close the card first, then replace the item and reveal the new card.
  rerollInProgress = true;
  if (cardElement) {
    cardElement.classList.add('item-reroll-closing');
    const button = cardElement.querySelector('.item-reroll-btn');
    if (button) button.disabled = true;
  }
  await sleep(320);

  // Revalidate after the animation in case state changed while waiting.
  if (state.roundState.gridItems[itemIndex]?.id !== oldItem.id || state.roundState.roundFinished || state.series.seriesWinner) {
    rerollInProgress = false;
    renderAll();
    return;
  }

  state.roundState.gridItems[itemIndex] = newItem;
  if (!state.roundState.rerollsUsed) state.roundState.rerollsUsed = { team1: 0, team2: 0 };
  state.roundState.rerollsUsed[teamKey] = (state.roundState.rerollsUsed[teamKey] || 0) + 1;
  if (!state.roundState.rerolledGridItemIds) state.roundState.rerolledGridItemIds = [];
          if (!state.series.scouting) state.series.scouting = { team1: 0, team2: 0 };
          if (!state.roundState.revealedItems) state.roundState.revealedItems = {};
          if (state.series.scouting.team1 === 0 && state.series.scouting.team2 === 0 && state.series.round === 1) { state.series.scouting.team1 = getTeamSize(1) * 3; state.series.scouting.team2 = getTeamSize(2) * 3; }
  // Mark the replacement too, preventing a chain of rerolls on the same card slot.
  state.roundState.rerolledGridItemIds.push(newItem.id);

  state.actionStack.push({
    phase: 'item_draft', type: 'MANUAL_ITEM_REROLL', oldItem, newItem, itemIndex,
    team: turn.team, previousUsed, previousRerolledIds
  });
  showToast(`🎲 Команда ${turn.team}: ${oldItem.name} заменён на ${newItem.name} (T${newItem.tier})`);
  saveState();
  rerollInProgress = false;
  renderAll();
  const newCard = [...document.querySelectorAll('.item-card')].find(el => el.dataset.itemId === newItem.id);
  if (newCard) {
    newCard.classList.add('item-reroll-opening');
    setTimeout(() => newCard.classList.remove('item-reroll-opening'), 700);
  }
}

function checkAndAutoRerollDeadlocks() {
  if (state.activePhase !== 'item_draft') return false;
  if (state.roundState.roundFinished || state.series.seriesWinner) return false;
  if (state.roundState.stepIndex >= state.roundState.sequence.length) return false;

  const currentTurn = state.roundState.sequence[state.roundState.stepIndex];
  if (currentTurn.type !== 'pick') return false;

  const roundLimit = getRoundHeroItemLimit(state.series.round);
  const teamHeroes = state.series.heroes[`team${currentTurn.team}`] || [];
  const eligibleHeroes = teamHeroes.filter(h => h.items.filter(i => i.round === state.series.round).length < roundLimit);

  if (eligibleHeroes.length === 0) return false;

  const remainingItems = state.roundState.gridItems.filter(item => !getItemRoundStatus(item.id));
  if (remainingItems.length === 0) return false;

  if (remainingItems.length === 1) {
    const lastItem = remainingItems[0];
    const canTake = eligibleHeroes.some(h => checkItemHeroCompatibility(h, lastItem, currentTurn.team).compatible);
    if (!canTake) {
      rerollGridItem(lastItem.id, "тупик: предмет не подходит команде");
      return true;
    }
  }

  const canTakeAny = remainingItems.some(item => eligibleHeroes.some(h => checkItemHeroCompatibility(h, item, currentTurn.team).compatible));
  if (!canTakeAny) {
    rerollGridItem(remainingItems[0].id, "тупик драфта: нет доступных предметов");
    return true;
  }

  return false;
}

async function rerollPendingPick() {
  if (!pendingPickItem) return;
  const { item, turn } = pendingPickItem;
  if (!canManuallyRerollItem(item)) {
    showToast(isStreetBrawlItem(item) ? 'Street Brawl нельзя рероллить.' : 'Реролл недоступен или лимит команды исчерпан.');
    return;
  }
  const index = state.roundState.gridItems.findIndex(i => i.id === item.id);
  if (index < 0) return;
  const oldId = item.id;
  // Закрываем окно только на время анимации замены; ход не продвигается.
  closeHeroModal(true);
  await manuallyRerollGridItem(oldId, null);
  const replacement = state.roundState.gridItems[index];
  if (replacement && replacement.id !== oldId) {
    openHeroItemModal(replacement, turn);
  }
}

function rerollFromModal(itemId) {
  closeHeroModal(true);
  rerollGridItem(itemId, "тупик драфта");
}

/* ==========================================================================
   УПРАВЛЕНИЕ МАТЧЕМ И РАУНДАМИ
   ========================================================================== */
function selectMatchMode(mode) {
  const charSeq = buildCharacterDraftSequence(mode);
  const heroPool = generateHeroPool(mode);

  state = {
    activePhase: 'character_draft',
    characterDraft: {
      mode: mode,
      stepIndex: 0,
      gridHeroes: heroPool,
      bans: { team1: [], team2: [] },
      picks: { team1: [], team2: [] },
      completed: false,
      history: [],
      sequence: charSeq
    },
    series: {
      mode: mode,
      round: 1,
      score: { team1: 0, team2: 0 },
      seriesWinner: null,
      usedItemIds: [],
      heroes: { team1: [], team2: [] },
      bans: { team1: [], team2: [] },
      history: []
    },
    roundState: {
      gridItems: [],
      stepIndex: 0,
      roundFinished: false,
      roundWinner: null,
      roundBans: { team1: [], team2: [] },
      rerollsUsed: { team1: 0, team2: 0 },
      rerolledGridItemIds: [],
      sequence: []
    },
    actionStack: []
  };

  shouldAnimateFlip = true;
  document.getElementById('modeModal').style.display = 'none';
  saveState();
  renderAll();
  showToast(`Начат случайный драфт персонажей (${mode})`);
}

function applyInitialPublicReveals(grid, mode) {
  // В начале раунда у 60–70% карточек открыта одна характеристика: тир ИЛИ тип.
  // Street Brawl не участвует в разведке; тиры и типы распределяются примерно поровну.
  const eligible = grid.filter(item => !isStreetBrawlItem(item));
  const targetCount = Math.min(eligible.length, Math.round(eligible.length * 0.65));
  const tierCount = Math.ceil(targetCount / 2);
  const categoryCount = targetCount - tierCount;
  shuffleArray(eligible);
  const revealed = {};
  eligible.slice(0, tierCount).forEach(item => {
    revealed[item.id] = { tier: true, category: false, initial: true };
  });
  eligible.slice(tierCount, tierCount + categoryCount).forEach(item => {
    revealed[item.id] = { tier: false, category: true, initial: true };
  });
  return revealed;
}

function initItemRound(roundNum) {
  try {
    if (!state.series.scouting || (state.series.scouting.team1 === 0 && state.series.scouting.team2 === 0 && roundNum === 1)) state.series.scouting = { team1: getTeamSize(1) * 3, team2: getTeamSize(2) * 3 };
    const grid = generateGridForRound(roundNum, state.series.mode, state.series.usedItemIds);
    const seq = buildItemDraftSequence(roundNum, state.series.mode);

    state.roundState = {
      gridItems: grid,
      stepIndex: 0,
      roundFinished: false,
      roundWinner: null,
      roundBans: { team1: [], team2: [] },
      rerollsUsed: { team1: 0, team2: 0 },
      rerolledGridItemIds: [],
      revealedItems: applyInitialPublicReveals(grid, state.series.mode),
      sequence: seq
    };
    shouldAnimateFlip = true;
    checkAndAutoRerollDeadlocks();
  } catch (err) { alert(err.message); }
}

function getHeroStatus(heroId) {
  const cd = state.characterDraft;
  if (cd.picks.team1.some(h => h.id === heroId)) return { status: 'picked', team: 1 };
  if (cd.picks.team2.some(h => h.id === heroId)) return { status: 'picked', team: 2 };
  return null;
}

function handleHeroCardClick(hero) {
  if (state.characterDraft.completed || state.characterDraft.stepIndex >= state.characterDraft.sequence.length) return;
  if (getHeroStatus(hero.id)) return;
  const currentTurn = state.characterDraft.sequence[state.characterDraft.stepIndex];
  if (!currentTurn || currentTurn.type !== 'pick') return;

  state.characterDraft.picks[`team${currentTurn.team}`].push(hero);
  state.characterDraft.history.unshift({ step: currentTurn.step, team: currentTurn.team, type: 'pick', hero });
  state.actionStack.push({ phase: 'character_draft', type: 'HERO_PICK', hero, turn: currentTurn });
  state.characterDraft.stepIndex++;
  if (state.characterDraft.stepIndex >= state.characterDraft.sequence.length) {
    state.characterDraft.completed = true;
    showToast('Драфт героев завершён!');
  }
  saveState();
  renderAll();
}

function proceedToItemDraft() {
  if (!state.characterDraft.completed) return;

  const p1 = state.characterDraft.picks.team1;
  const p2 = state.characterDraft.picks.team2;

  state.series.heroes.team1 = p1.map((h, i) => ({
    id: `t1_h${i + 1}`,
    heroId: h.id,
    name: h.name,
    role: h.role,
    image: h.image,
    has_ability_charges: h.has_ability_charges,
    items: []
  }));

  state.series.heroes.team2 = p2.map((h, i) => ({
    id: `t2_h${i + 1}`,
    heroId: h.id,
    name: h.name,
    role: h.role,
    image: h.image,
    has_ability_charges: h.has_ability_charges,
    items: []
  }));

  state.actionStack.push({ phase: 'transition', type: 'START_ITEM_DRAFT' });
  state.activePhase = 'item_draft';
  initItemRound(1);

  saveState();
  renderAll();
  showToast('Начат драфт предметов (Раунд 1)');
}

function getConsoleCommandForItem(item, abilitySlot = null) {
  if (!item) return '';
  if (item.requires_ability_slot) {
    const slot = (abilitySlot !== null && abilitySlot !== undefined) ? abilitySlot : 0;
    if (item.console_command_template) {
      return item.console_command_template.replace('{ability_slot}', slot);
    }
    if (item.console_command_base) {
      return `${item.console_command_base} ${slot}`;
    }
    return `${item.console_command || ''} ${slot}`.trim();
  }
  return item.console_command || '';
}

function getItemRoundStatus(itemId) {
  const b1 = state.roundState.roundBans.team1.find(b => b.item.id === itemId);
  if (b1) return { type: 'ban', team: 1 };
  const b2 = state.roundState.roundBans.team2.find(b => b.item.id === itemId);
  if (b2) return { type: 'ban', team: 2 };

  for (let t = 1; t <= 2; t++) {
    const heroes = state.series.heroes[`team${t}`];
    for (let h of heroes) {
      const item = h.items.find(i => i.id === itemId && i.round === state.series.round);
      if (item) return { type: 'pick', team: t, heroName: h.name, abilitySlot: item.abilitySlot };
    }
  }
  return null;
}

/* ==========================================================================
   ОБРАБОТКА КЛИКА ПО ПРЕДМЕТУ (БАН И ПИК)
   ========================================================================== */
function handleItemCardClick(item) {
  if (state.roundState.roundFinished || state.series.seriesWinner) return;
  if (state.roundState.stepIndex >= state.roundState.sequence.length) return;
  if (getItemRoundStatus(item.id)) return;

  const currentTurn = state.roundState.sequence[state.roundState.stepIndex];

  if (currentTurn.type === 'ban') {
    if (item.is_street_brawl) {
      showToast('🚫 Легендарные предметы Street Brawl нельзя банить!');
      return;
    }
    executeItemBan(item, currentTurn);
  } else {
    if (item.is_street_brawl && state.series.round === 3) {
      const teamHeroes = state.series.heroes[`team${currentTurn.team}`] || [];
      const teamAlreadyTookBrawl = teamHeroes.some(h => h.items.some(i => isStreetBrawlItem(i) && i.round === 3));
      if (teamAlreadyTookBrawl) {
        showToast('🚫 Ваша команда уже взяла 1 легендарный предмет в этом раунде!');
        return;
      }
    }
    openHeroItemModal(item, currentTurn);
  }
}

function executeItemBan(item, turn) {
  if (item.is_street_brawl) {
    showToast('🚫 Легендарные предметы Street Brawl нельзя банить!');
    return;
  }

  state.series.usedItemIds.push(item.id);
  const banRecord = { item, team: turn.team, round: state.series.round };
  state.series.bans[`team${turn.team}`].push(banRecord);
  state.roundState.roundBans[`team${turn.team}`].push(banRecord);

  state.series.history.unshift({
    round: state.series.round,
    step: turn.step,
    team: turn.team,
    type: 'ban',
    item: item,
    heroName: null
  });

  state.actionStack.push({ phase: 'item_draft', type: 'ITEM_BAN', item, turn });
  state.roundState.stepIndex++;

  checkRoundEnd();
  checkAndAutoRerollDeadlocks();
  saveState();
  renderAll();
}

function openHeroItemModal(item, turn) {
  pendingPickItem = { item, turn };
  selectedHeroForAssignment = null;

  const teamKey = `team${turn.team}`;
  const heroes = state.series.heroes[teamKey];
  const roundLimit = getRoundHeroItemLimit(state.series.round);

  document.getElementById('assignModalTitle').textContent = `Команда ${turn.team}: Пик предмета`;
  document.getElementById('assignModalTitle').style.color = (turn.team === 1) ? 'var(--team1-primary)' : 'var(--team2-primary)';
  document.getElementById('assignModalSub').textContent = 'Выберите героя, который получит этот предмет:';
  document.getElementById('assignItemImg').src = item.image;
  document.getElementById('assignItemName').textContent = item.name;
  document.getElementById('assignItemMeta').textContent = `Tier ${item.tier} • ${CATEGORY_NAMES[item.category] || item.category}${item.is_active ? ' • АКТИВНЫЙ' : ''}`;
  
  const tag = document.getElementById('assignItemTag');
  tag.style.display = item.requires_ability_slot ? 'inline-block' : 'none';

  const brawlTag = document.getElementById('assignItemBrawlTag');
  brawlTag.style.display = item.is_street_brawl ? 'inline-block' : 'none';
  const rerollBtn = document.getElementById('rerollPendingPickBtn');
  if (rerollBtn) {
    const canReroll = canManuallyRerollItem(item);
    rerollBtn.style.display = canReroll ? 'flex' : 'none';
    rerollBtn.disabled = !canReroll;
    rerollBtn.title = 'Заменить раскрытый предмет на случайный предмет того же тира';
    rerollBtn.textContent = `🎲 Зарероллить этот предмет (${getTeamRerollsRemaining(turn.team)} осталось)`;
  }

  const notice = document.getElementById('assignItemUpgradeNotice');
  const upgradesTo = ITEM_UPGRADE_GRAPH[item.id] || [];
  if (upgradesTo.length > 0) {
    const names = upgradesTo.map(id => {
      const f = itemsCatalog.find(x => x.id === id);
      return f ? f.name : id;
    }).join(', ');
    notice.textContent = `▲ Улучшается в: ${names}`;
    notice.style.display = 'block';
  } else {
    notice.style.display = 'none';
  }

  document.getElementById('assignStepHero').style.display = 'block';
  document.getElementById('assignStepAbility').style.display = 'none';

  const listEl = document.getElementById('heroAssignOptions');
  listEl.innerHTML = '';

  let anyHeroCanPickThis = false;

  heroes.forEach(h => {
    const roundItemsCount = h.items.filter(i => i.round === state.series.round).length;
    const isRoundMaxed = roundItemsCount >= roundLimit;

    const compat = checkItemHeroCompatibility(h, item, turn.team);
    const isDisabled = isRoundMaxed || !compat.compatible;

    if (!isDisabled) anyHeroCanPickThis = true;

    let statusText = `В раунде: ${roundItemsCount}/${roundLimit} • Всего: ${h.items.length}/12 • Акт: ${h.items.filter(i => i.is_active).length}/4`;
    if (!compat.compatible) {
      statusText = `<span style="color:#f87171; font-weight:700;">⛔ ${compat.reason}</span>`;
    } else if (isRoundMaxed) {
      statusText = `<span style="color:#fde68a;">Лимит раунда (${roundLimit}/${roundLimit}) исчерпан</span>`;
    } else if (compat.itemToReplace) {
      statusText += `<br><span style="color:#86efac; font-weight:800;">▲ УЛУЧШЕНИЕ: заменит ${compat.itemToReplace.name} (слот не расходуется)</span>`;
    }

    const btn = document.createElement('button');
    btn.className = `hero-pick-btn ${compat.itemToReplace ? 'is-upgrade' : ''}`;
    btn.disabled = isDisabled;
    btn.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; text-align: left;">
        <div class="hero-thumb-box" style="width:36px; height:36px;">
          <span class="hero-thumb-initials" style="font-size:0.75rem;">${h.name.slice(0, 2)}</span>
          <img class="hero-thumb-img" src="${h.image}" alt="" onerror="this.remove()">
        </div>
        <div>
          <div style="font-weight: 800; font-size: 0.95rem;">${h.name}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${statusText}</div>
        </div>
      </div>
      <span style="font-size: 0.8rem; font-weight: 800;">${isDisabled ? '⛔' : (item.requires_ability_slot ? 'ВЫБРАТЬ СЛОТ ➔' : (compat.itemToReplace ? 'УЛУЧШИТЬ ➔' : 'ВЫБРАТЬ ➔'))}</span>
    `;
    btn.onclick = () => onHeroSelected(h.id);
    listEl.appendChild(btn);
  });

  const deadlockWarning = document.getElementById('assignModalDeadlock');
  if (!anyHeroCanPickThis) {
    deadlockWarning.style.display = 'block';
    deadlockWarning.innerHTML = `
      <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 6px; padding: 10px; margin-top: 10px; color: #fca5a5; font-size: 0.8rem; text-align: center;">
        ⚠️ <strong>Тупик драфта:</strong> ни один из доступных героев вашей команды не может экипировать этот предмет. Используйте реролл ниже.
      </div>
    `;
  } else {
    deadlockWarning.style.display = 'none';
    deadlockWarning.innerHTML = '';
  }

  document.getElementById('heroAssignModal').style.display = 'flex';
}

function onHeroSelected(heroId) {
  if (!pendingPickItem) return;
  const { item, turn } = pendingPickItem;
  const teamKey = `team${turn.team}`;
  const hero = state.series.heroes[teamKey].find(h => h.id === heroId);
  if (!hero) return;

  const compat = checkItemHeroCompatibility(hero, item, turn.team);
  if (!compat.compatible) {
    showToast(compat.reason);
    return;
  }

  selectedHeroForAssignment = hero;

  if (item.requires_ability_slot) {
    document.getElementById('assignModalSub').textContent = `Привязка предмета к способности героя:`;
    document.getElementById('assignStepHero').style.display = 'none';
    document.getElementById('assignStepAbility').style.display = 'block';
    document.getElementById('assignSelectedHeroName').textContent = `${hero.name} (К${turn.team})`;

  } else {
    confirmHeroItemPick(hero.id, null);
  }
}

function selectAbilitySlot(slotIndex) {
  if (!selectedHeroForAssignment) return;

  const item = pendingPickItem?.item;

  // Echo Shard и Omnicharge Signet нельзя назначать на ультимейт
  const restrictedItems = ['echo_shard', 'omnicharge_signet'];

  if (restrictedItems.includes(item?.id) && slotIndex === 3) {
    showToast('Этот предмет нельзя назначить на ультимейт!');
    return;
  }

  confirmHeroItemPick(selectedHeroForAssignment.id, slotIndex);
}

function backToHeroStep() {
  document.getElementById('assignModalSub').textContent = 'Выберите героя, который получит этот предмет:';
  document.getElementById('assignStepHero').style.display = 'block';
  document.getElementById('assignStepAbility').style.display = 'none';
  selectedHeroForAssignment = null;
}

function closeHeroModal(force = false) {
  // После выбора предмета окно нельзя закрыть, чтобы отказаться от пика.
  // Закрытие разрешено только после успешного выбора или при автоперебросе из тупика.
  if (pendingPickItem && !force) {
    showToast('Предмет уже выбран — назначьте его герою, чтобы продолжить драфт.');
    return;
  }
  pendingPickItem = null;
  selectedHeroForAssignment = null;
  document.getElementById('heroAssignModal').style.display = 'none';
}

function confirmHeroItemPick(heroId, abilitySlot = null) {
  if (!pendingPickItem) return;
  const { item, turn } = pendingPickItem;
  const teamKey = `team${turn.team}`;
  const hero = state.series.heroes[teamKey].find(h => h.id === heroId);
  if (!hero) return;

  const compat = checkItemHeroCompatibility(hero, item, turn.team);
  if (!compat.compatible) {
    showToast(compat.reason);
    return;
  }

  const itemToReplace = compat.itemToReplace || null;
  const consoleCmd = getConsoleCommandForItem(item, abilitySlot);

  state.series.usedItemIds.push(item.id);

  if (itemToReplace) {
    hero.items = hero.items.filter(i => i.id !== itemToReplace.id);
  }

  const assignedItemData = {
    ...item,
    round: state.series.round,
    abilitySlot: abilitySlot,
    consoleCommand: consoleCmd,
    replacedItem: itemToReplace ? { ...itemToReplace } : null
  };

  hero.items.push(assignedItemData);

  state.series.history.unshift({
    round: state.series.round,
    step: turn.step,
    team: turn.team,
    type: 'pick',
    item: item,
    heroName: hero.name,
    abilitySlot: abilitySlot,
    upgradedFrom: itemToReplace ? itemToReplace.name : null
  });

  state.actionStack.push({
    phase: 'item_draft',
    type: 'ITEM_PICK',
    item,
    turn,
    heroId,
    teamKey,
    abilitySlot,
    replacedItem: itemToReplace ? { ...itemToReplace } : null
  });

  state.roundState.stepIndex++;

  closeHeroModal(true);
  checkRoundEnd();
  checkAndAutoRerollDeadlocks();
  saveState();
  renderAll();
}

function checkRoundEnd() {
  if (state.roundState.stepIndex >= state.roundState.sequence.length) {
    state.roundState.roundFinished = true;
  }
}

function getHeroEquippedItemsAtRound(hero, targetRound) {
  let activeItems = [];
  for (const item of (hero.items || [])) {
    if (item.round <= targetRound) {
      activeItems.push(item);
    } else if (item.replacedItem && item.replacedItem.round <= targetRound) {
      activeItems.push(item.replacedItem);
    }
  }
  return activeItems;
}

function generateConsoleCommandsText(targetRound = null) {
  let lines = [];
  lines.push('// ===================================================');
  lines.push('// DEADLOCK RANDOM DRAFT BO5 — НАКОПИТЕЛЬНЫЕ КОМАНДЫ');
  lines.push('// Команды включают уровень/золото, предметы драфта и Street Brawl');
  lines.push('// ===================================================\n');

  let totalCommandsCount = 0;
  const maxRound = state.series.round;
  const startRound = (targetRound !== null) ? targetRound : 1;
  const endRound = (targetRound !== null) ? targetRound : maxRound;

  for (let r = startRound; r <= endRound; r++) {
    let roundHasCommands = false;
    let roundLines = [];
    roundLines.push(`// ==================== РАУНД ${r} ====================`);

    const goldCmd = ROUND_LEVELUP_GOLD[r] || 'givelevelupgold 36';

    for (let t = 1; t <= 2; t++) {
      const teamKey = `team${t}`;
      const teamName = (t === 1) ? 'The hidden king' : 'The archmother';
      const heroes = state.series.heroes[teamKey] || [];

      for (let h of heroes) {
        const heroItemsAtRound = getHeroEquippedItemsAtRound(h, r);
        if (heroItemsAtRound.length > 0) {
          const itemCmds = [];
          const itemDescriptions = [];

          for (let it of heroItemsAtRound) {
            const cmd = getConsoleCommandForItem(it, it.abilitySlot);
            if (cmd) {
              itemCmds.push(cmd);
              const slotLabel = (it.requires_ability_slot && it.abilitySlot !== null && it.abilitySlot !== undefined)
                ? ` (Сп. ${it.abilitySlot === 3 ? 'Ульт' : it.abilitySlot + 1})`
                : '';
              const sbLabel = it.is_street_brawl ? ' [★SB]' : '';
              itemDescriptions.push(`${it.name}${slotLabel}${sbLabel}`);
              totalCommandsCount++;
            }
          }

          if (itemCmds.length > 0) {
            const singleLineCommand = ['citadel_unlock_flex_slots', goldCmd, ...itemCmds].join('; ');
            roundLines.push(`\n// ${teamName} — ${h.name} (${heroItemsAtRound.length} предм.) [${itemDescriptions.join(', ')}]`);
            roundLines.push(singleLineCommand);
            roundHasCommands = true;
          }
        }
      }
    }

    if (roundHasCommands) {
      lines.push(...roundLines);
      lines.push('');
    }
  }

  if (totalCommandsCount === 0) {
    return { text: '// В выбранном диапазоне ещё нет назначенных предметов.', count: 0 };
  }

  return { text: lines.join('\n'), count: totalCommandsCount };
}

async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {}
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (err) { return false; }
}

async function copyAllCommandsToClipboard() {
  const res = generateConsoleCommandsText(null);
  if (res.count === 0) { showToast('Нет предметов для копирования'); return; }
  const ok = await copyToClipboard(res.text);
  if (ok) showToast(`Скопировано ${res.count} команд серии!`);
  else alert('Не удалось скопировать команды в буфер обмена.');
}

async function copyCurrentRoundCommandsToClipboard() {
  const res = generateConsoleCommandsText(state.series.round);
  if (res.count === 0) { showToast(`В раунде ${state.series.round} нет предметов`); return; }
  const ok = await copyToClipboard(res.text);
  if (ok) showToast(`Скопированы команды раунда ${state.series.round}!`);
  else alert('Не удалось скопировать команды в буфер обмена.');
}

function copyHeroCommandsForRound(teamKey, heroId, roundNum) {
  const hero = (state.series.heroes[teamKey] || []).find(h => h.id === heroId);
  if (!hero) return;

  const activeItems = getHeroEquippedItemsAtRound(hero, roundNum);
  if (activeItems.length === 0) {
    showToast(`У героя ${hero.name} нет предметов в раунде ${roundNum}`);
    return;
  }

  const goldCmd = ROUND_LEVELUP_GOLD[roundNum] || 'givelevelupgold 36';
  const itemCmds = [];
  for (let it of activeItems) {
    const cmd = getConsoleCommandForItem(it, it.abilitySlot);
    if (cmd) itemCmds.push(cmd);
  }

  const singleLine = ['citadel_unlock_flex_slots', goldCmd, ...itemCmds].join('; ');
  copyToClipboard(singleLine).then(ok => {
    if (ok) showToast(`Строка для ${hero.name} (Р${roundNum}, ${activeItems.length} предм.) скопирована!`);
  });
}

function openCommandsModal() {
  const res = generateConsoleCommandsText(null);
  document.getElementById('commandsTextarea').textContent = res.text;
  document.getElementById('commandsModal').style.display = 'flex';
  if (res.count > 0) {
    copyToClipboard(res.text).then(ok => {
      if (ok) showToast(`Команды скопированы в буфер обмена!`);
    });
  }
}

function closeCommandsModal() {
  document.getElementById('commandsModal').style.display = 'none';
}

function declareRoundWinner(winnerTeam) {
  if (!state.roundState.roundFinished || state.roundState.roundWinner) return;

  state.actionStack.push({ phase: 'item_draft', type: 'ROUND_WINNER', winner: winnerTeam });

  state.roundState.roundWinner = winnerTeam;
  if (winnerTeam === 1) state.series.score.team1++;
  else state.series.score.team2++;

  if (state.series.score.team1 >= 3) {
    state.series.seriesWinner = 1;
  } else if (state.series.score.team2 >= 3) {
    state.series.seriesWinner = 2;
  }

  saveState();
  renderAll();

  if (state.series.seriesWinner) {
    showVictoryModal();
  }
}

function advanceToNextRound() {
  if (!state.roundState.roundWinner || state.series.seriesWinner) return;

  state.actionStack.push({
    phase: 'item_draft',
    type: 'NEXT_ROUND',
    prevRound: state.series.round,
    prevRoundState: JSON.parse(JSON.stringify(state.roundState))
  });

  state.series.round++;
  shouldAnimateFlip = true;
  initItemRound(state.series.round);

  saveState();
  renderAll();
  showToast(`Начат Раунд ${state.series.round}`);
}

function undoLastAction() {
  if (state.actionStack.length === 0) {
    showToast('Нет действий для отмены');
    return;
  }

  const last = state.actionStack.pop();

  if (last.phase === 'character_draft') {
    if (last.type === 'HERO_BAN') {
      state.characterDraft.bans[`team${last.turn.team}`].pop();
      state.characterDraft.stepIndex--;
      state.characterDraft.completed = false;
      state.characterDraft.history.shift();
    } else if (last.type === 'HERO_PICK') {
      state.characterDraft.picks[`team${last.turn.team}`].pop();
      state.characterDraft.stepIndex--;
      state.characterDraft.completed = false;
      state.characterDraft.history.shift();
    }
  } 
  else if (last.phase === 'transition') {
    state.activePhase = 'character_draft';
    state.characterDraft.completed = true;
    shouldAnimateFlip = true;
  }
  else if (last.phase === 'item_draft') {
    if (last.type === 'ROUND_WINNER') {
      if (last.winner === 1) state.series.score.team1 = Math.max(0, state.series.score.team1 - 1);
      if (last.winner === 2) state.series.score.team2 = Math.max(0, state.series.score.team2 - 1);
      state.roundState.roundWinner = null;
      state.series.seriesWinner = null;
      document.getElementById('victoryModal').style.display = 'none';
    } else if (last.type === 'ITEM_BAN') {
      state.series.usedItemIds = state.series.usedItemIds.filter(id => id !== last.item.id);
      state.series.bans[`team${last.turn.team}`].pop();
      state.roundState.roundBans[`team${last.turn.team}`].pop();
      state.roundState.stepIndex = Math.max(0, state.roundState.stepIndex - 1);
      state.roundState.roundFinished = false;
      state.series.history.shift();
    } else if (last.type === 'ITEM_PICK') {
      state.series.usedItemIds = state.series.usedItemIds.filter(id => id !== last.item.id);
      const hero = state.series.heroes[last.teamKey].find(h => h.id === last.heroId);
      if (hero) {
        hero.items = hero.items.filter(i => i.id !== last.item.id);
        if (last.replacedItem) hero.items.push(last.replacedItem);
      }
      state.roundState.stepIndex = Math.max(0, state.roundState.stepIndex - 1);
      state.roundState.roundFinished = false;
      state.series.history.shift();
    } else if (last.type === 'ITEM_REROLL') {
      state.roundState.gridItems[last.itemIndex] = last.oldItem;
    } else if (last.type === 'MANUAL_ITEM_REROLL') {
      state.roundState.gridItems[last.itemIndex] = last.oldItem;
      state.roundState.rerollsUsed = last.previousUsed || { team1: 0, team2: 0 };
      state.roundState.rerolledGridItemIds = last.previousRerolledIds || [];
    } else if (last.type === 'SCOUT_REVEAL') {
      state.series.scouting[`team${last.teamNum}`] = last.previousTokens;
      if (last.previousReveal && Object.keys(last.previousReveal).length) state.roundState.revealedItems[last.itemId] = last.previousReveal; else delete state.roundState.revealedItems[last.itemId];
    } else if (last.type === 'NEXT_ROUND') {
      state.series.round = last.prevRound;
      state.roundState = last.prevRoundState;
      shouldAnimateFlip = true;
    }
  }

  saveState();
  renderAll();
  showToast('Действие отменено');
}

function resetCurrentRound() {
  if (state.activePhase !== 'item_draft') return;
  if (!confirm('Сбросить текущий раунд? Все пики и баны текущего раунда вернутся в пул серии, а сетка пересоздастся.')) return;

  const currentRound = state.series.round;

  ['team1', 'team2'].forEach(t => {
    state.series.heroes[t].forEach(h => {
      let restoredItems = [];
      h.items.forEach(i => {
        if (i.round === currentRound) {
          state.series.usedItemIds = state.series.usedItemIds.filter(id => id !== i.id);
          if (i.replacedItem) restoredItems.push(i.replacedItem);
        }
      });
      h.items = h.items.filter(i => i.round !== currentRound).concat(restoredItems);
    });

    state.series.bans[t] = state.series.bans[t].filter(b => {
      if (b.round === currentRound) {
        state.series.usedItemIds = state.series.usedItemIds.filter(id => id !== b.item.id);
        return false;
      }
      return true;
    });
  });

  state.series.history = state.series.history.filter(h => h.round !== currentRound);
  state.actionStack = state.actionStack.filter(a => !(a.phase === 'item_draft' && (a.type === 'ROUND_WINNER' || a.turn?.step)));

  shouldAnimateFlip = true;
  initItemRound(currentRound);
  saveState();
  renderAll();
  showToast(`Раунд ${currentRound} сброшен`);
}

function startNewMatchPrompt() {
  if (!confirm('Начать полностью новую Bo5 серию? Будет открыт выбор режима и драфт персонажей.')) return;
  localStorage.removeItem('deadlock_draft_bo5_state_final');
  document.getElementById('victoryModal').style.display = 'none';
  initFloatingModeBackground();
  document.getElementById('modeModal').style.display = 'flex';
}

/* ==========================================================================
   ОТРИСОВКА ИНТЕРФЕЙСА (RENDER)
   ========================================================================== */
function renderAll() {
  renderHeader();
  renderBanners();
  renderTeamsWithTurnHighlight();
  renderGrid();
  renderHistory();
  renderActionFinishedBar();
}

function renderHeader() {
  document.getElementById('modeBadge').textContent = state.characterDraft.mode.replace('x', ' × ');
  const phaseBadge = document.getElementById('phaseIndicatorBadge');
  const roundBadge = document.getElementById('roundBadge');
  const stepBadge = document.getElementById('stepCounterBadge');
  const resetBtn = document.getElementById('btnResetRound');

  if (state.activePhase === 'character_draft') {
    phaseBadge.textContent = 'Драфт персонажей';
    phaseBadge.style.display = 'inline-block';
    roundBadge.style.display = 'none';
    resetBtn.style.display = 'none';

    const totalSteps = state.characterDraft.sequence.length;
    const currentStep = Math.min(state.characterDraft.stepIndex + 1, totalSteps);
    stepBadge.textContent = state.characterDraft.completed ? 'Драфт завершён' : `Ход ${currentStep} из ${totalSteps}`;
  } else {
    phaseBadge.style.display = 'none';
    roundBadge.style.display = 'inline-block';
    roundBadge.textContent = `Раунд ${state.series.round}`;
    resetBtn.style.display = 'inline-flex';

    const totalSteps = state.roundState.sequence.length || getGridSize(state.series.round, state.series.mode);
    const currentStep = Math.min(state.roundState.stepIndex + 1, totalSteps);

    if (state.series.seriesWinner) {
      stepBadge.textContent = 'Матч окончен';
    } else if (state.roundState.roundFinished) {
      stepBadge.textContent = 'Раунд завершён';
    } else {
      stepBadge.textContent = `Ход ${currentStep} из ${totalSteps}`;
    }
  }
}

function renderBanners() {
  const pBadge = document.getElementById('progressionBadge');
  const pDesc = document.getElementById('progressionDesc');
  const cBadge = document.getElementById('gridCounterBadge');
  const catGroup = document.getElementById('categoryFilterGroup');
  const tierGroup = document.getElementById('tierFilterGroup');
  const btnRerollHero = document.getElementById('btnRerollHeroPool');

  if (state.activePhase === 'character_draft') {
    pBadge.textContent = 'ДРАФТ ПЕРСОНАЖЕЙ';
    const picksCount = ({ '1x1': 2, '2x2': 4, '3x3': 6, '4x4': 8 })[state.characterDraft.mode] || 4;
    pDesc.textContent = `Скрытый драфт героев • ${picksCount} пиков • оставшиеся карточки откроются после формирования команд`;
    
    const totalInPool = state.characterDraft.gridHeroes ? state.characterDraft.gridHeroes.length : heroesCatalog.length;
    const availableInPool = totalInPool - state.characterDraft.picks.team1.length - state.characterDraft.picks.team2.length;
    cBadge.textContent = `Доступно в пуле: ${Math.max(0, availableInPool)} / ${totalInPool}`;

    catGroup.style.display = 'none';
    tierGroup.style.display = 'none';
    btnRerollHero.style.display = 'none';
  } else {
    btnRerollHero.style.display = 'none';
    catGroup.style.display = 'flex';
    tierGroup.style.display = 'flex';

    const rule = TIER_PROGRESSION_RULES[state.series.round] || TIER_PROGRESSION_RULES[5];
    pBadge.textContent = rule.badge;
    pDesc.textContent = rule.desc;

    document.querySelectorAll('#tierFilterGroup .filter-btn[data-tier]').forEach(btn => {
      const tierVal = btn.getAttribute('data-tier');
      if (tierVal === 'all') return;
      const isAvailable = rule.unlockedTiers.includes(parseInt(tierVal));
      btn.style.display = isAvailable ? 'inline-block' : 'none';
      if (!isAvailable && activeTier === tierVal) {
        activeTier = 'all';
        document.querySelector('#tierFilterGroup .filter-btn[data-tier="all"]')?.classList.add('active');
        btn.classList.remove('active');
      }
    });

    const totalRoundItems = getGridSize(state.series.round, state.series.mode);
    let usedCount = 0;
    state.roundState.gridItems.forEach(item => {
      if (getItemRoundStatus(item.id)) usedCount++;
    });
    const remainingItems = totalRoundItems - usedCount;
    cBadge.textContent = `Осталось в сетке: ${remainingItems} / ${totalRoundItems}`;
    const scoutPanel = document.getElementById('scoutingPanel');
    if (scoutPanel) {
      scoutPanel.style.display = 'flex';
      const activeTurn = (!state.roundState.roundFinished && !state.series.seriesWinner) ? state.roundState.sequence[state.roundState.stepIndex] : null;
      const teamOnTurn = activeTurn?.team || 1;
      scoutPanel.innerHTML = `<div class="scouting-team">🔎 Команда 1: <span>${getScoutTokens(1)} жет.</span> <small>(${getTeamSize(1) * 3} на серию)</small></div><div class="scouting-team">🔎 Команда 2: <span>${getScoutTokens(2)} жет.</span> <small>(${getTeamSize(2) * 3} на серию)</small></div><div class="scouting-team">Разведка доступна обеим командам • сейчас ход команды ${teamOnTurn}</div>`;
    }
  }
  if (state.activePhase === 'character_draft') { const scoutPanel = document.getElementById('scoutingPanel'); if (scoutPanel) scoutPanel.style.display = 'none'; }
}

function renderTeamsWithTurnHighlight() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`t1_score_${i}`).className = `score-circle ${i <= state.series.score.team1 ? 'active' : ''}`;
    document.getElementById(`t2_score_${i}`).className = `score-circle ${i <= state.series.score.team2 ? 'active' : ''}`;
  }

  const p1 = document.getElementById('team1Panel');
  const p2 = document.getElementById('team2Panel');
  const b1 = document.getElementById('t1TurnBanner');
  const b2 = document.getElementById('t2TurnBanner');
  const txt1 = document.getElementById('t1TurnText');
  const txt2 = document.getElementById('t2TurnText');

  // Resource counters live inside each team's panel and stay in sync with game state.
  [1, 2].forEach(teamNum => {
    const box = document.getElementById(`t${teamNum}Resources`);
    if (!box) return;
    const rerolls = getTeamRerollsRemaining(teamNum);
    const scouts = getScoutTokens(teamNum);
    box.innerHTML = state.activePhase === 'character_draft' ? '' : `<div class="resource-pill"><span class="resource-label"><span aria-hidden="true">🎲</span> Рероллы</span><span class="resource-value">${rerolls}</span></div><div class="resource-pill"><span class="resource-label"><span aria-hidden="true">🔎</span> Разведка</span><span class="resource-value">${scouts}</span></div>`;
  });

  p1.classList.remove('is-active-turn', 'is-waiting');
  p2.classList.remove('is-active-turn', 'is-waiting');
  b1.className = 'team-turn-banner';
  b2.className = 'team-turn-banner';

  if (state.activePhase === 'character_draft') {
    if (!state.characterDraft.completed) {
      const turn = state.characterDraft.sequence[state.characterDraft.stepIndex];
      if (turn) {
        const isBan = (turn.type === 'ban');
        const actionText = isBan ? `🚫 ${(turn.team === 1) ? 'THE HIDDEN KING' : 'THE ARCHMOTHER'} • БАН ГЕРОЯ` : `🛡️ ${(turn.team === 1) ? 'THE HIDDEN KING' : 'THE ARCHMOTHER'} • ПИК ГЕРОЯ`;

        if (turn.team === 1) {
          p1.classList.add('is-active-turn');
          p2.classList.add('is-waiting');
          b1.classList.add(isBan ? 'action-ban' : 'action-pick');
          txt1.textContent = actionText;
        } else {
          p2.classList.add('is-active-turn');
          p1.classList.add('is-waiting');
          b2.classList.add(isBan ? 'action-ban' : 'action-pick');
          txt2.textContent = actionText;
        }
      }
    }
  } else {
    if (!state.roundState.roundFinished && !state.series.seriesWinner) {
      const turn = state.roundState.sequence[state.roundState.stepIndex];
      if (turn) {
        const isBan = (turn.type === 'ban');
        const actionText = isBan ? `🚫 ${(turn.team === 1) ? 'THE HIDDEN KING' : 'THE ARCHMOTHER'} • БАН ПРЕДМЕТА` : `⚔️ ${(turn.team === 1) ? 'THE HIDDEN KING' : 'THE ARCHMOTHER'} • ПИК ПРЕДМЕТА`;

        if (turn.team === 1) {
          p1.classList.add('is-active-turn');
          p2.classList.add('is-waiting');
          b1.classList.add(isBan ? 'action-ban' : 'action-pick');
          txt1.textContent = actionText;
        } else {
          p2.classList.add('is-active-turn');
          p1.classList.add('is-waiting');
          b2.classList.add(isBan ? 'action-ban' : 'action-pick');
          txt2.textContent = actionText;
        }
      }
    }
  }

  if (state.activePhase === 'character_draft') {
    renderCharacterDraftSidebars();
  } else {
    renderItemDraftSidebars();
  }
}

function renderCharacterDraftSidebars() {
  [1, 2].forEach(team => {
    const resources = document.getElementById(`t${team}Resources`);
    if (resources) resources.style.display = 'none';
    const bans = document.getElementById(`t${team}BansContainer`);
    if (bans) bans.parentElement.style.display = 'none';
  });
  const mode = state.characterDraft.mode;
    const heroLimit = {
    '1x1': 1,
    '2x2': 2,
    '3x3': 3,
    '4x4': 4
}[mode] || 2;

  document.getElementById('t1RosterTitle').textContent = 'Выбранные персонажи';
  document.getElementById('t2RosterTitle').textContent = 'Выбранные персонажи';
  document.getElementById('t1BansTitle').textContent = 'Баны персонажей';
  document.getElementById('t2BansTitle').textContent = 'Баны персонажей';

  document.getElementById('t1RosterCounter').textContent = `${state.characterDraft.picks.team1.length}/${heroLimit}`;
  document.getElementById('t2RosterCounter').textContent = `${state.characterDraft.picks.team2.length}/${heroLimit}`;
  document.getElementById('t1BansCounter').textContent = `${state.characterDraft.bans.team1.length}/2`;
  document.getElementById('t2BansCounter').textContent = `${state.characterDraft.bans.team2.length}/2`;

  renderHeroDraftSlots('t1RosterContainer', state.characterDraft.picks.team1, heroLimit);
  renderHeroDraftSlots('t2RosterContainer', state.characterDraft.picks.team2, heroLimit);

  renderBanSlots('t1BansContainer', state.characterDraft.bans.team1.map(h => ({ item: h })));
  renderBanSlots('t2BansContainer', state.characterDraft.bans.team2.map(h => ({ item: h })));
}

function renderHeroDraftSlots(containerId, picks, limit) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  for (let i = 0; i < limit; i++) {
    const hero = picks[i];
    if (hero) {
      const chargesBadge = hero.has_ability_charges ? `<span style="font-size:0.6rem; color:#fb923c; background:rgba(234,88,12,0.15); padding:1px 4px; border-radius:3px;">⚡ Заряды</span>` : '';
      container.innerHTML += `
        <div class="hero-draft-slot filled">
          <div class="hero-thumb-box">
            <span class="hero-thumb-initials" aria-hidden="true"></span>
            <img class="hero-thumb-img" src="${hero.image}" alt="" onerror="this.remove()">
          </div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="hero-draft-name">${hero.name}</span>
              ${chargesBadge}
            </div>
          </div>
        </div>
      `;
    } else {
      container.innerHTML += `
        <div class="hero-draft-slot empty-label">
          <span>Слот героя #${i + 1}</span>
        </div>
      `;
    }
  }
}

function renderItemDraftSidebars() {
  [1, 2].forEach(team => {
    const resources = document.getElementById(`t${team}Resources`);
    if (resources) resources.style.display = '';
    const bans = document.getElementById(`t${team}BansContainer`);
    if (bans) bans.parentElement.style.display = '';
  });
  document.getElementById('t1RosterTitle').textContent = 'Герои и инвентарь';
  document.getElementById('t2RosterTitle').textContent = 'Герои и инвентарь';
  document.getElementById('t1BansTitle').textContent = 'Баны раунда';
  document.getElementById('t2BansTitle').textContent = 'Баны раунда';

  document.getElementById('t1RosterCounter').textContent = '';
  document.getElementById('t2RosterCounter').textContent = '';
  document.getElementById('t1BansCounter').textContent = `${state.roundState.roundBans.team1.length}/2`;
  document.getElementById('t2BansCounter').textContent = `${state.roundState.roundBans.team2.length}/2`;

  renderHeroTeamColumn('t1RosterContainer', 'team1');
  renderHeroTeamColumn('t2RosterContainer', 'team2');

  renderBanSlots('t1BansContainer', state.roundState.roundBans.team1);
  renderBanSlots('t2BansContainer', state.roundState.roundBans.team2);
}

function renderHeroTeamColumn(containerId, teamKey) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const heroes = state.series.heroes[teamKey];
  const roundLimit = getRoundHeroItemLimit(state.series.round);

  heroes.forEach(h => {
    const roundCount = h.items.filter(i => i.round === state.series.round).length;
    const totalCount = h.items.length;
    const activeCount = h.items.filter(i => i.is_active).length;
    const isRoundFull = roundCount >= roundLimit;

    const chargesTag = h.has_ability_charges ? `<span style="font-size:0.6rem; color:#fb923c;" title="Имеет способности с зарядами">⚡</span>` : '';
    const hasStreetBrawl = h.items.some(i => isStreetBrawlItem(i));
    const sbHeroTag = hasStreetBrawl ? `<span style="font-size:0.6rem; color:#fde68a; background:rgba(245,158,11,0.25); border:1px solid #f59e0b; padding:1px 4px; border-radius:3px; font-weight:800;" title="Имеет легендарный предмет Street Brawl">★ SB</span>` : '';

    const box = document.createElement('div');
    box.className = 'hero-box';
    box.innerHTML = `
      <div class="hero-header">
        <span class="hero-name">
          <div class="hero-thumb-box" style="width:24px; height:24px; border-radius:3px;">
            <span class="hero-thumb-initials" style="font-size:0.6rem;" aria-hidden="true"></span>
            <img class="hero-thumb-img" src="${h.image}" alt="" onerror="this.remove()">
          </div>
          ${h.name} ${chargesTag} ${sbHeroTag}
        </span>
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="hero-count-badge ${isRoundFull ? 'round-maxed' : ''}">Р: ${roundCount}/${roundLimit} • ${totalCount}/12 (Акт: ${activeCount}/4)</span>
          <button class="btn" style="padding: 2px 7px; font-size: 0.65rem;" title="Скопировать накопительную консольную строку для этого героя" onclick="copyHeroCommandsForRound('${teamKey}', '${h.id}', state.series.round)">📋</button>
        </div>
      </div>
      <div class="hero-items-list" id="${h.id}_items"></div>
    `;
    container.appendChild(box);

    const itemsEl = box.querySelector(`#${h.id}_items`);
    if (h.items.length === 0) {
      itemsEl.innerHTML = `<span style="font-size:0.68rem; color:var(--text-dim); grid-column:1/-1; padding:4px 0;">Предметы не назначены</span>`;
    } else {
      h.items.forEach(it => {
        const slotChip = (it.requires_ability_slot && it.abilitySlot !== null && it.abilitySlot !== undefined)
          ? `<span class="ability-slot-chip" title="Слот ${it.abilitySlot}">Сп. ${it.abilitySlot === 3 ? 'Ульт' : it.abilitySlot + 1}</span>`
          : '';
        const activeChip = it.is_active ? `<span class="active-tag-chip">АКТ</span>` : '';
        const upgradeChip = it.replacedItem ? `<span class="upgrade-tag-chip" title="Заменил ${it.replacedItem.name}">▲</span>` : '';
        const brawlChip = it.is_street_brawl ? `<span class="street-brawl-tag-chip" title="Легендарный Street Brawl предмет">★ SB</span>` : '';
        const chipClass = `hero-item-chip ${it.is_street_brawl ? 'is-street-brawl-chip' : ''}`;

        itemsEl.innerHTML += `
          <div class="${chipClass}" title="${it.name} (Р${it.round})${it.is_street_brawl ? ' [Street Brawl]' : ''}" onclick="quickCopySingleItemCommand('${it.id}', ${it.abilitySlot})">
            <img class="hero-item-thumb" src="${it.image}" onerror="this.style.display='none';">
            <div class="hero-item-info">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:2px;">
                <span class="hero-item-name">${it.name}</span>
                <div style="display:flex; gap:2px;">${upgradeChip}${brawlChip}</div>
              </div>
              <div class="hero-item-round">
                <span class="card-tier-text tier-text-${it.tier}">T${it.tier}</span>
                <span>• Р${it.round}</span>
                ${slotChip}
                ${activeChip}
              </div>
            </div>
          </div>
        `;
      });
    }
  });
}

function quickCopySingleItemCommand(itemId, slot) {
  const it = itemsCatalog.find(i => i.id === itemId);
  if (!it) return;
  const cmd = getConsoleCommandForItem(it, slot);
  if (cmd) {
    copyToClipboard(cmd).then(ok => {
      if (ok) showToast(`Скопировано: ${cmd}`);
    });
  }
}

function renderBanSlots(containerId, bans) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  for (let i = 0; i < 2; i++) {
    const ban = bans[i];
    if (ban) {
      const item = ban.item;
      const subText = item.tier ? `T${item.tier}` : (item.role || '');
      el.innerHTML += `
        <div class="ban-slot filled">
          <div class="ban-thumb">
            <span class="ban-initials">${item.name.slice(0, 2)}</span>
            <img src="${item.image}" alt="" onerror="this.remove()">
          </div>
          <div class="ban-info">
            <span class="ban-name" title="${item.name}">${item.name}</span>
            <span class="ban-sub" title="${subText}">${item.tier ? `<span class="tier-badge tier-${item.tier}" style="font-size:0.6rem; padding:0px 4px;">T${item.tier}</span>` : subText}</span>
          </div>
        </div>
      `;
    } else {
      el.innerHTML += `
        <div class="ban-slot empty-label">
          <span>Бан #${i + 1}</span>
        </div>
      `;
    }
  }
}

function renderGrid() {
  const grid = document.getElementById('itemsGrid');
  grid.innerHTML = '';

  if (state.activePhase === 'character_draft') {
    renderHeroGrid(grid);
  } else {
    renderItemGrid(grid);
  }
}

function renderHeroGrid(grid) {
  const cols = (state.characterDraft.mode === '3x3' || state.characterDraft.mode === '4x4') ? 5 : 4;
  grid.style.setProperty('--grid-cols', cols);
  const pool = (state.characterDraft.gridHeroes && state.characterDraft.gridHeroes.length > 0)
    ? state.characterDraft.gridHeroes : heroesCatalog;
  const query = (searchQuery || '').toLocaleLowerCase('ru');
  const heroes = pool.filter(h => {
    const status = getHeroStatus(h.id);
    // Пока драфт не завершён, поиск не должен раскрывать скрытые имена.
    return !query || ((status || state.characterDraft.completed) && h.name.toLocaleLowerCase('ru').includes(query));
  });
  const delayIndices = heroes.map((_, i) => i);
  shuffleArray(delayIndices);
  heroes.forEach((hero, index) => {
    const card = document.createElement('div');
    const status = getHeroStatus(hero.id);
    const picked = Boolean(status && status.status === 'picked');
    // Выбранные герои раскрываются сразу, все остальные — только после формирования обеих команд.
    const revealed = picked || state.characterDraft.completed;
    const flipClass = shouldAnimateFlip ? 'flip-entrance' : '';
    const flipDelay = (delayIndices[index] * 0.04).toFixed(3);
    const usedClasses = picked ? `used picked-team${status.team}` : '';
    const badgeHtml = picked ? `<div class="card-status-badge pick-badge team${status.team}"><span class="status-badge-text">ВЫБРАН</span><span class="status-badge-sub">Команда ${status.team}</span></div>` : '';
    card.className = `item-card category-Hero hero-role-hidden-card ${revealed ? 'hero-card-revealed' : 'hero-card-hidden'} ${usedClasses} ${flipClass} ${state.characterDraft.completed ? 'draft-finished' : ''}`;
    card.style.setProperty('--flip-delay', `${flipDelay}s`);
    card.innerHTML = revealed ? `
      <div class="card-thumb-wrap">
        <div class="card-badges-wrap"></div>
        <span class="hero-thumb-initials" aria-hidden="true"></span>
        <img class="card-img" src="${hero.image}" alt="" loading="lazy" onerror="this.remove()">
        ${badgeHtml}
      </div>
      <div class="card-name" title="${hero.name}">${hero.name}</div>
    ` : `
      <div class="card-thumb-wrap hero-card-back" aria-label="Скрытый герой">
        <div class="hero-card-back-mark" aria-hidden="true">?</div>
      </div>
      <div class="card-name hero-card-back-label">Скрытый герой</div>
    `;
    const turn = (!state.characterDraft.completed) ? state.characterDraft.sequence[state.characterDraft.stepIndex] : null;
    card.dataset.actionHint = picked ? `ВЫБРАН • КОМАНДА ${status.team}`
      : state.characterDraft.completed ? 'ДРАФТ ЗАВЕРШЁН'
      : turn ? `ВЫБРАТЬ • ${turn.team === 1 ? 'THE HIDDEN KING' : 'THE ARCHMOTHER'}` : 'НЕТ АКТИВНОГО ХОДА';
    card.classList.add('has-action-hint');
    card.addEventListener('click', () => handleHeroCardClick(hero));
    grid.appendChild(card);
  });
  shouldAnimateFlip = false;
}

function getTeamSize(teamNum) {
  const mode = state.series?.mode || state.characterDraft?.mode || '2x2';
  return Number((mode.split('x')[teamNum === 1 ? 0 : 1]) || 2);
}

function getScoutTokens(teamNum) {
  if (!state.series.scouting) state.series.scouting = { team1: getTeamSize(1) * 6, team2: getTeamSize(2) * 6 };
  return Math.max(0, Number(state.series.scouting[`team${teamNum}`] || 0));
}

function revealItemInfo(itemId, infoType, teamNum) {
  if (!['tier', 'category'].includes(infoType)) return;
  const item = state.roundState.gridItems.find(i => i.id === itemId);
  if (!item || isStreetBrawlItem(item) || getItemRoundStatus(itemId) || getScoutTokens(teamNum) <= 0) return;
  if (!state.roundState.revealedItems) state.roundState.revealedItems = {};
  const existing = state.roundState.revealedItems[itemId] || {};
  if (existing[infoType]) { showToast('Эта характеристика уже раскрыта'); return; }
  state.actionStack.push({ phase: 'item_draft', type: 'SCOUT_REVEAL', itemId, infoType, teamNum, previousTokens: getScoutTokens(teamNum), previousReveal: { ...existing } });
  state.roundState.revealedItems[itemId] = { ...existing, [infoType]: true };
  state.series.scouting[`team${teamNum}`] = getScoutTokens(teamNum) - 1;
  saveState(); renderAll();
  showToast(`Команда ${teamNum} раскрыла ${infoType === 'tier' ? 'тир' : 'категорию'} предмета — информация видна всем`);
}

function renderItemGrid(grid) {
  const items = state.roundState.gridItems;
  const roundTotalItems = getGridSize(state.series.round, state.series.mode);

  let cols = 4;
  if (roundTotalItems === 20) cols = 5;
  if (roundTotalItems === 28) cols = 7;
  grid.style.setProperty('--grid-cols', cols);

  if (items.length === 0) {
    grid.innerHTML = `<div class="grid-empty-state"><h3 style="font-size: 1.1rem; color: #f1f5f9;">Сетка раунда пуста</h3></div>`;
    shouldAnimateFlip = false;
    return;
  }

  const currentTurn = (!state.roundState.roundFinished && !state.series.seriesWinner && state.roundState.sequence)
    ? state.roundState.sequence[state.roundState.stepIndex]
    : null;
  const isBanTurn = currentTurn && currentTurn.type === 'ban';

  let delayIndices = items.map((_, i) => i);
  shuffleArray(delayIndices);

  items.forEach((item, index) => {
    const revealed = state.roundState.revealedItems?.[item.id] || {};
    const status = getItemRoundStatus(item.id);
    const isHidden = !status; // После бана или пика карточка полностью раскрывается в сетке
    const matchesCategory = (activeCategory === 'all' || (!isHidden && item.category === activeCategory) || (isHidden && revealed.category && item.category === activeCategory));
    const matchesTier = (activeTier === 'all' || (!isHidden && item.tier.toString() === activeTier) || (isHidden && revealed.tier && item.tier.toString() === activeTier));
    const matchesSearch = (!searchQuery || !isHidden && item.name.toLowerCase().includes(searchQuery));

    if (!matchesCategory || !matchesTier || !matchesSearch) return;

    const card = document.createElement('div');
    const flipClass = shouldAnimateFlip ? 'flip-entrance' : '';
    const baseInterval = items.length <= 16 ? 0.08 : 0.06;
    const flipDelay = (delayIndices[index] * baseInterval).toFixed(3);

    let usedClasses = '';
    let badgeHtml = '';

    if (status) {
      if (status.type === 'ban') {
        usedClasses = 'used banned';
        badgeHtml = `<div class="card-status-badge ban-badge"><span class="status-badge-text">БАН</span><span class="status-badge-sub">Команда ${status.team}</span></div>`;
      } else if (status.type === 'pick') {
        usedClasses = `used picked-team${status.team}`;
        const slotText = (status.abilitySlot !== null && status.abilitySlot !== undefined) ? ` [Сп. ${status.abilitySlot === 3 ? 'Ульт' : status.abilitySlot + 1}]` : '';
        badgeHtml = `<div class="card-status-badge pick-badge team${status.team}"><span class="status-badge-text">ПИК</span><span class="status-badge-sub">К${status.team} • ${status.heroName}${slotText}</span></div>`;
      }
    }

    const brawlClass = item.is_street_brawl ? 'is-street-brawl' : '';
    const banImmuneClass = (item.is_street_brawl && isBanTurn) ? 'ban-immune' : '';
    const brawlBadge = item.is_street_brawl ? `<span class="card-street-brawl-badge" title="Легендарный Street Brawl предмет">★ BRAWL</span>` : '';
    const banProtectedDot = (item.is_street_brawl && isBanTurn) ? `<span class="card-ban-protected-pill" title="Нельзя забанить!">🚫 NO BAN</span>` : '';

    const abilityDot = item.requires_ability_slot ? `<span class="card-ability-req-dot" title="Слот 0–3">⚡ СЛОТ</span>` : '';
    const chargesDot = item.requires_ability_charges ? `<span class="card-charges-req-dot" title="Требует заряды">⚡ ЗАРЯДЫ</span>` : '';
    const activeDot = item.is_active ? `<span class="card-active-dot" title="Активный">АКТИВ</span>` : '';

    const hasUpgrades = (ITEM_UPGRADE_GRAPH[item.id] || []).length > 0;
    const upgradeArrow = hasUpgrades ? `<span style="font-size:0.65rem; color:#86efac; font-weight:800;" title="Имеет улучшения">▲</span>` : '';

    const categoryClass = (!isHidden || revealed.category) ? `category-${item.category}` : 'category-hidden';
    card.className = `item-card ${categoryClass} ${brawlClass} ${banImmuneClass} ${usedClasses} ${flipClass} ${state.roundState.roundFinished ? 'draft-finished' : ''}`;
    card.dataset.itemId = item.id;
    card.style.setProperty('--flip-delay', `${flipDelay}s`);
    const hiddenCard = isHidden;
    const scoutTeam = currentTurn?.team || 1;
    const scoutTokens = getScoutTokens(scoutTeam);
    const scoutControls = hiddenCard && !status && !isStreetBrawlItem(item) ? `<div class="scout-actions"><button type="button" class="scout-btn" data-scout="tier" ${!scoutTokens || revealed.tier ? 'disabled' : ''}>${revealed.tier ? `Тир: T${item.tier}` : '🔎 Раскрыть тир'}</button><button type="button" class="scout-btn" data-scout="category" ${!scoutTokens || revealed.category ? 'disabled' : ''}>${revealed.category ? `Тип: ${CATEGORY_NAMES[item.category] || item.category}` : '🔎 Раскрыть тип'}</button></div>` : '';
    card.classList.toggle('item-hidden', hiddenCard);
    card.innerHTML = hiddenCard ? `
      <div class="card-thumb-wrap hidden-card-thumb">${revealed.tier ? `<span class="card-tier-pill tier-${item.tier}" title="Тир предмета раскрыт">T${item.tier}</span>` : ''}<span class="hidden-card-question">?</span><div class="card-badges-wrap">${brawlBadge}</div>${badgeHtml}</div>
      <div class="card-name">${item.is_street_brawl ? '★ STREET BRAWL' : 'Неизвестный предмет'}</div>
      <div class="card-footer"><span class="cat-badge">${revealed.category ? (CATEGORY_NAMES[item.category] || item.category) : 'Тип скрыт'}</span><span class="card-tier-text">${revealed.tier ? `T${item.tier}` : 'Тир скрыт'}</span></div>
      ${scoutControls}
    ` : `
      <div class="card-thumb-wrap">
        <span class="card-tier-pill tier-${item.tier}">T${item.tier}</span>
        <div class="card-badges-wrap">${brawlBadge}${banProtectedDot}${abilityDot}${chargesDot}${activeDot}</div>
        <img class="card-img" src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="card-fallback" style="display: none; align-items:center; justify-content:center; width:100%; height:100%; background:#161c28;"><span style="font-size:0.9rem;font-weight:900;">T${item.tier}</span></div>${badgeHtml}
      </div>
      <div class="card-name" title="${item.name}">${item.name}</div>
      <div class="card-footer"><span class="cat-badge cat-${item.category.toLowerCase()}">${CATEGORY_NAMES[item.category] || item.category} ${upgradeArrow}</span><span class="card-tier-text tier-text-${item.tier}">TIER ${item.tier}</span></div>
    `;
    const itemTurn = currentTurn;
    card.dataset.actionHint = status
      ? `${status.type === 'ban' ? 'УЖЕ ЗАБАНЕН' : 'УЖЕ ВЫБРАН'} • ${status.team === 1 ? 'THE HIDDEN KING' : 'THE ARCHMOTHER'}`
      : state.roundState.roundFinished || state.series.seriesWinner ? 'РАУНД ЗАВЕРШЁН'
      : !itemTurn ? 'НЕТ АКТИВНОГО ХОДА'
      : itemTurn.type === 'ban' && item.is_street_brawl ? '🚫 НЕЛЬЗЯ ЗАБАНИТЬ'
      : itemTurn.type === 'ban' ? `🚫 ЗАБАНИТЬ • ${itemTurn.team === 1 ? 'THE HIDDEN KING' : 'THE ARCHMOTHER'}`
      : `⚔️ ВЫБРАТЬ ПРЕДМЕТ • ${itemTurn.team === 1 ? 'THE HIDDEN KING' : 'THE ARCHMOTHER'}`;
    card.classList.add('has-action-hint');
    card.querySelectorAll('[data-scout]').forEach(btn => btn.addEventListener('click', event => { event.stopPropagation(); revealItemInfo(item.id, btn.dataset.scout, scoutTeam); }));

    card.addEventListener('click', () => handleItemCardClick(item));
    grid.appendChild(card);
  });

  shouldAnimateFlip = false;
}

function renderActionFinishedBar() {
  const bar = document.getElementById('actionFinishedBar');
  const heading = document.getElementById('actionBannerHeading');
  const sub = document.getElementById('actionBannerSub');
  const btnStartItems = document.getElementById('btnStartItemDraft');
  const btnCopyRound = document.getElementById('btnCopyCommandsRound');
  const btnWin1 = document.getElementById('btnWinTeam1');
  const btnWin2 = document.getElementById('btnWinTeam2');
  const btnNext = document.getElementById('btnNextRound');

  if (state.activePhase === 'character_draft') {
    btnCopyRound.style.display = 'none';
    if (state.characterDraft.completed) {
      bar.style.display = 'block';
      heading.textContent = 'Драфт персонажей завершён!';
      sub.textContent = 'Составы команд зафиксированы. Нажмите кнопку, чтобы начать драфт предметов:';
      btnStartItems.style.display = 'inline-flex';
      btnWin1.style.display = 'none';
      btnWin2.style.display = 'none';
      btnNext.style.display = 'none';
    } else {
      bar.style.display = 'none';
    }
    return;
  }

  btnStartItems.style.display = 'none';

  if (!state.roundState.roundFinished && !state.series.seriesWinner) {
    bar.style.display = 'none';
    return;
  }

  bar.style.display = 'block';
  btnCopyRound.style.display = 'inline-flex';

  if (state.series.seriesWinner) {
    heading.textContent = `Серия Bo5 завершена! Победитель: Команда ${state.series.seriesWinner}`;
    sub.textContent = `Итоговый счёт: ${state.series.score.team1} — ${state.series.score.team2}`;
    btnWin1.style.display = 'none';
    btnWin2.style.display = 'none';
    btnNext.style.display = 'none';
    return;
  }

  if (state.roundState.roundWinner) {
    heading.textContent = `Раунд ${state.series.round} выиграла Команда ${state.roundState.roundWinner}!`;
    sub.textContent = `Счёт серии Bo5: Команда 1 [ ${state.series.score.team1} — ${state.series.score.team2} ] Команда 2`;
    btnWin1.style.display = 'none';
    btnWin2.style.display = 'none';
    btnNext.style.display = 'inline-flex';
  } else {
    heading.textContent = `Все ходы раунда ${state.series.round} завершены!`;
    sub.textContent = 'Скопируйте команды или зафиксируйте победителя раунда:';
    btnWin1.style.display = 'inline-flex';
    btnWin2.style.display = 'inline-flex';
    btnNext.style.display = 'none';
  }
}

function renderHistory() {
  const list = document.getElementById('historyList');
  const label = document.getElementById('historyLabel');

  if (state.activePhase === 'character_draft') {
    label.textContent = 'История драфта персонажей:';
    if (state.characterDraft.history.length === 0) {
      list.innerHTML = `<span style="color: var(--text-dim);">Ходы ещё не сделаны</span>`;
      return;
    }

    list.innerHTML = state.characterDraft.history.slice(0, 10).map(h => {
      const teamColor = h.team === 1 ? 'color: var(--team1-primary);' : 'color: var(--team2-primary);';
      return `
        <div class="history-item-pill">
          <span style="${teamColor}; font-weight:800;">К${h.team}</span>
          <span style="font-size:0.7rem; color:#cbd5e1;">${h.type === 'ban' ? '🚫 Бан' : '✓ Пик'}</span>
          <strong style="color:#fff;">${h.hero.name}</strong>
        </div>
      `;
    }).join('');
  } else {
    label.textContent = 'История предметов:';
    if (state.series.history.length === 0) {
      list.innerHTML = `<span style="color: var(--text-dim);">Ходы ещё не сделаны</span>`;
      return;
    }

    list.innerHTML = state.series.history.slice(0, 10).map(h => {
      const teamColor = h.team === 1 ? 'color: var(--team1-primary);' : 'color: var(--team2-primary);';
      const slotTag = (h.abilitySlot !== null && h.abilitySlot !== undefined) ? ` <span class="ability-slot-chip">Сп. ${h.abilitySlot}</span>` : '';
      const upTag = h.upgradedFrom ? ` <span class="upgrade-tag-chip">▲ Заменил ${h.upgradedFrom}</span>` : '';
      const sbBadge = h.item?.is_street_brawl ? ` <span class="street-brawl-tag-chip">★ SB</span>` : '';

      return `
        <div class="history-item-pill" style="${h.item?.is_street_brawl ? 'border-color: #f59e0b;' : ''}">
          <span style="color: var(--text-dim);">Р${h.round}</span>
          <span style="${teamColor}; font-weight:800;">К${h.team}</span>
          <span style="font-size:0.7rem; color:#cbd5e1;">${h.type === 'ban' ? '🚫 Бан' : `✓ ${h.heroName}`}</span>
          <strong style="color:#fff;">${h.item.name}</strong>
          <span class="tier-badge tier-${h.item.tier}" style="font-size:0.65rem; padding:1px 4px;">T${h.item.tier}</span>
          ${slotTag}
          ${sbBadge}
          ${upTag}
        </div>
      `;
    }).join('');
  }
}

function showVictoryModal() {
  const modal = document.getElementById('victoryModal');
  const title = document.getElementById('victoryTitle');
  const sub = document.getElementById('victorySubtitle');

  title.textContent = `ПОБЕДА В СЕРИИ: КОМАНДА ${state.series.seriesWinner}!`;
  title.style.color = state.series.seriesWinner === 1 ? 'var(--team1-primary)' : 'var(--team2-primary)';
  sub.textContent = `Серия Bo5 завершена со счётом ${state.series.score.team1} : ${state.series.score.team2}`;
  modal.style.display = 'flex';
}

/* ==========================================================================
   ГЕНЕРАЦИЯ ПЛЫВУЩИХ КАРТ ДЛЯ ЭКРАНА ВЫБОРА РЕЖИМА
   ========================================================================== */
function initFloatingModeBackground() {
  const bgContainer = document.getElementById('modeFloatingBg');
  if (!bgContainer) return;
  if (bgContainer._floatingRaf) cancelAnimationFrame(bgContainer._floatingRaf);
  bgContainer.innerHTML = '';

  const pool = itemsCatalog.length > 0 ? [...itemsCatalog] : [...EMBEDDED_ITEMS_FALLBACK];
  if (!pool.length) return;

  // Равномерная сетка с небольшим джиттером: карточки выглядят разбросанными,
  // но каждая ячейка получает карточку, поэтому больших пустых областей не будет.
  const cardCount = 108;
  const columns = 12;
  const rows = Math.ceil(cardCount / columns);
  for (let i = 0; i < cardCount; i++) {
    const item = pool[Math.floor(Math.random() * pool.length)];
    const card = document.createElement('div');
    card.className = `floating-item-card floating-random-card cat-${item.category} ${item.is_street_brawl ? 'is-brawl' : ''}`;
    const col = i % columns;
    const row = Math.floor(i / columns);
    const cellW = 100 / columns;
    const cellH = 100 / rows;
    card.style.left = `${(col + 0.5 + (Math.random() - 0.5) * 0.42) * cellW}%`;
    card.style.top = `${(row + 0.5 + (Math.random() - 0.5) * 0.38) * cellH}%`;
    card.style.setProperty('--card-rotation', `${(Math.random() * 28 - 14).toFixed(1)}deg`);
    card.style.setProperty('--card-scale', (0.62 + Math.random() * 0.38).toFixed(2));
    card.style.setProperty('--float-x', `${(Math.random() * 12 - 6).toFixed(1)}px`);
    card.style.setProperty('--float-y', `${(Math.random() * 16 - 8).toFixed(1)}px`);
    card.style.setProperty('--float-duration', `${(7 + Math.random() * 8).toFixed(2)}s`);
    card.style.animationDelay = `${(-Math.random() * 12).toFixed(2)}s`;
    card.style.zIndex = String(Math.floor(Math.random() * 3));
    card.innerHTML = `
      <div class="floating-card-thumb">
        <img src="${item.image}" alt="" onerror="this.style.display='none';">
      </div>
      <div class="floating-card-title">${item.name}</div>
    `;
    bgContainer.appendChild(card);
  }
}

/* ==========================================================================
   ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ ИНТЕРФЕЙСА
   ========================================================================== */
function initFilterEvents() {
  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderGrid();
  });

  document.querySelectorAll('.filter-btn[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      renderGrid();
    });
  });

  document.querySelectorAll('.filter-btn[data-tier]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-tier]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTier = btn.getAttribute('data-tier');
      renderGrid();
    });
  });
}

function initControlEvents() {
  document.getElementById('btnUndo').addEventListener('click', undoLastAction);
  document.getElementById('btnResetRound').addEventListener('click', resetCurrentRound);
  document.getElementById('btnNewMatch').addEventListener('click', startNewMatchPrompt);
  document.getElementById('btnStartItemDraft').addEventListener('click', proceedToItemDraft);
  document.getElementById('btnWinTeam1').addEventListener('click', () => declareRoundWinner(1));
  document.getElementById('btnWinTeam2').addEventListener('click', () => declareRoundWinner(2));
  document.getElementById('btnNextRound').addEventListener('click', advanceToNextRound);

  document.getElementById('btnRerollHeroPool').addEventListener('click', rerollHeroPool);

  document.getElementById('btnCopyCommandsHeader').addEventListener('click', openCommandsModal);
  document.getElementById('btnCopyCommandsRound').addEventListener('click', openCommandsModal);

  document.getElementById('btnExport').addEventListener('click', exportMatchJson);
  document.getElementById('btnImport').addEventListener('click', () => {
    document.getElementById('importFileInput').click();
  });
  document.getElementById('importFileInput').addEventListener('change', importMatchJson);
}

function exportMatchJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `deadlock_bo5_${state.activePhase}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Матч экспортирован в JSON');
}

function importMatchJson(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const imported = JSON.parse(evt.target.result);
      if (imported && imported.characterDraft && imported.series) {
        state = imported;
        shouldAnimateFlip = true;
        saveState();
        checkAndAutoRerollDeadlocks();
        renderAll();
        showToast('Матч успешно импортирован');
      } else {
        alert('Ошибка: Неверный формат файла состояния!');
      }
    } catch (err) { alert('Ошибка чтения JSON: ' + err.message); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function showToast(msg) {
  const toast = document.getElementById('toastBox');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}
function openHowToPlayModal() {
  const modal = document.getElementById('howToPlayModal');
  if (modal) modal.style.display = 'flex';
}

function closeHowToPlayModal() {
  const modal = document.getElementById('howToPlayModal');
  if (modal) modal.style.display = 'none';
}