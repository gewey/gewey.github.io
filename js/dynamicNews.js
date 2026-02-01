/**
 * News and media bookmarks
 */
const newsBookmarks = [
  { title: 'News', href: './news/index.html', target: 'contentframe', alt: 'news' },
  { title: 'AP News', href: 'https://apnews.com/', alt: 'apnews' },
  { title: 'CNN', href: 'http://www.cnn.com/', alt: 'cnn' },
  { title: 'Huffington Post', href: 'http://www.huffingtonpost.com/', alt: 'huffpost' },
  { title: 'New York Times', href: 'http://www.nytimes.com/', alt: 'nytimes' },
  { title: 'Newsweek', href: 'https://www.newsweek.com/', alt: 'newsweek' },
  { title: 'BBC', href: 'http://www.bbc.com/', alt: 'bbc' },
  { title: 'Weather', href: 'http://www.weather.com/', alt: 'weatherchannel' },
  { title: 'NASA', href: 'http://www.nasa.gov/', alt: 'nasa' },
  { title: 'Science Channel', href: 'https://www.sciencechannel.com', alt: 'ScienceChannel' },
  { title: 'CNET', href: 'http://www.cnet.com/', alt: 'cnet' },
  { title: 'Yahoo', href: 'https://www.yahoo.com/', alt: 'yahoo' },
  { title: 'Global Citizen', href: 'https://www.globalcitizen.org', alt: 'glblctzn' }
];

BookmarkBuilder.renderBookmarks(newsBookmarks);
