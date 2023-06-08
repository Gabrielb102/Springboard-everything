const Recipe = (props) => {
    let ingredients = []
    for (let ingredient of props.ingredients) {
        ingredients.push(<li>{ingredient}</li>)
    }
    return <div>
        <h1> My famous {name} recipe!</h1>
            <ul>
                {ingredients}
            </ul>
    </div>
}

export default Recipe