import './notepad.css';
import CreateTodo from "../createTodo/createTodo";
import {useCallback, useEffect, useState} from "react";
import Todo from "../Todo/Todo";

export default function Notepad() {
    const [todos, setTodos] = useState([]);

    const getTodos= useCallback(async ()=>{
        const res = await fetch('/api/todos');
        const todos = await res.json();
        setTodos(todos)
    }, [])

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    const updateTodoList = useCallback((newTodo) => {
        setTodos((todos)=>[...todos, newTodo]);
    }, []);

    return (
        <div className="notepad-container">
            <div className="notepad">
                <div className="notepad-header">
                    <div className="pins-container">
                        <div className="pins"/>
                    </div>
                </div>
                <CreateTodo updateTodoList={updateTodoList}/>
                {todos.length > 0 &&
                    todos.map((todo) => (
                            <Todo key={todo._id} todo={todo} setTodos={setTodos}/>
                        )
                    )
                }
                <div className="freeSpace"/>
            </div>
        </div>
    )
}