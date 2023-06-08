import {useState} from "react";
import Box from "./Box";


const NewBoxForm = ({addBoxFunc}) => {
    const INITIALCONDITIONS = {
        color : '',
        height : '',
        width : ''
    }

    const [formData, setFormData] = useState(INITIALCONDITIONS);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name] : value
        }))
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const {color, height, width} = formData;
        const cssHeight = height + "px";
        const cssWidth = width + "px";
        addBoxFunc(color, cssHeight, cssWidth);
        setFormData(INITIALCONDITIONS);
    }

    return (
        <form data-testid="form" onSubmit={handleSubmit}>
            <label htmlFor="color">Color</label>
            <input id="color" name="color" value={formData.color} onChange={handleChange} placeholder="css colors only please"></input>            
            <label htmlFor="height">Height</label>
            <input id="height" name="height" value={formData.height} onChange={handleChange}></input>            
            <label htmlFor="width">Width</label>
            <input id="width" name="width" value={formData.width} onChange={handleChange}></input>            
            <button type="submit">New Box</button>
        </form>
    )
}

export default NewBoxForm;