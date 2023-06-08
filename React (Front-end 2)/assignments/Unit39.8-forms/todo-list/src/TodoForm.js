import {useState} from "react";
import Todo from "./Todo";
import "./TodoForm.css"

const TodoForm = ({addTodo}) => {

    const [formData, setFormData] = useState({
        task: ''
    });

    //this generic change handler sure is generic!
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name] : value
        }))
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const {task} = formData;
        addTodo(task);
        setFormData({task: ''});
    }

    return (
        <form className="TodoForm" data-testid="form" onSubmit={handleSubmit}>
            <input id="task" name="task" value={formData.task} onChange={handleChange} placeholder="New Task"></input>            
            <button type="submit">Post</button>
        </form>
    )
}

export default TodoForm;