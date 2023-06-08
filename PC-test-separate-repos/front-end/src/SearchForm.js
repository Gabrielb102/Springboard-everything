import DBFrontendAPI from "./DBFrontendAPI";
import { useState } from "react";
import "./static/SearchForm.css";

const INITIALCONDITIONS = {
    name: '',
    party: '',
    state: '',
    district: '', 
    year: '',
    office: ''  
};

const states = ["AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"]

const SearchForm = ({setResults}) => {

    const [formData, setFormData] = useState(INITIALCONDITIONS);

    const stateJSX = [];
    for (let state of states) {
        stateJSX.push(<option key={states.indexOf(state)} value={state}> {state} </option>);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name] : value
        }))
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await DBFrontendAPI.search(formData);
        setResults(res);
        setFormData(INITIALCONDITIONS);
    }

    return (
        <form className="SearchForm" onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} className="SearchForm-input" id="searchbar" type="text" placeholder="Search for a political candidate or organization" value={formData.name}/>
            <input name="party" onChange={handleChange} className="SearchForm-input" type="text" placeholder="Party" value={formData.party}/>
            <select name="office" onChange={handleChange} className="SearchForm-dropdown" type="text" value={formData.office}>
                <option value=''>Office</option>
                <option value='H'>House</option>
                <option value='S'>Senate</option>
                <option value='P'>President</option>
            </select>
            <select name="state" onChange={handleChange} className="SearchForm-dropdown" type="text" value={formData.state}>
                <option value=''>State</option>
                { stateJSX }
            </select>
            <input name="district" onChange={handleChange} className="SearchForm-input" type="integer" placeholder="District"/>

            <input onChange={handleChange} className="SearchForm-input" name="year" value={formData.year} placeholder="Year"/>
            <button type="submit" className="SearchForm-button"> Search </button>
        </form>
    )
}

export default SearchForm;