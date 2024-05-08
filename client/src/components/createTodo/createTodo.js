import {ReactComponent as CrossSvg} from '../../static/cross.svg';
import {useState} from "react";

export default function CreateTodo({updateTodoList}) {
    const [content, setContent] = useState("");
    const createNewTodo = async () => {
        if (content.length > 0) {
            const res = await fetch("/api/todos", {
                method: "POST",
                body: JSON.stringify({todo: content}),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const newTodo = await res.json();

            setContent("");
            updateTodoList(newTodo);
        }
    }
    return (
        <div className="addTaskContainer">
            <CrossSvg className="cross" onClick={createNewTodo}/>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter a new todo..."
                className="addTask"
                required
            />
        </div>
    )
}