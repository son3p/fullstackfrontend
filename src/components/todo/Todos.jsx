import { useEffect, useState } from "react"
import UserService from '../../services/UserService.js'

import Table from "../Table.jsx"

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');


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
        getAllTodos()
      }, []);

    const fields = [
        {name: 'id', label:'Id'}, 
        {name:'task',label:'Task'}, 
        {name:'body', label:'Body'},
        {name:'estimated_time', label:'Estimated_time'}, 
        {name:'createdAt', label:'Creation time '}];
    
    return (
      
        <div className="container text-primary-emphasis bg-primary-subtle border border-primary-subtle p-5 rounded text-center  mt-5 mb-5">
            <h1 className="mt-5 fw-bolder text-primary "> User&apos;s Todos </h1>
            <a className="btn btn-success bi-journal-plus" href="/todos/create">Create new todo</a>
            <div className="table-responsive my-5">
                <Table caption={'Todos'} fields={fields} rows={todos} resourceName='/todos'></Table>
            </div>
            <button type="button" className="btn btn-primary" onClick={getAllTodos}>Refresh</button>
            {error && <p className="text-danger">{error}</p>}
        </div>
      
    );
};
export default Todos;