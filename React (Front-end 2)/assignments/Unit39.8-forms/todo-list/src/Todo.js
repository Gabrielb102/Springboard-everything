import "./Todo.css";

const Todo = ({task, id, key, removeFunc}) => {
    return (
    <div key={key} id={id}>{task}
        <button data-testid="x" onClick={removeFunc}>x</button>
    </div>
)}

export default Todo;