// #1
const containerId = document.getElementById("container");
//#2
const container = document.querySelector("#container");
//#3
const second = document.getElementsByClassName("second");
//#4
const olThird = document.getElementsByClassName('third')[1];
//#5
containerId.innerText = 'Hello!'
//#6
const footer = document.getElementsByClassName("footer");
for (eachClass of footer) {
    eachClass.classList.add("main");
};
//#7
for (eachClass of footer) {
    eachClass.classList.remove("main");
}
//#8
const newLi = document.createElement('li');
//#9
newLi.textContent = 'four';
//#10 - not working
const ul = document.querySelector("ul");
//#11 - not working
const ol = document.querySelector("ol");
//#12
for (let div of footer) {
    div.remove();
}