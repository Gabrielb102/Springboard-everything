const form = document.getElementById("inputform");
const imageInput = document.querySelector("#imageinput");
const topCaption = document.querySelector("#topcaption");
const lowerCaption = document.querySelector("#lowercaption");
const placeholder = document.querySelector(".placeholder");
const memeList = document.querySelector("#memes");
var memeListItems = document.querySelectorAll("li");


let i = 0;

form.addEventListener("submit", function(e) {
    e.preventDefault();
    placeholder.remove();
    const newMeme = document.createElement("div");
    newMeme.classList.add("meme");
    newMeme.classList.add(i.toString());
    const memeImage = document.createElement("img");
    memeImage.src = imageInput.value;
    memeImage.classList.add("meme-image");
    memeImage.alt = "whatever you decided to put, I guess"
    const topCapDiv = document.createElement("div");
    topCapDiv.innerText = topCaption.value;
    topCapDiv.classList.add("top-cap");
    const lowCapDiv = document.createElement("div");
    lowCapDiv.innerText = lowerCaption.value;
    lowCapDiv.classList.add("low-cap");
    newMeme.append(memeImage,topCapDiv,lowCapDiv);
    const newLi = document.createElement("li");
    newLi.append(newMeme);
    memeList.prepend(newLi);
    
    for (let meme of memeListItems) {
        if (meme.parentElement.classList.contains(i.toString())) {
            meme.classList.add("first");

        } else {
            console.log("no match for i")
            meme.classList.remove("first");
        }
    }
    i++;
});