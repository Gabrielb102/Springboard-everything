const gameContainer = document.getElementById("game");
const gameBoardDiv = document.querySelector("div");
const divs = document.querySelector("div").children;
const clicked = document.getElementsByClassName("clicked");
const cards = document.getElementsByClassName("card");
let winCounter = 0;
let win = false;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

//THIS FUNCTION MAKES THE CARDS
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.setAttribute("id", color);
    newDiv.setAttribute("class", "card")

    // call a function handleCardClick when a div is clicked on

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

gameBoardDiv.addEventListener("click", function(e) {
if (e.target.className === 'card') {handleCardClick(e)};
});

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked" + event.target.className);
  if (checkCardsClicked() === 0) {
    event.target.classList.add("clicked");
    event.target.classList.add(event.target.getAttribute('id'));
  } else if (checkCardsClicked() === 1) {
    event.target.classList.add("clicked");
    event.target.classList.add(event.target.getAttribute('id'));
  } 
  if (clicked.length > 1) {
    if (clicked[0].id === clicked[1].id) {
      for (let card in clicked) {
        //console.log(clicked[card]);
        clicked[0].classList.remove("clicked");
        winCounter++;
        if (winCounter === 10) {
          win = true;
        }
      }
    } else {
      setTimeout(removeColor, 1000);
    }
  }
  //console.log("clicked: " + clicked);
}

function checkCardsClicked() {
  clickCounter = 0;
  for (let div of divs) {
    if (div.classList.contains("clicked")) {
      clickCounter++;
    }
  }
  //console.log(clickCounter);
  return clickCounter;
}

function removeColor() {
  for (let card in clicked) {
    //console.log(clicked[card]);
    clicked[0].classList.remove(clicked[0].getAttribute('id'));
    clicked[0].classList.remove("clicked");
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
