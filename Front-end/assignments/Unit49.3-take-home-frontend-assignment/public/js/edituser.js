
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const userDiv = document.querySelector('#userdiv');

const submitForm = async (e) => {

    e.preventDefault();

    const firstNameVal = document.querySelector('#firstname').value;
    const lastNameVal = document.querySelector('#lastname').value;
    const emailVal = document.querySelector('#email').value;

    const res = await axios.put(`${BASE_URL}/users/${id}`, {
        id : id,
        firstName : firstNameVal,
        lastName : lastNameVal,
        email : emailVal
    });

    console.log(res);
    window.location.href = `${BASE_URL}/admin.html`;
}

const loadUser = async () => {
    const userRes = await axios.get(`${BASE_URL}/users/${id}`);
    const user = userRes.data;
    userDiv.innerHTML = `
        <form>
            <input id="firstname" value="${user.firstName}"/>
            <input id="lastname" value="${user.lastName}"/>
            <input id="email" value="${user.email}"/>
            <button id="submit" type="submit"> Submit </button>
        </form>`;

    const button = document.querySelector('#submit');
    button.addEventListener("click", submitForm);
}

addEventListener('DOMContentLoaded', loadUser());
