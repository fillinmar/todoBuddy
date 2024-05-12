import {ReactComponent as CrossSvg} from '../../static/cross.svg';
import {useState} from "react";

export default function CreateTodo({updateTodoList}) {
    const [content, setContent] = useState("");
    const createNewTodo = async () => {
        if (content.length > 0) {
            let res;
            try {
                res = await fetch("/api/todos", {
                    method: "POST",
                    body: JSON.stringify({todo: content}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (e) {
                console.log('[API]: cannot create todo, error:', e)
            }
            if (res) {
                const newTodo = res && await res.json();

                setContent("");
                updateTodoList(newTodo);
            }
        }
    }
    return (
        <div className="addTaskContainer">
            <CrossSvg className="cross" onClick={createNewTodo}/>
            <input
                type="text"
                value={content}
                onKeyDown={(event)=>{
                    if (event.key === 'Enter') {
                        createNewTodo()
                    }
                }}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter a new todo..."
                className="addTask"
                required
            />
        </div>
    )
}