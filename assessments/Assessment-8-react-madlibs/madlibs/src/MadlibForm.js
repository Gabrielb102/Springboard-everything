import { useState } from "react";

const MadlibForm = ({ title, blanks, saveInputs}) => {

    // the initial conditions are empty due to the dynamic nature of the form.
    const initialConditions = {};

    const [ formData, setFormData ] = useState(initialConditions);

    // takes any change and makes sure that it is recorded in state and reflected in the form.
    // a new entry is made for every field with the key being the number of input it is
    // I didn't use unique IDs since the fields would never change order, and do not need to persist for the next madlib
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id] : value
        })
    };

    // passes the form data back up to the parent component and clears the form data.
    const handleSubmit = (e) => {
        e.preventDefault()
        saveInputs(formData);
        setFormData(initialConditions);
    };

    // returns a controlled component with a fake title, inputs controlled by a generic change handler, and a button to submit the form.
    return (
        <>
            <h1>????????</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                {blanks.map((blank, idx) => <input id={idx} placeholder={blank} value={formData.idx}/>)}
                <button onClick={handleSubmit}>Let's see the story!</button>
            </form>
        </>
    );
}

export default MadlibForm;