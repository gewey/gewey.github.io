# Tooltips - Wowhead

# Tooltips

Wowhead's tooltips script allows you to add WoW tooltips, Diablo 4 tooltips, and more to your own site, with many possible customization options.

Our game data tooltips display detailed information when hovering over a link, or tapping it on mobile. We are used by millions of players world-wide on sites like [Warcraft Logs](https://www.warcraftlogs.com/) and [Raider.IO](https://raider.io/). Wowhead tooltips even power some official Blizzard tools, like their **Warcraft MDI Twitch Extension**, allowing thousands of concurrent players to inspect the participants for detailed talent and gear information.

If you are a fansite that would like to request Wowhead to add some tooltip functionality that would help your site, please email **[feedback@wowhead.com](javascript:)**. While we can't support _every_ request, and we may be busy leading up to or during major patch releases, we want to support the needs of the community!

![mdiinspect.jpg](https://wow.zamimg.com/uploads/blog/images/13536.jpg?maxWidth=300)
_Wowhead's tooltips being used in Blizzard's MDI Twitch Extension_

Table of Contents

- [How to Install Wowhead Tooltips?](https://www.wowhead.com/tooltips#how-to-install-wowhead-tooltips)
- [Advanced Usage: All Games](https://www.wowhead.com/tooltips#advanced-usage-all-games)
- [Advanced Usage: World of Warcraft Tooltips](https://www.wowhead.com/tooltips#advanced-usage-world-of-warcraft-tooltips)
- [Advanced Usage: Diablo 4 Tooltips](https://www.wowhead.com/tooltips#advanced-usage-diablo-4-tooltips)

## How to Install Wowhead Tooltips?

Just follow these few simple steps!

1. Add this piece of HTML code in the <head> section of your page:

    <script>const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};</script>
    <script src="[https://wow.zamimg.com/js/tooltips.js](https://wow.zamimg.com/js/tooltips.js)"></script>

2. You are done!

Wowhead links found on your site will now sport a **tooltip** and an **icon**. It supports all pages that have tooltips on Wowhead, such as:

- item, spell, quest, npc, achievement, zone, event, object, and more

Icons show up by default, you can customize the colors of your links, and easily rename them!

You can check out this [working demo](https://wow.zamimg.com/widgets/power/demo.html), and see how easy it is!

## Advanced Usage: All Games

Advanced usage

Other resources

Once you have the <script> tag added to your site, the following parameters can be used in the **data-wowhead** attribute of your links (<a>). They can be combined by using the ampersand character (&amp;).

- **Other Domains**
    Enter the wowhead domain (www, ptr, de, es, fr, ru, de.classic, ru.classic, etc) to display a different version or localization (language), e.g: `domain=classic`, `domain=ptr`, `domain=ru`, or `domain=ru.classic`.

- **Icon Sizes**
    If you add `iconSize: 'small'` to the `whTooltips` options you can make all icons "small" instead of tiny. Available sizes: tiny (the default), small, medium, and large.

  - If you have iconSize added (even if it's just set to `iconSize: true`) you can also specify icon sizes on each individual link! Just add this HTML attribute to your <a> tag: `data-wh-icon-size="small"`. The same icon sizes are available.

  - If you _only_ add `iconSize: true`, and _not_ `iconizeLinks: true`, then the icons will only appear on the links where you specify a size.

- **Renaming**
    If you include `renameLinks: true` to the `whTooltips` options you can rename all the Wowhead links on your site.

  - You can also specify individual links to be renamed! Just add this HTML attribute to your <a> tag: `data-wh-rename-link="true"`.

- **Custom URLs**
    You can make your links point to any page you wish, and still display a tooltip. Example:

    <a href="#" data-wowhead="item=2828">hai</a>

Interested in using our script in your forum? Check out [this thread](https://www.wowhead.com/?forums&topic=3464) for information on implementing it on many popular forum systems (phpBB, vBulletin, etc.) or check out the handy guides written by our users:

- [vBulletin](https://www.wowhead.com/forums&topic=3464#p37094)

- phpBB: [2.x.x](https://www.wowhead.com/forums&topic=3464#p37492) - [2.x.x Mod Version](https://www.wowhead.com/forums&topic=3464.6#p58403) | [3.0](https://www.wowhead.com/forums&topic=14347&p=126922) by craCkpot - [3.0](https://www.wowhead.com/forums&topic=3464#p37204) by marcimi - [3.0 Mod Version](https://www.wowhead.com/forums&topic=3464.3#p42858)

- [Simple Machines Forum (SMF)](https://www.wowhead.com/forums&topic=3464#p37618)

- [Invision Power Board (IPB)](https://www.wowhead.com/forums&topic=3464.3&p=4080#p40631)

- [WordPress Blog](https://www.wowhead.com/forums&topic=3464.3&p=42952#p42952) ([Plugin Version](https://www.wowhead.com/forums&topic=3464.4#p43652))

- [PHP Nuke-Evolution](https://www.wowhead.com/forums&topic=3464.7&p=63338#p61443)

- [MyBB](https://www.wowhead.com/forums&topic=3464.3#p43232)

- [TikiWiki](https://www.wowhead.com/forums&topic=3464.6#p48648)

- [YaBB](https://www.wowhead.com/forums&topic=3464.6#p49640)

- [Drupal](https://www.wowhead.com/forums&topic=3464.5#p46801)

- [PunBB](https://www.wowhead.com/forums&topic=3464.3#p42456)

- [Dojo](https://www.wowhead.com/forums&topic=10938)

## Advanced Usage: World of Warcraft Tooltips

There are many additional options that you can specify for various types of tooltips. Here's an example of an item link with several options specified at once (gems, enchant and item set pieces):

<a href="[https://www.wowhead.com/item=25697](https://www.wowhead.com/item=25697)" class="q3" data-wowhead="gems=23121&amp;ench=2647&amp;pcs=25695:25696:25697">Felstalker Bracers</a>

The result: [Felstalker Bracers](https://www.wowhead.com/item=25697). See below for more details on what can be done with various WoW entities.

Item options

Item bonus IDs

Items as XML

Hiding item text

Spells and more

### Item options

- **Artifact Knowledge** - ak
    Enter the Artifact Knowledge number, such as ak=30

- **Transmogrified to** - transmog
    Enter the item ID of the item you've transmogged to, such as transmog=32235 for changing your helm to [![Cursed Vision of Sargeras](https://wow.zamimg.com/images/wow/icons/tiny/inv_misc_bandana_03.gif) Cursed Vision of Sargeras](https://www.wowhead.com/item=32235/cursed-vision-of-sargeras)
    Use transmog=hidden if you have chosen to hide that slot

- **Level** – lvl
    Enter the character's level, useful for heirloom items!

- **Enchant** – ench
    Enter the ID of the enchant, such as: ench=2647

- **Gems** – gems
    List all the gems (item IDs) you want the item to have, separated by a colon. E.g. gems=23121. Other items slotted in to gear, such as Legion relics, are treated the same as gems, and can even have item bonuses applied. E.g.
    [/item=128908&gems=141522:141514:152696&bonus=1518:1520:1524:751](https://dev.wowhead.com/item=128908&gems=141522:141514:152696&bonus=1518:1520:1524:751)

- **Extra Socket** - sock
    Add an extra socket to the item. Only works for belts, bracers and gloves.

- **Item Level** - ilvl
    Set the item level. This overrides even item level modifiers applied to the item, such as from relics. Stats will be updated accordingly. Example: [Thunderfury with 1000 ilvl](https://www.wowhead.com/item=19019/thunderfury-blessed-blade-of-the-windseeker&ilvl=1000)

- **Item Set Pieces** – pcs
    List all the pieces (item IDs) you want to consider for the set bonus, separated by a colon. e.g: pcs=25695:25696:25697

- **Item Upgrade** - upgd
    Enter the upgrade number, such as: upgd=2

- **Warlords of Draenor PvP Mode** - pvp
    This shows the higher ilvl version of Warlords of Draenor items that change stats during PvP.

- **Warlords of Draenor Challenge Mode** - chal
    This shows an ilvl 630 scaled-down version of an item, which is the version equipped in Challenge Modes.

- **Netherlight Crucible Item Level Ranks** - nlc
    This adds +5 item levels for each Netherlight Crucible trait you have that gives +5 item levels. Can be set to 1, 2, or 3.

- **Timewalking Burning Crusade** - twtbc
    This shows an ilvl 90 scaled-down version of an item, which is the version equipped in Burning Crusade Timewalking Dungeons.

- **Timewalking Wrath** - twwotlk
    This shows an ilvl 160 scaled-down version of an item, which is the version equipped in Wrath's Timewalking Dungeons.

- **Random Enchantment** – rand
    Enter the ID of random enchantment (e.g. of the Bear), such as: rand=-7. Full list of IDs under the toggle.
    [Random Enchant ID list](javascript:)

    Single-stat Suffixes
    15, of Spirit, Spirit
    16, of Stamina, Stamina
    17, of Strength, Strength
    18, of Agility, Agility
    19, of Intellect, Intellect
    20, of Power, Attack Power
    21, of Arcane Wrath, Arcane Damage
    22, of Fiery Wrath, Fire Damage
    23, of Frozen Wrath, Frost Damage
    24, of Nature's Wrath, Nature Damage
    25, of Shadow Wrath, Shadow Damage
    26, of Intellect, Intellect
    27, of Nimbleness, Dodge
    28, of Stamina, Stamina
    30, of Spirit, Spirit
    61, of Intellect, Intellect
    62, of Strength, Strength
    63, of Agility, Agility
    64, of Power, Attack Power
    65, of Magic, Spell Power
    84, of Stamina, Stamina
    99, of Speed, Haste

    Two-stat Suffixes
    5, of the Monkey, Agility/Stamina
    6, of the Eagle, Intellect/Stamina
    7, of the Bear, Stamina/Strength
    8, of the Whale, Spirit/Stamina
    9, of the Owl, Intellect/Spirit
    10, of the Gorilla, Intellect/Strength
    11, of the Falcon, Agility/Intellect
    12, of the Boar, Spirit/Strength
    13, of the Wolf, Agility/Spirit
     14, of the Tiger, Agility/Hit
    29, of Eluding, Dodge/Agility
    31, of Arcane Protection, Stamina/Arcane Resistance
    32, of Fire Protection, Stamina/Fire Resistance
    33, of Frost Protection, Stamina/Frost Resistance
    34, of Nature Protection, Stamina/Nature Resistance
    35, of Shadow Protection, Stamina/Shadow Resistance
    47, of Blocking, Shield Block/Strength
    68, of the Bear, Strength/Stamina
    69, of the Eagle, Stamina/Intellect
    78, of the Monkey, Agility/Stamina
    81, of the Whale, Stamina/Spirit
    140, of the Wraith, Critical Strike/Spirit
    141, of the Wind, Spirit/Haste
    142, of the Master, Spirit/Mastery
    144, of the Shark, Critical Strike/Mastery
    145, of the Panther, Mastery/Haste
    146, Crit/Mastery, Critical Strike/Mastery
    147, of the Shark, Critical Strike/Mastery
    148, Crit/Spirit, Crit/Spirit
    150, of the Panther, Mastery/Haste
    151, of the Wind, Spirit/Haste
    152, of the Master, Spirit/Mastery
    153: of the Wraith, Haste/Mastery
    154, of the Shark, Critical Strike/Mastery
    156, of the Wraith, Critical Strike/Spirit
    157, of the Panther, Mastery/Haste
    158, of the Wind, Spirit/Haste
    159, of the Master, Spirit/Mastery
    160, of the Mongoose, Hit/Haste
    161, of Storms, Hit/Critical Strike
    162, of Flames, Hit/Mastery
    163, of the Mongoose, Hit/Haste
    164, of Storms, Hit/Critical Strike
    165, of Flames, Hit/Mastery
    166, of the Mongoose, Hit/Mastery
    167, of Storms, Hit/Critical Strike
    168, of Flames, Hit/Mastery

    Three-stat Suffixes (Added in TBC)
    36, of the Sorcerer, Stamina/Intellect/Haste
    37, of the Seer, Stamina/Intellect/Critical Strike
    38, of the Prophet, Intellect/Spirit/Haste
    39, of the Invoker, Intellect/Critical Strike
    40, of the Bandit, Agility/Stamina/Critical Strike
    41, of the Beast, Hit/Critical Strike/Stamina
    42, of the Elder, Stamina/Intellect/Spirit
    43, of the Soldier, Strength/Stamina/Critical Strike
    44, of the Elder, Stamina/Intellect/Spirit
    45, of the Champion, Strength/Stamina/Dodge
    46, of the Test, Agility/Armor/Intellect/Spirit/Stamina
    48, of Paladin Testing, Intellect/Stamina/Spell Power/Strength
    49, of the Grove, Strength/Agility/Haste
    50, of the Hunt, Haste/Critical Strike/Agility
    51, of the Mind, Intellect/Critical Strike/Haste
    52, of the Crusade, Strength/Stamina/Dodge
    53, of the Vision, Intellect/Haste/Stamina
    54, of the Ancestor, Strength/Critical Strike/Stamina
    55, of the Nightmare, Stamina/Intellect/Critical Strike
    56, of the Battle, Strength/Stamina/Critical Strike
    57, of the Shadow, Agility/Stamina/Critical Strike
    58, of the Sun, Critical Strike/Stamina/Intellect
    59, of the Moon, Intellect/Stamina/Spirit
    60, of the Wild, Haste/Agility/Stamina
    66, of the Knight, Stamina/Dodge/Expertise
    67, of the Seer, Stamina/Critical Strike/Intellect
    70, of the Ancestor, Strength/Critical Strike/Stamina
    71, of the Bandit, Agility/Stamina/Critical Strike
    72, of the Battle, Strength/Stamina/Critical Strike
    73, of the Elder, Stamina/Intellect/Spirit
    74, of the Beast, Hit/Critical Strike/Stamina
    75, of the Champion, Strength/Stamina/Dodge
    76, of the Grove,  Strength/Agility/Haste
    77, of the Knight, Stamina/Dodge/Expertise
    79, of the Moon, Intellect/Stamina/Spirit
    80, of the Wild, Haste/Agility/Stamina
    82, of the Vision, Intellect/Haste/Stamina
    83, of the Sun, Critical Strike/Stamina/Intellect
    85, of the Sorcerer, Stamina/Intellect/Haste
    86, of the Soldier, Strength/Stamina/Critical Strike
    87, of the Shadow, Agility/Stamina/Critical Strike
    88, of the Foreseer, Intellect/Critical Strike/Haste
    89, of the Thief, Stamina/Agility/Haste
    90, of the Necromancer, Stamina/Hit/Intellect
    91, of the Marksman, Stamina/Agility/Hit
    92, of the Squire, Stamina/Hit/Strength
    93, Restoration, Intellect/Spirit/Stamina
    139, of the Mercenary, Strength/Haste/Stamina

    Four-stat Suffixes (Added in Cataclysm)
    100, of the Principle, Critical Strike/Hit/Strength/Stamina
    101, of the Sentinel, Expertise/Hit/Strength/Stamina
    102, of the Hero, Haste, Critical Strike/Strength/Stamina
    103, of the Avatar, Critical Strike/Mastery/Strength/Stamina
    104, of the Embodiment, Haste/Mastery/Strength/Stamina
    105, of the Guardian, Mastery/Shield Block/Strength/Stamina
    106, of the Defender, Dodge/Parry/Strength/Stamina
    107, of the Exemplar, Strength/Dodge/Stamina/Expertise
    108, of the Curator, Strength/Dodge/Parry/Stamina
    109, of the Preserver, Mastery/Intellect/Spirit/Stamina
    110: of the Elements, Stamina/Intellect/Hit/Critical Strike
    111, of the Paradigm, Stamina/Intellect/Hit/Mastery
    112, of the Pattern, Stamina/Intellect/Critical Strike/Haste
    113, of the Essence, Stamina/Intellect/Haste/Spirit
    114, of the Flameblaze, Mastery/Intellect/Hit/Stamina
    115, of the Archetype, Stamina/Agility/Hit/Critical Strike
    116, of the Manifestation, Stamina/Agility/Hit/Expertise
    117, of the Incarnation, Stamina/Agility/Critical Strike/Haste
    118, of the Faultline, Mastery/Strength/Haste/Stamina
    119, of the Ideal, Stamina/Agility/Haste/Mastery
    120, of the Earthshaker, Critical Strike/Strength/Hit/Stamina
    121, of the Landslide, Strength/Hit/Stamina/Expertise
    122, of the Earthfall, Critical Strike/Strength/Haste/Stamina
    123, of the Earthbreaker, Critical Strike/Mastery/Strength/Stamina
    124, of the Mountainbed, Mastery/Strength/Stamina/Expertise
    125, of the Bedrock, Mastery/Strength/Parry/Stamina
    126, of the Substratum, Stamina/Strength/Expertise/Dodge
    127, of the Bouldercrag, Strength/Dodge/Parry/Stamina
    128, of the Rockslab, Mastery/Strength/Dodge/Stamina
    129, of the Wildfire, Critical Strike/Intellect/Hit/Stamina
    130, of the Fireflash, Critical Strike/Intellect/Haste/Stamina
    131, of the Undertow, Intellect/Haste/Spirit/Stamina
    132, of the Wavecrest, Mastery/Intellect/Spirit/Stamina
    133, of the Stormblast, Critical Strike/Agility/Hit/Stamina
    134, of the Galeburst, Agility/Hit/Stamina/Expertise
    135, of the Windflurry, Critical Strike/Agility/Haste/Stamina
    136, of the Zephyr, Mastery/Agility/Haste/Stamina
    137, of the Windstorm, Critical Strike/Mastery/Agility/Staina
    138, of the Feverflare, Mastery/Intellect/Haste/Stamina
    143, of the Scorpion, Stamina/Intellect/Haste/Critical Strike
    149, of the Scorpion, Stamina/Intellect/Haste/Critical Strike
    155, of the Scorpion, Stamina/Intellect/Haste/Critical Strike

    Heroic Scenario and Battlefield Barrens Items
    344, of the Decimator, Critical Strike
    345, of the Unerring, Hit
    346, of the Adroit, Expertise
    347, of the Savant, Mastery
    348, of the Impatient, Haste
    349, of the Bladewall, Parry
    350, of the Untouchable, Dodge
    351, of the Pious, Spirit
    352, of the Landslide, Hit/Expertise
    353, of the Stormblast, Hit/Critical Strike
    354, of the Galeburst, Hit/Expertise
    355, of the Windflurry, Critical Strike/Haste
    356, of the Windstorm, Critical Strike/Mastery
    357, of the Zephyr, Haste/Mastery
    359, of the Flameblaze, Mastery/Hit
    360, of the Fireflash, Haste/Crit
    361, of the Feverflare, Haste/Mastery
    362, of the Undertow, Haste/Spirit
    363, of the Wavecrest, Spirit/Mastery
    364, of the Earthbreaker, Critical Strike/Mastery
    365, of the Faultline, Haste/Mastery
    366, of the Mountainbed, Mastery/Expertise
    367, of the Bedrock, Mastery/Parry
    368, of the Bouldercrag, Dodge/Parry
    369, of the Rockslab, Dodge/Mastery
    370, of the Earthshaker, Hit/Critical Strike
    371, of the Earthfall, Critical Strike/Haste

- **Reforges** - forg
    Enter the ID of the reforge pairing you'd like--each original/new stat combo has a specific ID. Full list under the toggle.
    [Reforge ID list](javascript:)

    113,Spirit,Dodge Rating
    114,Spirit,Parry Rating
    115,Spirit,Hit Rating
    116,Spirit,Crit Rating
    117,Spirit,Haste Rating
    118,Spirit,Expertise Rating
    119,Spirit,Mastery
    120,Dodge Rating,Spirit
    121,Dodge Rating,Parry Rating
    122,Dodge Rating,Hit Rating
    123,Dodge Rating,Crit Rating
    124,Dodge Rating,Haste Rating
    125,Dodge Rating,Expertise Rating
    126,Dodge Rating,Mastery
    127,Parry Rating,Spirit
    128,Parry Rating,Dodge Rating
    129,Parry Rating,Hit Rating
    130,Parry Rating,Crit Rating
    131,Parry Rating,Haste Rating
    132,Parry Rating,Expertise Rating
    133,Parry Rating,Mastery
    134,Hit Rating,Spirit
    135,Hit Rating,Dodge Rating
    136,Hit Rating,Parry Rating
    137,Hit Rating,Crit Rating
    138,Hit Rating,Haste Rating
    139,Hit Rating,Expertise Rating
    140,Hit Rating,Mastery
    141,Crit Rating,Spirit
    142,Crit Rating,Dodge Rating
    143,Crit Rating,Parry Rating
    144,Crit Rating,Hit Rating
    145,Crit Rating,Haste Rating
    146,Crit Rating,Expertise Rating
    147,Crit Rating,Mastery
    148,Haste Rating,Spirit
    149,Haste Rating,Dodge Rating
    150,Haste Rating,Parry Rating
    151,Haste Rating,Hit Rating
    152,Haste Rating,Crit Rating
    153,Haste Rating,Expertise Rating
    154,Haste Rating,Mastery
    155,Expertise Rating,Spirit
    156,Expertise Rating,Dodge Rating
    157,Expertise Rating,Parry Rating
    158,Expertise Rating,Hit Rating
    159,Expertise Rating,Crit Rating
    160,Expertise Rating,Haste Rating
    161,Expertise Rating,Mastery
    162,Mastery,Spirit
    163,Mastery,Dodge Rating
    164,Mastery,Parry Rating
    165,Mastery,Hit Rating
    166,Mastery,Crit Rating
    167,Mastery,Haste Rating
    168,Mastery,Expertise Rating

Tooltips of items from WoW support item bonuses, which can have a wide variety of effects on the item, such as displayed difficulty, Tertiary stats, gem sockets, random stat combinations, and much more.

## Item Bonus Basics

Ever since the release of Warlords of Draenor, new items have one base item ID (or database page) for all item variations, instead of unique pages for each version like LFR, Heroic, Mythic, Warforged, etc.

Here's an example of how you can add item bonus 450 to display the "Mythic" text in a tooltip:

<a href="[https://www.wowhead.com/item=112920](https://www.wowhead.com/item=112920)" data-wowhead="bonus=450">link</a>

Result: [Korven's Crimson Crescent (Mythic)](https://www.wowhead.com/item=112920)

Without the `data-wowhead="bonus=450"` addition, this item wouldn't show as being from Mythic difficulty. You can show two bonuses at the same time as well, for example, Mythic Warforged would be `data-wowhead="bonus=450:448"`.

## Raid Difficulties

- 449 or 566 - Heroic

- 450 or 567 - Mythic

- 451 - Raid Finder

Example: [Korven's Crimson Crescent (LFR)](https://www.wowhead.com/item=112920)

## Gear Augmentations

**There are three ways players can get better-than-expected stats for a particular item**\--higher ilvl (similar to current Warforged), an additional gem socket, and the presence of a bonus tertiary stat. It will take a while to farm up a complete "set" and may not be on every piece of gear.

- **Warforged-inspired gear** works much in the same way as it does currently--the item will have a slightly higher level.

- **Extra sockets**: sockets are used much more sparingly in Warlords.

- **Tertiary stats**: Movement Speed (Increases your movement speed), Indestructible (Causes the item to not take durability damage), Leech (Causes you to be healed for a portion of all damage and healing done), Avoidance (Reduces your damage taken from area-of-effect attacks).

- It is very rare to get an item that has all three augmentations at once. You can show all three at once, for example:

    <a href="[https://www.wowhead.com/item=112920](https://www.wowhead.com/item=112920)" data-wowhead="bonus=41:523:448">link</a>

40 - Avoidance
41 - Leech
42 - Speed
43 - Indestructible
562 - Warforged (+6)
656 - Warforged Timewarped (+15)
644 - Warforged Mythic (+20)
565 - Extra socket

Example: [Korven's Crimson Crescent (Warforged)](https://www.wowhead.com/item=112920)

## Quest Rewards

Quest rewards in Warlords of Draenor have a small chance to be rare or epic.

171 - rare version
15 - epic version
545 - Tanaan weapon upgrades

## Baleful 6.2 Items

Baleful items range between ilvl 650 and 695

652 - ilvl 650
761 - ilvl 660
762 - ilvl 665
763 - ilvl 670
651 - ilvl 675
764 - ilvl 680
765 - ilvl 685
766 - ilvl 690
648 - ilvl 695

Baleful items can also have a wide array of stats, documented in the random enchantments section of this page.

## Heirlooms in 6.1

Heirlooms in 6.1 can be upgraded to 1-90 (Upgrade 1), and then to 1-100 (Upgrade 2).

582 - Upgrade 1
583 - Upgrade 2

## Challenge Mode Rewards

Challenge Mode rewards in 6.2 are ilvl 680. Items acquired prior to 6.1 are ilvl 640.

609 - ilvl 680
591 - ilvl 660
0 - ilvl 640

## Holiday Items

The "base" ilvl for holiday items is ilvl 600, but they are higher ilvl in game.

553 - ilvl 635
557 - ilvl 670

## Legendary Ring Upgrades

Once you have completed your legendary ring, you can upgrade it via [![Crystallized Fel](https://wow.zamimg.com/images/wow/icons/tiny/tooltip_crystallizedfel.gif) Crystallized Fel](https://www.wowhead.com/item=127785/crystallized-fel).

0 - ilvl 735
622 - ilvl 738
623 - ilvl 741
624 - ilvl 744
625 - ilvl 747
626 - ilvl 750
627 - ilvl 753
628 - ilvl 756
629 - ilvl 759
630 - ilvl 762
631 - ilvl 765
632 - ilvl 768
633 - ilvl 771
634 - ilvl 774
635 - ilvl 777
636 - ilvl 780
637 - ilvl 783
638 - ilvl 786
639 - ilvl 789
640 - ilvl 792
641 - ilvl 795

## Random Enchantments

More random enchantments have been added, including combinations for new secondary stats in Warlords of Draenor:

19 to 39 - of the Fireflash, Crit/Haste
45 to 65 - Peerless, Crit/Mastery
66 to 86 - of the Savage, Crit/Multistrike
87 to 107 - of the Quickblade, Crit/Versatility
108 to 128 - of the Feverflare, Haste/Mastery
129 to 149 - of the Deft, Haste/Multistrike
150 to 170 - of the Aurora, Haste/Versatility
175 to 195 - of the Merciless, Mastery/Multistrike
196 to 216 - of the Harmonious, Versatility/Mastery
217 to 237 - of the Strategist, Versatility/Multistrike
238 to 258 - of the Guileful, Crit/Bonus Armor
259 to 279 - of the Windshaper, Haste/Bonus Armor
280 to 300 - of the Noble, Mastery/Bonus Armor
301 to 321 - of the Stormbreaker, Bonus Armor/Multistrike
322 to 342 - of the Stalwart, Versatility/Bonus Armor
343 to 363 - of the Fanatic, Spirit/Crit
364 to 384 - of the Zealot, Spirit/Haste
385 to 405 - of the Diviner, Spirit/Mastery
406 to 426 - of the Herald, Spirit/Multistrike
427 to 447 - of the Augur, Spirit/Versatility
486 - of the Decimator, Crit
487 - of the Impatient, Haste
489 - of the Savant, Mastery
490 - of the Relentless, Multistrike
491 - of the Adaptable, Versatility
492 - of the Unbreakable, Bonus Armor
493 - of the Pious, Spirit

## Dungeons

642 - Mythic
524 - Heroic
518 - 100 ilvl and 10 level reduction
519 - 80 ilvl and 8 level reduction
520 - 60 ilvl and 6 level reduction
521 - 30 ilvl and 5 level reduction
522 - 15 ilvl and 3 level reduction
615 - lvl 100 Timewarped

Add the following IDs to the mythic ID 642 for Mythic Warforged loot:

754 - 5 ilvl increase for Mythic loot from base
755 - 10 ilvl increase for Mythic loot from base
756 - 15 ilvl increase for Mythic loot from base
757 - 20 ilvl increase for Mythic loot from base
758 - 25 ilvl increase for Mythic loot from base
759 - 30 ilvl increase for Mythic loot from base
760 - 35 ilvl increase for Mythic loot from base
761 - 40 ilvl increase for Mythic loot from base

## Crafted

Armor:

525 - Stage 1 of 6
526 - Stage 2 of 6
527 - Stage 3 of 6
593 - Stage 4 of 6
617 - Stage 5 of 6
618 - Stage 6 of 6

Weapons:

525 - Stage 1 of 6
558 - Stage 2 of 6
559 - Stage 3 of 6
594 - Stage 4 of 6
619 - Stage 5 of 6
620 - Stage 6 of 6

### Items as XML

Also available are our item XML feeds. Every item in the database has a corresponding XML feed. You can reach those feeds either by ID or by name. For example:

- By ID: [https://www.wowhead.com/item=52021&xml](https://www.wowhead.com/item=52021&xml)

- By name: [https://www.wowhead.com/item=iceblade%20arrow&xml](https://www.wowhead.com/item=iceblade%20arrow&xml)

### Hiding Item Text

Wowhead tooltips come with some information that the in-game tooltips do not display. If you'd like your tooltips to exactly resemble the in-game ones, you can disable the following components on Wowhead's:

- **maxstack**: The "Max Stack: 20" line usually seen on trade goods

- **droppedby**: The "Dropped by: Rexxar" line usually seen on looted weapons and armor from 1 boss

- **dropchance**: The "Drop Chance: 0.01%" line also seen with "Dropped by"

- **reagents**: At the very bottom of recipe tooltips, we add a line describing the recipe's reagents "Requires Gromsblood (2), Crystal Vial (1)"

- **ilvl**: In-game, tooltips show the item level only on weapons and armor, but not on anything else. We show item level on all items. This will let users hide the item level on everything but weapons and armor.

- **extra**: This is a shortcut to turn on all the 5 above options. With "extra" set, tooltips should look identical to in-game.

- **sellprice**: Blizzard added the item sell price to all item tooltips, but you can hide it as well by setting this option.

You can disable it by adding a "hide" section to the tooltip HTML code in the <head> section and then specifying what parts you'd like hidden. If you wanted to hide only the Dropped By and Drop Chance information, your code would be as follows:

<script>const wowhead\_tooltips = { "colorlinks": true, "iconizelinks": true, "renamelinks": true, "hide": { "droppedby": true, "dropchance": true } }</script>

### WoW Spells Options

- **ilvl** - ilvl
    Most useful for showing the value of an Azerite Trait in a piece of gear at a certain ilvl.

- **Level** – lvl
    Enter the character's level, useful for scaling spells!

- **Buff** – buff
    Use this parameter to display the buff of the current spell, instead of the regular tooltip.

- **Difficulty** - dd
    Use this parameter to display the correct spell value for the raid difficulty (14 - Normal, 15 - Heroic, 16 - Mythic)

- **Size** - size
    Use this parameter to display the scaled boss ability for flexible Normal and Heroic raids in Warlords of Draenor.

### WoW Achievements Options

- **Earned By** – who & when
    Use both parameters to display "Achievement earned by <who> on <when>", e.g: who=Maelstrata&amp;when=1273022820000

### Blizzard API Support

Wowhead uses spells to link to mounts and profession recipes, and NPCs to link to battle pets. [Blizzard's Game Data API](https://develop.battle.net/documentation/world-of-warcraft/game-data-apis) returns more specific mount, recipe, and species IDs, and does not include the IDs we use here. No problem! Wowhead also supports linking to those things by the IDs used by Blizzard. The correct tooltips will show, and links will redirect to their teaching items, spells, or NPCs as appropriate.

- **Recipe** - [/recipe/13474](https://www.wowhead.com/recipe/13474) forwards to [![Pattern: Frozen Shadoweave Shoulders](https://wow.zamimg.com/images/wow/icons/tiny/inv_scroll_03.gif) Pattern: Frozen Shadoweave Shoulders](https://www.wowhead.com/item=21912/pattern-frozen-shadoweave-shoulders).

- **Mount** - [/mount/6](https://www.wowhead.com/mount/6) forwards to [![Brown Horse Bridle](https://wow.zamimg.com/images/wow/icons/tiny/ability_mount_ridinghorse.gif) Brown Horse Bridle](https://www.wowhead.com/item=5656/brown-horse-bridle).

- **Battle Pet** - [/battle-pet/159](https://www.wowhead.com/battle-pet/159) forwards to [Peanut](https://www.wowhead.com/npc=23266/peanut).

- **Title** - [/title-mask/112](https://www.wowhead.com/title-mask/112) forwards to [%s the Insane](https://www.wowhead.com/title/the-insane-145). (There's no tooltip, but the link still forwards.)

### WoW Items Azerite Options

Wowhead supports displaying Azerite Powers in BFA helms, shoulders, and chests through **azerite-powers=**

- Enter the class ID, such as 5 for priest, and then the Azerite Power IDs.

- Example: [item=158349/petticoat-of-the-self-stylized-azerite-baron?bonus=4817:1482&azerite-powers=5:504:42:14](https://www.wowhead.com/item=158349/petticoat-of-the-self-stylized-azerite-baron?bonus=4817:1482&azerite-powers=5:504:42:14)

Wowhead supports displaying Azerite Essence Powers in the Heart of Azeroth item through **azerite-essence-powers=**

- Example: [item=158075/heart-of-azeroth?azerite-essence-powers=98:68](https://www.wowhead.com/item=158075/heart-of-azeroth?azerite-essence-powers=98:68)

## Advanced Usage: Diablo 4 Tooltips

There are many additional options that you can specify for various types of tooltips. Here's an example of an item link with several options specified at once (gems, enchant and item set pieces):

<a href="[https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1867490:1880033:1223323&greaterAffixes=1928785&itemPower=907](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1867490:1880033:1223323&greaterAffixes=1928785&itemPower=907)" class="d4-q5">Runic Gloves of Reanimation</a>

The result: [Runic Gloves of Reanimation](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1867490:1880033:1223323&greaterAffixes=1928785&itemPower=907). See below for more details on what can be done with various D4 entities.

Item options

Skill options

Paragon glyph options

Paragon node options

Aspect options

### D4 Items Options

- **Affixes** - `affixes`
    Enter the affix IDs, such as `affixes=1829582:1829586:1928785:1223323`.
    Example: [Runic Gloves of Reanimation](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1223323)

- **Affix Values** - `affixes`
    Enter the affix IDs, along with their values separated by "=" for each one, such as `affixes=583482=12:1083127=9:1210893=6.5:1746093=2622`.
    Example: [Juggernaut's Exceptional Armor](https://www.wowhead.com/diablo-4/item/juggernauts-exceptional-armor-545570?affixes=583482=12:1083127=9:1210893=6.5:1746093=2622)

- **Item Power** - `itemPower`
    Enter the item power, such as `itemPower=700`.
    Example: [Polearm](https://www.wowhead.com/diablo-4/item/polearm-1224656?itemPower=907)

- **Greater Affixes** - `greaterAffixes`
    Enter the IDs of the affixes which have the greater affix bonus, such as `greaterAffixes=1829586:1928785`.
    Example: [Runic Gloves of Reanimation](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1223323&greaterAffixes=1829586:1928785)

- **Masterworking** - `masterworking`
    Enter the IDs of the affixes which have the masterworking milestone bonuses, such as `masterworking=1867490:1880033`.
    It's recommended to always include the affix values (see "Affix Values" above) when using this option, so that the right values are shown in the result.
    When affix values are provided, it will also apply the appropriate color to that value.
    You can also specify the exact masterwork level by prefixing the affixes with the level followed by a colon, such as `masterworking=8:1867490:1880033`.
    When the masterwork level is not supplied, it will assume masterwork level 12.
    Example: [Runic Gloves of Reanimation](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582=9.8:1829586=62.4:1928785=4:1867490=85.3:1880033=62.0:1223323=40&greaterAffixes=1928785&masterworking=8:1867490:1880033)

- **Socketed Items** - `sockets`
    Enter the IDs of the items which are socketed, such as gems or runes, or use `0` for an empty socket, such as `sockets=315754:0`.
    Example: [Temerity](https://www.wowhead.com/diablo-4/item/temerity-1306326?sockets=315754:0)

### D4 Skills Options

- **Rank** - `rank`
    Enter the skill's rank, such as `rank=3`.
    Example: [Frozen Orb rank 3/5](https://www.wowhead.com/diablo-4/skill/frozen-orb-291347?rank=3)

- **Display Modifier** - `mod`
    Enter the mod ID, such as `mod=7`.
    Example: [Greater Frozen Orb](https://www.wowhead.com/diablo-4/skill/frozen-orb-291347?mod=7)
    You can inspect the divs wrapping the modifiers on the skill page to see their modifier IDs.

- **Include Modifiers** - `mods`
    Enter the mod IDs, such as `mods=5:7`.
    Example: [Frozen Orb with two modifiers](https://www.wowhead.com/diablo-4/skill/frozen-orb-291347?mods=5:7)
    You can inspect the divs wrapping the modifiers on the skill page to see their modifier IDs.

### D4 Paragon Glyphs Options

- **Level** - `level`
    Enter the level of the paragon glyph, such as `level=21`.
    Example: [Amplify level 21](https://www.wowhead.com/diablo-4/paragon-glyph/amplify-1031006?level=21)

- **Class** - `class`
    Enter the class index, such as `class=4`, to see how a specific class sees a node in their board.
    Example: [Undaunted for sorcerers](https://www.wowhead.com/diablo-4/paragon-glyph/territorial-1023197?class=0), [Undaunted for necromancers](https://www.wowhead.com/diablo-4/paragon-glyph/territorial-1023197?class=4)

### D4 Paragon Nodes Options

- **Board Index** - `board`
    Enter the index of the player's board where the paragon node is displayed, such as `board=3`, to modify the display of the bonus requirements. The index starts at 0.
    Example: [Tenacity in board 0](https://www.wowhead.com/diablo-4/paragon-node/tenacity-675186?board=0), [Tenacity in board 3](https://www.wowhead.com/diablo-4/paragon-node/tenacity-675186?board=3)

- **Class** - `class`
    Enter the class index, such as `class=1`, to see how a specific class sees a node in their board.
    Example: [Tenacity for necromancers](https://www.wowhead.com/diablo-4/paragon-node/tenacity-675186?class=4), [Tenacity for druids](https://www.wowhead.com/diablo-4/paragon-node/tenacity-675186?class=1)

### D4 Aspects Options

- **Item Type** - `itemType`
    Enter the item type ID, such as `itemType=446799` for two-handed sword.
    Examples: [Edgemaster's Aspect](https://www.wowhead.com/diablo-4/aspect/edgemasters-aspect-578875), [Edgemaster's Aspect for two-handed swords](https://www.wowhead.com/diablo-4/aspect/edgemasters-aspect-578875?itemType=446799)

Wowhead's tooltips script allows you to add WoW tooltips, Diablo 4 tooltips, and more to your own site, with many possible customization options.

Our game data tooltips display detailed information when hovering over a link, or tapping it on mobile. We are used by millions of players world-wide on sites like [Warcraft Logs](https://www.warcraftlogs.com/) and [Raider.IO](https://raider.io/). Wowhead tooltips even power some official Blizzard tools, like their **Warcraft MDI Twitch Extension**, allowing thousands of concurrent players to inspect the participants for detailed talent and gear information.

If you are a fansite that would like to request Wowhead to add some tooltip functionality that would help your site, please email . While we can't support _every_ request, and we may be busy leading up to or during major patch releases, we want to support the needs of the community!

_Wowhead's tooltips being used in Blizzard's MDI Twitch Extension_

## How to Install Wowhead Tooltips?

Just follow these few simple steps!

1. Add this piece of HTML code in the <head> section of your page:
    <script>const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};</script>
    <script src="[https://wow.zamimg.com/js/tooltips.js"></script>](https://wow.zamimg.com/js/tooltips.js"></script>)
2. You are done!

Wowhead links found on your site will now sport a **tooltip** and an **icon**. It supports all pages that have tooltips on Wowhead, such as:

- item, spell, quest, npc, achievement, zone, event, object, and more

Icons show up by default, you can customize the colors of your links, and easily rename them!

You can check out this [working demo](https://wow.zamimg.com/widgets/power/demo.html), and see how easy it is!

## Advanced Usage: All Games

Once you have the <script> tag added to your site, the following parameters can be used in the **data-wowhead** attribute of your links (<a>). They can be combined by using the ampersand character (&amp;).

- **Other Domains**
    Enter the wowhead domain (www, ptr, de, es, fr, ru, de.classic, ru.classic, etc) to display a different version or localization (language), e.g: domain=classic, domain=ptr, domain=ru, or domain=ru.classic.

- **Icon Sizes**
    If you add iconSize: 'small' to the whTooltips options you can make all icons "small" instead of tiny. Available sizes: tiny (the default), small, medium, and large.If you have iconSize added (even if it's just set to iconSize: true) you can also specify icon sizes on each individual link! Just add this HTML attribute to your <a> tag: data-wh-icon-size="small". The same icon sizes are available.
- If you _only_ add iconSize: true, and _not_ iconizeLinks: true, then the icons will only appear on the links where you specify a size.

**Renaming**
If you include renameLinks: true to the whTooltips options you can rename all the Wowhead links on your site.

- You can also specify individual links to be renamed! Just add this HTML attribute to your <a> tag: data-wh-rename-link="true".

**Custom URLs**
You can make your links point to any page you wish, and still display a tooltip. Example:<a href="#" data-wowhead="item=2828">hai</a>

Interested in using our script in your forum? Check out [this thread](https://www.wowhead.com/forums&topic=3464) for information on implementing it on many popular forum systems (phpBB, vBulletin, etc.) or check out the handy guides written by our users:

- [vBulletin](https://www.wowhead.com/forums&topic=3464#p37094)
- phpBB: [2.x.x](https://www.wowhead.com/forums&topic=3464#p37492) - [2.x.x Mod Version](https://www.wowhead.com/forums&topic=3464.6#p58403) | [3.0](https://www.wowhead.com/forums&topic=14347&p=126922) by craCkpot - [3.0](https://www.wowhead.com/forums&topic=3464#p37204) by marcimi - [3.0 Mod Version](https://www.wowhead.com/forums&topic=3464.3#p42858)
- [Simple Machines Forum (SMF)](https://www.wowhead.com/forums&topic=3464#p37618)
- [Invision Power Board (IPB)](https://www.wowhead.com/forums&topic=3464.3&p=4080#p40631)
- [WordPress Blog](https://www.wowhead.com/forums&topic=3464.3&p=42952#p42952) ([Plugin Version](https://www.wowhead.com/forums&topic=3464.4#p43652))
- [PHP Nuke-Evolution](https://www.wowhead.com/forums&topic=3464.7&p=63338#p61443)
- [MyBB](https://www.wowhead.com/forums&topic=3464.3#p43232)
- [TikiWiki](https://www.wowhead.com/forums&topic=3464.6#p48648)
- [YaBB](https://www.wowhead.com/forums&topic=3464.6#p49640)
- [Drupal](https://www.wowhead.com/forums&topic=3464.5#p46801)
- [PunBB](https://www.wowhead.com/forums&topic=3464.3#p42456)
- [Dojo](https://www.wowhead.com/forums&topic=10938)

## Advanced Usage: World of Warcraft Tooltips

There are many additional options that you can specify for various types of tooltips. Here's an example of an item link with several options specified at once (gems, enchant and item set pieces):
<a href="[https://www.wowhead.com/item=25697"](https://www.wowhead.com/item=25697") class="q3" data-wowhead="gems=23121&amp;ench=2647&amp;pcs=25695:25696:25697">Felstalker Bracers</a>

The result: [Felstalker Bracers](https://www.wowhead.com/item=25697). See below for more details on what can be done with various WoW entities.

### Item options

- **Artifact Knowledge** - ak
    Enter the Artifact Knowledge number, such as ak=30
- **Transmogrified to** - transmog
    Enter the item ID of the item you've transmogged to, such as transmog=32235 for changing your helm to [Cursed Vision of Sargeras](/item=32235/cursed-vision-of-sargeras)
    Use transmog=hidden if you have chosen to hide that slot
- **Level** – lvl
    Enter the character's level, useful for heirloom items!
- **Enchant** – ench
    Enter the ID of the enchant, such as: ench=2647
- **Gems** – gems
    List all the gems (item IDs) you want the item to have, separated by a colon. E.g. gems=23121. Other items slotted in to gear, such as Legion relics, are treated the same as gems, and can even have item bonuses applied. E.g.
    [/item=128908&gems=141522:141514:152696&bonus=1518:1520:1524:751](https://dev.wowhead.com/item=128908&gems=141522:141514:152696&bonus=1518:1520:1524:751)
- **Extra Socket** - sock
    Add an extra socket to the item. Only works for belts, bracers and gloves.
- **Item Level** - ilvl
    Set the item level. This overrides even item level modifiers applied to the item, such as from relics. Stats will be updated accordingly. Example: [Thunderfury with 1000 ilvl](https://www.wowhead.com/item=19019/thunderfury-blessed-blade-of-the-windseeker&ilvl=1000)
- **Item Set Pieces** – pcs
    List all the pieces (item IDs) you want to consider for the set bonus, separated by a colon. e.g: pcs=25695:25696:25697
- **Item Upgrade** - upgd
    Enter the upgrade number, such as: upgd=2
- **Warlords of Draenor PvP Mode** - pvp
    This shows the higher ilvl version of Warlords of Draenor items that change stats during PvP.
- **Warlords of Draenor Challenge Mode** - chal
    This shows an ilvl 630 scaled-down version of an item, which is the version equipped in Challenge Modes.
- **Netherlight Crucible Item Level Ranks** - nlc
    This adds +5 item levels for each Netherlight Crucible trait you have that gives +5 item levels. Can be set to 1, 2, or 3.
- **Timewalking Burning Crusade** - twtbc
    This shows an ilvl 90 scaled-down version of an item, which is the version equipped in Burning Crusade Timewalking Dungeons.
- **Timewalking Wrath** - twwotlk
    This shows an ilvl 160 scaled-down version of an item, which is the version equipped in Wrath's Timewalking Dungeons.
- **Random Enchantment** – rand
    Enter the ID of random enchantment (e.g. of the Bear), such as: rand=-7. Full list of IDs under the toggle.
    Random Enchant ID list

    Single-stat Suffixes
    15, of Spirit, Spirit
    16, of Stamina, Stamina
    17, of Strength, Strength
    18, of Agility, Agility
    19, of Intellect, Intellect
    20, of Power, Attack Power
    21, of Arcane Wrath, Arcane Damage
    22, of Fiery Wrath, Fire Damage
    23, of Frozen Wrath, Frost Damage
    24, of Nature's Wrath, Nature Damage
    25, of Shadow Wrath, Shadow Damage
    26, of Intellect, Intellect
    27, of Nimbleness, Dodge
    28, of Stamina, Stamina
    30, of Spirit, Spirit
    61, of Intellect, Intellect
    62, of Strength, Strength
    63, of Agility, Agility
    64, of Power, Attack Power
    65, of Magic, Spell Power
    84, of Stamina, Stamina
    99, of Speed, Haste

    Two-stat Suffixes
    5, of the Monkey, Agility/Stamina
    6, of the Eagle, Intellect/Stamina
    7, of the Bear, Stamina/Strength
    8, of the Whale, Spirit/Stamina
    9, of the Owl, Intellect/Spirit
    10, of the Gorilla, Intellect/Strength
    11, of the Falcon, Agility/Intellect
    12, of the Boar, Spirit/Strength
    13, of the Wolf, Agility/Spirit
     14, of the Tiger, Agility/Hit
    29, of Eluding, Dodge/Agility
    31, of Arcane Protection, Stamina/Arcane Resistance
    32, of Fire Protection, Stamina/Fire Resistance
    33, of Frost Protection, Stamina/Frost Resistance
    34, of Nature Protection, Stamina/Nature Resistance
    35, of Shadow Protection, Stamina/Shadow Resistance
    47, of Blocking, Shield Block/Strength
    68, of the Bear, Strength/Stamina
    69, of the Eagle, Stamina/Intellect
    78, of the Monkey, Agility/Stamina
    81, of the Whale, Stamina/Spirit
    140, of the Wraith, Critical Strike/Spirit
    141, of the Wind, Spirit/Haste
    142, of the Master, Spirit/Mastery
    144, of the Shark, Critical Strike/Mastery
    145, of the Panther, Mastery/Haste
    146, Crit/Mastery, Critical Strike/Mastery
    147, of the Shark, Critical Strike/Mastery
    148, Crit/Spirit, Crit/Spirit
    150, of the Panther, Mastery/Haste
    151, of the Wind, Spirit/Haste
    152, of the Master, Spirit/Mastery
    153: of the Wraith, Haste/Mastery
    154, of the Shark, Critical Strike/Mastery
    156, of the Wraith, Critical Strike/Spirit
    157, of the Panther, Mastery/Haste
    158, of the Wind, Spirit/Haste
    159, of the Master, Spirit/Mastery
    160, of the Mongoose, Hit/Haste
    161, of Storms, Hit/Critical Strike
    162, of Flames, Hit/Mastery
    163, of the Mongoose, Hit/Haste
    164, of Storms, Hit/Critical Strike
    165, of Flames, Hit/Mastery
    166, of the Mongoose, Hit/Mastery
    167, of Storms, Hit/Critical Strike
    168, of Flames, Hit/Mastery

    Three-stat Suffixes (Added in TBC)
    36, of the Sorcerer, Stamina/Intellect/Haste
    37, of the Seer, Stamina/Intellect/Critical Strike
    38, of the Prophet, Intellect/Spirit/Haste
    39, of the Invoker, Intellect/Critical Strike
    40, of the Bandit, Agility/Stamina/Critical Strike
    41, of the Beast, Hit/Critical Strike/Stamina
    42, of the Elder, Stamina/Intellect/Spirit
    43, of the Soldier, Strength/Stamina/Critical Strike
    44, of the Elder, Stamina/Intellect/Spirit
    45, of the Champion, Strength/Stamina/Dodge
    46, of the Test, Agility/Armor/Intellect/Spirit/Stamina
    48, of Paladin Testing, Intellect/Stamina/Spell Power/Strength
    49, of the Grove, Strength/Agility/Haste
    50, of the Hunt, Haste/Critical Strike/Agility
    51, of the Mind, Intellect/Critical Strike/Haste
    52, of the Crusade, Strength/Stamina/Dodge
    53, of the Vision, Intellect/Haste/Stamina
    54, of the Ancestor, Strength/Critical Strike/Stamina
    55, of the Nightmare, Stamina/Intellect/Critical Strike
    56, of the Battle, Strength/Stamina/Critical Strike
    57, of the Shadow, Agility/Stamina/Critical Strike
    58, of the Sun, Critical Strike/Stamina/Intellect
    59, of the Moon, Intellect/Stamina/Spirit
    60, of the Wild, Haste/Agility/Stamina
    66, of the Knight, Stamina/Dodge/Expertise
    67, of the Seer, Stamina/Critical Strike/Intellect
    70, of the Ancestor, Strength/Critical Strike/Stamina
    71, of the Bandit, Agility/Stamina/Critical Strike
    72, of the Battle, Strength/Stamina/Critical Strike
    73, of the Elder, Stamina/Intellect/Spirit
    74, of the Beast, Hit/Critical Strike/Stamina
    75, of the Champion, Strength/Stamina/Dodge
    76, of the Grove, Strength/Agility/Haste
    77, of the Knight, Stamina/Dodge/Expertise
    79, of the Moon, Intellect/Stamina/Spirit
    80, of the Wild, Haste/Agility/Stamina
    82, of the Vision, Intellect/Haste/Stamina
    83, of the Sun, Critical Strike/Stamina/Intellect
    85, of the Sorcerer, Stamina/Intellect/Haste
    86, of the Soldier, Strength/Stamina/Critical Strike
    87, of the Shadow, Agility/Stamina/Critical Strike
    88, of the Foreseer, Intellect/Critical Strike/Haste
    89, of the Thief, Stamina/Agility/Haste
    90, of the Necromancer, Stamina/Hit/Intellect
    91, of the Marksman, Stamina/Agility/Hit
    92, of the Squire, Stamina/Hit/Strength
    93, Restoration, Intellect/Spirit/Stamina
    139, of the Mercenary, Strength/Haste/Stamina

    Four-stat Suffixes (Added in Cataclysm)
    100, of the Principle, Critical Strike/Hit/Strength/Stamina
    101, of the Sentinel, Expertise/Hit/Strength/Stamina
    102, of the Hero, Haste, Critical Strike/Strength/Stamina
    103, of the Avatar, Critical Strike/Mastery/Strength/Stamina
    104, of the Embodiment, Haste/Mastery/Strength/Stamina
    105, of the Guardian, Mastery/Shield Block/Strength/Stamina
    106, of the Defender, Dodge/Parry/Strength/Stamina
    107, of the Exemplar, Strength/Dodge/Stamina/Expertise
    108, of the Curator, Strength/Dodge/Parry/Stamina
    109, of the Preserver, Mastery/Intellect/Spirit/Stamina
    110: of the Elements, Stamina/Intellect/Hit/Critical Strike
    111, of the Paradigm, Stamina/Intellect/Hit/Mastery
    112, of the Pattern, Stamina/Intellect/Critical Strike/Haste
    113, of the Essence, Stamina/Intellect/Haste/Spirit
    114, of the Flameblaze, Mastery/Intellect/Hit/Stamina
    115, of the Archetype, Stamina/Agility/Hit/Critical Strike
    116, of the Manifestation, Stamina/Agility/Hit/Expertise
    117, of the Incarnation, Stamina/Agility/Critical Strike/Haste
    118, of the Faultline, Mastery/Strength/Haste/Stamina
    119, of the Ideal, Stamina/Agility/Haste/Mastery
    120, of the Earthshaker, Critical Strike/Strength/Hit/Stamina
    121, of the Landslide, Strength/Hit/Stamina/Expertise
    122, of the Earthfall, Critical Strike/Strength/Haste/Stamina
    123, of the Earthbreaker, Critical Strike/Mastery/Strength/Stamina
    124, of the Mountainbed, Mastery/Strength/Stamina/Expertise
    125, of the Bedrock, Mastery/Strength/Parry/Stamina
    126, of the Substratum, Stamina/Strength/Expertise/Dodge
    127, of the Bouldercrag, Strength/Dodge/Parry/Stamina
    128, of the Rockslab, Mastery/Strength/Dodge/Stamina
    129, of the Wildfire, Critical Strike/Intellect/Hit/Stamina
    130, of the Fireflash, Critical Strike/Intellect/Haste/Stamina
    131, of the Undertow, Intellect/Haste/Spirit/Stamina
    132, of the Wavecrest, Mastery/Intellect/Spirit/Stamina
    133, of the Stormblast, Critical Strike/Agility/Hit/Stamina
    134, of the Galeburst, Agility/Hit/Stamina/Expertise
    135, of the Windflurry, Critical Strike/Agility/Haste/Stamina
    136, of the Zephyr, Mastery/Agility/Haste/Stamina
    137, of the Windstorm, Critical Strike/Mastery/Agility/Staina
    138, of the Feverflare, Mastery/Intellect/Haste/Stamina
    143, of the Scorpion, Stamina/Intellect/Haste/Critical Strike
    149, of the Scorpion, Stamina/Intellect/Haste/Critical Strike
    155, of the Scorpion, Stamina/Intellect/Haste/Critical Strike

    Heroic Scenario and Battlefield Barrens Items
    344, of the Decimator, Critical Strike
    345, of the Unerring, Hit
    346, of the Adroit, Expertise
    347, of the Savant, Mastery
    348, of the Impatient, Haste
    349, of the Bladewall, Parry
    350, of the Untouchable, Dodge
    351, of the Pious, Spirit
    352, of the Landslide, Hit/Expertise
    353, of the Stormblast, Hit/Critical Strike
    354, of the Galeburst, Hit/Expertise
    355, of the Windflurry, Critical Strike/Haste
    356, of the Windstorm, Critical Strike/Mastery
    357, of the Zephyr, Haste/Mastery
    359, of the Flameblaze, Mastery/Hit
    360, of the Fireflash, Haste/Crit
    361, of the Feverflare, Haste/Mastery
    362, of the Undertow, Haste/Spirit
    363, of the Wavecrest, Spirit/Mastery
    364, of the Earthbreaker, Critical Strike/Mastery
    365, of the Faultline, Haste/Mastery
    366, of the Mountainbed, Mastery/Expertise
    367, of the Bedrock, Mastery/Parry
    368, of the Bouldercrag, Dodge/Parry
    369, of the Rockslab, Dodge/Mastery
    370, of the Earthshaker, Hit/Critical Strike
    371, of the Earthfall, Critical Strike/Haste

- **Reforges** - forg
    Enter the ID of the reforge pairing you'd like--each original/new stat combo has a specific ID. Full list under the toggle.
    Reforge ID list

    113,Spirit,Dodge Rating
    114,Spirit,Parry Rating
    115,Spirit,Hit Rating
    116,Spirit,Crit Rating
    117,Spirit,Haste Rating
    118,Spirit,Expertise Rating
    119,Spirit,Mastery
    120,Dodge Rating,Spirit
    121,Dodge Rating,Parry Rating
    122,Dodge Rating,Hit Rating
    123,Dodge Rating,Crit Rating
    124,Dodge Rating,Haste Rating
    125,Dodge Rating,Expertise Rating
    126,Dodge Rating,Mastery
    127,Parry Rating,Spirit
    128,Parry Rating,Dodge Rating
    129,Parry Rating,Hit Rating
    130,Parry Rating,Crit Rating
    131,Parry Rating,Haste Rating
    132,Parry Rating,Expertise Rating
    133,Parry Rating,Mastery
    134,Hit Rating,Spirit
    135,Hit Rating,Dodge Rating
    136,Hit Rating,Parry Rating
    137,Hit Rating,Crit Rating
    138,Hit Rating,Haste Rating
    139,Hit Rating,Expertise Rating
    140,Hit Rating,Mastery
    141,Crit Rating,Spirit
    142,Crit Rating,Dodge Rating
    143,Crit Rating,Parry Rating
    144,Crit Rating,Hit Rating
    145,Crit Rating,Haste Rating
    146,Crit Rating,Expertise Rating
    147,Crit Rating,Mastery
    148,Haste Rating,Spirit
    149,Haste Rating,Dodge Rating
    150,Haste Rating,Parry Rating
    151,Haste Rating,Hit Rating
    152,Haste Rating,Crit Rating
    153,Haste Rating,Expertise Rating
    154,Haste Rating,Mastery
    155,Expertise Rating,Spirit
    156,Expertise Rating,Dodge Rating
    157,Expertise Rating,Parry Rating
    158,Expertise Rating,Hit Rating
    159,Expertise Rating,Crit Rating
    160,Expertise Rating,Haste Rating
    161,Expertise Rating,Mastery
    162,Mastery,Spirit
    163,Mastery,Dodge Rating
    164,Mastery,Parry Rating
    165,Mastery,Hit Rating
    166,Mastery,Crit Rating
    167,Mastery,Haste Rating
    168,Mastery,Expertise Rating

Tooltips of items from WoW support item bonuses, which can have a wide variety of effects on the item, such as displayed difficulty, Tertiary stats, gem sockets, random stat combinations, and much more.

## Item Bonus Basics

Ever since the release of Warlords of Draenor, new items have one base item ID (or database page) for all item variations, instead of unique pages for each version like LFR, Heroic, Mythic, Warforged, etc.

Here's an example of how you can add item bonus 450 to display the "Mythic" text in a tooltip:
<a href="[https://www.wowhead.com/item=112920"](https://www.wowhead.com/item=112920") data-wowhead="bonus=450">link</a>
Result: [Korven's Crimson Crescent (Mythic)](https://www.wowhead.com/item=112920)

Without the data-wowhead="bonus=450" addition, this item wouldn't show as being from Mythic difficulty. You can show two bonuses at the same time as well, for example, Mythic Warforged would be data-wowhead="bonus=450:448".

## Raid Difficulties

- 449 or 566 - Heroic
- 450 or 567 - Mythic
- 451 - Raid Finder

Example: [Korven's Crimson Crescent (LFR)](https://www.wowhead.com/item=112920)

## Gear Augmentations

**There are three ways players can get better-than-expected stats for a particular item**\--higher ilvl (similar to current Warforged), an additional gem socket, and the presence of a bonus tertiary stat. It will take a while to farm up a complete "set" and may not be on every piece of gear.

- **Warforged-inspired gear** works much in the same way as it does currently--the item will have a slightly higher level.
- **Extra sockets**: sockets are used much more sparingly in Warlords.
- **Tertiary stats**: Movement Speed (Increases your movement speed), Indestructible (Causes the item to not take durability damage), Leech (Causes you to be healed for a portion of all damage and healing done), Avoidance (Reduces your damage taken from area-of-effect attacks).
- It is very rare to get an item that has all three augmentations at once. You can show all three at once, for example:
    <a href="[https://www.wowhead.com/item=112920"](https://www.wowhead.com/item=112920") data-wowhead="bonus=41:523:448">link</a>

40 - Avoidance
41 - Leech
42 - Speed
43 - Indestructible
562 - Warforged (+6)
656 - Warforged Timewarped (+15)
644 - Warforged Mythic (+20)
565 - Extra socket

Example: [Korven's Crimson Crescent (Warforged)](https://www.wowhead.com/item=112920)

## Quest Rewards

Quest rewards in Warlords of Draenor have a small chance to be rare or epic.

171 - rare version
15 - epic version
545 - Tanaan weapon upgrades

## Baleful 6.2 Items

Baleful items range between ilvl 650 and 695

652 - ilvl 650
761 - ilvl 660
762 - ilvl 665
763 - ilvl 670
651 - ilvl 675
764 - ilvl 680
765 - ilvl 685
766 - ilvl 690
648 - ilvl 695

Baleful items can also have a wide array of stats, documented in the random enchantments section of this page.

## Heirlooms in 6.1

Heirlooms in 6.1 can be upgraded to 1-90 (Upgrade 1), and then to 1-100 (Upgrade 2).

582 - Upgrade 1
583 - Upgrade 2

## Challenge Mode Rewards

Challenge Mode rewards in 6.2 are ilvl 680. Items acquired prior to 6.1 are ilvl 640.

609 - ilvl 680
591 - ilvl 660
0 - ilvl 640

## Holiday Items

The "base" ilvl for holiday items is ilvl 600, but they are higher ilvl in game.

553 - ilvl 635
557 - ilvl 670

## Legendary Ring Upgrades

Once you have completed your legendary ring, you can upgrade it via [Crystallized Fel](/item=127785/crystallized-fel).

0 - ilvl 735
622 - ilvl 738
623 - ilvl 741
624 - ilvl 744
625 - ilvl 747
626 - ilvl 750
627 - ilvl 753
628 - ilvl 756
629 - ilvl 759
630 - ilvl 762
631 - ilvl 765
632 - ilvl 768
633 - ilvl 771
634 - ilvl 774
635 - ilvl 777
636 - ilvl 780
637 - ilvl 783
638 - ilvl 786
639 - ilvl 789
640 - ilvl 792
641 - ilvl 795

## Random Enchantments

More random enchantments have been added, including combinations for new secondary stats in Warlords of Draenor:

19 to 39 - of the Fireflash, Crit/Haste
45 to 65 - Peerless, Crit/Mastery
66 to 86 - of the Savage, Crit/Multistrike
87 to 107 - of the Quickblade, Crit/Versatility
108 to 128 - of the Feverflare, Haste/Mastery
129 to 149 - of the Deft, Haste/Multistrike
150 to 170 - of the Aurora, Haste/Versatility
175 to 195 - of the Merciless, Mastery/Multistrike
196 to 216 - of the Harmonious, Versatility/Mastery
217 to 237 - of the Strategist, Versatility/Multistrike
238 to 258 - of the Guileful, Crit/Bonus Armor
259 to 279 - of the Windshaper, Haste/Bonus Armor
280 to 300 - of the Noble, Mastery/Bonus Armor
301 to 321 - of the Stormbreaker, Bonus Armor/Multistrike
322 to 342 - of the Stalwart, Versatility/Bonus Armor
343 to 363 - of the Fanatic, Spirit/Crit
364 to 384 - of the Zealot, Spirit/Haste
385 to 405 - of the Diviner, Spirit/Mastery
406 to 426 - of the Herald, Spirit/Multistrike
427 to 447 - of the Augur, Spirit/Versatility
486 - of the Decimator, Crit
487 - of the Impatient, Haste
489 - of the Savant, Mastery
490 - of the Relentless, Multistrike
491 - of the Adaptable, Versatility
492 - of the Unbreakable, Bonus Armor
493 - of the Pious, Spirit

## Dungeons

642 - Mythic
524 - Heroic
518 - 100 ilvl and 10 level reduction
519 - 80 ilvl and 8 level reduction
520 - 60 ilvl and 6 level reduction
521 - 30 ilvl and 5 level reduction
522 - 15 ilvl and 3 level reduction
615 - lvl 100 Timewarped

Add the following IDs to the mythic ID 642 for Mythic Warforged loot:

754 - 5 ilvl increase for Mythic loot from base
755 - 10 ilvl increase for Mythic loot from base
756 - 15 ilvl increase for Mythic loot from base
757 - 20 ilvl increase for Mythic loot from base
758 - 25 ilvl increase for Mythic loot from base
759 - 30 ilvl increase for Mythic loot from base
760 - 35 ilvl increase for Mythic loot from base
761 - 40 ilvl increase for Mythic loot from base

## Crafted

Armor:

525 - Stage 1 of 6
526 - Stage 2 of 6
527 - Stage 3 of 6
593 - Stage 4 of 6
617 - Stage 5 of 6
618 - Stage 6 of 6

Weapons:

525 - Stage 1 of 6
558 - Stage 2 of 6
559 - Stage 3 of 6
594 - Stage 4 of 6
619 - Stage 5 of 6
620 - Stage 6 of 6

### Items as XML

Also available are our item XML feeds. Every item in the database has a corresponding XML feed. You can reach those feeds either by ID or by name. For example:

- By ID: [https://www.wowhead.com/item=52021&xml](https://www.wowhead.com/item=52021&xml)
- By name: [https://www.wowhead.com/item=iceblade%20arrow&xml](https://www.wowhead.com/item=iceblade%20arrow&xml)

### Hiding Item Text

Wowhead tooltips come with some information that the in-game tooltips do not display. If you'd like your tooltips to exactly resemble the in-game ones, you can disable the following components on Wowhead's:

- **maxstack**: The "Max Stack: 20" line usually seen on trade goods
- **droppedby**: The "Dropped by: Rexxar" line usually seen on looted weapons and armor from 1 boss
- **dropchance**: The "Drop Chance: 0.01%" line also seen with "Dropped by"
- **reagents**: At the very bottom of recipe tooltips, we add a line describing the recipe's reagents "Requires Gromsblood (2), Crystal Vial (1)"
- **ilvl**: In-game, tooltips show the item level only on weapons and armor, but not on anything else. We show item level on all items. This will let users hide the item level on everything but weapons and armor.
- **extra**: This is a shortcut to turn on all the 5 above options. With "extra" set, tooltips should look identical to in-game.
- **sellprice**: Blizzard added the item sell price to all item tooltips, but you can hide it as well by setting this option.

You can disable it by adding a "hide" section to the tooltip HTML code in the <head> section and then specifying what parts you'd like hidden. If you wanted to hide only the Dropped By and Drop Chance information, your code would be as follows:
<script>const wowhead\_tooltips = { "colorlinks": true, "iconizelinks": true, "renamelinks": true, "hide": { "droppedby": true, "dropchance": true } }</script>

### WoW Spells Options

- **ilvl** - ilvl
    Most useful for showing the value of an Azerite Trait in a piece of gear at a certain ilvl.
- **Level** – lvl
    Enter the character's level, useful for scaling spells!
- **Buff** – buff
    Use this parameter to display the buff of the current spell, instead of the regular tooltip.
- **Difficulty** - dd
    Use this parameter to display the correct spell value for the raid difficulty (14 - Normal, 15 - Heroic, 16 - Mythic)
- **Size** - size
    Use this parameter to display the scaled boss ability for flexible Normal and Heroic raids in Warlords of Draenor.

### WoW Achievements Options

- **Earned By** – who & when
    Use both parameters to display "Achievement earned by <who> on <when>", e.g: who=Maelstrata&amp;when=1273022820000

### Blizzard API Support

Wowhead uses spells to link to mounts and profession recipes, and NPCs to link to battle pets. [Blizzard's Game Data API](https://develop.battle.net/documentation/world-of-warcraft/game-data-apis) returns more specific mount, recipe, and species IDs, and does not include the IDs we use here. No problem! Wowhead also supports linking to those things by the IDs used by Blizzard. The correct tooltips will show, and links will redirect to their teaching items, spells, or NPCs as appropriate.

- **Recipe** - [/recipe/13474](https://www.wowhead.com/recipe/13474) forwards to [Pattern: Frozen Shadoweave Shoulders](/item=21912/pattern-frozen-shadoweave-shoulders).
- **Mount** - [/mount/6](https://www.wowhead.com/mount/6) forwards to [Brown Horse Bridle](/item=5656/brown-horse-bridle).
- **Battle Pet** - [/battle-pet/159](https://www.wowhead.com/battle-pet/159) forwards to [Peanut](/npc=23266/peanut).
- **Title** - [/title-mask/112](https://www.wowhead.com/title-mask/112) forwards to . (There's no tooltip, but the link still forwards.)

### WoW Items Azerite Options

Wowhead supports displaying Azerite Powers in BFA helms, shoulders, and chests through **azerite-powers=**

- Enter the class ID, such as 5 for priest, and then the Azerite Power IDs.
- Example: [item=158349/petticoat-of-the-self-stylized-azerite-baron?bonus=4817:1482&azerite-powers=5:504:42:14](https://bfa.wowhead.com/item=158349/petticoat-of-the-self-stylized-azerite-baron?bonus=4817:1482&azerite-powers=5:504:42:14)

Wowhead supports displaying Azerite Essence Powers in the Heart of Azeroth item through **azerite-essence-powers=**

- Example: [item=158075/heart-of-azeroth?azerite-essence-powers=98:68](https://www.wowhead.com/item=158075/heart-of-azeroth?azerite-essence-powers=98:68)

## Advanced Usage: Diablo 4 Tooltips

There are many additional options that you can specify for various types of tooltips. Here's an example of an item link with several options specified at once (gems, enchant and item set pieces):
<a href="[https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1867490:1880033:1223323&greaterAffixes=1928785&itemPower=907"](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1867490:1880033:1223323&greaterAffixes=1928785&itemPower=907") class="d4-q5">Runic Gloves of Reanimation</a>

The result: [Runic Gloves of Reanimation](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1867490:1880033:1223323&greaterAffixes=1928785&itemPower=907). See below for more details on what can be done with various D4 entities.

### D4 Items Options

- **Affixes** - affixes
    Enter the affix IDs, such as affixes=1829582:1829586:1928785:1223323.
    Example: [Runic Gloves of Reanimation](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1223323)
- **Affix Values** - affixes
    Enter the affix IDs, along with their values separated by "=" for each one, such as affixes=583482=12:1083127=9:1210893=6.5:1746093=2622.
    Example: [Juggernaut's Exceptional Armor](https://www.wowhead.com/diablo-4/item/juggernauts-exceptional-armor-545570?affixes=583482=12:1083127=9:1210893=6.5:1746093=2622)
- **Item Power** - itemPower
    Enter the item power, such as itemPower=700.
    Example: [Polearm](https://www.wowhead.com/diablo-4/item/polearm-1224656?itemPower=907)
- **Greater Affixes** - greaterAffixes
    Enter the IDs of the affixes which have the greater affix bonus, such as greaterAffixes=1829586:1928785.
    Example: [Runic Gloves of Reanimation](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1223323&greaterAffixes=1829586:1928785)
- **Masterworking** - masterworking
    Enter the IDs of the affixes which have the masterworking milestone bonuses, such as masterworking=1867490:1880033.
    It's recommended to always include the affix values (see "Affix Values" above) when using this option, so that the right values are shown in the result.
    When affix values are provided, it will also apply the appropriate color to that value.
    You can also specify the exact masterwork level by prefixing the affixes with the level followed by a colon, such as masterworking=8:1867490:1880033.
    When the masterwork level is not supplied, it will assume masterwork level 12.
    Example: [Runic Gloves of Reanimation](https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582=9.8:1829586=62.4:1928785=4:1867490=85.3:1880033=62.0:1223323=40&greaterAffixes=1928785&masterworking=8:1867490:1880033)
- **Socketed Items** - sockets
    Enter the IDs of the items which are socketed, such as gems or runes, or use 0 for an empty socket, such as sockets=315754:0.
    Example: [Temerity](https://www.wowhead.com/diablo-4/item/temerity-1306326?sockets=315754:0)

### D4 Skills Options

- **Rank** - rank
    Enter the skill's rank, such as rank=3.
    Example: [Frozen Orb rank 3/5](https://www.wowhead.com/diablo-4/skill/frozen-orb-291347?rank=3)
- **Display Modifier** - mod
    Enter the mod ID, such as mod=7.
    Example: [Greater Frozen Orb](https://www.wowhead.com/diablo-4/skill/frozen-orb-291347?mod=7)
    You can inspect the divs wrapping the modifiers on the skill page to see their modifier IDs.
- **Include Modifiers** - mods
    Enter the mod IDs, such as mods=5:7.
    Example: [Frozen Orb with two modifiers](https://www.wowhead.com/diablo-4/skill/frozen-orb-291347?mods=5:7)
    You can inspect the divs wrapping the modifiers on the skill page to see their modifier IDs.

### D4 Paragon Glyphs Options

- **Level** - level
    Enter the level of the paragon glyph, such as level=21.
    Example: [Amplify level 21](https://www.wowhead.com/diablo-4/paragon-glyph/amplify-1031006?level=21)
- **Class** - class
    Enter the class index, such as class=4, to see how a specific class sees a node in their board.
    Example: [Undaunted for sorcerers](https://www.wowhead.com/diablo-4/paragon-glyph/territorial-1023197?class=0), [Undaunted for necromancers](https://www.wowhead.com/diablo-4/paragon-glyph/territorial-1023197?class=4)

### D4 Paragon Nodes Options

- **Board Index** - board
    Enter the index of the player's board where the paragon node is displayed, such as board=3, to modify the display of the bonus requirements. The index starts at 0.
    Example: [Tenacity in board 0](https://www.wowhead.com/diablo-4/paragon-node/tenacity-675186?board=0), [Tenacity in board 3](https://www.wowhead.com/diablo-4/paragon-node/tenacity-675186?board=3)

### D4 Aspects Options

- **Item Type** - itemType
    Enter the item type ID, such as itemType=446799 for two-handed sword.
    Examples: [Edgemaster's Aspect](https://www.wowhead.com/diablo-4/aspect/edgemasters-aspect-578875), [Edgemaster's Aspect for two-handed swords](https://www.wowhead.com/diablo-4/aspect/edgemasters-aspect-578875?itemType=446799)

## Embedded Content

---

---

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1">
    <title>Wowhead Tooltips Demo</title>
    <script>
        const whTooltips = {
            colorLinks: true,
            iconizeLinks: true,
            renameLinks: false,
            iconSize: 'tiny',
        };
    </script>
    <script src="/js/tooltips.js"></script>
    <style>
body {background:#000; color:#fff; font-family:"Open Sans", Arial, "Helvetica Neue", Helvetica, sans-serif; font-size:14px; line-height:1.5; margin:0; padding:50px 15px 15px 15px}
*:focus {outline:2px dotted #fff; outline-offset:2px}
area:focus {outline:auto}
a {color:#ffd100; cursor:pointer}
a:hover {color:#fff}
h1 {margin: 0}
section {float: left; margin: 0 20px 20px 0}
.sub-heading {font-size:13px; font-weight:normal; margin-top:0}
.corner-links a {background-color: #000; padding: 2px; position: fixed}
    </style>
</head>

<body>

<h1>Wowhead Tooltips Demo</h1>
<p class="sub-heading"><a href="https://www.wowhead.com/tooltips">&laquo; Return to the tooltips instructions</a></p>

<section>
    <h2>Diablo 4 Tooltips</h2>

    <h3>D4 Item Tooltips</h3>
    <a href="https://www.wowhead.com/diablo-4/item/the-grandfather-223271" data-wh-icon-size="small">The Grandfather</a> <small>with larger icon specified</small><br>
    <a href="https://www.wowhead.com/diablo-4/item/runic-gloves-of-reanimation-444429?affixes=1829582:1829586:1928785:1867490:1880033:1223323&greaterAffixes=1928785&itemPower=907">Runic Gloves</a> <small>with various params</small><br>
    <a href="https://www.wowhead.com/diablo-4/item/ingolith-1852195">Ingolith</a><br>
    <a href="https://www.wowhead.com/diablo-4/item/herb-cache-1241812">Herb Cache</a><br>
    <a href="https://www.wowhead.com/diablo-4/item/ruby-fragment-1623149">Ruby Fragment</a><br>

    <h3>D4 Skill Tooltips</h3>
    <a href="https://www.wowhead.com/diablo-4/skill/frozen-orb-291347">Frozen Orb</a><br>
    <a href="https://www.wowhead.com/diablo-4/skill/frozen-orb-291347?mods=5:7">Frozen Orb with modifiers</a><br>
    <a href="https://www.wowhead.com/diablo-4/skill/frozen-orb-291347?mod=7">Greater Frozen Orb</a> <small>(Skill modifier)</small><br>

    <h3>D4 Paragon Nodes</h3>
    <a href="https://www.wowhead.com/diablo-4/paragon-node/flawless-technique-674923">Flawless Technique</a><br>
    <a href="https://www.wowhead.com/diablo-4/paragon-node/tempest-680040">Tempest</a><br>
    <a href="https://www.wowhead.com/diablo-4/paragon-node/5-0-vulnerable-damage-678863">Vulnerable Damage</a><br>
    <a href="https://www.wowhead.com/diablo-4/paragon-node/5-dexterity-678775">Dexterity</a><br>

    <h3>D4 Paragon Glyphs</h3>
    <a href="https://www.wowhead.com/diablo-4/paragon-glyph/elementalist-1023186" data-wh-icon-size="small">Elementalist</a><br>

    <h3>D4 Aspects</h3>
    <a href="https://www.wowhead.com/diablo-4/aspect/edgemasters-aspect-578875">Edgemaster's Aspect</a><br>
    <a href="https://www.wowhead.com/diablo-4/aspect/aspect-of-adaptability-1741829">Aspect of Adaptability</a><br>

    <h3>D4 Affixes</h3>
    <a href="https://www.wowhead.com/diablo-4/affix/unrelenting-1290697">Unrelenting</a><br>
    <a href="https://www.wowhead.com/diablo-4/affix/thorned-1829666">Thorned</a><br>
</section>

<section>

<h2>World of Warcraft Tooltips</h2>

<h3>WoW Item Tooltips</h3>

<a href="https://www.wowhead.com/item=31015" class="q4">Skyshatter Cover</a><br />
<a href="https://www.wowhead.com/item=30987" class="q4">Lightbringer Faceguard</a><br /><br />

<a href="https://www.wowhead.com/beta/item=49286" class="q4">X-51 Nether-Rocket X-TREME (Beta)</a><br>
<a href="https://www.wowhead.com/ptr/item=49286" class="q4">X-51 Nether-Rocket X-TREME (PTR)</a><br><br>
<a href="https://www.wowhead.com/item=49286" class="q4">X-51 Nether-Rocket X-TREME (Live)</a><br /><br />

<a href="http://www.skosiris.com" rel="item=28288" class="q3">Abacus of Violent Odds</a> <small>(Custom URL)</small><br />
<a href="https://www.wowhead.com/item=22589&amp;lvl=80" class="q5">Atiesh, Greatstaff of the Guardian</a> <small>(Level 80 conversions)</small><br />
<a href="https://www.wowhead.com/item=25697" rel="gems=23121&amp;ench=2647&amp;pcs=25697:25695:25696" class="q3">Felstalker Bracers</a> <small>(Enchant, gem, set bonus)</small><br />
<a href="https://www.wowhead.com/item=31928" rel="rand=-63&amp;ench=2931" class="q3">Dark Band of Agility</a> <small>(Random enchantment, enchant)</small><br />
<a href="https://www.wowhead.com/item=32474" rel="ench=3003&amp;gems=32409:31865" class="q3">Surestrike Goggles v2.0</a> <small>(Enchant, gems)</small><br /><br />

<h3>WoW Spell Tooltips</h3>
<a href="https://www.wowhead.com/spell=18562">Swiftmend</a><br />
<a href="https://www.wowhead.com/cata/spell=589&amp;lvl=42">Shadow Word: Pain</a> <small>(Level 42 scaling)</small><br>
<a href="https://www.wowhead.com/spell=36257">Blacksmithing: Bulwark of the Ancient Kings</a><br /><br />

<a href="https://www.wowhead.com/spell=1126" rel="buff">Mark of the Wild</a> <small>(Buff)</small><br /><br />

<h3>WoW Quest Tooltips</h3>
<a href="https://www.wowhead.com/quest=826">Zalazane</a><br />
<a href="https://www.wowhead.com/quest=11389">Wanted: Arcatraz Sentinels</a><br />
<a href="https://www.wowhead.com/quest=11058">An Apexis Relic</a><br />
<a href="https://www.wowhead.com/quest=9637">Kalynna's Request</a><br /><br />

<h3>WoW Achievement Tooltips</h3>
<a href="https://www.wowhead.com/wotlk/achievement=277">'Tis the Season</a><br>
<a href="https://www.wowhead.com/wotlk/achievement=1558">100 Fish</a><br><br>

<h3>Tooltips in Image Maps</h3>

<map id="planetmap" name="planetmap">
<area shape="rect"   coords="0,0,82,126" href="https://www.wowhead.com/item=30987"    target="_blank" alt="Sun" />
<area shape="circle" coords="90,58,3"    href="https://www.wowhead.com/spell=1126" target="_blank" alt="Mercury" />
<area shape="circle" coords="124,58,8"   href="https://www.wowhead.com/quest=11058"  target="_blank" alt="Venus" />
</map>
<img src="https://www.w3schools.com/TAGS/planets.gif" width="145" height="126" alt="" border="0" usemap ="#planetmap" />

</section>

<section>

<h2>Localized Tooltips</h2>

Tooltips are shown in the same language as the target page.<br><br>

Some examples:<br>
<b>Deutsch:</b> <a href="https://www.wowhead.com/de/item=31015" class="q4">Bedeckung des Himmelsdonners</a><br>
<b>Français:</b> <a href="https://www.wowhead.com/fr/item=31015" class="q4">Couvre-chef Brise-ciel</a><br>
<b>Español:</b> <a href="https://www.wowhead.com/es/item=31015" class="q4">Casquete de destrozacielos</a><br>
<b>Русский:</b> <a href="https://www.wowhead.com/ru/item=31015" class="q4">Убор Небокрушителя</a><br>

</section>

<div class="corner-links">
    <a style="top: 0;    left: 0"  href="https://www.wowhead.com/item=6479">Item #6479!</a>
    <a style="top: 0;    right: 0" href="https://www.wowhead.com/item=8171">Item #8171</a>
    <a style="bottom: 0; left: 0"  href="https://www.wowhead.com/item=22589">Item #22589</a>
    <a style="bottom: 0; right: 0" href="https://www.wowhead.com/item=30319">Item #30319</a>
</div>

</body>
</html>

```
