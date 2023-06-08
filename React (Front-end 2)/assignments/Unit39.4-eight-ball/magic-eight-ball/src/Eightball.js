import {useState} from "react";
import "./Eightball.css"

const fortunes = [
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" },
  ]

const Eightball = () => {
    const numFortunes = fortunes.length
    const getFortune = () => fortunes[Math.floor(Math.random() * numFortunes)];
    const randomFortune = getFortune();
    let [{msg, color}, newFortune] = useState({msg: 'Ask and Shake', color: 'blue'})
    // const message = randomFortune["msg"];
    // const color = randomFortune["color"];
    return (
        <>
            <button className="eightball-button" onClick={() => newFortune({msg, color} = getFortune())}>
                <div className="eightball" style={{backgroundColor : color}}>
                    <p className="eightball-message">{msg}</p>
                </div>
            </button>
            <button className="eightball-reset" onClick={() => newFortune({msg, color} = {msg : 'Ask and Shake', color : 'blue'})}> Reset to Blue </button>
        </>
    )
}

export default Eightball;