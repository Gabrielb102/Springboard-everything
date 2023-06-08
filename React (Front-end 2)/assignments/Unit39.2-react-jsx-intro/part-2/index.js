const App = () => {
    return <div>
        <Tweet name="Dirty Napkin" username="dojacat" message="I don't care what anyone says, getting to the center of a tootsie pop is a fruitless endeavor"/>
        <Tweet name="Indiana Solo" username="harrisonford" message="Thank you blade runner for allowing me to diversify my employment"/>
        <Tweet name="Ronald McDonald" username="actuallyronaldmcdonald" message="I don't know why we don't have a fry burgular, that's where the money's at"/>
        <Tweet name="Apple" username="applecompany" message="Introducing the iPhone 21, this year, we're actually commiting to having no hardware updates at all."/>
    </div>
}

ReactDOM.render(<App />, document.getElementById("root"));