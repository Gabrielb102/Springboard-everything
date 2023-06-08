const Person = (props) => {
    var votingMessage = "you must be 18"
    if (props.age >= 18) {
        votingMessage = "please go vote!"
    }
    var nameCard = props.name
    if (props.name.length > 8) {
        nameCard = props.name.slice(0,6)
        nameCard += "..."
    }
    
    const hobbiesJSX = props.hobbies.map(hobby => <li>{hobby}</li>)

    return <div>
        <h2>{nameCard}, Age: {props.age}</h2>
        <h3>{votingMessage}</h3>
        <p>Learn some information about this person</p>
        {props.hobbies ? <ul>Hobbies: {hobbiesJSX}</ul> : null}
    </div>
}