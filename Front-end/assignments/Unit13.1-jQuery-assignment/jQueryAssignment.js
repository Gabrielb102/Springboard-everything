//When the DOM is ready, console.log the message “Let’s get ready to party with jQuery!”

$(function() {
    console.log("Lets get ready to party with jQuery!")
});

// Give all images inside of an article tag the class of image-center (this class is defined inside of the style tag in the head).

$("article").addClass("image-center");

// Remove the last paragraph in the article.

const articlePs = $("article").children("p");
const lastPIndex = $("article").children("p").get().length - 1;
$(articlePs).eq(lastPIndex).remove();

// Set the font size of the title to be a random pixel size from 0 to 100.

const randomFontSize = Math.floor(Math.random() * 100);

$("h1").css("font-size", randomFontSize);

// Add an item to the list; it can say whatever you want.

$("ol").append("<li>polka dots are like ul lis that aren't in a line nor have content.</li>")

// Scratch that; the list is silly. Empty the aside and put a paragraph in it apologizing for the list’s existence.

$("aside").html("<p> There use to be a list here, isn't that atrocious? It was so meta too, a lists about lists; imagine.</p>")

// When you change the numbers in the three inputs on the bottom, the background color of the body should change to match whatever the three values in the inputs are.

$("body").on("input", () => {
    const rVal = $("input").eq(0).val();
    const gVal = $("input").eq(1).val();
    const bVal = $("input").eq(2).val();
    const rgbString = `rgb(${rVal},${gVal},${bVal})`
    console.log(rgbString);
    $("body").css("background-color", rgbString);
});

// Add an event listener so that when you click on the image, it is removed from the DOM.

$("body").on("click", "img", function() {
    $(this).remove();
});