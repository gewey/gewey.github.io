//verp.js
let images = document.images;
let txt = "";
let iC = "";
let verp = "";
for (iC = 0; iC < images.length; iC++) {
    verp = images[iC].getAttribute("alt");
    images[iC].setAttribute("src", "https://avatars.io/twitter/" + verp + "/256/");
    txt = txt +  images[iC].alt + "___" + images[iC].src + "<br>";
}
document.getElementById("demo").innerHTML = txt;