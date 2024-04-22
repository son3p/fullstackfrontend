import { useEffect, useState } from "react"
import UserService from '../../services/UserService.js'
import AuthService from '../../services/AuthService.js';
import Task from '../task/Tasks.jsx'

import Table from "../Table.jsx"
import Footer from "../Footer";

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

    // We use this function for both useEffect and handleClick
    // res.data is axios package. the packages data is what we decide to call it
    const getAllTodos = () => {
        UserService.fetchTodosForUser()
            .then(res => {
                setTodos(res.data.data)
            })
            .catch(err => {
                setError(err.message);
            });
    }
    // you tell React that your component needs to do something after render with useEffect
    useEffect(() => {
        getAllTodos();
        setCurrentUser(AuthService.getCurrentUser()); // Update current user
    }, []);

    const fields = [
        { name: 'id', label: 'Id' },
        { name: 'todo', label: 'Todo' },
        { name: 'createdAt', label: 'Creation time ' }];

    return (
        <>
            <div className="m-4 " style={{ fontFamily: 'Courier New' }}>
                <h1 >Todos</h1>
                <hr />
            </div>
            <div className="container mt-5 mb-5">
                <h1 className="mt-3 mb-3 fw-bolder"> {currentUser.username}&apos;s Todos </h1>

                <a className="btn btn-dark border border-2 border-dark button-3 bi-journal-plus" href="/todos/create">Create new todo</a>
                <button type="button" className="btn btn-dark border border-2 border-dark button-4 mt-2 d-block bi bi-arrow-clockwise" onClick={getAllTodos}>Refresh site</button>
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