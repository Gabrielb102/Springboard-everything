const firstH1 = document.querySelector('h1');
const image = document.querySelector("img");
const letters = document.querySelectorAll(".letter");

function randomRGB() {
    let r = Math.floor(Math.random() * 106) + 150;
    let g = Math.floor(Math.random() * 106) + 150;
    let b = Math.floor(Math.random() * 106) + 150;
    let newColor = `rgb(${r},${g},${b})`;
    return newColor;
}

setInterval(
    function() {image.style.border = "5px solid " + randomRGB()}, 400);

setInterval(
    function() {
    for (let letter of letters) {
    letter.style.color = randomRGB();
    }
}, 250)