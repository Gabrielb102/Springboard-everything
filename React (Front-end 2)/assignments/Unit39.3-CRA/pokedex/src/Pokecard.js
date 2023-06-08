import "./Pokecard.css"

const Pokecard = ({pokemon}) => {
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    return <div className="pokecard">
            <img src={image} className="pokecard-image"></img>
            <b>{pokemon.name}</b>
            <p>{pokemon.type}</p>
        </div>
    }

export default Pokecard;