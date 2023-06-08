import {useState} from "react";
import { v4 as uuid } from 'uuid';
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const TodoList = () => {
    const [ todos, setTodos ] = useState([]);

    // BUG: in the removeFunc function, todos is shortened to include everything BEFORE THE clicked component
    // The state is not being read correctly, and I cannot get it
    const removeFunc = (id) => {
        debugger;
        console.log('todos: ', todos);
        const todoToDie = todos.find((todo) => {
            const match = todo.props.id === id;
            return match;
        });

        // if (todoToDie) {
        //     const idx = todos.indexOf(todoToDie);
        //     setTodos(todos => {
        //         todos = todos.splice(idx, 1);
        //         return todos;
        //     });

        // } else {
        //     return todos;
        // }
    }

    const addTodo = (task) => {
        const id = uuid();
        const newTodo = <Todo key={id} id={id} removeFunc={() => removeFunc(id)} task={task} />;
        setTodos([newTodo, ...todos]);
    }

    console.log(todos)
    return (
        <>  
            <h1>Your To Do List for To Day</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map(todo => <li>{todo}</li>)}
        </>
    )
}

export default TodoList;