/**
 * Dynamic head meta tags and stylesheets
 * Note: Changes are cached by GitHub until after a push
 * Auto-detects local (file://) vs online (https://gewey.github.io) environment
 * Handles both root (index.html) and subdirectory (.vikipedia/__frame.html) paths
 */

// Detect environment: local file:// vs online https://gewey.github.io
const isLocal = window.location.protocol === 'file:';
const isSubdir = window.location.pathname.includes('/.vikipedia/');
const baseURL = isLocal ? (isSubdir ? '..' : '.') : 'https://gewey.github.io';

const headMetaTags = [
  { tag: 'meta', attrs: { charset: 'utf-8' } },
  { tag: 'meta', attrs: { name: 'generator' } },
  { tag: 'meta', attrs: { name: 'dcterms.created', content: 'Mon, 14 Jan 2019 21:47:16 GMT' } },
  { tag: 'meta', attrs: { name: 'description', content: 'Like your phone, but for chrome.' } },
  { tag: 'meta', attrs: { name: 'keywords', content: 'gewey&#039;s homepage' } },
  { tag: 'meta', attrs: { name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0' } }
];

const headHTML = `
  <meta charset='utf-8'>
  <meta name='generator'>
  <meta name='dcterms.created' content='Mon, 14 Jan 2019 21:47:16 GMT'>
  <meta name='description' content='Like your phone, but for chrome.'>
  <meta name='keywords' content='gewey&#039;s homepage'>
  <meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0'>
  <title>Gewey's Homepage</title>
  <link href='https://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet'>
  <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'/>
  <link rel='shortcut icon' href='${baseURL}/favicon.ico'>
  <link rel='stylesheet' href='${baseURL}/css/bones.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/text.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/images.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/themes.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/modals.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/mobile.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/search.css' type='text/css'>
  <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
  <script type='text/javascript' src='https://cdn.jsdelivr.net/npm/popmotion@11.0.5/dist/popmotion.global.min.js'></script>
  <script type='text/javascript' src='${baseURL}/js/google_analytics.js'></script>
  <script type='text/javascript' src='${baseURL}/js/themeManager.js'></script>
  <script type='text/javascript' src='${baseURL}/js/keyboardShortcuts.js'></script>
  <script type='text/javascript' src='${baseURL}/js/modalSystem.js'></script>
  <script type='text/javascript' src='${baseURL}/js/mobileMenu.js'></script>
  <script type='text/javascript' src='${baseURL}/js/advancedSearch.js'></script>
`;

document.getElementsByTagName("head")[0].innerHTML += headHTML;

        
        
        
        
       
        
//MIGHT BE USEFUL LATER NOT CURRENTLY NEEDED:     
//<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
        
        
        