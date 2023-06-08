const Waldog = () => {
    return <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e10c46a4-0de9-4087-b54b-a5f62daf50c2/d6995tw-403ca0b4-695e-4546-ae47-f8a728f93f7c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UxMGM0NmE0LTBkZTktNDA4Ny1iNTRiLWE1ZjYyZGFmNTBjMlwvZDY5OTV0dy00MDNjYTBiNC02OTVlLTQ1NDYtYWU0Ny1mOGE3MjhmOTNmN2MuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.MRjk1kLr0fP1AelUZgUSyvXDwAxPVItONjPjM8Qc-50"></img>
}

const Order = (props) => (
    <div>
        <p>Your Order: </p>
        <p> I will be having {props.item} from {props.restaurant} </p>
    </div>
)

const Bouncer = (props) => {
    let reply;
    if (props.age >= 21) {
        reply = "Come in you can drink!"
    } else if (props.age >= 18) {
        reply = "You can go in, but nooooooo drinking!"
    } else {
        reply = "no can dosville baby doll"
    }

    return (
        <div> 
            <p>
                <b>Bouncer: </b> How old are you?
            </p>
            <p>
                <b>You: </b> I am {props.age}
            </p>
            <p>
                <b>Bouncer: </b> {reply}
            </p>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <Order item="espresso" restaurant="Coffee Bean" />
            <Bouncer age="19" />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));