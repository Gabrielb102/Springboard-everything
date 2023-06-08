"use strict";

let storyList;

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}" class="story">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <button class="fav">&#9733</button>
        <button class="remove">&#10006</button>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();
  if (currentUser) {
    let favs = currentUser.favorites.map((fav) => fav.storyId);

    for (let story of storyList.stories) {
      if (favs.includes(story.storyId)) {
        const $story = generateStoryMarkup(story);
        $allStoriesList.append($story);
        const favButton = document.querySelector(`[id="${story.storyId}"] button.fav`);
        favButton.classList.toggle("favorited");
        favButton.classList.toggle("fav");
      }
    }
  
    for (let story of storyList.stories) {
      if (!favs.includes(story.storyId)) {
        const $story = generateStoryMarkup(story);
        $allStoriesList.append($story);
      }
    }
  } else {
    for (let story of storyList.stories) {
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }
  }
  $allStoriesList.show();
}

async function postNewStory(e) {
  e.preventDefault();
  const title = $("#story-title").val();
  const author = $("#author-input").val();
  const url = $("#url-input").val();
  const newStory = {author, title, url};
  console.log(newStory);
  await storyList.addStory(currentUser, newStory);
  getAndShowStoriesOnStart();
}

$storyForm.on("submit", postNewStory);
$allStoriesList.on("click", ".fav", User.favorite);
$allStoriesList.on("click", ".favorited", User.unfavorite);
$allStoriesList.on("click", ".remove", Story.remove);