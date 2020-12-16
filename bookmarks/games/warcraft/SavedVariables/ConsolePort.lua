
ConsolePortSettings = {
	["tutorialProgress"] = 4,
}
ConsolePortDevices = {
	["PlayStation 4"] = {
		["Config"] = {
			["rawAxisMappings"] = {
				{
					["rawIndex"] = 0,
					["axis"] = "LStickX",
				}, -- [1]
				{
					["rawIndex"] = 1,
					["axis"] = "LStickY",
				}, -- [2]
				{
					["rawIndex"] = 2,
					["axis"] = "RStickX",
				}, -- [3]
				{
					["rawIndex"] = 3,
					["axis"] = "LTrigger",
				}, -- [4]
				{
					["rawIndex"] = 4,
					["axis"] = "RTrigger",
				}, -- [5]
				{
					["rawIndex"] = 5,
					["axis"] = "RStickY",
				}, -- [6]
			},
			["axisConfigs"] = {
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "LStickLeft",
					["scale"] = -2,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LStickRight",
					["axis"] = "LStickY",
				}, -- [1]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "LStickDown",
					["scale"] = -2,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LStickUp",
					["axis"] = "RStickY",
				}, -- [2]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "RStickLeft",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RStickRight",
					["axis"] = "RStickX",
				}, -- [3]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "RStickDown",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RStickUp",
					["axis"] = "RStickY",
				}, -- [4]
				{
					["deadzone"] = 0.05,
					["axis"] = "GStickX",
				}, -- [5]
				{
					["deadzone"] = 0.05,
					["axis"] = "GStickY",
				}, -- [6]
				{
					["deadzone"] = 0.12,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LTrigger",
					["axis"] = "LTrigger",
				}, -- [7]
				{
					["deadzone"] = 0.12,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RTrigger",
					["axis"] = "RTrigger",
				}, -- [8]
			},
			["name"] = "PlayStation 4",
			["configID"] = {
				["vendorID"] = 1356,
			},
			["stickConfigs"] = {
				{
					["deadzone"] = 0.25,
					["stick"] = "Left",
					["axisX"] = "LStickX",
					["axisY"] = "LStickY",
				}, -- [1]
				{
					["deadzone"] = 0.25,
					["stick"] = "Right",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [2]
				{
					["deadzone"] = 0.25,
					["stick"] = "Gyro",
					["axisX"] = "GStickX",
					["axisY"] = "GStickY",
				}, -- [3]
				{
					["deadzone"] = 0.25,
					["stick"] = "Movement",
					["axisX"] = "LStickX",
					["axisY"] = "LStickY",
				}, -- [4]
				{
					["deadzone"] = 0.25,
					["stick"] = "Camera",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [5]
				{
					["deadzone"] = 0.25,
					["stick"] = "Cursor",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [6]
			},
			["rawButtonMappings"] = {
				{
					["rawIndex"] = 0,
					["comment"] = "Square",
					["button"] = "Face3",
				}, -- [1]
				{
					["rawIndex"] = 1,
					["comment"] = "Cross",
					["button"] = "Face1",
				}, -- [2]
				{
					["rawIndex"] = 2,
					["comment"] = "Circle",
					["button"] = "Face2",
				}, -- [3]
				{
					["rawIndex"] = 3,
					["comment"] = "Triangle",
					["button"] = "Face4",
				}, -- [4]
				{
					["rawIndex"] = 4,
					["comment"] = "L1",
					["button"] = "LShoulder",
				}, -- [5]
				{
					["rawIndex"] = 5,
					["comment"] = "R2",
					["button"] = "RShoulder",
				}, -- [6]
				{
					["rawIndex"] = 6,
					["comment"] = "immediate L2 (disabled so we can control trigger point)",
					["button"] = "None",
				}, -- [7]
				{
					["rawIndex"] = 7,
					["comment"] = "immediate R2 (disabled so we can control trigger point)",
					["button"] = "None",
				}, -- [8]
				{
					["rawIndex"] = 8,
					["comment"] = "Share",
					["button"] = "Social",
				}, -- [9]
				{
					["rawIndex"] = 9,
					["comment"] = "Options",
					["button"] = "Forward",
				}, -- [10]
				{
					["rawIndex"] = 10,
					["button"] = "LStickIn",
				}, -- [11]
				{
					["rawIndex"] = 11,
					["button"] = "RStickIn",
				}, -- [12]
				{
					["rawIndex"] = 12,
					["comment"] = "PS button",
					["button"] = "System",
				}, -- [13]
				{
					["rawIndex"] = 13,
					["comment"] = "Touchpad",
					["button"] = "Back",
				}, -- [14]
				{
					["rawIndex"] = 14,
					["comment"] = "D-Pad Up",
					["button"] = "Up",
				}, -- [15]
				{
					["rawIndex"] = 15,
					["comment"] = "D-Pad Right",
					["button"] = "Right",
				}, -- [16]
				{
					["rawIndex"] = 16,
					["comment"] = "D-Pad Down",
					["button"] = "Down",
				}, -- [17]
				{
					["rawIndex"] = 17,
					["comment"] = "D-Pad Left",
					["button"] = "Left",
				}, -- [18]
			},
		},
		["Name"] = "PlayStation 4",
		["Theme"] = {
			["Icons"] = {
				["PADRTRIGGER"] = "PlayStation/R2",
				["PADLTRIGGER"] = "PlayStation/L2",
				["PADDDOWN"] = "All/Down",
				["PAD4"] = "PlayStation/Triangle",
				["PAD2"] = "PlayStation/Circle",
				["PADDRIGHT"] = "All/Right",
				["PADDLEFT"] = "All/Left",
				["PADSYSTEM"] = "PlayStation/System",
				["PADBACK"] = "PlayStation/Back",
				["PADLSTICK"] = "PlayStation/L3",
				["PADRSTICK"] = "PlayStation/R3",
				["PADDUP"] = "All/Up",
				["PAD1"] = "PlayStation/Cross",
				["PADFORWARD"] = "PlayStation/Options",
				["PADRSHOULDER"] = "PlayStation/R1",
				["PADLSHOULDER"] = "PlayStation/L1",
				["PADSOCIAL"] = "PlayStation/Share",
				["PAD3"] = "PlayStation/Square",
			},
			["Layout"] = {
				["PADRTRIGGER"] = 34,
				["PADLTRIGGER"] = 18,
				["PADDDOWN"] = 21,
				["PAD4"] = 35,
				["PADSOCIAL"] = 23,
				["PADDRIGHT"] = 22,
				["PADDLEFT"] = 20,
				["PADSYSTEM"] = 50,
				["PADBACK"] = 65,
				["PADLSTICK"] = 24,
				["PADRSTICK"] = 40,
				["PADDUP"] = 19,
				["PAD1"] = 37,
				["PADFORWARD"] = 39,
				["PADRSHOULDER"] = 33,
				["PADLSHOULDER"] = 17,
				["PAD3"] = 38,
				["PAD2"] = 36,
			},
			["Colors"] = {
				["PAD1"] = "6882A1",
				["PAD3"] = "D35280",
				["PAD4"] = "62BBB2",
				["PAD2"] = "D84E58",
			},
			["Label"] = "SHP",
		},
		["Preset"] = {
			["Variables"] = {
				["GamePadAbbreviatedBindingReverse"] = 0,
				["GamePadEmulateAlt"] = "none",
				["GamePadEmulateCtrl"] = "PADLTRIGGER",
				["GamePadCursorRightClick"] = "PADRSTICK",
				["GamePadCursorLeftClick"] = "PADLSTICK",
				["GamePadEmulateShift"] = "PADLSHOULDER",
				["GamePadEmulateEsc"] = "none",
			},
			["Bindings"] = {
				["PADLSTICK"] = {
					[""] = "CAMERAORSELECTORMOVE",
				},
				["PADRSTICK"] = {
					[""] = "TURNORACTION",
				},
				["PADDUP"] = {
					[""] = "MULTIACTIONBAR1BUTTON12",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON2",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON6",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON10",
				},
				["PAD1"] = {
					[""] = "JUMP",
					["SHIFT-"] = "ACTIONBUTTON9",
					["CTRL-"] = "EXTRAACTIONBUTTON1",
					["CTRL-SHIFT-"] = "CLICK ConsolePortUtilityToggle:LeftButton",
				},
				["PADRTRIGGER"] = {
					[""] = "ACTIONBUTTON5",
					["SHIFT-"] = "ACTIONBUTTON10",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON5",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON10",
				},
				["PADSOCIAL"] = {
					[""] = "OPENALLBAGS",
					["SHIFT-"] = "TOGGLECHARACTER0",
					["CTRL-"] = "TOGGLESPELLBOOK",
					["CTRL-SHIFT-"] = "TOGGLETALENTS",
				},
				["PADDLEFT"] = {
					[""] = "MULTIACTIONBAR1BUTTON11",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON1",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON5",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON9",
				},
				["PADDDOWN"] = {
					[""] = "ACTIONBUTTON11",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON4",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON8",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON12",
				},
				["PADFORWARD"] = {
					[""] = "TOGGLEWORLDMAP",
					["SHIFT-"] = "CAMERAZOOMOUT",
					["CTRL-"] = "CAMERAZOOMIN",
				},
				["PADRSHOULDER"] = {
					[""] = "ACTIONBUTTON4",
					["SHIFT-"] = "TARGETSCANENEMY",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON4",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON9",
				},
				["PAD2"] = {
					[""] = "ACTIONBUTTON3",
					["SHIFT-"] = "ACTIONBUTTON8",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON3",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON8",
				},
				["PADDRIGHT"] = {
					[""] = "ACTIONBUTTON12",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON3",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON7",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON11",
				},
				["PAD3"] = {
					[""] = "ACTIONBUTTON1",
					["SHIFT-"] = "ACTIONBUTTON6",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON1",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON6",
				},
				["PADSYSTEM"] = {
					[""] = "TOGGLEGAMEMENU",
					["SHIFT-"] = "CLICK ConsolePortRaidCursorToggle:LeftButton",
					["CTRL-"] = "TOGGLEAUTORUN",
					["CTRL-SHIFT-"] = "OPENCHAT",
				},
				["PAD4"] = {
					[""] = "ACTIONBUTTON2",
					["SHIFT-"] = "ACTIONBUTTON7",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON2",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON7",
				},
			},
		},
		["Icons"] = {
		},
		["Version"] = 2,
	},
	["Xbox"] = {
		["Config"] = {
			["stickConfigs"] = {
				{
					["deadzone"] = 0.25,
					["stick"] = "Left",
					["axisX"] = "LStickX",
					["axisY"] = "LStickY",
				}, -- [1]
				{
					["deadzone"] = 0.25,
					["stick"] = "Right",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [2]
				{
					["deadzone"] = 0.25,
					["stick"] = "Gyro",
					["axisX"] = "GStickX",
					["axisY"] = "GStickY",
				}, -- [3]
				{
					["deadzone"] = 0.25,
					["stick"] = "Movement",
					["axisX"] = "LStickX",
					["axisY"] = "LStickY",
				}, -- [4]
				{
					["deadzone"] = 0.25,
					["stick"] = "Camera",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [5]
				{
					["deadzone"] = 0.25,
					["stick"] = "Cursor",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [6]
			},
			["axisConfigs"] = {
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "LStickLeft",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LStickRight",
					["axis"] = "LStickX",
				}, -- [1]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "LStickDown",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LStickUp",
					["axis"] = "LStickY",
				}, -- [2]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "RStickLeft",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RStickRight",
					["axis"] = "RStickX",
				}, -- [3]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "RStickDown",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RStickUp",
					["axis"] = "RStickY",
				}, -- [4]
				{
					["deadzone"] = 0.05,
					["axis"] = "GStickX",
				}, -- [5]
				{
					["deadzone"] = 0.05,
					["axis"] = "GStickY",
				}, -- [6]
				{
					["deadzone"] = 0.12,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LTrigger",
					["axis"] = "LTrigger",
				}, -- [7]
				{
					["deadzone"] = 0.12,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RTrigger",
					["axis"] = "RTrigger",
				}, -- [8]
			},
			["name"] = "Xbox",
			["configID"] = {
				["vendorID"] = 1118,
			},
		},
		["Name"] = "Xbox",
		["Active"] = true,
		["Theme"] = {
			["Icons"] = {
				["PADPADDLE1"] = "PlayStation/L1",
				["PADRTRIGGER"] = "Xbox/RT",
				["PADLTRIGGER"] = "Xbox/LT",
				["PADDDOWN"] = "All/Down",
				["PAD4"] = "Xbox/Y",
				["PAD2"] = "Xbox/B",
				["PADDRIGHT"] = "All/Right",
				["PADDLEFT"] = "All/Left",
				["PADSYSTEM"] = "Xbox/System",
				["PADBACK"] = "Xbox/Back",
				["PADLSTICK"] = "Xbox/LSB",
				["PADRSTICK"] = "Xbox/RSB",
				["PADDUP"] = "All/Up",
				["PAD1"] = "Xbox/A",
				["PADPADDLE2"] = "PlayStation/L2",
				["PADPADDLE4"] = "PlayStation/R2",
				["PADRSHOULDER"] = "Xbox/RB",
				["PADLSHOULDER"] = "Xbox/LB",
				["PADSOCIAL"] = "Xbox/Share",
				["PADFORWARD"] = "Xbox/Forward",
				["PADPADDLE3"] = "PlayStation/R1",
				["PAD3"] = "Xbox/X",
			},
			["Layout"] = {
				["PADRTRIGGER"] = 33,
				["PADLTRIGGER"] = 17,
				["PADDDOWN"] = 22,
				["PAD4"] = 35,
				["PAD2"] = 36,
				["PADDRIGHT"] = 23,
				["PADDLEFT"] = 21,
				["PADSYSTEM"] = 50,
				["PADBACK"] = 24,
				["PADLSTICK"] = 19,
				["PADRSTICK"] = 39,
				["PADDUP"] = 20,
				["PAD1"] = 37,
				["PADFORWARD"] = 40,
				["PADRSHOULDER"] = 34,
				["PADLSHOULDER"] = 18,
				["PAD3"] = 38,
			},
			["Colors"] = {
				["PADDRIGHT"] = "FA4451",
				["PADDLEFT"] = "00A2FF",
				["PADDUP"] = "FFE74F",
				["PADDDOWN"] = "52C14E",
			},
			["Label"] = "LTR",
		},
		["Preset"] = {
			["Variables"] = {
				["GamePadAbbreviatedBindingReverse"] = 0,
				["GamePadEmulateAlt"] = "none",
				["GamePadEmulateCtrl"] = "PADRTRIGGER",
				["GamePadCursorRightClick"] = "PADRSTICK",
				["GamePadCursorLeftClick"] = "PADLSTICK",
				["GamePadEmulateShift"] = "PADLTRIGGER",
				["GamePadEmulateEsc"] = "none",
			},
			["Bindings"] = {
				["PADLSTICK"] = {
					[""] = "CAMERAORSELECTORMOVE",
				},
				["PADRSTICK"] = {
					[""] = "TURNORACTION",
				},
				["PADDUP"] = {
					[""] = "MULTIACTIONBAR1BUTTON12",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON2",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON6",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON10",
				},
				["PAD1"] = {
					[""] = "JUMP",
					["SHIFT-"] = "ACTIONBUTTON9",
					["CTRL-"] = "EXTRAACTIONBUTTON1",
					["CTRL-SHIFT-"] = "CLICK ConsolePortUtilityToggle:LeftButton",
				},
				["PAD4"] = {
					[""] = "ACTIONBUTTON2",
					["SHIFT-"] = "ACTIONBUTTON7",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON2",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON7",
				},
				["PAD3"] = {
					[""] = "ACTIONBUTTON1",
					["SHIFT-"] = "ACTIONBUTTON6",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON1",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON6",
				},
				["PADDDOWN"] = {
					[""] = "ACTIONBUTTON11",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON4",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON8",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON12",
				},
				["PADFORWARD"] = {
					[""] = "TOGGLEGAMEMENU",
					["SHIFT-"] = "CLICK ConsolePortRaidCursorToggle:LeftButton",
					["CTRL-"] = "CAMERAZOOMOUT",
					["CTRL-SHIFT-"] = "CAMERAZOOMIN",
				},
				["PADRSHOULDER"] = {
					[""] = "ACTIONBUTTON4",
					["SHIFT-"] = "TARGETSCANENEMY",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON4",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON9",
				},
				["PAD2"] = {
					[""] = "ACTIONBUTTON3",
					["SHIFT-"] = "ACTIONBUTTON8",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON3",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON8",
				},
				["PADDRIGHT"] = {
					[""] = "ACTIONBUTTON12",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON3",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON7",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON11",
				},
				["PADDLEFT"] = {
					[""] = "MULTIACTIONBAR1BUTTON11",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON1",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON5",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON9",
				},
				["PADLSHOULDER"] = {
					[""] = "ACTIONBUTTON5",
					["SHIFT-"] = "ACTIONBUTTON10",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON5",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON10",
				},
				["PADBACK"] = {
					["CTRL-"] = "TOGGLEWORLDMAP",
					["SHIFT-"] = "OPENALLBAGS",
					["CTRL-SHIFT-"] = "TOGGLEAUTORUN",
				},
			},
		},
		["Icons"] = {
		},
		["Version"] = 2,
	},
	["Default"] = {
		["Name"] = "Default",
		["Config"] = {
			["stickConfigs"] = {
				{
					["deadzone"] = 0.25,
					["stick"] = "Left",
					["axisX"] = "LStickX",
					["axisY"] = "LStickY",
				}, -- [1]
				{
					["deadzone"] = 0.25,
					["stick"] = "Right",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [2]
				{
					["deadzone"] = 0.25,
					["stick"] = "Gyro",
					["axisX"] = "GStickX",
					["axisY"] = "GStickY",
				}, -- [3]
				{
					["deadzone"] = 0.25,
					["stick"] = "Movement",
					["axisX"] = "LStickX",
					["axisY"] = "LStickY",
				}, -- [4]
				{
					["deadzone"] = 0.25,
					["stick"] = "Camera",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [5]
				{
					["deadzone"] = 0.25,
					["stick"] = "Cursor",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [6]
			},
			["axisConfigs"] = {
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "LStickLeft",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LStickRight",
					["axis"] = "LStickX",
				}, -- [1]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "LStickDown",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LStickUp",
					["axis"] = "LStickY",
				}, -- [2]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "RStickLeft",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RStickRight",
					["axis"] = "RStickX",
				}, -- [3]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "RStickDown",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RStickUp",
					["axis"] = "RStickY",
				}, -- [4]
				{
					["deadzone"] = 0.05,
					["axis"] = "GStickX",
				}, -- [5]
				{
					["deadzone"] = 0.05,
					["axis"] = "GStickY",
				}, -- [6]
				{
					["deadzone"] = 0.12,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LTrigger",
					["axis"] = "LTrigger",
				}, -- [7]
				{
					["deadzone"] = 0.12,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RTrigger",
					["axis"] = "RTrigger",
				}, -- [8]
			},
		},
		["Icons"] = {
		},
	},
	["PlayStation 5"] = {
		["Config"] = {
			["rawAxisMappings"] = {
				{
					["rawIndex"] = 0,
					["axis"] = "LStickX",
				}, -- [1]
				{
					["rawIndex"] = 1,
					["axis"] = "LStickY",
				}, -- [2]
				{
					["rawIndex"] = 2,
					["axis"] = "RStickX",
				}, -- [3]
				{
					["rawIndex"] = 3,
					["axis"] = "LTrigger",
				}, -- [4]
				{
					["rawIndex"] = 4,
					["axis"] = "RTrigger",
				}, -- [5]
				{
					["rawIndex"] = 5,
					["axis"] = "RStickY",
				}, -- [6]
			},
			["axisConfigs"] = {
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "LStickLeft",
					["scale"] = -2,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LStickRight",
					["axis"] = "LStickY",
				}, -- [1]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "LStickDown",
					["scale"] = -2,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LStickUp",
					["axis"] = "RStickY",
				}, -- [2]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "RStickLeft",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RStickRight",
					["axis"] = "RStickX",
				}, -- [3]
				{
					["deadzone"] = 0.05,
					["buttonNeg"] = "RStickDown",
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RStickUp",
					["axis"] = "RStickY",
				}, -- [4]
				{
					["deadzone"] = 0.05,
					["axis"] = "GStickX",
				}, -- [5]
				{
					["deadzone"] = 0.05,
					["axis"] = "GStickY",
				}, -- [6]
				{
					["deadzone"] = 0.12,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "LTrigger",
					["axis"] = "LTrigger",
				}, -- [7]
				{
					["deadzone"] = 0.12,
					["buttonThreshold"] = 0.5,
					["buttonPos"] = "RTrigger",
					["axis"] = "RTrigger",
				}, -- [8]
			},
			["name"] = "PlayStation 5",
			["configID"] = {
				["vendorID"] = 1356,
				["productID"] = 3302,
			},
			["stickConfigs"] = {
				{
					["deadzone"] = 0.25,
					["stick"] = "Left",
					["axisX"] = "LStickX",
					["axisY"] = "LStickY",
				}, -- [1]
				{
					["deadzone"] = 0.25,
					["stick"] = "Right",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [2]
				{
					["deadzone"] = 0.25,
					["stick"] = "Gyro",
					["axisX"] = "GStickX",
					["axisY"] = "GStickY",
				}, -- [3]
				{
					["deadzone"] = 0.25,
					["stick"] = "Movement",
					["axisX"] = "LStickX",
					["axisY"] = "LStickY",
				}, -- [4]
				{
					["deadzone"] = 0.25,
					["stick"] = "Camera",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [5]
				{
					["deadzone"] = 0.25,
					["stick"] = "Cursor",
					["axisX"] = "RStickX",
					["axisY"] = "RStickY",
				}, -- [6]
			},
			["rawButtonMappings"] = {
				{
					["rawIndex"] = 0,
					["comment"] = "Square",
					["button"] = "Face3",
				}, -- [1]
				{
					["rawIndex"] = 1,
					["comment"] = "Cross",
					["button"] = "Face1",
				}, -- [2]
				{
					["rawIndex"] = 2,
					["comment"] = "Circle",
					["button"] = "Face2",
				}, -- [3]
				{
					["rawIndex"] = 3,
					["comment"] = "Triangle",
					["button"] = "Face4",
				}, -- [4]
				{
					["rawIndex"] = 4,
					["comment"] = "L1",
					["button"] = "LShoulder",
				}, -- [5]
				{
					["rawIndex"] = 5,
					["comment"] = "R2",
					["button"] = "RShoulder",
				}, -- [6]
				{
					["rawIndex"] = 6,
					["comment"] = "immediate L2 (disabled so we can control trigger point)",
					["button"] = "None",
				}, -- [7]
				{
					["rawIndex"] = 7,
					["comment"] = "immediate R2 (disabled so we can control trigger point)",
					["button"] = "None",
				}, -- [8]
				{
					["rawIndex"] = 8,
					["comment"] = "Share",
					["button"] = "Social",
				}, -- [9]
				{
					["rawIndex"] = 9,
					["comment"] = "Options",
					["button"] = "Forward",
				}, -- [10]
				{
					["rawIndex"] = 10,
					["button"] = "LStickIn",
				}, -- [11]
				{
					["rawIndex"] = 11,
					["button"] = "RStickIn",
				}, -- [12]
				{
					["rawIndex"] = 12,
					["comment"] = "PS button",
					["button"] = "System",
				}, -- [13]
				{
					["rawIndex"] = 13,
					["comment"] = "Touchpad",
					["button"] = "Back",
				}, -- [14]
				{
					["rawIndex"] = 14,
					["comment"] = "Mic button",
					["bluetooth"] = false,
					["button"] = "Face5",
				}, -- [15]
				{
					["rawIndex"] = 14,
					["comment"] = "D-Pad Up",
					["bluetooth"] = true,
					["button"] = "Up",
				}, -- [16]
			},
		},
		["Name"] = "PlayStation 5",
		["Theme"] = {
			["Icons"] = {
				["PADRTRIGGER"] = "PlayStation/R2",
				["PADLTRIGGER"] = "PlayStation/L2",
				["PADDDOWN"] = "All/Down",
				["PAD4"] = "PlayStation/Triangle",
				["PAD2"] = "PlayStation/Circle",
				["PADDRIGHT"] = "All/Right",
				["PADDLEFT"] = "All/Left",
				["PADSYSTEM"] = "PlayStation/System",
				["PADBACK"] = "PlayStation/Back",
				["PADLSTICK"] = "PlayStation/L3",
				["PADRSTICK"] = "PlayStation/R3",
				["PADDUP"] = "All/Up",
				["PAD5"] = "Xbox/Options",
				["PAD1"] = "PlayStation/Cross",
				["PADFORWARD"] = "PlayStation/Options",
				["PADRSHOULDER"] = "PlayStation/R1",
				["PADLSHOULDER"] = "PlayStation/L1",
				["PADSOCIAL"] = "PlayStation/Share",
				["PAD3"] = "PlayStation/Square",
			},
			["Layout"] = {
				["PADRTRIGGER"] = 34,
				["PADLTRIGGER"] = 18,
				["PADDDOWN"] = 21,
				["PAD4"] = 35,
				["PADSOCIAL"] = 23,
				["PADDRIGHT"] = 22,
				["PADDLEFT"] = 20,
				["PADSYSTEM"] = 49,
				["PADBACK"] = 65,
				["PADLSTICK"] = 24,
				["PADRSTICK"] = 40,
				["PADDUP"] = 19,
				["PAD5"] = 51,
				["PAD1"] = 37,
				["PADFORWARD"] = 39,
				["PADRSHOULDER"] = 33,
				["PADLSHOULDER"] = 17,
				["PAD3"] = 38,
				["PAD2"] = 36,
			},
			["Colors"] = {
				["PAD1"] = "6882A1",
				["PAD3"] = "D35280",
				["PAD4"] = "62BBB2",
				["PAD2"] = "D84E58",
			},
			["Label"] = "SHP",
		},
		["Preset"] = {
			["Variables"] = {
				["GamePadAbbreviatedBindingReverse"] = 0,
				["GamePadEmulateAlt"] = "none",
				["GamePadEmulateCtrl"] = "PADLTRIGGER",
				["GamePadCursorRightClick"] = "PADRSTICK",
				["GamePadCursorLeftClick"] = "PADLSTICK",
				["GamePadEmulateShift"] = "PADLSHOULDER",
				["GamePadEmulateEsc"] = "none",
			},
			["Bindings"] = {
				["PADLSTICK"] = {
					[""] = "CAMERAORSELECTORMOVE",
				},
				["PADRSTICK"] = {
					[""] = "TURNORACTION",
				},
				["PADDUP"] = {
					[""] = "MULTIACTIONBAR1BUTTON12",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON2",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON6",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON10",
				},
				["PAD1"] = {
					[""] = "JUMP",
					["SHIFT-"] = "ACTIONBUTTON9",
					["CTRL-"] = "EXTRAACTIONBUTTON1",
					["CTRL-SHIFT-"] = "CLICK ConsolePortUtilityToggle:LeftButton",
				},
				["PADRTRIGGER"] = {
					[""] = "ACTIONBUTTON5",
					["SHIFT-"] = "ACTIONBUTTON10",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON5",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON10",
				},
				["PADSOCIAL"] = {
					[""] = "OPENALLBAGS",
					["SHIFT-"] = "TOGGLECHARACTER0",
					["CTRL-"] = "TOGGLESPELLBOOK",
					["CTRL-SHIFT-"] = "TOGGLETALENTS",
				},
				["PADDLEFT"] = {
					[""] = "MULTIACTIONBAR1BUTTON11",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON1",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON5",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON9",
				},
				["PADDDOWN"] = {
					[""] = "ACTIONBUTTON11",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON4",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON8",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON12",
				},
				["PADFORWARD"] = {
					[""] = "TOGGLEWORLDMAP",
					["SHIFT-"] = "CAMERAZOOMOUT",
					["CTRL-"] = "CAMERAZOOMIN",
				},
				["PADRSHOULDER"] = {
					[""] = "ACTIONBUTTON4",
					["SHIFT-"] = "TARGETSCANENEMY",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON4",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON9",
				},
				["PAD2"] = {
					[""] = "ACTIONBUTTON3",
					["SHIFT-"] = "ACTIONBUTTON8",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON3",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON8",
				},
				["PADDRIGHT"] = {
					[""] = "ACTIONBUTTON12",
					["SHIFT-"] = "MULTIACTIONBAR2BUTTON3",
					["CTRL-"] = "MULTIACTIONBAR2BUTTON7",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR2BUTTON11",
				},
				["PAD3"] = {
					[""] = "ACTIONBUTTON1",
					["SHIFT-"] = "ACTIONBUTTON6",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON1",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON6",
				},
				["PADSYSTEM"] = {
					[""] = "TOGGLEGAMEMENU",
					["SHIFT-"] = "CLICK ConsolePortRaidCursorToggle:LeftButton",
					["CTRL-"] = "TOGGLEAUTORUN",
					["CTRL-SHIFT-"] = "OPENCHAT",
				},
				["PAD4"] = {
					[""] = "ACTIONBUTTON2",
					["SHIFT-"] = "ACTIONBUTTON7",
					["CTRL-"] = "MULTIACTIONBAR1BUTTON2",
					["CTRL-SHIFT-"] = "MULTIACTIONBAR1BUTTON7",
				},
			},
		},
		["Icons"] = {
		},
		["Version"] = 2,
	},
}
ConsolePortUIStack = {
	["ConsolePort"] = {
		["ContainerFrame4"] = true,
		["ContainerFrame1"] = true,
		["ContainerFrame6"] = true,
		["ContainerFrame13"] = true,
		["ContainerFrame8"] = true,
		["ContainerFrame2"] = true,
		["CovenantPreviewFrame"] = true,
		["ACP_AddonList"] = true,
		["OpenMailFrame"] = true,
		["StaticPopup3"] = true,
		["StackSplitFrame"] = true,
		["ContainerFrame9"] = true,
		["ContainerFrame12"] = true,
		["MinimapRightClickMenu"] = true,
		["StaticPopup1"] = true,
		["ContainerFrame11"] = true,
		["WorldMapFrame"] = true,
		["StaticPopup4"] = true,
		["ContainerFrame10"] = true,
		["LFGDungeonReadyPopup"] = true,
		["ContainerFrame5"] = true,
		["PetBattleFrame"] = true,
		["ContainerFrame3"] = true,
		["StaticPopup2"] = true,
		["CinematicFrame"] = true,
		["ContainerFrame7"] = true,
		["GameMenuFrame"] = true,
		["AddonList"] = true,
	},
}
ConsolePortShared = {
}
