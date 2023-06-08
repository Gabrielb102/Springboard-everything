const App = () => {
    return <div>
        <Person name="Gerard Butler" age="70" hobbies={["acting", "golfing", "leading Sparta into War"]} />
        <Person name="Tom Cruise" age="60" hobbies={["riding a motorcycle", "buying film franchises", "flying into the danger zone"]} />
        <Person name="My little cousin" age="8" hobbies={["crocheting", "cooking", "learning new things"]} />
    </div>
}

ReactDOM.render(<App/>, document.getElementById("root"));