/**
 * Email service bookmarks
 */
const emailBookmarks = [
  { title: 'Email', href: './email/index.html', target: 'contentframe', alt: 'email' },
  { title: 'Gmail', href: 'https://mail.google.com/', alt: 'gmail' },
  { title: 'Outlook', href: 'https://outlook.live.com', alt: 'outlook' },
  { title: 'Yahoo Mail', href: 'https://mail.yahoo.com/', alt: 'yahoomail' },
  { title: 'ProtonMail', href: 'https://mail.protonmail.com/', alt: 'ProtonMail' },
  { title: 'AOL Mail', href: 'https://mail.aol.com/', alt: 'aol' },
  { title: 'Zoho Mail', href: 'https://mail.zoho.com/', alt: 'zoho' }
];

BookmarkBuilder.renderBookmarks(emailBookmarks);