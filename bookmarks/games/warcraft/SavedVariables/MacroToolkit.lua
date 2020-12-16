
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
		["Karkol - Hyjal"] = {
			["macros"] = {
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
					["body"] = "#showtooltip misdirection\n/use [@focus,help,nodead][@pet,nodead][@none]Aqir Egg Cluster\n/use [@focus,help,nodead][@pet,nodead][@none]Misdirection\n/use [@focus,help,nodead][@pet,nodead][@none]Spirit Mend(Exotic Ability)\n/use Mend Pet\n",
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
					["body"] = "#showtooltip aspect of the cheetah\n/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end\n/use [combat][indoors][mod]Aspect of the Cheetah\n/use Moonfang's Paw\n",
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
					["body"] = "#showtooltip Feign Death\n/use The Necronom-i-nom\n/use Feign Death\n/use play dead\n",
				},
				[137] = {
					["icon"] = "132218",
					["name"] = "R/T",
					["body"] = "#showtooltip\n/use [spec:1,talent:7/1]Arcane Shot;[spec:1,talent:7/2]Arcane Shot;[spec:1,talent:7/3]Bloodshed;[spec:2]Arcane Shot\n",
				},
				[121] = {
					["icon"] = "1738657",
					["name"] = "#N*",
					["body"] = "#showtooltip aspect of the turtle\n/use Barnacle-Encrusted Gem\n/use Aspect of the Turtle\n/use [@player]Tar Trap\n/use 15\n/use [pet:SpiritBeast,@player]Spirit Mend;[pet:Gadget,@player]Master's Call(Cunning Ability)\n/use Foul Belly\n",
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
					["body"] = "/use [spec:1,talent:6/2]Barrage;[spec:3]Wildfire Bomb\n/castsequence [@cursor] reset=10 Tar Trap, Flare\n/use Azerite Firework Launcher\n",
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
		["Légere - Thrall"] = {
			["macros"] = {
				[122] = {
					["name"] = "2",
					["icon"] = "135959",
					["body"] = "#showtooltip\n/use judgment\n",
				},
				[126] = {
					["name"] = "G",
					["icon"] = "135984",
					["body"] = "/use Hand of Reckoning\n",
				},
				[123] = {
					["name"] = "3",
					["icon"] = "236253",
					["body"] = "/cleartarget [dead]\n/assist focus [noexists][help]\n/targetenemy [noexists][help][dead]\n/startattack\n/cast Crusader Strike\n/script UIErrorsFrame:Clear()\n",
				},
				[127] = {
					["name"] = "N2",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [harm,nodead]Avenger's Shield\n/use [harm,nodead]Hand of Reckoning\n/use [nodead,help]Blessing of Freedom\n/use [dead,help]Redemption\n/cleartarget [harm,dead]\n",
				},
				[124] = {
					["name"] = "4",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [harm,nodead]Shield of the Righteous\n/use [harm,nodead]Consecration\n/use [nodead,help]Blessing of Protection\n/cleartarget [dead]\n",
				},
				[128] = {
					["name"] = "N2",
					["icon"] = "135907",
					["body"] = "#Showtooltip\n/cast [@mouseover, harm] Hammer of Justice; [@player] Flash of Light\n",
				},
				[129] = {
					["name"] = "N2",
					["icon"] = "413588",
					["body"] = "/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end\n/use [combat][indoors][mod] Divine Steed; [mounted] Goblin Glider Kit; [nomounted] Mount Up\n",
				},
				[121] = {
					["name"] = "1",
					["icon"] = "134400",
					["body"] = "#showtooltip\n/use [harm,nodead]Avenger's Shield\n/use [harm,nodead]Hand of Reckoning\n/use [nodead,help]Blessing of Freedom\n/use [dead,help]Redemption\n/cleartarget [harm,dead]\n",
				},
				[125] = {
					["name"] = "5",
					["icon"] = "135875",
					["body"] = "/cast Avenging Wrath\n/startattack\n/use 13\n/use 14\n/use Shadow Crystal Focusing Lens\n",
				},
				[130] = {
					["name"] = "N6 - Freedom",
					["icon"] = "135968",
					["body"] = "#showtooltip\n/cast [@mouseover, noharm, nodead, exists] Blessing of Freedom; [@player] Blessing of Freedom\n",
				},
				[131] = {
					["name"] = "Z",
					["icon"] = "134234",
					["body"] = "#showtooltip\n/use [noexists,nocombat]Unusual Compass\n/use [nodead,help]Lay on Hands\n/cleartarget [dead]\n",
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
	},
	["global"] = {
		["extended"] = {
			["1"] = {
				["icon"] = "413587",
				["name"] = "$Tracking",
				["body"] = "/script a = GetItemCount(\"Lost Sole\"); print(a..\" Lost Sole Looted\")\n\n/script a = GetItemCount(\"Pocked Bonefish\");print(a..\" Pocked Bonefish Looted\")\n\n/script a = GetItemCount(\"Elysian Thade\"); print(a..\" Elysian Thade Looted\")",
			},
		},
		["lastbackup"] = "Dec 16 01:29:37",
		["extra"] = {
			["1001"] = {
				["body"] = "",
				["name"] = "test",
				["texture"] = "INV_Misc_QuestionMark",
			},
		},
		["backups"] = {
			{
				["m"] = {
					{
						["index"] = 1,
						["name"] = "!1",
						["icon"] = 2178508,
						["body"] = "/run SetSpecialization(1)\n",
					}, -- [1]
					{
						["index"] = 2,
						["name"] = "!2",
						["icon"] = 2178501,
						["body"] = "/run SetSpecialization(2)\n",
					}, -- [2]
					{
						["index"] = 3,
						["name"] = "!3",
						["icon"] = 2178502,
						["body"] = "/run SetSpecialization(3)\n",
					}, -- [3]
					{
						["index"] = 4,
						["name"] = "!4",
						["icon"] = 2178503,
						["body"] = "/run SetSpecialization(4)\n",
					}, -- [4]
					{
						["index"] = 5,
						["name"] = "!BLING",
						["icon"] = 1005279,
						["body"] = "/use Azerite Firework Launcher\n/use Robo-Gnomebulator\n/use Blingtron 7000\n/use Blingtron 5000\n/use Wind-Up Train Wrecker\n/use Personal Hologram\n/use Nightmarish Hitching Post\n/use World Shrinker\n",
					}, -- [5]
					{
						["index"] = 6,
						["name"] = "!JUNK",
						["icon"] = 1325312,
						["body"] = "/run for bag=0,4,1 do for slot=1,GetContainerNumSlots(bag),1 do local name=GetContainerItemLink(bag,slot)if name and name:find(\"ff9d9d9d\")then print(\"-Selling \"..name)UseContainerItem(bag,slot)end end end\n",
					}, -- [6]
					{
						["index"] = 7,
						["name"] = "!Scourge",
						["icon"] = 134400,
						["body"] = "/script C_GossipInfo.SelectAvailableQuest(2)\n/script CompleteQuest()\n/script GetQuestReward()\n",
					}, -- [7]
					{
						["index"] = 8,
						["name"] = "!SND",
						["icon"] = 133014,
						["body"] = "/run local x=tonumber(GetCVar(\"Sound_OutputDriverIndex\"))if x==1 then SetCVar(\"Sound_OutputDriverIndex\", \"2\")else SetCVar(\"Sound_OutputDriverIndex\", \"1\")end AudioOptionsFrame_AudioRestart()\n",
					}, -- [8]
					{
						["index"] = 9,
						["name"] = "!STOP",
						["icon"] = 135996,
						["body"] = "/petpassive\n/stopattack\n/stopcasting\n/cast Follow(Pet Command)\n",
					}, -- [9]
					{
						["index"] = 10,
						["name"] = "#ESN",
						["icon"] = 134400,
						["body"] = "#showtooltip\n/use [@mouseover,noharm]Primordial Wave;[@mouseover,harm]Flame Shock\n",
					}, -- [10]
					{
						["index"] = 11,
						["name"] = "#ESN2",
						["icon"] = 134400,
						["body"] = "/use Fleshcraft\n",
					}, -- [11]
					{
						["index"] = 12,
						["name"] = "#ESV",
						["icon"] = 3565719,
						["body"] = "#showtooltip\n/use [@cursor]Flayed Shot(Venthyr)\n",
					}, -- [12]
					{
						["index"] = 13,
						["name"] = "#ESV2",
						["icon"] = 3586270,
						["body"] = "#showtooltip\n/cast [@cursor]Door of Shadows(Venthyr)\n",
					}, -- [13]
					{
						["index"] = 14,
						["name"] = "#Farm",
						["icon"] = 1029718,
						["body"] = "/target Deepcoral Bud\n/target tainted sq\n/startattack\n/castsequence Cobra Shot, Fetch\n/run SetRaidTarget(\"target\", 8)\n",
					}, -- [14]
					{
						["index"] = 15,
						["name"] = "#Hearth",
						["icon"] = 134414,
						["body"] = "#showtooltip Hearthstone\n/castrandom 166747, 172179, 162973, 163045, 165670\n",
					}, -- [15]
					{
						["index"] = 16,
						["name"] = "#Whistle",
						["icon"] = 132161,
						["body"] = "#showtooltip Flight Master's Whistle\n/use Tear of the Green Aspect\n/use Flight Master's Whistle\n",
					}, -- [16]
					{
						["index"] = 17,
						["name"] = "$Arch",
						["icon"] = 134435,
						["body"] = "/minarch show\n/cast Survey\n",
					}, -- [17]
					{
						["index"] = 18,
						["name"] = "$D.E.",
						["icon"] = 132853,
						["body"] = "/run local f=DeM or CreateFrame(\"Button\",\"DeM\",nil,\"SecureActionButtonTemplate\") f:SetAttribute(\"type\",\"click\") f:SetAttribute(\"clickbutton\",GetMouseFocus())\n/cast Disenchant\n/click DeM\n",
					}, -- [18]
					{
						["index"] = 19,
						["name"] = "$Fish",
						["icon"] = 3564352,
						["body"] = "/equip [nogroup]The Brokers Angle'r\n/cast [nocombat,nomod]Fishing; [group][combat]Fetch; [mod] Survey\n/cast Crate of Bobbers: Wooden Pepe\n/click MultiBarLeftButton1\n",
					}, -- [19]
					{
						["index"] = 20,
						["name"] = "$Mill",
						["icon"] = 463461,
						["body"] = "/run local f=DeM or CreateFrame(\"Button\",\"DeM\",nil,\"SecureActionButtonTemplate\") f:SetAttribute(\"type\",\"click\") f:SetAttribute(\"clickbutton\",GetMouseFocus())\n/cast Milling\n/click DeM\n",
					}, -- [20]
					{
						["index"] = 21,
						["name"] = "$Run",
						["icon"] = 132296,
						["body"] = "/run if not MovePadFrame then UIParentLoadAddOn\"Blizzard_MovePad\"MovePadFrame:Hide()end\n/click MovePadForward\n/run if IsMouselooking() then MouselookStop() else MouselookStart() end\n",
					}, -- [21]
					{
						["index"] = 22,
						["name"] = "$Targeting",
						["icon"] = 1380366,
						["body"] = "/tar shade\n/tar infuser\n/tar occu \n",
					}, -- [22]
					{
						["index"] = 23,
						["name"] = "$Tracking",
						["icon"] = 413587,
						["body"] = "",
					}, -- [23]
					{
						["index"] = 24,
						["name"] = "**Melee template",
						["icon"] = 132418,
						["body"] = "/cleartarget [dead]\n/assist focus [noexists][help]\n/targetenemy [noexists][help][dead]\n/startattack\n/cast Crusader Strike\n/script UIErrorsFrame:Clear()\n",
					}, -- [24]
					{
						["index"] = 25,
						["name"] = "*ArcF",
						["icon"] = 134400,
						["body"] = "/cleartarget [dead]\n/use [harm,nodead]Polymorph(Sheep)\n/use [nodead,help]The Pigskin\n/script UIErrorsFrame:Clear()\n",
					}, -- [25]
					{
						["index"] = 26,
						["name"] = "*Prst Mount",
						["icon"] = 236236,
						["body"] = "#showtooltip\n/cast [nomounted, nocombat] Flying Carpet; [combat] Power Word: Shield; [indoors] Power Word: Shield\n/dismount\n/cast [@player] Levitate\n",
					}, -- [26]
					{
						["index"] = 27,
						["name"] = "*RDr`",
						["icon"] = 134400,
						["body"] = "/assist [help]\n/cast [@targettarget][harm] Sunfire(Solar)\n",
					}, -- [27]
					{
						["index"] = 28,
						["name"] = "*rDrQ",
						["icon"] = 134400,
						["body"] = "/assist [help]\n/use [harm] Mass Entanglement\n",
					}, -- [28]
					{
						["index"] = 29,
						["name"] = "*Rg Pick Pocket",
						["icon"] = 134400,
						["body"] = "#showtooltip\n/targetenemy\n/cast [stealth] Pick Pocket\n",
					}, -- [29]
					{
						["index"] = 30,
						["name"] = "*Rg PP SAP",
						["icon"] = 134400,
						["body"] = "/cast [stealth, nocombat] Sap\n/cast [stealth] Pick Pocket\n/cast [nostealth] !stealth\n",
					}, -- [30]
					{
						["index"] = 31,
						["name"] = "*Rg RUN!",
						["icon"] = 134400,
						["body"] = "#showtooltip\n/stopattack\n/cast [combat] Evasion\n/cast Sprint\n/cast [combat] !Vanish\n",
					}, -- [31]
					{
						["index"] = 32,
						["name"] = "*RgQ",
						["icon"] = 134400,
						["body"] = "#show 1100023\n/cast [nostealth, nocombat] !Stealth\n/cast [nostealth, combat] !vanish\n/cast [stealth] Distract\n",
					}, -- [32]
					{
						["index"] = 33,
						["name"] = "*Sdw2",
						["icon"] = 134400,
						["body"] = "",
					}, -- [33]
					{
						["index"] = 34,
						["name"] = "*Ven1",
						["icon"] = 458241,
						["body"] = "#showtooltip\n/use [noexists,nocombat]Druid and Priest Statue Set\n/use [harm,nodead]Throw Glaive\n/use [harm,nodead]Consume Magic\n/use [nodead,help]Blessing of Freedom\n/use [dead,help]Redemption\n/cleartarget [harm,dead]\n",
					}, -- [34]
					{
						["index"] = 35,
						["name"] = "*Ven2",
						["icon"] = 133709,
						["body"] = "#showtooltip\n/use [noexists,nocombat]Photo B.O.M.B.\n/use [harm,nodead,@target]Shear\n/use [nodead,help]Blessing of Sacrifice\n/cleartarget [dead]\n",
					}, -- [35]
					{
						["index"] = 36,
						["name"] = "*Ven3",
						["icon"] = 134400,
						["body"] = "#showtooltip\n/cleartarget [dead]\n/assist focus [noexists][help]\n/targetenemy [noexists][help][dead]\n/startattack\n/cast Soul Cleave\n/script UIErrorsFrame:Clear()\n",
					}, -- [36]
					{
						["index"] = 37,
						["name"] = "*Ww1",
						["icon"] = 134400,
						["body"] = "#showtooltip\n/use [harm,nodead] chi wave\n/use [noharm,nodead] Effuse\n/use [noharm,dead] Resuscitate\n/script a = GetItemCount(\"Dread Amber Shards\"); if a==b then b=a else print(a..\" Dread Amber Shards Looted\"); b=a end\n",
					}, -- [37]
					{
						["index"] = 38,
						["name"] = "*Ww2",
						["icon"] = 134400,
						["body"] = "/cleartarget [dead]\n/assist focus [noexists][help]\n/targetenemy [noexists][help][dead]\n/startattack\n/cast Tiger Palm\n/script UIErrorsFrame:Clear()\n",
					}, -- [38]
					{
						["index"] = 39,
						["name"] = "/15",
						["icon"] = 3565984,
						["body"] = "#showtooltip\n/use 15\n",
					}, -- [39]
					{
						["index"] = 40,
						["name"] = "/6",
						["icon"] = 3390735,
						["body"] = "#showtooltip\n/use 6\n/use Goren Garb\n",
					}, -- [40]
					{
						["index"] = 41,
						["name"] = "/AQT",
						["icon"] = 132096,
						["body"] = "/console autoQuestWatch 1\n/reload ui\n",
					}, -- [41]
					{
						["index"] = 42,
						["name"] = "/Elv",
						["icon"] = 2027568,
						["body"] = "/elvui\n",
					}, -- [42]
					{
						["index"] = 43,
						["name"] = "/lootspecmanager",
						["icon"] = 133648,
						["body"] = "/ltsm\n",
					}, -- [43]
					{
						["index"] = 44,
						["name"] = "/routes",
						["icon"] = 134269,
						["body"] = "/routes\n",
					}, -- [44]
					{
						["index"] = 45,
						["name"] = "/s Wicked",
						["icon"] = 2056011,
						["body"] = "/s https://www.worldofwarcraft.com/invite/dyZEx4bHnoz?region=US&faction=Horde\n/s https://discord.gg/bPy5exyYpS\n",
					}, -- [45]
					{
						["index"] = 46,
						["name"] = "/tar @mouse",
						["icon"] = 236199,
						["body"] = "/focus [@mouseover]\n",
					}, -- [46]
					{
						["index"] = 47,
						["name"] = "/TSM",
						["icon"] = 134063,
						["body"] = "/tsm\n",
					}, -- [47]
					{
						["index"] = 48,
						["name"] = "/WQA",
						["icon"] = 132093,
						["body"] = "/wqa\n",
					}, -- [48]
					{
						["index"] = 49,
						["name"] = "@Banker",
						["icon"] = 134571,
						["body"] = "/acp addset 25\n/reload ui\n",
					}, -- [49]
					{
						["index"] = 50,
						["name"] = "@NO RAID",
						["icon"] = 135490,
						["body"] = "/acp enableall\n/acp enableall\n/acp enableall\n/acp enableall\n",
					}, -- [50]
					{
						["index"] = 51,
						["name"] = "@Raid",
						["icon"] = 1380676,
						["body"] = "/acp disableall\n/acp disableall\n/acp disableall\n/reload ui\n",
					}, -- [51]
					{
						["index"] = 52,
						["name"] = "ab?",
						["icon"] = 134400,
						["body"] = "/click ActionButton1\n/click[@cursor]\n",
					}, -- [52]
					{
						["index"] = 53,
						["name"] = "AutoHP",
						["icon"] = 134414,
						["body"] = "#showtooltip\n/cast [combat] item:171267; item:6948\n",
					}, -- [53]
					{
						["index"] = 54,
						["name"] = "AutoMP",
						["icon"] = 134414,
						["body"] = "#showtooltip\n/cast item:6948\n",
					}, -- [54]
					{
						["index"] = 55,
						["name"] = "ConsumableHP",
						["icon"] = 3566860,
						["body"] = "#showtooltip\n/cast item:171267\n",
					}, -- [55]
					{
						["index"] = 56,
						["name"] = "ConsumableMP",
						["icon"] = 134414,
						["body"] = "#showtooltip\n/cast item:6948\n",
					}, -- [56]
					{
						["index"] = 57,
						["name"] = "DrinkOnlyMP",
						["icon"] = 134414,
						["body"] = "#showtooltip\n/cast item:6948\n",
					}, -- [57]
					{
						["index"] = 58,
						["name"] = "FoodOnlyHP",
						["icon"] = 134414,
						["body"] = "#showtooltip\n/cast item:6948\n",
					}, -- [58]
					{
						["index"] = 59,
						["name"] = "HearthRoulette",
						["icon"] = 413582,
						["body"] = "#showtooltip\n/cast Headless Horseman's Hearthstone",
					}, -- [59]
					{
						["index"] = 60,
						["name"] = "ReZ",
						["icon"] = 237296,
						["body"] = "/use [@mouseover, combat] Disposable Spectrophasic Reanimator; [@mouseover, nocombat] Ultimate Gnomish Army Knife\n/use [@mouseover, combat] Spirit Mend(Exotic Ability); [@mouseover, nocombat] Drust Ritual Knife\n",
					}, -- [60]
					{
						["index"] = 61,
						["name"] = "TOYSPLOSION",
						["icon"] = 134511,
						["body"] = "/use Black Ice\n/use coin of many faces\n",
					}, -- [61]
					{
						["index"] = 62,
						["name"] = "TSMMacro",
						["icon"] = 643910,
						["body"] = "/click TSMCancelAuctionBtn\n/click TSMShoppingBuyoutBtn\n/click TSMSniperBtn\n/click TSMAuctioningBtn\n/click TSMCraftingBtn\n",
					}, -- [62]
					{
						["index"] = 63,
						["name"] = "WAYDUMP",
						["icon"] = 236179,
						["body"] = "/way 38.86 60.05 Gardener's Wand\n/way 38.49 58.07 Gardener's Flute\n/way 38.99 56.99 Diary of the Night (On top platform)\n/way 40.11 53.70 Road up the trees\n/way 39.76 54.46  Gardener's Hammer\n/way 40.30 52.65 Gardener's Basket\n/way 63.90 37.53 Twinklestar\n",
					}, -- [63]
					{
						["index"] = 64,
						["name"] = "wm1",
						["icon"] = 134400,
						["body"] = "/worldmarker 1\n",
					}, -- [64]
					{
						["index"] = 65,
						["name"] = "~!umod",
						["icon"] = 327916,
						["body"] = "/targetlasttarget [@target,dead]\n",
					}, -- [65]
					{
						["index"] = 66,
						["name"] = "~AB1",
						["icon"] = 134400,
						["body"] = "#show ExtraActionButton1\n/click ExtraActionButton1\n",
					}, -- [66]
					{
						["index"] = 67,
						["name"] = "~MNT",
						["icon"] = 134400,
						["body"] = "/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end\n/use [combat][indoors][mod] Burning Rush; [mounted] Goblin Glider Kit; [nomounted] Mount Up\n",
					}, -- [67]
					{
						["index"] = 68,
						["name"] = "~skull",
						["icon"] = 237272,
						["body"] = "/run SetRaidTarget(\"target\", 8)\n",
					}, -- [68]
				},
				["d"] = "Dec 16 01:29:37",
				["n"] = "12 16 20",
			}, -- [1]
		},
		["ebackups"] = {
		},
		["allcharmacros"] = true,
	},
	["profileKeys"] = {
		["Karkol - Hyjal"] = "profile",
		["Nahko - Shadowsong"] = "profile",
		["Karkol - Thrall"] = "profile",
		["Loremeister - Thrall"] = "profile",
		["Nahko - Thrall"] = "profile",
		["Eleryla - Thrall"] = "profile",
		["Quazzarr - Thrall"] = "profile",
		["Tandieu - Hyjal"] = "profile",
		["Christar - Hyjal"] = "profile",
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
			["x"] = 529.34130859375,
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
			["y"] = 397.0002746582031,
			["hidepopup"] = true,
		},
	},
}
