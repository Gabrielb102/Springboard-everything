const App = () => { 
    return <div>
        <FirstComponent />
        <NamedComponent name="Gabriel" />
    </div>
}

ReactDOM.render(<App />, document.getElementById("root"))