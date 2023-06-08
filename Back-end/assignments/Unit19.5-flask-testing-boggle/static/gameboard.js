if (!sessionStorage['time']) {
    essionStorage.setItem('time', 60);
}

let time = sessionStorage['time']
let timer = document.querySelector('#timer')
let form = document.querySelector('#form')
form.innerHTML = `
            <form action="/seen-word" method="POST" id="word-form" class="user-element"> 
            Which words do you see?
            <input class="input" type="text" placeholder="What do you see?" name="word_guess" required>
            <button class="input" id="button" type="submit"> Enter </button>
            </form>`;

function decreaseAndShowTime() {
    time = sessionStorage['time']
    time--
    sessionStorage['time'] = time
    if (time >= 0) {
        timer.innerText = time
    } else if (time < 0) {
        form.innerHTML = `<form action="/start" method="POST" id="word-form" class="user-element"> TIME'S UP!
            <button class="input play-again" id="button" type="submit"> Play again? </button>
            </form></div>`
        let button = document.querySelector('.play-again')
        button.addEventListener('mousedown', function() {
            sessionStorage['time'] = 60;
            time = 60
            return
        })
    }
    return 
}

setInterval(decreaseAndShowTime, 1000);



