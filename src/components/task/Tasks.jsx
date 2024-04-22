import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 
import UserService from '../../services/UserService.js';
import Footer from "../Footer.jsx";
import { Link } from 'react-router-dom'
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

    const rows = tasks

    return (
        <>
        <div className='list-container'>
        <div className="list-group">
          <div className="row">
            {rows.map((row, rowKey) => (
              <div key={rowKey} className="col-md-6 mb-3">
                <li className="list-group-item border border-dark rounded">
                  <div>
                    {fields.map((field, fieldKey) => (
                      <div key={fieldKey}>
                        <strong>{field.label}</strong>: {row[field.name]}
                      </div>
                    ))}
                    <div className=" mt-2">
                      <Link className="btn btn-dark border border-2 border-dark  button-6" to={`${row.id}/update`} state={row}>Update</Link>
                      <Link className="btn btn-dark border border-2 border-dark  button-6" to={`${row.id}/delete`} state={row}>delete</Link>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </div>
        </div>
      </div>
        </>
    );
};

export default Tasks;