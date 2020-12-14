
RSADB = {
	["namespaces"] = {
		["LibDualSpec-1.0"] = {
		},
	},
	["global"] = {
		["ID"] = "1448520341714",
		["revision"] = "542",
		["version"] = 4,
		["releaseType"] = "Release",
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
		["Mnuchin - Thrall"] = "ROGUE",
		["Tandu - Thrall"] = "HUNTER",
		["Obsequy - Thrall"] = "MONK",
		["Mortesque - Thrall"] = "DEATHKNIGHT",
		["Christar - Hyjal"] = "MAGE",
		["Eleryla - Thrall"] = "PRIEST",
		["Phizzle - Thrall"] = "MAGE",
		["Tandieu - Hyjal"] = "HUNTER",
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
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["Mage"] = true,
			},
			["General"] = {
				["Class"] = "MAGE",
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
						["SmartGroup"] = false,
						["Messages"] = {
							["Start"] = {
								"LET'S DO THE [LINK] AGAIN!", -- [1]
							},
						},
						["Yell"] = true,
					},
					["Counterspell"] = {
						["SmartGroup"] = false,
						["Emote"] = true,
						["Yell"] = false,
					},
					["SlowFall"] = {
						["Whisper"] = false,
					},
					["RemoveCurse"] = {
						["Emote"] = true,
					},
				},
			},
			["Fixed"] = true,
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
						["SmartGroup"] = false,
						["Whisper"] = false,
						["Say"] = true,
					},
					["Feasts"] = {
						["SmartGroup"] = false,
						["Yell"] = true,
					},
				},
			},
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
		["HUNTER"] = {
			["General"] = {
				["Class"] = "HUNTER",
			},
			["Modules"] = {
				["Racials"] = true,
				["Utilities"] = true,
				["Hunter"] = true,
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
					["SilencingShot"] = {
						["Emote"] = true,
						["SmartGroup"] = false,
					},
					["FreezingTrap"] = {
						["Say"] = true,
					},
					["Tranq"] = {
						["Emote"] = true,
					},
					["BindingShot"] = {
						["Emote"] = true,
					},
				},
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
	},
}
