
MacroToolkitDB = {
	["char"] = {
		["Nahko - Shadowsong"] = {
			["macros"] = {
				[121] = {
					["name"] = "1",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [spec:1,form:0/1/2/3]moonkin form;[spec:1,form:4]Moonfire\n/use [spec:3,form:0/2/3/4]bear form;[spec:3,form:1]Maul\n",
				},
				[122] = {
					["name"] = "2",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [spec:1,form:0/1/2/3]moonkin form;[spec:1,form:4]Sunfire\n/use [spec:3,form:0/2/3/4]bear form; [spec:3,form:1]Mangle\n",
				},
				[123] = {
					["name"] = "3",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [spec:1,form:0/1/2/3]moonkin form;[spec:1,form:4]Starsurge\n/use [spec:3,form:0/2/3/4]bear form; [spec:3,form:1]Swipe\n",
				},
				[124] = {
					["name"] = "4",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [spec:1,form:0/1/2/3]moonkin form;[spec:1,form:4]Starfire\n/use [spec:3,form:0/2/3/4]bear form; [spec:3,form:1]Thrash\n",
				},
			},
			["backups"] = {
				{
					["m"] = {
						{
							["icon"] = 132136,
							["index"] = 121,
							["name"] = "1",
							["body"] = "#showtooltip\n/use [form:0,spec:3]!bear form; [form:1,spec:3]Maul",
						}, -- [1]
					},
					["d"] = "Oct 24 18:02:47",
					["n"] = "102420",
				}, -- [1]
			},
			["lastbackup"] = "Oct 24 18:02:47",
		},
		["Karkol - Thrall"] = {
			["macros"] = {
				[122] = {
					["icon"] = "236205",
					["name"] = "3",
					["body"] = "#showtooltip\n/cast Arcane Barrage\n",
				},
				[126] = {
					["icon"] = "136082",
					["name"] = "N1",
					["body"] = "#showtooltip\n/cast [harm, nomod] Counterspell; [noharm, nomod, @mouseover] Remove Curse; [harm. mod:alt] Spellsteal\n",
				},
				[123] = {
					["icon"] = "135848",
					["name"] = "F",
					["body"] = "/use [spec:1,talent:7/1]Frost Nova\n/use [spec:1,talent:7/2]Frost Nova\n/use [spec:1,talent:7/3]Arcane Orb\n/use [spec:3]Wildfire Bomb\n",
				},
				[127] = {
					["icon"] = "134400",
					["name"] = "N2",
					["body"] = "/cleartarget [dead]\n/use [harm,nodead]Polymorph(Sheep)\n/use [nodead,help]The Pigskin\n/script UIErrorsFrame:Clear()\n",
				},
				[124] = {
					["icon"] = "136091",
					["name"] = "G",
					["body"] = "/cast [spec:1,talent:6/3] Frost Nova; [spec:1,talent:6/2] Slow; [spec:3] Wildfire Bomb\n/use Invisibility\n",
				},
				[128] = {
					["icon"] = "135841",
					["name"] = "N4",
					["body"] = "#showtooltip\n/cast [nomod] Ice Block; [mod] Slow Fall\n",
				},
				[121] = {
					["icon"] = "135735",
					["name"] = "1",
					["body"] = "#showtooltip Arcane Blast\n/startattack\n/cast Shoot\n/cast Arcane Blast\n",
				},
				[125] = {
					["icon"] = "134400",
					["name"] = "Mana Gem",
					["body"] = "/cast [btn:2] Conjure Mana Gem; [btn:1] Mana Gem\n",
				},
				[129] = {
					["icon"] = "135739",
					["name"] = "Run",
					["body"] = "/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end\n/use [combat][indoors][mod] Blink; [mounted] Goblin Glider Kit; [nomounted] Mount Up\n",
				},
			},
			["backups"] = {
			},
		},
		["Loremeister - Thrall"] = {
			["macros"] = {
				[122] = {
					["name"] = "#N2",
					["icon"] = "136013",
					["body"] = "#showtooltip\n/use [nocombat,@mouseover,harm,exists]Hex;[noexists,@cursor]Capacitor Totem\n",
				},
				[126] = {
					["name"] = "2H",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [spec:3,harm,exists]Primal Strike; [spec:3,noharm,@mouseover]Riptide\n",
				},
				[132] = {
					["name"] = "Q",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [@mouseover,exists,harm] Frost Shock; [spec:3]Cloudburst Totem\n",
				},
				[123] = {
					["name"] = "#N3",
					["icon"] = "413588",
					["body"] = "/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end\n/use [combat][indoors][mod] Ghost Wolf; [mounted] Goblin Glider Kit; [nomounted] Mount Up\n",
				},
				[127] = {
					["name"] = "3",
					["icon"] = "132314",
					["body"] = "/cleartarget [spec:2,dead] \n/assist focus [noexists][help]\n/targetenemy [noexists] [help][dead]\n/startattack \n/cast Stormstrike\n/script UIErrorsFrame:Clear()\n",
				},
				[134] = {
					["name"] = "Z",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [spec:3] Healing Tide Totem\n",
				},
				[131] = {
					["name"] = "N+",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [exists,noharm,@mouseover]Earth Shield;[@none]Water Shield\n",
				},
				[124] = {
					["name"] = "1",
					["icon"] = "1370984",
					["body"] = "#showtooltip\n/use [spec:3,@mouseover,noharm]Healing Wave;[spec:3,@mouseover]Lava Burst\n/use [spec:2] Crash Lightning\n",
				},
				[128] = {
					["name"] = "3H",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [spec:3,@mouseover,noharm]Healing Surge\n",
				},
				[129] = {
					["name"] = "4",
					["icon"] = "136042",
					["body"] = "#showtooltip\n/cast [@mouseover,noharm][noharm] chain heal; [@mouseover,harm][harm] chain lightning\n",
				},
				[121] = {
					["name"] = "#N1",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [@mouseover,harm,nomod]Wind Shear;[@mouseover,harm,mod]Purge;[@mouseover]Purify Spirit\n",
				},
				[125] = {
					["name"] = "2",
					["icon"] = "236289",
					["body"] = "/cleartarget [spec:2,dead] \n/assist focus [noexists][help]\n/targetenemy [noexists] [help][dead]\n/startattack \n/cast Lava Lash\n/script UIErrorsFrame:Clear()\n",
				},
				[130] = {
					["name"] = "`",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [spec:3,@cursor,nomod] Healing Rain;[spec:3,@cursor,mod]Earthen Wall Totem\n",
				},
				[133] = {
					["name"] = "R",
					["icon"] = "136048",
					["body"] = "#showtooltip\n/cast Lightning Bolt\n",
				},
			},
			["backups"] = {
			},
		},
		["Quazzarr - Thrall"] = {
			["macros"] = {
				[121] = {
					["name"] = "Healthstone",
					["icon"] = "538745",
					["body"] = "#showtooltip\n/cast [noparty] Create Healthstone; [party] Create Soulwell\n",
				},
				[122] = {
					["name"] = "N2",
					["icon"] = "133632",
					["body"] = "/cancelaura Burning Rush\n/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end\n/use [combat][indoors][mod] Burning Rush; [mounted] Goblin Glider Kit; [nomounted] Apprentice Riding\n",
				},
			},
		},
		["Nahko - Thrall"] = {
			["macros"] = {
				[121] = {
					["icon"] = "132276",
					["name"] = "1",
					["body"] = "#showtooltip\n/use [spec:1,form:0/1/2/3]moonkin form;[spec:1,form:4]Moonfire\n/use [spec:3,form:0/2/3/4]bear form;[spec:3,form:1]Maul\n",
				},
				[122] = {
					["icon"] = "132276",
					["name"] = "2",
					["body"] = "#showtooltip\n/use [spec:1,form:0/1/2/3]moonkin form;[spec:1,form:4]Sunfire\n/use [spec:3,form:0/2/3/4]bear form; [spec:3,form:1]Mangle\n",
				},
				[123] = {
					["icon"] = "132276",
					["name"] = "3",
					["body"] = "#showtooltip\n/use [spec:1,form:0/1/2/3]moonkin form;[spec:1,form:4]Starsurge\n/use [spec:3,form:0/2/3/4]bear form; [spec:3,form:1]Swipe\n",
				},
				[124] = {
					["icon"] = "132276",
					["name"] = "4",
					["body"] = "#showtooltip\n/use [spec:1,form:0/1/2/3]moonkin form;[spec:1,form:4]Starfire\n/use [spec:3,form:0/2/3/4]bear form; [spec:3,form:1]Thrash\n",
				},
			},
		},
		["Tandieu - Hyjal"] = {
			["macros"] = {
				[131] = {
					["icon"] = "1357816",
					["name"] = "5",
					["body"] = "#showtooltip\n/use [spec:1]Aspect of the Wild;[spec:3]Aspect of the Eagle\n/use Croak Crock\n/use Lightning-Forged Augment Rune\n",
				},
				[135] = {
					["icon"] = "458729",
					["name"] = "G",
					["body"] = "#showtooltip\n/use [@focus,help,nodead][@pet,nodead][@none]Misdirection\n/use [@focus,help,nodead][@pet,nodead][@none]Spirit Mend(Exotic Ability)\n/use Mend Pet\n",
				},
				[122] = {
					["icon"] = "1786407",
					["name"] = "#N+",
					["body"] = "#showtooltip\n/use Exhilaration\n/use [pet:Faust,@player]Spirit Mend\n/use Survival of the Fittest(Command Pet Ability)\n",
				},
				[124] = {
					["icon"] = "249170",
					["name"] = "#N1",
					["body"] = "#showtooltip\n/use [spec:3,nomod]Muzzle;[mod:alt]Tranquilizing Shot; Counter Shot\n",
				},
				[126] = {
					["icon"] = "134400",
					["name"] = "#N3",
					["body"] = "/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end\n/use [combat][indoors][mod]Aspect of the Cheetah\n",
				},
				[128] = {
					["icon"] = "132176",
					["name"] = "2",
					["body"] = "#showtooltip\n/click [vehicleui]ActionButton2\n/click MultiBarLeftButton2\n/petattack \n/use [spec:1]Kill Command;[spec:2]Steady Shot\n/use Claw(Basic Attack)\n/use Echoes of Rezan\n",
				},
				[132] = {
					["icon"] = "3614364",
					["name"] = "6",
					["body"] = "#showtooltip\n/tar spirit of xuen\n/petpassive\n/petassist\n/petattack\n/use Intimidation\n",
				},
				[136] = {
					["icon"] = "134400",
					["name"] = "Q",
					["body"] = "#showtooltip [spec:1]Barbed Shot;[spec:3]Serpent Sting\n/tar [nodead]aqir ravager\n/tar [nodead]aqir darter\n/tar Explosives\n/a [dead]focus\n/petattack\n/use [spec:1,harm,nodead]Barbed Shot;[spec:3,harm,nodead]Serpent Sting;Mend Pet\n",
				},
				[129] = {
					["icon"] = "1412205",
					["name"] = "3",
					["body"] = "#showtooltip [spec:1] Cobra Shot\n/click [vehicleui]ActionButton3\n/cast [spec:1] Cobra Shot\n",
				},
				[133] = {
					["icon"] = "132293",
					["name"] = "=",
					["body"] = "/use Feign Death\n/use play dead\n",
				},
				[137] = {
					["icon"] = "134400",
					["name"] = "R/T",
					["body"] = "#showtooltip\n/use [spec:1,talent:7/1]Arcane Shot;[spec:1,talent:7/2]Arcane Shot;[spec:1,talent:7/3]Bloodshed;[spec:2]Arcane Shot\n",
				},
				[121] = {
					["icon"] = "1738657",
					["name"] = "#N*",
					["body"] = "#showtooltip\n/use Aspect of the Turtle\n/use [@player]Tar Trap\n/use 15\n/use [pet:SpiritBeast,@player]Spirit Mend;[pet:Gadget,@player]Master's Call(Cunning Ability)\n/use Foul Belly\n",
				},
				[123] = {
					["icon"] = "1029744",
					["name"] = "#N-",
					["body"] = "#showtooltip\n/use Disengage\n/use [@player]Tar Trap\n/use Survival of the Fittest(Command Pet Ability)\n",
				},
				[125] = {
					["icon"] = "135815",
					["name"] = "#N2",
					["body"] = "#showtooltip\n/use [spec:1,talent:5/3,nomod,@cursor]Binding Shot;[spec:3,talent:5/3,nomod,@cursor]Binding Shot;[mod:ctrl,@cursor]Tar Trap;[mod:alt,@cursor]Freezing Trap;[spec:1,talent:5/2,@cursor]Flare;[spec:2]Binding Shot; Binding Shot\n",
				},
				[127] = {
					["icon"] = "237524",
					["name"] = "1",
					["body"] = "#showtooltip\n/click [vehicleui]ActionButton1\n/cancelaura Aspect of the Turtle\n/use [nopet,spec:1]call pet 2;[nopet,spec:3]call pet 5;[pet,spec:1]Bestial Wrath;[pet,spec:3]Coordinated Assaultt\n/use [pet]Aspect of the Wild\n/use 13\n/use 14\n",
				},
				[130] = {
					["icon"] = "132330",
					["name"] = "4",
					["body"] = "/use Multi-Shot\n/click [vehicleui]ActionButton1\n/use Froststorm Breath(Exotic Ability)\n/use Frost Breath(Special Ability)\n",
				},
				[134] = {
					["icon"] = "576309",
					["name"] = "F",
					["body"] = "/use [spec:1,talent:6/2]Barrage;[spec:3]Wildfire Bomb\n/castsequence [@cursor] reset=10 Tar Trap, Flare\n",
				},
				[138] = {
					["icon"] = "134400",
					["name"] = "Srv3",
					["body"] = "/cleartarget [dead]\n/assist focus [noexists][help]\n/targetenemy [noexists][help][dead]\n/startattack\n/cast Raptor Strike\n/script UIErrorsFrame:Clear()\n",
				},
			},
			["backups"] = {
			},
		},
		["Tandu - Thrall"] = {
			["macros"] = {
				[131] = {
					["icon"] = "1357816",
					["name"] = "5",
					["body"] = "#showtooltip\n/use [spec:1]Aspect of the Wild;[spec:3]Aspect of the Eagle\n/use Croak Crock\n/use Lightning-Forged Augment Rune\n",
				},
				[135] = {
					["icon"] = "458729",
					["name"] = "G",
					["body"] = "#showtooltip\n/use [@focus,help,nodead][@pet,nodead][@none]Misdirection\n/use [@focus,help,nodead][@pet,nodead][@none]Spirit Mend(Exotic Ability)\n/use Mend Pet\n",
				},
				[122] = {
					["icon"] = "1786407",
					["name"] = "#N+",
					["body"] = "#showtooltip\n/use Exhilaration\n/use [pet:Faust,@player]Spirit Mend\n/use Survival of the Fittest(Command Pet Ability)\n",
				},
				[124] = {
					["icon"] = "249170",
					["name"] = "#N1",
					["body"] = "#showtooltip\n/use [spec:3,nomod]Muzzle;[mod:alt]Tranquilizing Shot; Counter Shot\n",
				},
				[126] = {
					["icon"] = "132242",
					["name"] = "#N3",
					["body"] = "/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end\n/use [combat][indoors][mod]Aspect of the Cheetah\n",
				},
				[128] = {
					["icon"] = "1029718",
					["name"] = "2",
					["body"] = "#showtooltip Kill Command\n/click [vehicleui]ActionButton2\n/click MultiBarLeftButton2\n/petattack \n/use Kill Command\n/use Claw(Basic Attack)\n/use Echoes of Rezan\n/use Frost Breath(Special Ability)\n",
				},
				[132] = {
					["icon"] = "3614364",
					["name"] = "6",
					["body"] = "#showtooltip\n/tar spirit of xuen\n/petpassive\n/petassist\n/petattack\n/use Intimidation\n",
				},
				[136] = {
					["icon"] = "2058007",
					["name"] = "Q",
					["body"] = "#showtooltip [spec:1]Barbed Shot;[spec:3]Serpent Sting\n/tar [nodead]aqir ravager\n/tar [nodead]aqir darter\n/tar Explosives\n/a [dead]focus\n/petattack\n/use [spec:1,harm,nodead]Barbed Shot;[spec:3,harm,nodead]Serpent Sting;Mend Pet\n",
				},
				[129] = {
					["icon"] = "1412205",
					["name"] = "3",
					["body"] = "#showtooltip [spec:1] Cobra Shot\n/click [vehicleui]ActionButton3\n/cast [spec:1] Cobra Shot\n",
				},
				[133] = {
					["icon"] = "132293",
					["name"] = "=",
					["body"] = "/use Feign Death\n/use play dead\n",
				},
				[137] = {
					["icon"] = "134400",
					["name"] = "R/T",
					["body"] = "#showtooltip\n/use [spec:1,talent:7/1]Arcane Shot;[spec:1,talent:7/2]Arcane Shot;[spec:1,talent:7/3]Bloodshed;[spec:2]Arcane Shot\n",
				},
				[121] = {
					["icon"] = "1738657",
					["name"] = "#N*",
					["body"] = "#showtooltip\n/use Aspect of the Turtle\n/use [@player]Tar Trap\n/use 15\n/use [pet:SpiritBeast,@player]Spirit Mend;[pet:Gadget,@player]Master's Call(Cunning Ability)\n/use Foul Belly\n",
				},
				[123] = {
					["icon"] = "1029744",
					["name"] = "#N-",
					["body"] = "#showtooltip\n/use Disengage\n/use [@player]Tar Trap\n/use Survival of the Fittest(Command Pet Ability)\n",
				},
				[125] = {
					["icon"] = "134400",
					["name"] = "#N2",
					["body"] = "#showtooltip\n/use [spec:1,talent:5/3,nomod,@cursor]Binding Shot;[spec:3,talent:5/3,nomod,@cursor]Binding Shot;[mod:ctrl,@cursor]Tar Trap;[mod:alt,@cursor]Freezing Trap;[spec:1,talent:5/2,@cursor]Flare;[spec:2]Binding Shot; Binding Shot\n",
				},
				[127] = {
					["icon"] = "237524",
					["name"] = "1",
					["body"] = "#showtooltip\n/click [vehicleui]ActionButton1\n/cancelaura Aspect of the Turtle\n/use [nopet,spec:1]call pet 2;[nopet,spec:3]call pet 5;[pet,spec:1]Bestial Wrath;[pet,spec:3]Coordinated Assaultt\n/use [pet]Aspect of the Wild\n/use 13\n/use 14\n",
				},
				[130] = {
					["icon"] = "132330",
					["name"] = "4",
					["body"] = "/use Multi-Shot\n/click [vehicleui]ActionButton1\n/use Froststorm Breath(Exotic Ability)\n/use Frost Breath(Special Ability)\n",
				},
				[134] = {
					["icon"] = "576309",
					["name"] = "F",
					["body"] = "/use [spec:1,talent:6/2]Barrage;[spec:3]Wildfire Bomb\n/castsequence [@cursor] reset=10 Tar Trap, Flare\n",
				},
				[138] = {
					["icon"] = "134400",
					["name"] = "Srv3",
					["body"] = "/cleartarget [dead]\n/assist focus [noexists][help]\n/targetenemy [noexists][help][dead]\n/startattack\n/cast Raptor Strike\n/script UIErrorsFrame:Clear()\n",
				},
			},
		},
		["Tandu - Shadowsong"] = {
			["macros"] = {
			},
		},
		["Bullscht - Hyjal"] = {
			["macros"] = {
			},
		},
		["Christar - Shadowsong"] = {
			["macros"] = {
				[121] = {
					["icon"] = "134400",
					["name"] = "GINV",
					["body"] = "/script n=GetNumWhoResults(); i=1; while(i<n+1) do c,g=GetWhoInfo(i); if(g==\"\") then GuildInvite(c); end; i=i+1; end;\n",
				},
				[122] = {
					["icon"] = "132289",
					["name"] = "SNIPER",
					["body"] = "/run local p1,p2=\"~Gewey\",\"sniper\" if(TSM_API.GetActiveProfile() == p1) then p1=p2 end TSM_API.SetActiveProfile(p1) print(\"Switched to profile: \"..p1)\n",
				},
				[123] = {
					["icon"] = "132281",
					["name"] = "VuhDoDCShieldData",
					["body"] = "P[x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x]1RM[x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x]\n",
				},
				[124] = {
					["icon"] = "132281",
					["name"] = "VuhDoDCShieldNames",
					["body"] = "N[x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x]Chr[x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x][x]\n",
				},
			},
		},
		["Eleryla - Thrall"] = {
			["macros"] = {
				[122] = {
					["name"] = "2",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use Celebration Firework\n/cast [@mouseover, noharm] Heal; [@mouseover] Smite\n",
				},
				[126] = {
					["name"] = "F",
					["icon"] = "135994",
					["body"] = "/cast Fade\n/cast Halo\n",
				},
				[123] = {
					["name"] = "3",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use Celebration Firework\n/cast [@mouseover, noharm] Prayer of Healing; [@mouseover] Holy Fire\n",
				},
				[127] = {
					["name"] = "N!",
					["icon"] = "135894",
					["body"] = "#Showtooltip\n/cast [@mouseover, noharm] Purify; [@mouseover] Dispel Magic\n",
				},
				[124] = {
					["name"] = "6",
					["icon"] = "237540",
					["body"] = "#Showtooltip\n/cast Divine Hymn\n",
				},
				[128] = {
					["name"] = "N2",
					["icon"] = "135937",
					["body"] = "#showtooltip\n/cast [@mouseover, harm] Holy Word: Chastise; [@mouseover] Holy Word: Serenity\n",
				},
				[121] = {
					["name"] = "1",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use Celebration Firework\n/cast [@mouseover, noharm] Flash Heal; [@mouseover] Shadow Word: Pain\n",
				},
				[125] = {
					["name"] = "`",
					["icon"] = "237541",
					["body"] = "#showtooltip\n/cast [@mouseover, exists, harm]Shadow Word: Death ; [@cursor] Holy Word: Sanctify\n",
				},
				[130] = {
					["name"] = "R",
					["icon"] = "135944",
					["body"] = "#showtooltip\n/cast [@mouseover, noharm]Prayer of Mending; [@mouseover] Smite\n",
				},
				[129] = {
					["name"] = "N5",
					["icon"] = "135940",
					["body"] = "#showtooltip\n/cast [@mouseover, harm]; [@mouseover] Power Word: Shield\n",
				},
			},
		},
		["Christar - Thrall"] = {
			["macros"] = {
			},
		},
		["Légere - Thrall"] = {
			["macros"] = {
				[127] = {
					["name"] = "N2",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [harm,nodead]Avenger's Shield\n/use [harm,nodead]Hand of Reckoning\n/use [nodead,help]Blessing of Freedom\n/use [dead,help]Redemption\n/cleartarget [harm,dead]\n",
				},
				[122] = {
					["name"] = "2",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [harm,nodead]Judgment\n/use [nodead,help]Blessing of Sacrifice\n/cleartarget [dead]\n",
				},
				[124] = {
					["name"] = "5",
					["icon"] = "135875",
					["body"] = "#showtooltip\n/use Avenging Wrath\n/use 13\n/use 14\n/cleartarget [dead]\n",
				},
				[126] = {
					["name"] = "N2",
					["icon"] = "413588",
					["body"] = "/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end\n/use [combat][indoors][mod] Divine Steed; [mounted] Goblin Glider Kit; [nomounted] Mount Up\n",
				},
				[121] = {
					["name"] = "1",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [harm,nodead]Avenger's Shield\n/use [harm,nodead]Hand of Reckoning\n/use [nodead,help]Blessing of Freedom\n/use [dead,help]Redemption\n/cleartarget [harm,dead]\n",
				},
				[123] = {
					["name"] = "3",
					["icon"] = "236253",
					["body"] = "/cleartarget [dead]\n/assist focus [noexists][help]\n/targetenemy [noexists][help][dead]\n/startattack\n/cast Crusader Strike\n/script UIErrorsFrame:Clear()\n",
				},
				[125] = {
					["name"] = "N2",
					["icon"] = "135907",
					["body"] = "#Showtooltip\n/cast [@mouseover, harm] Hammer of Justice; [@player] Flash of Light\n",
				},
				[128] = {
					["name"] = "N6 - Freedom",
					["icon"] = "135968",
					["body"] = "#showtooltip\n/cast [@mouseover, noharm, nodead, exists] Blessing of Freedom; [@player] Blessing of Freedom\n",
				},
			},
		},
	},
	["global"] = {
		["extended"] = {
			["1"] = {
				["icon"] = "413587",
				["name"] = "$Tracking",
				["body"] = "/script a = GetItemCount(\"Lost Sole\"); print(a..\" Lost Sole Looted\")\n\n/script a = GetItemCount(\"Pocked Bonefish\");print(a..\" Pocked Bonefish Looted\")\n\n/script a = GetItemCount(\"Elysian Thade\"); print(a..\" Elysian Thade Looted\")",
			},
		},
		["extra"] = {
			["1001"] = {
				["body"] = "",
				["name"] = "test",
				["texture"] = "INV_Misc_QuestionMark",
			},
		},
		["backups"] = {
		},
		["ebackups"] = {
		},
		["allcharmacros"] = true,
	},
	["profileKeys"] = {
		["Nahko - Shadowsong"] = "profile",
		["Karkol - Thrall"] = "profile",
		["Loremeister - Thrall"] = "profile",
		["Tandieu - Hyjal"] = "profile",
		["Christar - Hyjal"] = "profile",
		["Quazzarr - Thrall"] = "profile",
		["Nahko - Thrall"] = "profile",
		["Eleryla - Thrall"] = "profile",
		["Tandu - Thrall"] = "profile",
		["Tandu - Shadowsong"] = "profile",
		["Bullscht - Hyjal"] = "profile",
		["Christar - Shadowsong"] = "profile",
		["Légere - Thrall"] = "profile",
		["Christar - Thrall"] = "profile",
		["Fortehmogs - Hyjal"] = "profile",
	},
	["profiles"] = {
		["profile"] = {
			["x"] = 755.626220703125,
			["noskin"] = true,
			["visconditions"] = true,
			["fonts"] = {
				["edfont"] = "Continuum Medium",
				["edsize"] = 12,
				["mfont"] = "Continuum Medium",
				["mifont"] = "Continuum Medium",
				["misize"] = 15,
				["errsize"] = 12,
				["errfont"] = "Continuum Medium",
			},
			["y"] = 396.2380981445313,
			["hidepopup"] = true,
		},
	},
}
