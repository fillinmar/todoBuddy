import './Todo.css';
import {ReactComponent as EmptyCheckbox} from '../../static/emptyCheckbox.svg';
import {ReactComponent as DoneCheckbox} from '../../static/doneCheckbox.svg';
import {ReactComponent as Cross} from '../../static/close.svg';

export default function Todo(props) {
    const { todo, setTodos } = props;

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
        }
    };

    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos
                    .filter((currentTodo) => (currentTodo._id !== todoId));
            })
        }
    };

    return (
        <div className={`todo${todo.status ? ' done' : ''}`}>
            <button
                className="todo_button"
                onClick={() => updateTodo(todo._id, todo.status)}
            >
                {(todo.status) ? <DoneCheckbox/> : <EmptyCheckbox/>}
            </button>
            <p className="todo__name">{todo.todo}</p>

                <button
                    className="todo_button"
                    onClick={() => deleteTodo(todo._id)}
                >
                    <Cross/>
                </button>

        </div>
    )
}
