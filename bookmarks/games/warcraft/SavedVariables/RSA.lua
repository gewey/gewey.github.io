
RSADB = {
	["namespaces"] = {
		["LibDualSpec-1.0"] = {
		},
	},
	["profileKeys"] = {
		["Nahko - Shadowsong"] = "DRUID",
		["Karkol - Shadowsong"] = "MAGE",
		["Bullscht - Hyjal"] = "WARRIOR",
		["Christar - Shadowsong"] = "ROGUE",
		["Légere - Thrall"] = "PALADIN",
		["Christar - Thrall"] = "ROGUE",
		["Fortehmogs - Hyjal"] = "PRIEST",
		["Karkol - Thrall"] = "MAGE",
		["Loremeister - Thrall"] = "SHAMAN",
		["Quazzarr - Thrall"] = "WARLOCK",
		["Nahko - Thrall"] = "DRUID",
		["Tandieu - Hyjal"] = "HUNTER",
		["Tandu - Thrall"] = "HUNTER",
		["Obsequy - Thrall"] = "MONK",
		["Phizzle - Thrall"] = "MAGE",
		["Christar - Hyjal"] = "MAGE",
		["Eleryla - Thrall"] = "PRIEST",
		["Mortesque - Thrall"] = "DEATHKNIGHT",
		["Mnuchin - Thrall"] = "ROGUE",
	},
	["global"] = {
		["ID"] = "1448520341714",
		["revision"] = "542",
		["version"] = 4,
		["releaseType"] = "Release",
	},
	["profiles"] = {
		["DEATHKNIGHT"] = {
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["DeathKnight"] = true,
			},
			["Fixed"] = true,
			["General"] = {
				["Class"] = "DEATHKNIGHT",
			},
		},
		["WARRIOR"] = {
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["Warrior"] = true,
			},
			["Fixed"] = true,
			["General"] = {
				["Class"] = "WARRIOR",
			},
		},
		["SHAMAN"] = {
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["Shaman"] = true,
			},
			["Fixed"] = true,
			["General"] = {
				["Class"] = "SHAMAN",
			},
		},
		["MAGE"] = {
			["General"] = {
				["Class"] = "MAGE",
			},
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["Mage"] = true,
			},
			["Mage"] = {
				["Spells"] = {
					["RefreshmentTable"] = {
						["Say"] = true,
					},
					["Spellsteal"] = {
						["Emote"] = true,
					},
					["Teleport"] = {
						["Local"] = false,
					},
					["Portals"] = {
						["Yell"] = true,
					},
					["Polymorph"] = {
						["Yell"] = true,
					},
					["TimeWarp"] = {
						["Messages"] = {
							["Start"] = {
								"LET'S DO THE [LINK] AGAIN!", -- [1]
							},
						},
						["SmartGroup"] = false,
						["Yell"] = true,
					},
					["Counterspell"] = {
						["Emote"] = true,
						["SmartGroup"] = false,
						["Yell"] = false,
					},
					["RemoveCurse"] = {
						["Emote"] = true,
					},
					["SlowFall"] = {
						["Whisper"] = false,
					},
				},
			},
			["Utilities"] = {
				["Spells"] = {
					["Cauldrons"] = {
						["SmartGroup"] = false,
						["Yell"] = true,
					},
					["Jeeves"] = {
						["SmartGroup"] = false,
						["Yell"] = true,
					},
					["Codex"] = {
						["Yell"] = true,
					},
					["Drums"] = {
						["SmartGroup"] = false,
						["Yell"] = true,
					},
					["EngineerRessBFA"] = {
						["Whisper"] = false,
						["Say"] = true,
						["SmartGroup"] = false,
					},
					["Feasts"] = {
						["SmartGroup"] = false,
						["Yell"] = true,
					},
				},
			},
			["Fixed"] = true,
		},
		["PRIEST"] = {
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
			},
			["Fixed"] = true,
			["General"] = {
				["Class"] = "PRIEST",
			},
		},
		["WARLOCK"] = {
			["Modules"] = {
				["Racials"] = true,
				["Warlock"] = true,
				["Utilities"] = true,
			},
			["Fixed"] = true,
			["General"] = {
				["Class"] = "WARLOCK",
			},
		},
		["PALADIN"] = {
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["Paladin"] = true,
			},
			["Fixed"] = true,
			["General"] = {
				["Class"] = "PALADIN",
			},
		},
		["ROGUE"] = {
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["Rogue"] = true,
			},
			["Fixed"] = true,
			["General"] = {
				["Class"] = "ROGUE",
			},
		},
		["DRUID"] = {
			["Modules"] = {
				["Racials"] = true,
				["Druid"] = true,
				["Utilities"] = true,
			},
			["Fixed"] = true,
			["General"] = {
				["Class"] = "DRUID",
			},
		},
		["MONK"] = {
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["Monk"] = true,
			},
			["Fixed"] = true,
			["General"] = {
				["Class"] = "MONK",
			},
		},
		["HUNTER"] = {
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["Hunter"] = true,
			},
			["General"] = {
				["Class"] = "HUNTER",
			},
			["Fixed"] = true,
			["Utilities"] = {
				["Spells"] = {
					["Cauldrons"] = {
						["Yell"] = true,
					},
					["Jeeves"] = {
						["Yell"] = true,
					},
					["Codex"] = {
						["Yell"] = true,
					},
					["Drums"] = {
						["Yell"] = true,
					},
					["EngineerRessBFA"] = {
						["SmartGroup"] = false,
						["Whisper"] = false,
					},
					["Feasts"] = {
						["Yell"] = true,
					},
				},
			},
			["Hunter"] = {
				["Spells"] = {
					["Tranq"] = {
						["Emote"] = true,
					},
					["SilencingShot"] = {
						["Emote"] = true,
						["SmartGroup"] = false,
					},
					["BindingShot"] = {
						["Emote"] = true,
					},
					["FreezingTrap"] = {
						["Say"] = true,
					},
				},
			},
		},
	},
}
