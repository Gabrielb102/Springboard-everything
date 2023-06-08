"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

class Story {

  /* Make instance of Story from data object about story:
   * takes object of {title, author, url, username, storyId, createdAt}*/

  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  //I feel more comfortable using a static function with an event listener
  static async remove(e) {
    const storyId = e.target.parentElement.id;
    const removedStory = await axios({
      url: `https://hack-or-snooze-v3.herokuapp.com/stories/${storyId}`,
      method: "DELETE",
      data: {token: `${currentUser.loginToken}`}});
      getAndShowStoriesOnStart();
    return removedStory;
  }

  getHostName() {
    return "hostname.com";
  }
}

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }
  static async getStories() {
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });
    const stories = response.data.stories.map(story => new Story(story));
    return new StoryList(stories);
  }
  async addStory(user, story) {
    const newStory = await axios({method: "post",
      url: `${BASE_URL}/stories`, 
      data: {token: user.loginToken, story: story}
  });
  return newStory;
  }
}

class User {
  constructor({username, name, createdAt, favorites = [], ownStories = []}, token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;
    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));
    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  static async favorite(e) {
    e.preventDefault();
    const storyId = e.target.parentElement.id;
    const favButton = document.querySelector(`[id="${storyId}"] button.fav`);
    favButton.classList.toggle("fav");
    favButton.classList.toggle("favorited");
    const fav = await axios({
      url: `https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.username}/favorites/${storyId}`,
      method: "POST",
      data: {token: currentUser.loginToken}
    });
    return fav;
  }

  static async unfavorite(e) {
    e.preventDefault();
    const storyId = e.target.parentElement.id;
    const favButton = document.querySelector(`[id="${storyId}"] button.favorited`);
    favButton.classList.toggle("fav");
    favButton.classList.toggle("favorited");
    const fav = await axios({
      url: `https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.username}/favorites/${storyId}`,
      method: "DELETE",
      data: {token: currentUser.loginToken}
    });
    return fav;
  }

  static async signup(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });
    let { user } = response.data
    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }
}
