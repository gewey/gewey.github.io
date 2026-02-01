/**
 * Cryptocurrency and blockchain bookmarks
 */
const cryptoBookmarks = [
  { title: 'Crypto', href: './crypto/index.html', target: 'contentframe', alt: 'crypto' },
  { title: 'Coinbase', href: 'https://www.coinbase.com/join/jgoulette_4hiaeA', alt: 'coinbase' },
  { title: 'Kraken', href: 'https://www.kraken.com/', alt: 'kraken' },
  { title: 'Binance', href: 'https://www.binance.com/', alt: 'binance' },
  { title: 'CoinMarketCap', href: 'https://coinmarketcap.com/', alt: 'CoinMarketCap' },
  { title: 'Gemini', href: 'https://www.gemini.com/', alt: 'gemini' },
  { title: 'Atomic Wallet', href: 'https://atomicwallet.io/', alt: 'AtomicWallet' },
  { title: 'MetaMask', href: 'https://metamask.io/', alt: 'MetaMask' },
  { title: 'ShrimpyApp', href: 'https://shrimpy.io/referral?r=9ZfJPAj__', alt: 'ShrimpyApp' },
  { title: '2Miners', href: 'https://2miners.com/', alt: 'pool2miners' }
];

BookmarkBuilder.renderBookmarks(cryptoBookmarks);