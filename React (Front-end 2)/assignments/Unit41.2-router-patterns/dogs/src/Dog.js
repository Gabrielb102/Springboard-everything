import { useParams } from "react-router-dom/cjs/react-router-dom.min"

const Dog = ({dogs}) => {
    const { name } = useParams();
    const dog = dogs.find(dog => dog.name === name);
    return (
        <div className="dog">
            <h1>{dog.name}</h1>
            <img src={dog.src} />
            <ul>
                <li>Age: {dog.age}</li>
                {dog.facts.map(fact => <li>{fact}</li>)}
            </ul>
        </div>
    )
}

export default Dog;