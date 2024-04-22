import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 
import UserService from '../../services/UserService.js';
import Table from "../Table.jsx";
import Footer from "../Footer.jsx";
//s
const Tasks = () => {
    const {todoId} = useParams()
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');


    const getAllTasks = () => {
        UserService.fetchTasksForUser(todoId)
            .then(res => {
                setTasks(res.data.data);
            })
            .catch(err => {
                setError(err.message);
            });
    }

    useEffect(() => {
        getAllTasks();
    }, []);

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
                <h1>Tasks</h1>
                <hr />
            </div>
            <div className="container mt-5 mb-5">
                <h1 className="mt-3 mb-3 fw-bolder">User&apos;s Tasks</h1>
                <a className="btn btn-dark border border-2 border-dark button-3 bi-journal-plus" href="/todos/create">Create new task</a>
                <button type="button" className="btn btn-dark border border-2 border-dark button-4 mt-2 d-block" onClick={getAllTasks}>Refresh site</button>
                {error && <p className="text-danger">{error}</p>}
                <div className="my-4">
                    <Table caption={''} fields={fields} rows={tasks} resourceName='/todos'></Table>
                </div>
            </div>
            <div className="mt-5">
                <Footer name="Website Made By: Hugo, Kim & Ella. Year 2024. Class: INF23F-Å." styling="text-light text-center border border-dark  p-3"></Footer>
            </div>
        </>
    );
};

export default Tasks;