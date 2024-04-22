import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import UserService from "../../services/UserService";
import Footer from "../Footer";
import Table from "../Table";

const TodoDetail = () => {
    const {todoId} = useParams()
    const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
    const [error, setError] = useState('');

    // Function to fetch tasks
    const fetchTasks = () => {
        UserService.fetchTasksForUser(todoId)
            .then(res => {
                setTasks([res.data.data]);
            })
            .catch(err => {
                setError(err.message);
            });
    }

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Check if tasks is not an array, then set it to an empty array
    if (!Array.isArray(tasks)) {
        setTasks([]);
    }

    return (
        <>
            <div className="m-4" style={{ fontFamily: 'Courier New' }}>
                <h1>Tasks</h1>
                <hr />
            </div>
            <div className="container mt-5 mb-5">
                <h1 className="mt-3 mb-3 fw-bolder">User&apos;s Tasks</h1>
                <button type="button" className="btn btn-dark border border-2 border-dark button-4 ms-5" onClick={fetchTasks}>Refresh site</button>
                {error && <p className="text-danger">{error}</p>}
                <div className="my-4">
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}>
                                {task.tasks.priority}
                                {task.tasks.body}
                                {task.tasks.estimated_time}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-5">
                <Footer name="Website Made By: Hugo, Kim & Ella. Year 2024. Class: INF23F-Å." styling="text-light text-center border border-dark p-3" />
            </div>
        </>
    );
};

export default TodoDetail;