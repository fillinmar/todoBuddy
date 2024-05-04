import './style.css';
import {useCallback, useEffect, useState} from "react";
import Todo from "./Todo";

function App() {
    const [todos, setTodos] = useState([]);
    const [content, setContent] = useState("");

    const getTodos= useCallback(async ()=>{
        const res = await fetch('/api/todos');
        const todos = await res.json();
        setTodos(todos)
    }, [])

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    const createNewTodo = async (e) => {
        e.preventDefault();
        if (content.length > 0) {
            const res = await fetch("/api/todos", {
                method: "POST",
                body: JSON.stringify({ todo: content }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const newTodo = await res.json();

            setContent("");
            setTodos([...todos, newTodo]);
        }
    }

    return (
        <div className="App">
            <h1>taskBuddy</h1>

            <form className="form" onSubmit={createNewTodo}>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter a new todo..."
                    className="form__input"
                    required
                />
                <button className="form__button" type="submit">Create Todo</button>
            </form>

            {todos.length > 0 &&
                todos.map((todo) => (
                    // <div/>
                    // <div> {todo.todo}</div>
                        <Todo key={todo._id} todo={todo} setTodos={setTodos}/>
                    )
                )
            }
        </div>
    );
}

export default App;
