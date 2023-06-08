const usersDiv = document.querySelector('#userslist');

const getUsers = async () => {
    const users = await axios.get(`${BASE_URL}/users`);
    return users.data;
}

const removeUser = async (id) => {
    const removed = await axios.delete(`${BASE_URL}/users/${id}`);
}

const goToEditPage = async (id) => {
    window.location.href = `${BASE_URL}/edituser.html?id=${id}`;
}

const populateList = async (event) => {
    usersDiv.innerHTML = '';
    try {
        const users = await getUsers();
        let usersHTML = ''
        for (let user of users) {
            const userHTML = `
                <div id="usercard">
                    <b>${user.firstName} ${user.lastName}</b>
                    <button class="editbtn btn" id="${user.id}">Edit User</button>
                    <button class="dltbtn btn" id="${user.id}">Remove User</button>
                    <p><b>Email: </b> ${user.email}</p>
                    <p><b>Status: </b> ${user.status} <p>
                </div>`
            usersHTML += userHTML;
        }
        usersDiv.innerHTML = usersHTML;    
    } catch(err) {
        usersDiv.innerHTML = `
            <b>Server communication error, </b> 
            <p>we'll get it back up in no time. Just chill for now :)</p>`;
        console.error(err)
    }
}

addEventListener('DOMContentLoaded', populateList());

usersDiv.addEventListener('click', (evt) => {
    if (evt.target.classList[0] === 'dltbtn') {
        removeUser(evt.target.id);
        populateList()
    }

    if (evt.target.classList[0] === 'editbtn') {
        goToEditPage(evt.target.id);
    }
})

