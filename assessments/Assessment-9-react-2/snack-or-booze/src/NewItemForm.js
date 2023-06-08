import React, { useContext } from "react";
import MenuContext from "./Context";
import {useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./static/NewItemForm.css";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem
  } from "reactstrap";
  

function NewItemForm({save}) {
    const history = useHistory()
    const { menu, setMenu } = useContext(MenuContext);

    // Store the empty fields in a variable for reuse
    const INITIAL_STATE = {
        id: "",
        name: "",
        description: "",
        recipe: "",
        serve: ""
    }

    //use context to change menu
    const [ formData, setFormData ] = useState(INITIAL_STATE);

    // Generic change handler
    const handleChange = (e) => {
        const {name, value} = e.target;
        const idName = formData['name'].toLowerCase().replace(" ", "-");
        setFormData({
            ...formData,
            [name]: value,
            id: idName
        });
    }

    // Submit handler which saves the new item to the data base and redirects to the correct menu
    const handleSubmit = (e) => {
        e.preventDefault()
        const category = document.querySelector('select').value
        const path = `./${category}`;
        
        save(formData, category);
        setMenu(menu => ({...menu, ...formData}));
        
        setFormData(INITIAL_STATE);
        history.push(path);
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    Contribute to our Menu!
                </CardTitle>
                <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category:</label>
                <select className="NewItemForm-input" onChange={handleChange} name="category">
                    <option value="drinks">Drink</option>
                    <option value="snacks">Snack</option>
                </select>
                <label htmlFor="name">Name:</label>
                <input className="NewItemForm-input" onChange={handleChange} name="name" value={formData.name} placeholder="Name for your snack"/>
                <label htmlFor="description">Description:</label>
                <textarea className="NewItemForm-input" onChange={handleChange} name="description" value={formData.description} placeholder="Tell us about your snack"/>
                <label htmlFor="recipe">Recipe:</label>
                <textarea className="NewItemForm-input" onChange={handleChange} name="recipe" value={formData.recipe} placeholder="How do we make your snack?"/>
                <label htmlFor="serve">Serve:</label>
                <textarea className="NewItemForm-input" onChange={handleChange} name="serve" value={formData.serve} placeholder="How is your snack served best?"/>
                <button className="NewItemForm-input button" onClick={handleSubmit}>Submit</button>
                </form>
            </CardBody>
        </Card>
    )
}

export default NewItemForm;