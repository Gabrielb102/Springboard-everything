import axios from "axios";
import NewMadlibForm from "./NewMadlibForm";
import MadlibForm from "./MadlibForm";
import { useState, useEffect } from "react";
import MadlibStory from "./MadlibStory";

const Madlibs = () => {

    // the madlib state can be used for the form or from the story that is generated
    // inputs store the inputs from the madlib form, and are redefined with each new form fill
    const [ madlib, setMadlib ] = useState(undefined);
    const [ inputs, setInputs ] = useState({});

    // makes a call to the api for a madlib of the specified length, 
    // returns an object of the title, the necessary blanks, and the story strings that go between the inputs
    // to be called by other functions
    const getMadlib = async (minlength = 0, maxlength = 100) => {
        try {
            const response = await axios.get("http://madlibz.herokuapp.com/api/random", { params: { minlength, maxlength} });
            const { title, blanks, value } = response.data;
            return { title, blanks, value }
        } catch (e) {
            console.error("Error contacting madlibs database")
        }
    }

    // this simply sets the inputs state variable
    // this function is used by the MadlibForm component to pass data back up to the parent Madlibs component
    // inputs is to be used by an effect
    const saveInputs = (userInputs) => {
        setInputs(userInputs);
    }

    // creates the MadlibForm Component, and by setting madlib state variable to MadlibForm, displays it.
    // this function is passed into and called by the NewMadlibForm component.
    const submitFunc = async (formData) => {
        const { title, blanks, value } = await getMadlib(formData.Madlibsminlength, formData.maxlength);
        setMadlib(<MadlibForm title={title} blanks={blanks} values={value} saveInputs={saveInputs}/>)
    }

    // this effect displays the story once all the inputs are completed and submitted.
    useEffect(() => {
        if (inputs && madlib) {
            const writeStory = () => {
                const values = madlib.props.values.slice(0, madlib.props.values.length - 1);
                const libs = values.map((val, idx) => val + (inputs[idx] ? inputs[idx] : ''));
                const story = libs.join('');
                setMadlib(madlib => <MadlibStory story={story} title={madlib.props.title}/>);
            }
            writeStory();      
        };
    }, [inputs])

    
    // The component returns the title of the website, a container for either the MadlibForm or for the MadlibStory
    // Depending on which one is ready, and what madlib state variable is set to.
    return (
        <>  
            <h2>Madlibs!</h2>
            <div className="Madlibs">
                { madlib ? madlib : <h4>What kind of madlib do you wanna do?</h4>}
            </div>
            <NewMadlibForm submitFunc={submitFunc}/>
        </>
    )
}

export default Madlibs;