# =====================================================================
# _macro_to_html.ps1 - converts a WoW macros-cache.txt into a readable
# dyslexia-friendly HTML page (Dark_Portal macro archive utility).
# Each macro: "VER 3 <hex> <name> <icon>" header -> heading + code block;
# the hex id and END terminator are dropped (noise per Joey).
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File _macro_to_html.ps1 -InFile <macros-cache.txt> [-OutFile <out.html>]
# Written by Tandumonium, 2026-11-05. PS 5.1 compatible.
# =====================================================================
param(
    [Parameter(Mandatory = $true)][string]$InFile,
    [string]$OutFile
)
$ErrorActionPreference = 'Stop'
if (-not $OutFile) { $OutFile = [IO.Path]::ChangeExtension($InFile, '.html') }
$OutFile = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutFile)

function Esc([string]$s) {
    $s = $s -replace '&', '&amp;'
    $s = $s -replace '<', '&lt;'
    $s = $s -replace '>', '&gt;'
    return $s
}

$lines = Get-Content -LiteralPath $InFile
$macros = New-Object System.Collections.Generic.List[object]
$cur = $null
foreach ($raw in $lines) {
    $line = $raw.TrimEnd()
    if ($line -match '^VER\s+3\s+\S+\s+"(.*)"\s+"(.*)"\s*$') {
        if ($cur -ne $null) { $macros.Add($cur) }
        $cur = [PSCustomObject]@{ Name = $Matches[1]; Icon = $Matches[2]; Body = (New-Object System.Collections.Generic.List[string]) }
    }
    elseif ($line -eq 'END') {
        if ($cur -ne $null) { $macros.Add($cur); $cur = $null }
    }
    elseif ($cur -ne $null) {
        $cur.Body.Add($line)
    }
}
if ($cur -ne $null) { $macros.Add($cur) }

foreach ($m in $macros) {
    while ($m.Body.Count -gt 0 -and $m.Body[$m.Body.Count - 1] -eq '') { $m.Body.RemoveAt($m.Body.Count - 1) }
}

$src = Split-Path -Leaf $InFile
$sb = New-Object System.Text.StringBuilder
# Head wired to the Gewey sheet split (2026-11-05): the page's old inline
# <style> block moved into _gewey_gui\_css — type into holy_word.css, structure
# into shapers_terrace.css, paint into class_colors.css — scoped under .gw-macro
# so the hosted sheets cannot collide with the site at large. dynamichead.js is
# the ONLINE version per Joey's sitewide contract; it resolves what it can and
# degrades silently offline.
[void]$sb.AppendLine('<!DOCTYPE html>')
[void]$sb.AppendLine('<html lang="en">')
[void]$sb.AppendLine('<head><meta charset="utf-8">')
[void]$sb.AppendLine('<title>' + (Esc $src) + ' - macros</title>')
[void]$sb.AppendLine('<link rel="stylesheet" href="_css/shapers_terrace.css" />')
[void]$sb.AppendLine('<link rel="stylesheet" href="_css/holy_word.css" />')
[void]$sb.AppendLine('<link rel="stylesheet" href="_css/image_of_medivh.css" />')
[void]$sb.AppendLine('<link rel="stylesheet" href="_css/class_colors.css" />')
[void]$sb.AppendLine('<script src="https://gewey.github.io/js/dynamichead.js" defer></script>')
[void]$sb.AppendLine('</head><body class="gw-macro">')
[void]$sb.AppendLine('<h1>' + (Esc $src) + '</h1>')
[void]$sb.AppendLine('<p class="meta">' + $macros.Count + ' macros &middot; source: ' + (Esc $src) + ' &middot; converted ' + (Get-Date -Format 'yyyy-MM-dd HH:mm') + ' by Tandumonium (Dark_Portal macro converter)</p>')
[void]$sb.AppendLine('<h2>Contents</h2><div class="toc"><ul>')
$i = 0
foreach ($m in $macros) { $i++; [void]$sb.AppendLine('<li><a href="#m' + $i + '">' + (Esc $m.Name) + '</a></li>') }
[void]$sb.AppendLine('</ul></div>')
$i = 0
foreach ($m in $macros) {
    $i++
    $iconNote = ''
    if ($m.Icon -ne 'INV_Misc_QuestionMark' -and $m.Icon -ne 'INV_MISC_QUESTIONMARK') { $iconNote = ' <span class="icon">icon: ' + (Esc $m.Icon) + '</span>' }
    [void]$sb.AppendLine('<div class="macro" id="m' + $i + '"><h2>' + $i + '. ' + (Esc $m.Name) + '</h2>' + $iconNote)
    [void]$sb.AppendLine('<pre><code>' + (Esc (($m.Body -join "`n"))) + '</code></pre></div>')
}
[void]$sb.AppendLine('</body></html>')
[IO.File]::WriteAllText($OutFile, $sb.ToString(), (New-Object System.Text.UTF8Encoding($false)))
Write-Output ('HTML_OK macros=' + $macros.Count + ' out=' + $OutFile)
