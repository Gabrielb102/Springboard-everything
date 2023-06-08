const submitForm = async (e) => {

    e.preventDefault();

    const firstNameVal = document.querySelector('#firstname').value;
    const lastNameVal = document.querySelector('#lastname').value;
    const emailVal = document.querySelector('#email').value;

    const res = await axios.post(`${BASE_URL}/users`, {
        firstName : firstNameVal,
        lastName : lastNameVal,
        email : emailVal
    });

    console.log(res);
    window.location.href = `${BASE_URL}/signup.html`;
}

const button = document.querySelector('#submit');
    button.addEventListener("click", submitForm);