
TinyPadSettings = {
	["FontSize"] = 3,
	["LargerScale"] = false,
	["PinBookmarks"] = false,
	["Invisible"] = true,
	["FontFamily"] = 3,
	["NoFade"] = false,
	["Transparency"] = true,
	["ShowMinimapButton"] = true,
	["Lock"] = true,
	["MinimapPosition"] = 84.0402605124175,
	["HideTooltips"] = false,
	["AllowCtrlKeys"] = false,
	["OpenOnLogin"] = true,
}
TinyPadPages = {
	"Welcome to TinyPad!\n\nTinyPad is a simple but powerful notepad addon that's easy to use.\n\nSome features include:\n- Resizable\n- Undo/Redo\n- Search\n- Bookmarks\n- Runs Lua Scripts\n- Link Support\n- Adaptive UI\n- More!\n\nTo summon: /pad or /tinypad, bind a key, or turn on a minimap button in the settings panel.", -- [1]
	{
		"Mount Macro", -- [1]
		"/run if SecureCmdOptionParse\"[nocombat,outdoors,nomod,nomounted]\"then C_MountJournal.SummonByID(0)end", -- [2]
	}, -- [2]
	"", -- [3]
}
