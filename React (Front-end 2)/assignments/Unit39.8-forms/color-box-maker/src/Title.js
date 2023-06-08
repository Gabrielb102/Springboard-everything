const Title = ({length}) => {
    if (length === 1) {
        return <h1>Our Happy Box</h1>;
    } else if (length > 1) {
        return <h1>Our Big Happy Box Family ☺️</h1>;
    } else {
        return <h1>No Boxes</h1>
    }
}

export default Title;