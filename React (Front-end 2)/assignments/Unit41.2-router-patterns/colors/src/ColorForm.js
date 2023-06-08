import { useState } from "react";

const ColorForm = ({addColor}) => {

    const [ input, setInput ] = useState('')

    const handleChange = (e) => {
        const {value} = e.target;
        setInput(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newColor = input;
        console.log(e);
        addColor(newColor);
        setInput('');
    }

    return (
        <form className="ColorForm">
            <input onChange={handleChange} name="color" id="color" value={input}/>
            <button onClick={handleSubmit}>Add New</button>
        </form>
    )
}

export default ColorForm;