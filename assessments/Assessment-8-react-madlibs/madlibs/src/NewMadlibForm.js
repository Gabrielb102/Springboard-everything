import { useState } from "react";

// Form to specify length requirements for the new madlib
const NewMadlibForm = ({ submitFunc }) => {

    const initalConditions = {
        minlength : '',
        maxlength : ''
    }

    const [ formData, setFormData ] = useState(initalConditions);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name] : value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        submitFunc(formData)
        setFormData(initalConditions);
    };

    return (
        <>
            <form>
                <label htmlFor="minlength">Minimum: </label>
                <input onChange={handleChange} name="minlength" placeholder="minimnum number of entries" value={formData.minlength} />
                <label htmlFor="maxlength">Maximum: </label>
                <input onChange={handleChange} name="maxlength" placeholder="maximnum number of entries" value={formData.maxlength} />
                <button onClick={handleSubmit}>Make it</button>
            </form>
        </>
    )
}

export default NewMadlibForm;