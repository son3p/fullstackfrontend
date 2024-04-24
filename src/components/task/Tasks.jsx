import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService.js';
import Footer from "../Footer.jsx";
import { Link } from 'react-router-dom'

const Tasks = () => {
    const { todoId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [parentTodo, setParentTodo] = useState(null); // State to hold the parent todo

    // Function to fetch parent todo
    const getParentTodo = async () => {
        try {
            const response = await UserService.fetchTodosForUser();
            const todos = response.data.data;

            // Find the todo with matching todoId
            const parentTodo = todos.find(todo => todo.id === todoId);

            console.log('Parent Todo:', parentTodo); // Log the parentTodo
            setParentTodo(parentTodo);
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to fetch tasks
    const getAllTasks = async () => {
        try {
            const response = await UserService.fetchTasksForUser(todoId);
            console.log('Tasks Response:', response.data.data); // Log tasks response
            setTasks(response.data.data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getAllTasks();
        getParentTodo();
    }, [todoId]);

    const fields = [
        { name: 'id', label: 'Id' },
        { name: 'task', label: 'Task' },
        { name: 'priority', label: 'Priority' },
        { name: 'estimated_time', label: 'Estimated time' },
        { name: 'createdAt', label: 'Creation time ' }
    ];

    return (
        <>
            <div className="m-4 " style={{ fontFamily: 'Courier New' }}>
                <h1>Task Details</h1>
                <hr />
                <h3>Here is your task/tasks stored and also can create new ones!</h3>
            </div>
            <Link to="/todos" className="btn btn-dark border border-2 border-dark button-14 ms-4 bi bi-arrow-left-short ">Back</Link>
            <div className='container mt-5 mb-5 '>
                <Link className="btn btn-dark border border-2 border-dark button-3 bi-journal-plus mb-5 " to={`/todos/${todoId}/task/create`}>Create new task</Link>
                {/* Display parent todo, category, and status if parentTodo exists */}
                {parentTodo && (
                    <div className="fs-5 mb-4">
                        <strong>Parent Todo:</strong> {parentTodo.todo}
                        <br />
                        <strong>Category:</strong> {parentTodo.category}
                        <br />
                        <strong>Status:</strong> {parentTodo.status}
                    </div>
                )}
                <div className="list-group">
                    <div className="row">
                        {tasks.map((task, rowKey) => (
                            <div key={rowKey} className="col-md-6 mb-3">
                                <li className="list-group-item border border-dark rounded">
                                    <div>
                                        <div className="mt-4">
                                            {fields.map((field, fieldKey) => (
                                                <div key={fieldKey}>
                                                    <strong>{field.label}</strong>: {task[field.name]}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-3">
                                            <Link className="btn btn-dark border border-2 border-dark me-4 button-15" to={`${task.id}/update`} state={task}>Edit</Link>
                                            <Link className="btn btn-dark border border-2 border-dark me-4 button-16" to={`${task.id}/delete`} state={task}>Delete</Link>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <Footer name="Website Made By: Hugo, Kim & Ella. Year 2024. Class: INF23F-Å." styling="text-light text-center border border-dark  p-3"></Footer>
            </div>
        </>
    );
};

export default Tasks;
