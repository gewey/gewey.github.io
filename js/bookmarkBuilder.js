/**
 * Bookmark Builder - Centralized utility for rendering bookmark collections
 * Eliminates code duplication across dynamic bookmark files
 * Supports LocalStorage customization, reordering, adding, and deleting.
 * @version 2.0
 */

const BookmarkBuilder = (() => {
  const AVAILABLE_ICONS = [
    '23andMe', '9animeOfficial', 'Adobe', 'AlfredCamera', 'AmazonAssociate', 'Ancestry', 'AndroidDev', 'AtomicWallet', 'BinanceUS', 'BleacherReport', 'BleepinComputer', 'BleepingComputer', 'BlizzardResearch', 'Bootstrap', 'CSS', 'CandleScience', 'CapitalOne', 'CoinMarketCap', 'Crafatar', 'Dododex', 'EclipseFdn', 'FINVIZ_com', 'FabricMC', 'Figma', 'Firebase', 'Flaming_Candle', 'Fontvillacs', 'Forge', 'ForgeDevTeam', 'GGO', 'GMapsPlatform', 'GOGcom', 'GemSelect', 'GeminiCrypto', 'Glitch', 'Grunt', 'GuildWars2', 'Gulp', 'Heroku', 'JAvaLang', 'JavaLang', 'JMBullion', 'JavaScriptChannel', 'Kurz_Gesagt', 'LastWeekTonight', 'MEGAprivacy', 'MLS', 'MetaMask_io', 'MicrosoftEdge', 'MongoDB', 'MountainDew', 'MountainDewGaming', 'MyHeritage', 'Netlify', 'NintendoAmerica', 'Notepad_plus', 'OneMainFinancial', 'OsrsWiki', 'Photoshop', 'PlayStation', 'PlaywithMods', 'PlutoTV', 'ProtonMail', 'PyLo', 'PyloDEV', 'Python', 'RSWiki', 'RS_Wiki', 'RealTimers', 'RefReference', 'Replit', 'RobinhoodApp', 'RokuChannels', 'RubyOnRails', 'RuneLiteClient', 'SQL', 'SQLite', 'Sass', 'Scala', 'ScalaLang', 'ScienceChannel', 'ShrimpyApp', 'ShutterstockReq', 'SimsCommun', 'SimsFreePlay', 'Sketch', 'StackOverflow', 'Steam', 'Synergy_App', 'Tailwind', 'ThePSF', 'TheSims', 'TheSims3', 'TheSims4', 'TwitchTV', 'TypeScript', 'VSCode', 'VSCodeInsiders', 'Vercel', 'WarcraftSecrets', 'WebKit', 'Webpack', 'Windows', 'Worthy', 'acorns', 'airbrush', 'alcasthq', 'allrecipes', 'almanac', 'amazon', 'aol', 'apmex', 'apnews', 'archon', 'arenamaster', 'arenateam', 'aternos', 'audible_com', 'aws', 'bankofamerica', 'bbc', 'binance', 'blank', 'blizzardcs', 'blizzardpress', 'blogger', 'bloodmallet', 'box', 'brackets', 'brilliant', 'cashapp', 'chase', 'chromium', 'cloud', 'cnet', 'cnn', 'code', 'codecademy', 'codepen', 'coinbase', 'colbertlateshow', 'craigslist', 'crypto', 'curseforge', 'dataforazeroth', 'deckbox', 'deviantart', 'dictionarycom', 'digg', 'directx12', 'discord', 'discordapp', 'download', 'dropbox', 'duolingo', 'ebay', 'ehow', 'email', 'epicgames', 'espn', 'etrade', 'facebook', 'facyai', 'ficsitapp', 'fidelity', 'finance', 'firefox', 'flixable', 'fontawesome', 'freeCodeCamp', 'ftb_team', 'fundrise', 'game', 'genomelink', 'getmixapp', 'getracker', 'geweywarcraft', 'git', 'github', 'glblctzn', 'gmail', 'google', 'googleanalytics', 'googlechrome', 'googledocs', 'googledrive', 'googlephotos', 'googletranslate', 'gravitdesigner', 'hazbinhotel', 'hbo', 'hbomax', 'helluvaboss', 'html5', 'htmlcssjs', 'huffpost', 'hulu', 'iCloud', 'icyveins', 'imdb', 'imgflip', 'instagram', 'investing', 'investopedia', 'java', 'jinx', 'kalilinux', 'khanacademy', 'kraken', 'krakenfx', 'lifehacker', 'linkedin', 'lookmovie', 'luciteria', 'mastodon_social', 'materialdesign', 'mcsrvstat', 'media', 'microsoft', 'minecraft', 'minecraftwiki', 'misfitsmarket', 'mitappinventor', 'mlb', 'modrinth', 'modthesimsinfo', 'mojang', 'moviemap', 'mylanguages', 'nasa', 'nascar', 'nba', 'ncaa', 'nebula', 'netflix', 'newegg', 'news', 'newsweek', 'nfl', 'nhl', 'ninite', 'nodejs', 'noxxic', 'npm', 'nvidia', 'nytimes', 'officialgameroms', 'officialrunehq', 'ogrsWiki', 'oldschoolrs', 'onedrive', 'oodlers', 'openculture', 'origininsider', 'osrs_tracker', 'outlook', 'paypal', 'pgatour', 'photobucket', 'pinterest', 'plotz', 'plumbobacademy', 'pool2miners', 'primevideo', 'ptable', 'radiogarden', 'raidbot', 'raidbots', 'raiderio_wow', 'raidplan', 'reddit', 'reference', 'rimworldwiki', 'runescape', 'runetips', 'satisfactorycalculator', 'satisfactorytools', 'serverminer', 'sharkrobot', 'shopping', 'shutterstock', 'simplarmory', 'simplearmory', 'sinow', 'skype', 'snapchat', 'speedify', 'spotify', 'starcraft2', 'statsfm', 'steam_games', 'sublimehq', 'syncdotcom', 'tedtalks', 'telegram', 'tensorflow', 'tesonline', 'textfreeapp', 'thecrashcourse', 'tiktok', 'tsmaddon', 'tumblr', 'tutorialspoint', 'twitch', 'twitter', 'ubuntu', 'ucoin', 'ups', 'userbenchmark', 'usps', 'w3schoolsonline', 'wago_io', 'walmart', 'warcraft', 'warcraftdeathknight', 'warcraftdemonhunter', 'warcraftdruid', 'warcraftgamer', 'warcraftgeneralmacros', 'warcrafthunter', 'warcraftlogs', 'warcraftmage', 'warcraftmonk', 'warcraftpaladin', 'warcraftpriest', 'warcraftrogue', 'warcraftshaman', 'warcraftwarlock', 'warcraftwarrior', 'weatherchannel', 'webAssembly', 'webdevelopment', 'webull', 'whatsapp', 'wikipedia', 'wizard101', 'wizards_magic', 'wordpress', 'wowhead', 'wowpetopia', 'wowprogress', 'wowrealmpopulation', 'xbox', 'yahoo', 'yahoomail', 'yarn', 'youtube', 'zapier', 'zoho'
  ];

  const loadedCategories = {};
  let imgBaseUrl = '';

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const sanitizeUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    if (/^(javascript|data|vbscript):/i.test(trimmed)) {
      return 'about:blank';
    }
    return trimmed;
  };

  const getImgBaseUrl = () => {
    if (imgBaseUrl) return imgBaseUrl;
    if (document.currentScript && document.currentScript.src) {
      const scriptUrl = document.currentScript.src;
      const idx = scriptUrl.indexOf('/js/');
      if (idx !== -1) {
        imgBaseUrl = scriptUrl.substring(0, idx) + '/img/btn/bm/';
        return imgBaseUrl;
      }
    }
    imgBaseUrl = '../img/btn/bm/';
    return imgBaseUrl;
  };

  const getCategoryFromScript = () => {
    if (document.currentScript && document.currentScript.src) {
      const src = document.currentScript.src;
      const match = src.match(/dynamic([^/]+)\.js$/);
      if (match) {
        return match[1].toLowerCase();
      }
    }
    return null;
  };

  const initBookmarkClickSound = () => {
    if (window.__bookmarkClickSoundInit) {
      return;
    }
    window.__bookmarkClickSoundInit = true;

    let audioContext;
    const playClickSound = () => {
      try {
        if (!audioContext) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        const now = audioContext.currentTime;
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(1200, now);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.03);
      } catch (error) {
        // Ignore audio errors (e.g., unsupported browser)
      }
    };

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.tagName === 'IMG' && target.id === 'bookmark') {
        playClickSound();
      }
    });
  };

  const renderCategoryToDom = (category, bookmarks) => {
    let container = document.querySelector(`.bookmark-category[data-category="${category}"]`);
    if (!container) {
      container = document.createElement('span');
      container.className = 'bookmark-category';
      container.setAttribute('data-category', category);
      container.style.display = 'contents';
      document.body.appendChild(container);
    }

    const base = getImgBaseUrl();
    const html = bookmarks
      .map(({ title, href, target = '_parent', alt }) => {
        const safeTitle = escapeHtml(title);
        const safeHref = escapeHtml(sanitizeUrl(href));
        const safeTarget = escapeHtml(target);
        const safeAlt = escapeHtml(alt);
        const imgSrc = safeAlt ? `${base}${safeAlt}.png` : '';
        return `<a title="${safeTitle}" target="${safeTarget}" href="${safeHref}"><img id="bookmark" alt="${safeAlt}" src="${imgSrc}"></a>`;
      })
      .join('');

    container.innerHTML = html;
  };

  const renderBookmarks = (bookmarks) => {
    initBookmarkClickSound();

    const category = getCategoryFromScript() || 'custom';

    let activeBookmarks = bookmarks;
    const stored = localStorage.getItem(`bookmarks_custom_${category}`);
    if (stored) {
      try {
        activeBookmarks = JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing stored bookmarks for " + category, e);
      }
    }

    loadedCategories[category] = {
      defaultBookmarks: bookmarks,
      currentBookmarks: activeBookmarks
    };

    renderCategoryToDom(category, activeBookmarks);
    setupCustomizeUI();
  };

  // UI Setup & Editor Modal Code
  let isUIInitialized = false;

  const setupCustomizeUI = () => {
    if (isUIInitialized) return;
    isUIInitialized = true;

    // Inject styles for settings button and modal
    const styleId = 'bookmark-builder-custom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .cust-btn-float {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: rgba(0, 0, 0, 0.8);
          border: 1px solid #00EA00;
          color: #00EA00;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(0, 234, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: all 0.3s ease;
        }
        .cust-btn-float:hover {
          background-color: #00EA00;
          color: #000;
          box-shadow: 0 0 25px #00EA00;
          transform: rotate(45deg);
        }
        .cust-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          font-family: 'Inconsolata', 'Courier New', monospace;
          color: #fff;
        }
        .cust-modal-content {
          background: #111;
          border: 1.5px solid #00EA00;
          border-radius: 8px;
          width: 95%;
          max-width: 600px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0 30px rgba(0, 234, 0, 0.25);
          box-sizing: border-box;
        }
        .cust-modal-header {
          padding: 15px 20px;
          border-bottom: 1px solid #222;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
        }
        .cust-modal-header h3 {
          color: #00EA00;
          margin: 0;
          font-size: 1.15rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .cust-close-btn {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 1;
          padding: 0;
        }
        .cust-close-btn:hover {
          color: #ff3b30;
        }
        .cust-modal-body {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
          box-sizing: border-box;
        }
        .cust-section-title {
          color: #00EA00;
          font-size: 0.9rem;
          margin: 5px 0 8px 0;
          border-bottom: 1px dashed #333;
          padding-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .cust-form-row {
          display: flex;
          gap: 10px;
          box-sizing: border-box;
        }
        .cust-form-col {
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex: 1;
        }
        .cust-label {
          font-size: 0.8rem;
          color: #aaa;
          text-transform: uppercase;
        }
        .cust-input {
          background: #000;
          border: 1px solid #333;
          color: #fff;
          padding: 8px 12px;
          border-radius: 4px;
          font-family: inherit;
          font-size: 0.85rem;
          box-sizing: border-box;
          width: 100%;
        }
        .cust-input:focus {
          border-color: #00EA00;
          outline: none;
        }
        .cust-select {
          background: #000;
          border: 1px solid #333;
          color: #fff;
          padding: 8px 12px;
          border-radius: 4px;
          font-family: inherit;
          font-size: 0.85rem;
          width: 100%;
          box-sizing: border-box;
        }
        .cust-select:focus {
          border-color: #00EA00;
          outline: none;
        }
        .cust-btn {
          background: #222;
          border: 1px solid #333;
          color: #fff;
          padding: 8px 14px;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.85rem;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          box-sizing: border-box;
        }
        .cust-btn-primary {
          background: rgba(0, 234, 0, 0.1);
          border-color: #00EA00;
          color: #00EA00;
        }
        .cust-btn-primary:hover {
          background: #00EA00;
          color: #000;
          box-shadow: 0 0 10px rgba(0, 234, 0, 0.4);
        }
        .cust-btn-danger {
          background: rgba(255, 59, 48, 0.1);
          border-color: #ff3b30;
          color: #ff3b30;
        }
        .cust-btn-danger:hover {
          background: #ff3b30;
          color: #fff;
        }
        .cust-bookmark-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 220px;
          overflow-y: auto;
          border: 1px solid #222;
          padding: 8px;
          border-radius: 4px;
          background: #050505;
          box-sizing: border-box;
        }
        .cust-bookmark-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #111;
          padding: 6px 10px;
          border: 1px solid #222;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .cust-bookmark-item.cust-item-editing {
          border-color: #ffd700;
          background: rgba(255, 215, 0, 0.05);
        }
        .cust-item-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
          background: #222;
          flex-shrink: 0;
        }
        .cust-item-details {
          flex: 1;
          font-size: 0.8rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cust-item-title {
          font-weight: bold;
          color: #fff;
        }
        .cust-item-url {
          color: #666;
          font-size: 0.7rem;
          margin-left: 6px;
        }
        .cust-item-actions {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }
        .cust-action-btn {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .cust-action-btn:hover {
          color: #00EA00;
          background: rgba(0, 234, 0, 0.1);
        }
        .cust-action-btn-delete:hover {
          color: #ff3b30;
          background: rgba(255, 59, 48, 0.1);
        }
        .cust-modal-footer {
          padding: 15px 20px;
          border-top: 1px solid #222;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          box-sizing: border-box;
        }
        .cust-icon-dropdown {
          position: relative;
          box-sizing: border-box;
        }
        .cust-icon-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #0a0a0a;
          border: 1px solid #333;
          border-top: none;
          max-height: 120px;
          overflow-y: auto;
          z-index: 100001;
          border-radius: 0 0 4px 4px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.5);
          box-sizing: border-box;
        }
        .cust-icon-suggestion-item {
          padding: 6px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          box-sizing: border-box;
        }
        .cust-icon-suggestion-item:hover {
          background: rgba(0, 234, 0, 0.15);
          color: #00EA00;
        }
      `;
      document.head.appendChild(style);
    }

    // Append floating button
    const btn = document.createElement('button');
    btn.className = 'cust-btn-float';
    btn.title = 'Customize Bookmarks';
    btn.innerHTML = '<i class="material-icons">settings</i>';
    btn.onclick = () => openCustomizeModal();
    document.body.appendChild(btn);
  };

  const openCustomizeModal = () => {
    if (document.querySelector('.cust-modal-overlay')) return;

    const categories = Object.keys(loadedCategories);
    if (categories.length === 0) return;

    let selectedCategory = categories[0];
    let editingIndex = -1;

    const overlay = document.createElement('div');
    overlay.className = 'cust-modal-overlay';

    const content = document.createElement('div');
    content.className = 'cust-modal-content';

    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Event listener for suggestion close when clicking outside suggestions or altInput
    const handleOutsideClickForSuggestions = (e) => {
      const altInput = document.getElementById('cust-input-alt');
      const suggestionsDiv = document.getElementById('cust-icon-suggestions');
      if (altInput && suggestionsDiv) {
        if (e.target !== altInput && !suggestionsDiv.contains(e.target)) {
          suggestionsDiv.style.display = 'none';
        }
      }
    };
    document.addEventListener('click', handleOutsideClickForSuggestions);

    const closeModal = () => {
      document.removeEventListener('click', handleOutsideClickForSuggestions);
      overlay.remove();
    };

    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };

    const updateModalUI = () => {
      const activeData = loadedCategories[selectedCategory];
      const listBookmarks = activeData.currentBookmarks;

      let headerHTML = `
        <div class="cust-modal-header">
          <h3>Customize Bookmarks</h3>
          <button class="cust-close-btn" id="cust-close-btn">&times;</button>
        </div>
      `;

      let categorySelectHTML = '';
      if (categories.length > 1) {
        categorySelectHTML = `
          <div class="cust-form-group">
            <label class="cust-label">Select Section to Edit</label>
            <select class="cust-select" id="cust-category-select">
              ${categories.map(cat => `<option value="${escapeHtml(cat)}" ${cat === selectedCategory ? 'selected' : ''}>${escapeHtml(cat.toUpperCase())}</option>`).join('')}
            </select>
          </div>
        `;
      } else {
        categorySelectHTML = `
          <div style="font-size: 0.85rem; color: #888; text-transform: uppercase;">
            Editing Section: <strong style="color: #00EA00;">${escapeHtml(selectedCategory.toUpperCase())}</strong>
          </div>
        `;
      }

      const listHTML = `
        <div class="cust-section-title">Current Bookmarks (${listBookmarks.length})</div>
        <div class="cust-bookmark-list">
          ${listBookmarks.map((bm, index) => {
            const base = getImgBaseUrl();
            const safeTitle = escapeHtml(bm.title);
            const safeHref = escapeHtml(sanitizeUrl(bm.href));
            const safeAlt = escapeHtml(bm.alt);
            const iconUrl = safeAlt ? `${base}${safeAlt}.png` : '';
            const isEditing = index === editingIndex;
            return `
              <div class="cust-bookmark-item ${isEditing ? 'cust-item-editing' : ''}">
                ${safeAlt ? `<img class="cust-item-icon" src="${iconUrl}" onerror="this.style.display='none'">` : '<div class="cust-item-icon" style="background:#222;"></div>'}
                <div class="cust-item-details">
                  <span class="cust-item-title">${safeTitle}</span>
                  <span class="cust-item-url">${safeHref}</span>
                </div>
                <div class="cust-item-actions">
                  <button class="cust-action-btn" data-action="up" data-index="${index}" title="Move Up" ${index === 0 ? 'disabled style="opacity:0.3;"' : ''}>
                    <i class="material-icons" style="font-size: 16px;">arrow_upward</i>
                  </button>
                  <button class="cust-action-btn" data-action="down" data-index="${index}" title="Move Down" ${index === listBookmarks.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>
                    <i class="material-icons" style="font-size: 16px;">arrow_downward</i>
                  </button>
                  <button class="cust-action-btn" data-action="edit" data-index="${index}" title="Edit Detail">
                    <i class="material-icons" style="font-size: 16px; ${isEditing ? 'color:#ffd700;' : ''}">edit</i>
                  </button>
                  <button class="cust-action-btn cust-action-btn-delete" data-action="delete" data-index="${index}" title="Delete">
                    <i class="material-icons" style="font-size: 16px;">delete</i>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      const formTitle = editingIndex === -1 ? 'Add New Bookmark' : 'Edit Selected Bookmark';
      const submitText = editingIndex === -1 ? 'Add Bookmark' : 'Update Bookmark';
      const currentBm = editingIndex === -1 ? { title: '', href: '', alt: '' } : listBookmarks[editingIndex];

      const formHTML = `
        <div class="cust-section-title">${escapeHtml(formTitle)}</div>
        <div class="cust-form-row">
          <div class="cust-form-col">
            <label class="cust-label">Title</label>
            <input type="text" class="cust-input" id="cust-input-title" placeholder="e.g. My Website" value="${escapeHtml(currentBm.title)}">
          </div>
          <div class="cust-form-col">
            <label class="cust-label">URL</label>
            <input type="text" class="cust-input" id="cust-input-href" placeholder="https://..." value="${escapeHtml(currentBm.href)}">
          </div>
        </div>
        <div class="cust-form-row">
          <div class="cust-form-col" style="position: relative;">
            <label class="cust-label">Icon Asset Name</label>
            <div class="cust-icon-dropdown">
              <input type="text" class="cust-input" id="cust-input-alt" placeholder="e.g. google" value="${escapeHtml(currentBm.alt || '')}" autocomplete="off">
              <div class="cust-icon-suggestions" id="cust-icon-suggestions" style="display: none;"></div>
            </div>
          </div>
          <div class="cust-form-col" style="flex: 0 0 100px; justify-content: flex-end;">
            <button class="cust-btn cust-btn-primary" id="cust-submit-btn" style="width: 100%; padding: 8px 0;">${escapeHtml(submitText)}</button>
          </div>
          ${editingIndex !== -1 ? `
            <div class="cust-form-col" style="flex: 0 0 80px; justify-content: flex-end;">
              <button class="cust-btn" id="cust-cancel-edit-btn" style="width: 100%; padding: 8px 0;">Cancel</button>
            </div>
          ` : ''}
        </div>
      `;

      const footerHTML = `
        <div class="cust-modal-footer">
          <button class="cust-btn cust-btn-danger" id="cust-reset-btn">
            <i class="material-icons" style="font-size: 16px;">settings_backup_restore</i> Reset defaults
          </button>
          <button class="cust-btn cust-btn-primary" id="cust-save-btn">
            <i class="material-icons" style="font-size: 16px;">save</i> Save & Close
          </button>
        </div>
      `;

      content.innerHTML = `
        ${headerHTML}
        <div class="cust-modal-body">
          ${categorySelectHTML}
          ${listHTML}
          ${formHTML}
        </div>
        ${footerHTML}
      `;

      document.getElementById('cust-close-btn').onclick = closeModal;

      const catSelect = document.getElementById('cust-category-select');
      if (catSelect) {
        catSelect.onchange = (e) => {
          selectedCategory = e.target.value;
          editingIndex = -1;
          updateModalUI();
        };
      }

      content.querySelectorAll('.cust-action-btn').forEach(btn => {
        btn.onclick = () => {
          const action = btn.getAttribute('data-action');
          const idx = parseInt(btn.getAttribute('data-index'));
          handleAction(action, idx);
        };
      });

      document.getElementById('cust-reset-btn').onclick = () => {
        if (confirm(`Are you sure you want to reset "${selectedCategory}" section to original default bookmarks?`)) {
          localStorage.removeItem(`bookmarks_custom_${selectedCategory}`);
          loadedCategories[selectedCategory].currentBookmarks = [...loadedCategories[selectedCategory].defaultBookmarks];
          editingIndex = -1;
          renderCategoryToDom(selectedCategory, loadedCategories[selectedCategory].currentBookmarks);
          updateModalUI();
        }
      };

      document.getElementById('cust-save-btn').onclick = () => {
        localStorage.setItem(`bookmarks_custom_${selectedCategory}`, JSON.stringify(listBookmarks));
        renderCategoryToDom(selectedCategory, listBookmarks);
        closeModal();
      };

      document.getElementById('cust-submit-btn').onclick = () => {
        const titleVal = document.getElementById('cust-input-title').value.trim();
        const hrefVal = document.getElementById('cust-input-href').value.trim();
        const altVal = document.getElementById('cust-input-alt').value.trim();

        if (!titleVal || !hrefVal) {
          alert('Please enter both a Title and a URL.');
          return;
        }

        let formattedHref = hrefVal;
        if (!/^https?:\/\//i.test(hrefVal) && !hrefVal.startsWith('./') && !hrefVal.startsWith('../')) {
          formattedHref = 'https://' + hrefVal;
        }

        const updatedBm = {
          title: titleVal,
          href: formattedHref,
          alt: altVal,
          target: '_parent'
        };

        if (editingIndex === -1) {
          listBookmarks.push(updatedBm);
        } else {
          listBookmarks[editingIndex] = updatedBm;
          editingIndex = -1;
        }

        renderCategoryToDom(selectedCategory, listBookmarks);
        updateModalUI();
      };

      const cancelEditBtn = document.getElementById('cust-cancel-edit-btn');
      if (cancelEditBtn) {
        cancelEditBtn.onclick = () => {
          editingIndex = -1;
          updateModalUI();
        };
      }

      const altInput = document.getElementById('cust-input-alt');
      const suggestionsDiv = document.getElementById('cust-icon-suggestions');

      const showSuggestions = (val) => {
        const filterVal = val.toLowerCase();
        const matches = AVAILABLE_ICONS.filter(icon => icon.toLowerCase().includes(filterVal)).slice(0, 10);

        if (matches.length > 0) {
          const base = getImgBaseUrl();
          suggestionsDiv.innerHTML = matches.map(icon => {
            const safeIcon = escapeHtml(icon);
            return `
              <div class="cust-icon-suggestion-item" data-icon="${safeIcon}">
                <img src="${base}${safeIcon}.png" style="width: 16px; height: 16px; border-radius: 50%; object-fit: cover;" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 width=%2216%22 height=%2216%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22 fill=%22%23222%22/></svg>'">
                <span>${safeIcon}</span>
              </div>
            `;
          }).join('');
          suggestionsDiv.style.display = 'block';

          suggestionsDiv.querySelectorAll('.cust-icon-suggestion-item').forEach(item => {
            item.onclick = () => {
              altInput.value = item.getAttribute('data-icon');
              suggestionsDiv.style.display = 'none';
            };
          });
        } else {
          suggestionsDiv.style.display = 'none';
        }
      };

      altInput.oninput = (e) => {
        showSuggestions(e.target.value);
      };

      altInput.onfocus = (e) => {
        showSuggestions(e.target.value);
      };
    };

    const handleAction = (action, index) => {
      const activeData = loadedCategories[selectedCategory];
      const listBookmarks = activeData.currentBookmarks;

      if (action === 'up' && index > 0) {
        const temp = listBookmarks[index];
        listBookmarks[index] = listBookmarks[index - 1];
        listBookmarks[index - 1] = temp;
        if (editingIndex === index) editingIndex = index - 1;
        else if (editingIndex === index - 1) editingIndex = index;
      } else if (action === 'down' && index < listBookmarks.length - 1) {
        const temp = listBookmarks[index];
        listBookmarks[index] = listBookmarks[index + 1];
        listBookmarks[index + 1] = temp;
        if (editingIndex === index) editingIndex = index + 1;
        else if (editingIndex === index + 1) editingIndex = index;
      } else if (action === 'edit') {
        editingIndex = index;
      } else if (action === 'delete') {
        if (confirm(`Delete bookmark "${listBookmarks[index].title}"?`)) {
          listBookmarks.splice(index, 1);
          if (editingIndex === index) editingIndex = -1;
          else if (editingIndex > index) editingIndex--;
        }
      }

      renderCategoryToDom(selectedCategory, listBookmarks);
      updateModalUI();
    };

    updateModalUI();
  };

  return { renderBookmarks };
})();
