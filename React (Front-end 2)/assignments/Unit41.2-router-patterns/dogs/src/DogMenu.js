import { Link } from "react-router-dom";

const DogMenu = ({ dogs }) => {
    const dogsLinks = dogs.map(dog => {
        const path = `/dogs/${dog.name}`;
        return (
            <Link to={path}>
                <img src={dog.src} />
            </Link>
        )
    })
    return (
        <div className="DogMenu">
            {dogsLinks}
        </div>
    )
}

export default DogMenu;