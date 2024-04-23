import { useEffect, useState } from "react";
import UserService from '../../services/UserService.js';
import AuthService from '../../services/AuthService.js';
import Task from '../task/Tasks.jsx';
import Table from "../Table.jsx";
import Footer from "../Footer";

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

    const getAllTodos = () => {
        UserService.fetchTodosForUser()
            .then(res => {
                setTodos(res.data.data)
            })
            .catch(err => {
                setError(err.message);
            });
    }

    useEffect(() => {
        getAllTodos();
        setCurrentUser(AuthService.getCurrentUser());
    }, []);

    const fields = [
        { name: 'id', label: 'Id' },
        { name: 'todo', label: 'Todo' },
        { name: 'category', label: 'Category' },
        { name: 'status', label: 'Status' },
        { name: 'createdAt', label: 'Creation time '}
    ];

    return (
        <>
            <div className="m-4" style={{ fontFamily: 'Courier New' }}>
                <h1>Todos</h1>
                <hr />
            </div>
            <div className="container mt-5 mb-5">
                <h1 className="mt-3 mb-3 fw-bolder">
                    {currentUser ? `${currentUser.username}'s Todos` : 'You need to be logged in to use site!'}{' '}
                    {!currentUser && (
                        <>  
                            <p className="fs-6 mt-5">Create a user account on register and remember to login to use site!</p>
                            <a className="nav-link bi-person-plus-fill fs-4 mt-2 text-primary" href="/register">Register</a>
                            <span className=" fs-4">or</span>
                            <p className="fs-6 mt-4">If you have a user account login via this link!</p>
                            <a className="nav-link bi-box-arrow-in-right fs-4 mt-2 text-primary" href="/login">Login</a>
                        </>
                    )}
                </h1>
                {currentUser && (
                    <>
                        <a className="btn btn-dark border border-2 border-dark button-3 bi-journal-plus" href="/todos/create">Create new todo</a>
                        <button type="button" className="btn btn-dark border border-2 border-dark button-4 mt-2 d-block bi bi-arrow-clockwise" onClick={getAllTodos}>Refresh site</button>
                    </>
                )}
                {error && <p className="text-danger">{error}</p>}
                <div className="my-4">
                    <Table caption={''} fields={fields} rows={todos} resourceName='/todos'></Table>
                </div>
            </div>
            <div className="mt-5">
                <Footer name="Website Made By: Hugo, Kim & Ella. Year 2024. Class: INF23F-Å." styling="text-light text-center border border-dark  p-3"></Footer>
            </div>
        </>
    );
};

export default Todos;