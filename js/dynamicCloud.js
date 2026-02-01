/**
 * Cloud storage and file sharing bookmarks
 */
const cloudBookmarks = [
  { title: 'Cloud', href: './cloud/index.html', target: 'contentframe', alt: 'cloud' },
  { title: 'Google Drive', href: 'https://drive.google.com/', alt: 'googledrive' },
  { title: 'Dropbox', href: 'https://www.dropbox.com/', alt: 'dropbox' },
  { title: 'Microsoft OneDrive', href: 'https://onedrive.live.com/about/en-us/', alt: 'onedrive' },
  { title: 'Mega', href: 'https://mega.nz', alt: 'MEGAprivacy' },
  { title: 'Box', href: 'https://www.box.com/', alt: 'box' },
  { title: 'AWS S3', href: 'https://s3.console.aws.amazon.com/', alt: 'aws' },
  { title: 'iCloud', href: 'https://www.icloud.com/', alt: 'iCloud' },
  { title: 'AlfredCamera', href: 'https://alfred.camera/webapp/viewer/', alt: 'AlfredCamera' },
  { title: 'Sync.com', href: 'https://www.sync.com/', alt: 'syncdotcom' }
];

BookmarkBuilder.renderBookmarks(cloudBookmarks);




