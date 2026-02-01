/**
 * Finance and investment bookmarks
 */
const financeBookmarks = [
  { title: 'Finance', href: './finance/index.html', target: 'contentframe', alt: 'finance' },
  { title: 'Cash App', href: 'https://cash.app/$josephgoulette', alt: 'cashapp' },
  { title: 'Chase', href: 'https://secure07c.chase.com/web/auth/dashboard?mRoute#/dashboard/overviewAccounts/overview/index', alt: 'chase' },
  { title: 'Capital One', href: 'https://verified.capitalone.com/auth/signin?Product=ENTERPRISE&goto_url=https:%2F%2Fmyaccounts.capitalone.com%2F%23%2FaccountSummary#/accountSummary', alt: 'CapitalOne' },
  { title: 'OneMain Financial', href: 'https://www.onemainfinancial.com/prequalification?CSCALD=31269&utm_medium=CR&rfrcode=0qca50#referral', alt: 'OneMainFinancial' },
  { title: 'PayPal', href: 'https://www.paypal.com/', alt: 'paypal' },
  { title: 'Shutterstock Affiliate', href: 'https://submit.shutterstock.com/?ref=224491653', alt: 'ShutterstockReq' },
  { title: 'Amazon Associates', href: 'https://affiliate-program.amazon.com/home', alt: 'AmazonAssociate' },
  { title: 'Google Analytics', href: 'https://analytics.google.com', alt: 'googleanalytics' }
];

BookmarkBuilder.renderBookmarks(financeBookmarks);