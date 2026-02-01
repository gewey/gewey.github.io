$handles = @("facebook","twitter","instagram","tiktok","snapchat","pinterest","skype","linkedin","whatsapp","telegram","mastodon_social","gmail","outlook","yahoomail","ProtonMail","aol","zoho","googledrive","dropbox","onedrive","MEGAprivacy","box","aws","iCloud","syncdotcom","espn","sinow","nfl","nba","mlb","ncaa","MLS","nascar","pgatour","BleacherReport","coinbase","krakenfx","binance","CoinMarketCap","GeminiCrypto","AtomicWallet","MetaMask_io","ShrimpyApp","pool2miners","microsoft","Windows","code","chromium","firefox","ubuntu","kalilinux","nvidia","java","ThePSF","nodejs","git","Notepad_plus","sublimehq","brackets","ninite","EclipseFdn","userbenchmark","speedify","steam_games","epicgames","twitch","discordapp","youtube","xbox","PlayStation","NintendoAmerica","GOGcom","GuildWars2","tesonline","wizard101","starcraft2","wizards_magic","deckbox","Dododex","rimworldwiki","satisfactorycalculator","MountainDewGaming","alcasthq","ficsitapp","Minecraft","mojang","minecraftwiki","mcsrvstat","ForgeDevTeam","FabricMC","curseforge","modrinth","ftb_team","PyloDEV","Crafatar","ServerMiner","aternos","runescape","oldschoolrs","RSWiki","OsrsWiki","officialrunehq","RuneLiteClient","osrs_tracker","runetips","getracker","oodlers","TheSims","TheSims4","TheSims3","SimsFreePlay","modthesimsinfo","origininsider","SimsCommun","plumbobacademy","Warcraft","blizzardcs","wowhead","icyveins","wowprogress","raiderio_wow","warcraftlogs","raidbots","tsmaddon","wowpetopia","wago_io","simplearmory","bloodmallet","archon","arenateam","dataforazeroth","raidplan","WarcraftSecrets","download","amazon","CandleScience","Flaming_Candle","ebay","jinx","newegg","walmart","sharkrobot","ups","usps","w3schoolsonline","StackOverflow","github","codecademy","freeCodeCamp","tensorflow","codepen","materialdesign","openculture","Fontvillacs","airbrush","facyai","tutorialspoint","blizzardpress","mitappinventor","spotify","statsfm","radiogarden","netflix","hulu","primevideo","hbomax","RokuChannels","PlutoTV","lookmovie","nebula","deviantart","imgflip","audible_com","tumblr","gravitdesigner","shutterstock","Blogger","HazbinHotel","HelluvaBoss","apnews","cnn","huffpost","nytimes","newsweek","bbc","weatherchannel","nasa","ScienceChannel","cnet","yahoo","brilliant","Ancestry","MyHeritage","genomelink","wikipedia","imdb","ehow","almanac","tedtalks","allrecipes","lifehacker","khanacademy","duolingo","fontawesome","ptable","dictionarycom","cashapp","chase","CapitalOne","OneMainFinancial","paypal","ShutterstockReq","AmazonAssociate","googleanalytics","etrade","fidelity","RobinhoodApp","acorns","webull","fundrise","Worthy","GemSelect","FINVIZ_com","investopedia","apmex","ucoin","JMBullion","luciteria")

$outputDir = "c:\Users\Gewey\OneDrive\gewey.github.io\twitter profile pictures"
$successCount = 0
$failedCount = 0

Write-Host "Starting download of Twitter profile pictures..." -ForegroundColor Cyan
Write-Host "Total handles: $($handles.Count)"
Write-Host ""

foreach ($handle in $handles) {
    if ([string]::IsNullOrWhiteSpace($handle) -or $handle -eq "blank") { continue }
    
    $fileName = "$outputDir\$handle.jpg"
    
    if (Test-Path $fileName) {
        Write-Host "✓ $handle (exists)" -ForegroundColor Green
        $successCount++
        continue
    }
    
    # Use unavatar.io as primary source
    $url = "https://unavatar.io/twitter/$handle"
    $response = Invoke-WebRequest -Uri $url -OutFile $fileName -ErrorAction SilentlyContinue -TimeoutSec 10 -Headers @{"User-Agent"="Mozilla/5.0"}
    
    if (Test-Path $fileName) {
        $fileSize = (Get-Item $fileName).Length
        if ($fileSize -gt 1000) {
            Write-Host "✓ $handle" -ForegroundColor Green
            $successCount++
        } else {
            Remove-Item $fileName -ErrorAction SilentlyContinue
            Write-Host "✗ $handle" -ForegroundColor Yellow
            $failedCount++
        }
    } else {
        Write-Host "✗ $handle" -ForegroundColor Yellow
        $failedCount++
    }
    
    Start-Sleep -Milliseconds 300
}

Write-Host ""
Write-Host "Download complete!" -ForegroundColor Cyan
Write-Host "Successful: $successCount" -ForegroundColor Green
Write-Host "Failed: $failedCount" -ForegroundColor Yellow
$totalFiles = (Get-ChildItem $outputDir -File -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Host "Total files in folder: $totalFiles" -ForegroundColor Cyan
