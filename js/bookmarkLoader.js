/**
 * Centralized Bookmark Page Loader
 * Replaces repetitive HTML structure across bookmark pages
 * Usage: Include this script and call loadBookmarkPage() with the category name
 */

function loadBookmarkPage(category) {
    // Map of categories to their corresponding dynamic script
    const categoryScripts = {
        cloud: '../../js/dynamicCloud.js',
        crypto: '../../js/dynamicCrypto.js',
        downloads: '../../js/dynamicDownloads.js',
        email: '../../js/dynamicEmail.js',
        finance: '../../js/dynamicFinance.js',
        games: '../../js/dynamicGames.js',
        investing: '../../js/dynamicInvesting.js',
        media: '../../js/dynamicMedia.js',
        news: '../../js/dynamicNews.js',
        reference: '../../js/dynamicReference.js',
        shopping: '../../js/dynamicShopping.js',
        social: '../../js/dynamicSocial.js',
        sports: '../../js/dynamicSports.js',
        downloads: '../../js/dynamicDownloads.js'
    };

    // Adjust paths based on directory depth (1 level = ../../, 2 levels = ../../../, etc)
    const adjustPath = (path, depth) => {
        const baseLevels = path.split('/').length - 2;
        const additionalLevels = depth - 1;
        let adjustedPath = path;
        for (let i = 0; i < additionalLevels; i++) {
            adjustedPath = adjustedPath.replace('../', '');
            adjustedPath = '../' + adjustedPath;
        }
        return adjustedPath;
    };

    if (categoryScripts[category]) {
        const scriptPath = categoryScripts[category];
        // Load dynamic script
        const script = document.createElement('script');
        script.src = scriptPath;
        document.body.appendChild(script);
    }
}

// Alternative: Load verp and sortByClickCount universally
function loadStandardBookmarkScripts(depth = 1) {
    const paths = {
        verp: depth === 1 ? '../../js/verp.js' : (depth === 2 ? '../../../js/verp.js' : '../../../js/verp.js'),
        sortByClickCount: depth === 1 ? '../../js/sortByClickCount.js' : (depth === 2 ? '../../../js/sortByClickCount.js' : '../../../js/sortByClickCount.js')
    };

    [paths.verp, paths.sortByClickCount].forEach(scriptPath => {
        const script = document.createElement('script');
        script.src = scriptPath;
        document.body.appendChild(script);
    });
}
