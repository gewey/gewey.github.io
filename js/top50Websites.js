/**
 * Top 50 Websites - Global Internet Usage
 * Organized by category and popularity
 * Uses favicon.io service for consistent, high-quality logos
 */

const TOP_50_WEBSITES = [
    // === SEARCH & INFORMATION (5) ===
    {
        category: "Search & Information",
        rank: 1,
        name: "Google",
        url: "https://www.google.com",
        logo: "https://www.google.com/favicon.ico"
    },
    {
        category: "Search & Information",
        rank: 3,
        name: "Wikipedia",
        url: "https://www.wikipedia.org",
        logo: "https://www.wikipedia.org/static/favicon/wikipedia.ico"
    },
    {
        category: "Search & Information",
        rank: 18,
        name: "DuckDuckGo",
        url: "https://www.duckduckgo.com",
        logo: "https://duckduckgo.com/favicon.ico"
    },
    {
        category: "Search & Information",
        rank: 28,
        name: "Bing",
        url: "https://www.bing.com",
        logo: "https://www.bing.com/favicon.ico"
    },
    {
        category: "Search & Information",
        rank: 45,
        name: "Baidu",
        url: "https://www.baidu.com",
        logo: "https://www.baidu.com/favicon.ico"
    },

    // === SOCIAL MEDIA (8) ===
    {
        category: "Social Media",
        rank: 2,
        name: "YouTube",
        url: "https://www.youtube.com",
        logo: "https://www.youtube.com/favicon.ico"
    },
    {
        category: "Social Media",
        rank: 4,
        name: "Facebook",
        url: "https://www.facebook.com",
        logo: "https://www.facebook.com/favicon.ico"
    },
    {
        category: "Social Media",
        rank: 5,
        name: "Reddit",
        url: "https://www.reddit.com",
        logo: "https://www.reddit.com/favicon.ico"
    },
    {
        category: "Social Media",
        rank: 6,
        name: "Telegram",
        url: "https://telegram.org",
        logo: "https://telegram.org/favicon.ico"
    },
    {
        category: "Social Media",
        rank: 8,
        name: "Twitter/X",
        url: "https://www.twitter.com",
        logo: "https://www.twitter.com/favicon.ico"
    },
    {
        category: "Social Media",
        rank: 9,
        name: "Instagram",
        url: "https://www.instagram.com",
        logo: "https://www.instagram.com/favicon.ico"
    },
    {
        category: "Social Media",
        rank: 16,
        name: "Threads",
        url: "https://www.threads.net",
        logo: "https://www.threads.net/favicon.ico"
    },
    {
        category: "Social Media",
        rank: 35,
        name: "TikTok",
        url: "https://www.tiktok.com",
        logo: "https://www.tiktok.com/favicon.ico"
    },

    // === SHOPPING & E-COMMERCE (8) ===
    {
        category: "Shopping & E-Commerce",
        rank: 7,
        name: "Amazon",
        url: "https://www.amazon.com",
        logo: "https://www.amazon.com/favicon.ico"
    },
    {
        category: "Shopping & E-Commerce",
        rank: 11,
        name: "eBay",
        url: "https://www.ebay.com",
        logo: "https://www.ebay.com/favicon.ico"
    },
    {
        category: "Shopping & E-Commerce",
        rank: 12,
        name: "Walmart",
        url: "https://www.walmart.com",
        logo: "https://www.walmart.com/favicon.ico"
    },
    {
        category: "Shopping & E-Commerce",
        rank: 14,
        name: "AliExpress",
        url: "https://www.aliexpress.com",
        logo: "https://www.aliexpress.com/favicon.ico"
    },
    {
        category: "Shopping & E-Commerce",
        rank: 19,
        name: "Etsy",
        url: "https://www.etsy.com",
        logo: "https://www.etsy.com/favicon.ico"
    },
    {
        category: "Shopping & E-Commerce",
        rank: 22,
        name: "Target",
        url: "https://www.target.com",
        logo: "https://www.target.com/favicon.ico"
    },
    {
        category: "Shopping & E-Commerce",
        rank: 30,
        name: "Alibaba",
        url: "https://www.alibaba.com",
        logo: "https://www.alibaba.com/favicon.ico"
    },
    {
        category: "Shopping & E-Commerce",
        rank: 44,
        name: "Shopify",
        url: "https://www.shopify.com",
        logo: "https://www.shopify.com/favicon.ico"
    },

    // === VIDEO & ENTERTAINMENT (6) ===
    {
        category: "Video & Entertainment",
        rank: 10,
        name: "Netflix",
        url: "https://www.netflix.com",
        logo: "https://www.netflix.com/favicon.ico"
    },
    {
        category: "Video & Entertainment",
        rank: 15,
        name: "Twitch",
        url: "https://www.twitch.tv",
        logo: "https://www.twitch.tv/favicon.ico"
    },
    {
        category: "Video & Entertainment",
        rank: 20,
        name: "Hulu",
        url: "https://www.hulu.com",
        logo: "https://www.hulu.com/favicon.ico"
    },
    {
        category: "Video & Entertainment",
        rank: 27,
        name: "Disney+",
        url: "https://www.disneyplus.com",
        logo: "https://www.disneyplus.com/favicon.ico"
    },
    {
        category: "Video & Entertainment",
        rank: 33,
        name: "Vimeo",
        url: "https://www.vimeo.com",
        logo: "https://www.vimeo.com/favicon.ico"
    },
    {
        category: "Video & Entertainment",
        rank: 48,
        name: "Dailymotion",
        url: "https://www.dailymotion.com",
        logo: "https://www.dailymotion.com/favicon.ico"
    },

    // === PROFESSIONAL & PRODUCTIVITY (6) ===
    {
        category: "Professional & Productivity",
        rank: 13,
        name: "LinkedIn",
        url: "https://www.linkedin.com",
        logo: "https://www.linkedin.com/favicon.ico"
    },
    {
        category: "Professional & Productivity",
        rank: 21,
        name: "GitHub",
        url: "https://www.github.com",
        logo: "https://www.github.com/favicon.ico"
    },
    {
        category: "Professional & Productivity",
        rank: 24,
        name: "Gmail",
        url: "https://mail.google.com",
        logo: "https://mail.google.com/favicon.ico"
    },
    {
        category: "Professional & Productivity",
        rank: 26,
        name: "Microsoft 365",
        url: "https://www.office.com",
        logo: "https://www.office.com/favicon.ico"
    },
    {
        category: "Professional & Productivity",
        rank: 32,
        name: "Notion",
        url: "https://www.notion.so",
        logo: "https://www.notion.so/favicon.ico"
    },
    {
        category: "Professional & Productivity",
        rank: 40,
        name: "Slack",
        url: "https://www.slack.com",
        logo: "https://www.slack.com/favicon.ico"
    },

    // === FINANCE & BANKING (5) ===
    {
        category: "Finance & Banking",
        rank: 17,
        name: "Crypto.com",
        url: "https://www.crypto.com",
        logo: "https://www.crypto.com/favicon.ico"
    },
    {
        category: "Finance & Banking",
        rank: 23,
        name: "PayPal",
        url: "https://www.paypal.com",
        logo: "https://www.paypal.com/favicon.ico"
    },
    {
        category: "Finance & Banking",
        rank: 29,
        name: "Coinbase",
        url: "https://www.coinbase.com",
        logo: "https://www.coinbase.com/favicon.ico"
    },
    {
        category: "Finance & Banking",
        rank: 38,
        name: "Stripe",
        url: "https://stripe.com",
        logo: "https://stripe.com/favicon.ico"
    },
    {
        category: "Finance & Banking",
        rank: 47,
        name: "Binance",
        url: "https://www.binance.com",
        logo: "https://www.binance.com/favicon.ico"
    },

    // === COMMUNICATION (4) ===
    {
        category: "Communication",
        rank: 25,
        name: "Discord",
        url: "https://www.discord.com",
        logo: "https://www.discord.com/favicon.ico"
    },
    {
        category: "Communication",
        rank: 31,
        name: "Skype",
        url: "https://www.skype.com",
        logo: "https://www.skype.com/favicon.ico"
    },
    {
        category: "Communication",
        rank: 37,
        name: "WhatsApp",
        url: "https://www.whatsapp.com",
        logo: "https://www.whatsapp.com/favicon.ico"
    },
    {
        category: "Communication",
        rank: 46,
        name: "Viber",
        url: "https://www.viber.com",
        logo: "https://www.viber.com/favicon.ico"
    },

    // === CLOUD STORAGE (4) ===
    {
        category: "Cloud Storage",
        rank: 34,
        name: "Dropbox",
        url: "https://www.dropbox.com",
        logo: "https://www.dropbox.com/favicon.ico"
    },
    {
        category: "Cloud Storage",
        rank: 36,
        name: "OneDrive",
        url: "https://onedrive.live.com",
        logo: "https://onedrive.live.com/favicon.ico"
    },
    {
        category: "Cloud Storage",
        rank: 39,
        name: "Google Drive",
        url: "https://drive.google.com",
        logo: "https://drive.google.com/favicon.ico"
    },
    {
        category: "Cloud Storage",
        rank: 50,
        name: "iCloud",
        url: "https://www.icloud.com",
        logo: "https://www.icloud.com/favicon.ico"
    },

    // === OTHER (4) ===
    {
        category: "Other",
        rank: 41,
        name: "Stack Overflow",
        url: "https://stackoverflow.com",
        logo: "https://stackoverflow.com/favicon.ico"
    },
    {
        category: "Other",
        rank: 42,
        name: "Medium",
        url: "https://medium.com",
        logo: "https://medium.com/favicon.ico"
    },
    {
        category: "Other",
        rank: 43,
        name: "Quora",
        url: "https://www.quora.com",
        logo: "https://www.quora.com/favicon.ico"
    },
    {
        category: "Other",
        rank: 49,
        name: "Khan Academy",
        url: "https://www.khanacademy.org",
        logo: "https://www.khanacademy.org/favicon.ico"
    }
];

/**
 * Generate HTML for top 50 websites section
 */
function generateTop50WebsitesHTML() {
    // Group by category
    const grouped = {};
    TOP_50_WEBSITES.forEach(site => {
        if (!grouped[site.category]) {
            grouped[site.category] = [];
        }
        grouped[site.category].push(site);
    });

    // Sort each category by rank
    Object.keys(grouped).forEach(category => {
        grouped[category].sort((a, b) => a.rank - b.rank);
    });

    // Sort categories alphabetically
    const sortedCategories = Object.keys(grouped).sort();

    let html = '<div class="top-50-container">';

    sortedCategories.forEach(category => {
        html += `<div class="top-50-category">`;
        html += `<h3 class="category-title">${category}</h3>`;
        html += `<div class="websites-grid">`;

        grouped[category].forEach(site => {
            html += `
                <a href="${site.url}" 
                   class="website-button" 
                   title="${site.name} (#${site.rank})"
                   target="_parent"
                   data-key="${site.name.toLowerCase().replace(/[^a-z0-9]/g, '')}">
                    <div class="website-logo">
                        <img src="${site.logo}" 
                             alt="${site.name}" 
                             class="logo-image"
                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23999%22%3E?%3C/text%3E%3C/svg%3E'">
                    </div>
                    <span class="website-name">${site.name}</span>
                    <span class="website-rank">#${site.rank}</span>
                </a>
            `;
        });

        html += `</div></div>`;
    });

    html += '</div>';
    return html;
}

/**
 * Insert top 50 websites into the page
 */
function insertTop50Websites() {
    // Try multiple possible insertion points
    const possibleContainers = [
        document.getElementById('top-50-container'),
        document.querySelector('.pageContent'),
        document.querySelector('main'),
        document.body
    ];

    for (let container of possibleContainers) {
        if (container) {
            const section = document.createElement('div');
            section.id = 'top-50-websites-section';
            section.innerHTML = generateTop50WebsitesHTML();
            container.insertBefore(section, container.firstChild);
            
            // Initialize click tracking if available
            if (typeof initializeClickTracking === 'function') {
                initializeClickTracking();
            }
            
            console.log('Top 50 websites inserted successfully');
            return;
        }
    }

    console.warn('Could not find suitable container for top 50 websites');
}

// Insert on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertTop50Websites);
} else {
    insertTop50Websites();
}
