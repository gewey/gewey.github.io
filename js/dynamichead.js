/**
 * Dynamic head meta tags and stylesheets
 * Note: Changes are cached by GitHub until after a push
 */

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
  <link rel='shortcut icon' href='https://gewey.github.io/favicon.ico'>
  <link rel='stylesheet' href='https://gewey.github.io/css/bones.css' type='text/css'>
  <link rel='stylesheet' href='https://gewey.github.io/css/text.css' type='text/css'>
  <link rel='stylesheet' href='https://gewey.github.io/css/images.css' type='text/css'>
  <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
  <script type='text/javascript' src='https://gewey.github.io/js/google_analytics.js'></script>
`;

document.getElementsByTagName("head")[0].innerHTML += headHTML;

        
        
        
        
       
        
//MIGHT BE USEFUL LATER NOT CURRENTLY NEEDED:     
//<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
        
        
        