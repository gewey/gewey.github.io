/**
 * Notion Button Toggles SSOT Cache
 * Auto-synced from Notion database "Bookmark Buttons to Build"
 * Total disabled buttons: 36
 */
(function() {
  'use strict';
  const tokens = [
  "./reference/index.html",
  "./sports/index.html",
  "Airbrush",
  "Bleacher Report",
  "Bleeping Computer",
  "Blizzard Press",
  "CodePen",
  "Codecademy",
  "Digg",
  "ESPN",
  "FacyAI",
  "Fontvilla",
  "FreeCodeCamp",
  "GitHub",
  "MIT App Inventor",
  "MLB",
  "Mastodon",
  "Material Design",
  "Mix",
  "NASCAR",
  "NBA",
  "NCAA",
  "NFL",
  "Open Culture",
  "PGA Tour",
  "Reddit",
  "Soccer.com",
  "Sports",
  "Sports Illustrated",
  "Stack Overflow",
  "Telegram",
  "TensorFlow.js",
  "Text Free",
  "TutorialsPoint",
  "W3Schools",
  "Web Development",
  "WordPress",
  "Zapier",
  "ai2.appinventor.mit.edu",
  "airbrush",
  "airbrush.com",
  "bleacher report",
  "bleacherreport",
  "bleacherreport.com",
  "bleeping computer",
  "bleepingcomputer",
  "blizzard press",
  "blizzard.gamespress.com/World-of-Warcraft",
  "blizzard.gamespress.com/world-of-warcraft",
  "blizzardpress",
  "codecademy",
  "codepen",
  "codepen.io",
  "digg",
  "digg.com",
  "espn",
  "facy.ai/swap-face-ai/photo",
  "facyai",
  "fontvilla",
  "fontvilla.com",
  "freecodecamp",
  "github",
  "github.com",
  "http://ai2.appinventor.mit.edu/",
  "http://digg.com/",
  "http://wordpress.org/",
  "http://www.openculture.com",
  "http://www.reddit.com/",
  "http://www.w3schools.com/",
  "https://airbrush.com/",
  "https://bleacherreport.com/",
  "https://blizzard.gamespress.com/World-of-Warcraft",
  "https://blizzard.gamespress.com/world-of-warcraft",
  "https://codepen.io/",
  "https://facy.ai/swap-face-ai/photo",
  "https://fontvilla.com/",
  "https://github.com/",
  "https://js.tensorflow.org/",
  "https://learn.freecodecamp.org/",
  "https://mastodon.social/",
  "https://material.io/",
  "https://mix.com/",
  "https://stackoverflow.com/",
  "https://textfree.us/",
  "https://web.telegram.org/",
  "https://www.bleepingcomputer.com/",
  "https://www.codecademy.com/",
  "https://www.espn.com/",
  "https://www.mlb.com/",
  "https://www.nascar.com/",
  "https://www.nba.com/",
  "https://www.ncaa.org/",
  "https://www.nfl.com/",
  "https://www.pgatour.com/",
  "https://www.si.com/",
  "https://www.soccer.com/",
  "https://www.tutorialspoint.com/index.htm",
  "https://www.zapier.com/",
  "js.tensorflow.org",
  "learn.freecodecamp.org",
  "mastodon",
  "mastodon.social",
  "material design",
  "material.io",
  "materialdesign",
  "mit app inventor",
  "mitappinventor",
  "mix",
  "mix.com",
  "mlb",
  "nascar",
  "nba",
  "ncaa",
  "nfl",
  "open culture",
  "openculture",
  "pga tour",
  "pgatour",
  "reddit",
  "soccer.com",
  "soccercom",
  "sports",
  "sports illustrated",
  "sportsillustrated",
  "stack overflow",
  "stackoverflow",
  "stackoverflow.com",
  "telegram",
  "tensorflow.js",
  "tensorflowjs",
  "text free",
  "textfree",
  "textfree.us",
  "tutorialspoint",
  "w3schools",
  "web development",
  "web.telegram.org",
  "webdevelopment",
  "wordpress",
  "wordpress.org",
  "www.bleepingcomputer.com",
  "www.codecademy.com",
  "www.espn.com",
  "www.mlb.com",
  "www.nascar.com",
  "www.nba.com",
  "www.ncaa.org",
  "www.nfl.com",
  "www.openculture.com",
  "www.pgatour.com",
  "www.reddit.com",
  "www.si.com",
  "www.soccer.com",
  "www.tutorialspoint.com/index.htm",
  "www.w3schools.com",
  "www.zapier.com",
  "zapier"
];
  window.NOTION_DISABLED_BUTTONS = new Set(tokens);
  window.NOTION_DISABLED_RECORDS = [
  {
    "title": "Sports",
    "url": "./sports/index.html",
    "category": "Sports"
  },
  {
    "title": "CodePen",
    "url": "https://codepen.io/",
    "category": "Web Development"
  },
  {
    "title": "Digg",
    "url": "http://digg.com/",
    "category": "Social"
  },
  {
    "title": "FacyAI",
    "url": "https://facy.ai/swap-face-ai/photo",
    "category": "Web Development"
  },
  {
    "title": "FreeCodeCamp",
    "url": "https://learn.freecodecamp.org/",
    "category": "Web Development"
  },
  {
    "title": "GitHub",
    "url": "https://github.com/",
    "category": "Web Development"
  },
  {
    "title": "MLB",
    "url": "https://www.mlb.com/",
    "category": "Sports"
  },
  {
    "title": "Web Development",
    "url": "./reference/index.html",
    "category": "Web Development"
  },
  {
    "title": "MIT App Inventor",
    "url": "http://ai2.appinventor.mit.edu/",
    "category": "Web Development"
  },
  {
    "title": "NCAA",
    "url": "https://www.ncaa.org/",
    "category": "Sports"
  },
  {
    "title": "TutorialsPoint",
    "url": "https://www.tutorialspoint.com/index.htm",
    "category": "Web Development"
  },
  {
    "title": "Codecademy",
    "url": "https://www.codecademy.com/",
    "category": "Web Development"
  },
  {
    "title": "TensorFlow.js",
    "url": "https://js.tensorflow.org/",
    "category": "Web Development"
  },
  {
    "title": "WordPress",
    "url": "http://wordpress.org/",
    "category": "Social"
  },
  {
    "title": "Mastodon",
    "url": "https://mastodon.social/",
    "category": "Social"
  },
  {
    "title": "Bleeping Computer",
    "url": "https://www.bleepingcomputer.com/",
    "category": "Web Development"
  },
  {
    "title": "Blizzard Press",
    "url": "https://blizzard.gamespress.com/World-of-Warcraft",
    "category": "Web Development"
  },
  {
    "title": "Text Free",
    "url": "https://textfree.us/",
    "category": "Social"
  },
  {
    "title": "NFL",
    "url": "https://www.nfl.com/",
    "category": "Sports"
  },
  {
    "title": "NBA",
    "url": "https://www.nba.com/",
    "category": "Sports"
  },
  {
    "title": "Open Culture",
    "url": "http://www.openculture.com",
    "category": "Web Development"
  },
  {
    "title": "Airbrush",
    "url": "https://airbrush.com/",
    "category": "Web Development"
  },
  {
    "title": "W3Schools",
    "url": "http://www.w3schools.com/",
    "category": "Web Development"
  },
  {
    "title": "Material Design",
    "url": "https://material.io/",
    "category": "Web Development"
  },
  {
    "title": "ESPN",
    "url": "https://www.espn.com/",
    "category": "Sports"
  },
  {
    "title": "Mix",
    "url": "https://mix.com/",
    "category": "Social"
  },
  {
    "title": "Stack Overflow",
    "url": "https://stackoverflow.com/",
    "category": "Web Development"
  },
  {
    "title": "PGA Tour",
    "url": "https://www.pgatour.com/",
    "category": "Sports"
  },
  {
    "title": "Reddit",
    "url": "http://www.reddit.com/",
    "category": "Social"
  },
  {
    "title": "Telegram",
    "url": "https://web.telegram.org/",
    "category": "Social"
  },
  {
    "title": "Fontvilla",
    "url": "https://fontvilla.com/",
    "category": "Web Development"
  },
  {
    "title": "Bleacher Report",
    "url": "https://bleacherreport.com/",
    "category": "Sports"
  },
  {
    "title": "Soccer.com",
    "url": "https://www.soccer.com/",
    "category": "Sports"
  },
  {
    "title": "NASCAR",
    "url": "https://www.nascar.com/",
    "category": "Sports"
  },
  {
    "title": "Sports Illustrated",
    "url": "https://www.si.com/",
    "category": "Sports"
  },
  {
    "title": "Zapier",
    "url": "https://www.zapier.com/",
    "category": "Web Development"
  }
];
})();
