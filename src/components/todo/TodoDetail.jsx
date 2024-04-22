import { useEffect, useState } from "react";
import { useParams, useNavigate , Link} from 'react-router-dom';
import UserService from "../../services/UserService";
import Footer from "../Footer";



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
            <div className="m-4 " style={{ fontFamily: 'Courier New' }}>
                <h1>Task Details</h1>
                <hr />
            </div>
            
                
                <Link to="/todos" className="btn btn-dark border border-2 border-dark button-14 ms-4 bi bi-arrow-left-short fs-5">
                    Back
                </Link>
                <h4 className="text-center mt-4 fw-bold" style={{ fontFamily: 'Courier New' }}>Here you can see the deatils about your todo:</h4>
                <div className="container">
                <div className="d-flex justify-content-center align-items-center ">
                    
                        {error && <p className="text-danger">{error}</p>}
                    
                </div>
                <div className="row justify-content-center m-2 ">
                    <ul className="list-group col-md-5">
                        {tasks.map(task => (
                            <li key={task.id} className="list-group-item border border-dark rounded mt-4 mb-4">
                                <div className="fw-bold fs-5 m-2">
                                    <p>Priority: {task.tasks.priority}</p>
                                    <p>Body: {task.tasks.body}</p>
                                    <p>Estimated time: {task.tasks.estimated_time}</p>
                                </div>
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