
let images = document.images;
let iC = "";
let localStorage;
let txt;


function clickCounter() {
    if (localStorage.verp) {
        localStorage.verp = Number(localStorage.verp) + 1;
    } else {
        localStorage.verp = 1;
    }
}

for (iC = 0; iC < images.length; iC++) {
    let verp = images[iC].getAttribute("alt");

    images[iC].setAttribute("src", "https://avatars.io/twitter/" + verp + "/256/");
    images[iC].setAttribute("title", localStorage.verp);
    let clerp = images[iC].getAttribute("title");
    txt = txt +  images[iC].alt + "___" + images[iC].src + "___" + clerp[iC] + verp + "<br><br>";

    document.getElementById("demo").innerHTML = txt + verp + localStorage.verp;

}


