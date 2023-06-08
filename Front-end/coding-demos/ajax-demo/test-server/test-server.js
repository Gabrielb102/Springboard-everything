async function getByBreed (breed) {
    try {
        const result = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    console.log(result.data);
    const dogImage = document.querySelector("#dog");
    dogImage.src = result.data.message;
    } catch (e) {
        console.log(e);
    }
}

const form = document.querySelector("#dogform");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const inputValue = document.querySelector("input").value;
    getByBreed(inputValue);
});

// async function getUsers(token) {
//     const res = await axios.get("https://hack-or-snooze-v3.herokuapp.com/users?skip=0&limit=10", {params: {token}});
//     console.log(res);
// }

// async function signUp(username, password, name) {
//     const res = await axios.post("https://hack-or-snooze-v3.herokuapp.com/signup", {user: {name, username, password}});
//     return res.data.token;
// }

// async function logIn(username, password) {
//     const res = await axios.post("https://hack-or-snooze-v3.herokuapp.com/login", {user: {username, password}});
//     console.log(res.data.token);
//     return res.data.token;
// }

// logIn("demonSlav", "oihoiuh");