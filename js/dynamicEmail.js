/**
 * Email service bookmarks
 */
const emailBookmarks = [
  { title: 'Email', href: './email/index.html', target: 'contentframe', alt: 'email' },
  { title: 'Outlook', href: 'https://outlook.live.com', alt: 'outlook' },
  { title: 'Yahoo Mail', href: 'https://mail.yahoo.com/', alt: 'yahoomail' }
];

BookmarkBuilder.renderBookmarks(emailBookmarks);