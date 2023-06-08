const choice = (array) => {
    const randomIndex = Math.floor(Math.random() * (array.length + 1));
    return array[randomIndex];
}

export default choice