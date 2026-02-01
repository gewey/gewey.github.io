
/**
 * Sports and recreation bookmarks
 */
const sportsBookmarks = [
  { title: 'Sports', href: './sports/index.html', target: 'contentframe', alt: 'sports' },
  { title: 'ESPN', href: 'https://www.espn.com/', alt: 'espn' },
  { title: 'Sports Illustrated', href: 'https://www.si.com/', alt: 'sinow' },
  { title: 'NFL', href: 'https://www.nfl.com/', alt: 'nfl' },
  { title: 'NBA', href: 'https://www.nba.com/', alt: 'nba' },
  { title: 'MLB', href: 'https://www.mlb.com/', alt: 'mlb' },
  { title: 'NCAA', href: 'https://www.ncaa.org/', alt: 'ncaa' },
  { title: 'Soccer.com', href: 'https://www.soccer.com/', alt: 'soccerdotcom' },
  { title: 'NASCAR', href: 'https://www.nascar.com/', alt: 'nascar' },
  { title: 'PGA Tour', href: 'https://www.pgatour.com/', alt: 'pgatour' },
  { title: 'Bleacher Report', href: 'https://bleacherreport.com/', alt: 'BleacherReport' }
];

BookmarkBuilder.renderBookmarks(sportsBookmarks);