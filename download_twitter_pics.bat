@echo off
setlocal enabledelayedexpansion

set "outputDir=c:\Users\Gewey\OneDrive\gewey.github.io\twitter profile pictures"

echo Starting Twitter profile picture downloads...
echo Output directory: %outputDir%
echo.

set successCount=0
set failedCount=0

for %%H in (
    facebook twitter instagram tiktok snapchat pinterest skype linkedin whatsapp telegram mastodon_social
    gmail outlook yahoomail ProtonMail aol zoho
    googledrive dropbox onedrive MEGAprivacy box aws iCloud syncdotcom
    espn sinow nfl nba mlb ncaa MLS nascar pgatour BleacherReport
    coinbase krakenfx binance CoinMarketCap GeminiCrypto AtomicWallet MetaMask_io ShrimpyApp pool2miners
    microsoft Windows code chromium firefox ubuntu kalilinux nvidia java ThePSF nodejs git Notepad_plus sublimehq brackets ninite EclipseFdn userbenchmark speedify
    steam_games epicgames twitch discordapp youtube xbox PlayStation NintendoAmerica GOGcom GuildWars2 tesonline wizard101 starcraft2 wizards_magic deckbox Dododex rimworldwiki satisfactorycalculator MountainDewGaming alcasthq ficsitapp
    Minecraft mojang minecraftwiki mcsrvstat ForgeDevTeam FabricMC curseforge modrinth ftb_team PyloDEV Crafatar ServerMiner aternos
    runescape oldschoolrs RSWiki OsrsWiki officialrunehq RuneLiteClient osrs_tracker runetips getracker oodlers
    TheSims TheSims4 TheSims3 SimsFreePlay modthesimsinfo origininsider SimsCommun plumbobacademy
    Warcraft blizzardcs wowhead icyveins wowprogress raiderio_wow warcraftlogs raidbots tsmaddon wowpetopia wago_io simplearmory bloodmallet archon arenateam dataforazeroth raidplan WarcraftSecrets
    download amazon CandleScience Flaming_Candle ebay jinx newegg walmart sharkrobot ups usps
    w3schoolsonline StackOverflow github codecademy freeCodeCamp tensorflow codepen materialdesign openculture Fontvillacs airbrush facyai tutorialspoint blizzardpress mitappinventor
    spotify statsfm radiogarden netflix hulu primevideo hbomax RokuChannels PlutoTV lookmovie nebula
    deviantart imgflip audible_com tumblr gravitdesigner shutterstock Blogger HazbinHotel HelluvaBoss
    apnews cnn huffpost nytimes newsweek bbc weatherchannel nasa ScienceChannel cnet yahoo
    brilliant Ancestry MyHeritage genomelink wikipedia imdb ehow almanac tedtalks allrecipes lifehacker khanacademy duolingo
    fontawesome ptable dictionarycom cashapp chase CapitalOne OneMainFinancial paypal ShutterstockReq AmazonAssociate googleanalytics etrade fidelity RobinhoodApp acorns webull fundrise Worthy GemSelect FINVIZ_com investopedia apmex ucoin JMBullion luciteria
) do (
    if not exist "!outputDir!\%%H.jpg" (
        echo Downloading %%H...
        powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://unavatar.io/twitter/%%H' -OutFile '!outputDir!\%%H.jpg' -ErrorAction SilentlyContinue -TimeoutSec 10 -Headers @{'User-Agent'='Mozilla/5.0'}"
        if exist "!outputDir!\%%H.jpg" (
            for %%S in ("!outputDir!\%%H.jpg") do (
                if %%~zS gtr 1000 (
                    echo  + %%H
                    set /a successCount+=1
                ) else (
                    del "!outputDir!\%%H.jpg"
                    echo  - %%H
                    set /a failedCount+=1
                )
            )
        ) else (
            echo  - %%H
            set /a failedCount+=1
        )
        timeout /t 1 /nobreak > nul
    ) else (
        echo  ~ %%H (exists)
        set /a successCount+=1
    )
)

echo.
echo Download complete!
echo Successful: %successCount%
echo Failed: %failedCount%

endlocal
