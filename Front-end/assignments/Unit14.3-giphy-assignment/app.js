const addGifBtn = document.querySelector("#search");

async function searchGIF(searchTerm) {
    result = await axios.get("//api.giphy.com/v1/gifs/search", {param: {
        q: searchTerm, 
        api_key: "oK2IY4eenePxflvV1fHc3rY5hAOAtE7B"
    }})
    return result.data.data[0].embed_url;
}

function addGifToPage(gifUrl) {
    imageSpot = document.querySelector("#partyspot");
    newImage = document.createElement("img");
    newImage.src = gifUrl;
}

$("#gifform").on("submit", async function (e) {
    e.preventDefault();
    const urlinput = $("#urlinput").eq(0).val();
    console.log(urlinput);
    const gifUrl = await searchGIF(urlinput);
    console.log(gifUrl);
    addGifToPage(gifUrl);
});

//In the lesson, Colt doesn't use await, but whenever I want to call an AJAX function, I find that it returns a promise unless I use await
//again, in the lesson, async/await cooperate seamlessly in the event handler, here I get all sorts of problems