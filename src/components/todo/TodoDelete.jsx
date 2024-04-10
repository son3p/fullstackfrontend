import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get params from the router
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Todo.css';

import UserService from '../../services/UserService.js'

import schema from './todoValidationSchema.js'

const TodoDelete = () => {
    const {todoId} = useParams()
    const [responseMessage, setResponseMessage] = useState();

    // The 'location' of the the link, gives us an possibility to get some data associated with the link we came from to this component
    const location = useLocation()
    // We get the state, ie the given note to edit and store that as the first currentNote
    const [currentTodo] = useState(location.state)

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    })

    // doUpdate is the one called by the forms handleSubmit
    const doDelete = async (formData) => {

        try {
            const response = await UserService.removeTodo(todoId, formData);
            // Show message and wait 3 second before going back
            setResponseMessage(response.data.message)

            setTimeout(() => {
                navigate("/todos");
            }, 3000)


        } catch (error) {
            // Show  message and wait 3 second before going back
            // In error response we have the response from the server, in error.message we get what axios thinks happened, lastly we try to just stringify the error
            const errortext = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            setResponseMessage(errortext)

            setTimeout(() => {
                // Go back
                navigate(-1);
            }, 3000)
        }
    }

    // We use the name handleCancel, IF the handler requires a chain we would add that as a callback 
    // with a doXyz name, ie the real doer so to speak! 
    // But do seldom see that need in own code, mostly when using validating or some other middleware code in between.
    const handleCancel = (e) => {
        e.preventDefault();
        // Go back
        navigate(-1);
    }

    return (
        <>
            <div className="col-md-12">
                <div className="card card-container">
                    <h1>Delete todo</h1>
                    <form onSubmit={handleSubmit(doDelete)}>
                        <div className="form-group">
                            <label htmlFor="task">Task</label>
                            <input type="text" {...register("task")} defaultValue={currentTodo.task} readOnly/>
                            {errors?.task && <label className="error-feedback">{errors.task.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <input type="text" {...register("priority")} defaultValue={currentTodo.priority} readOnly/>
                            {errors?.priority && <label className="error-feedback">{errors.priority.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="estimated_time">Estimated time</label>
                            <input type="number" {...register("estimated_time")} defaultValue={currentTodo.estimated_time} readOnly/>
                            {errors?.estimated_time && <label className="error-feedback">{errors.estimated_time.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="deadline">Deadline</label>
                            <input type="number" {...register("deadline")} defaultValue={currentTodo.deadline} readOnly/>
                            {errors?.deadline && <label className="error-feedback">{errors.deadline.message}</label>}
                        </div>
                        <p></p>
                        <div className="form-group d-flex justify-content-between">
                            <button className="btn btn-primary btn-block" >
                                Delete
                            </button>
                            <button onClick={handleCancel} className="btn btn-secondary btn-block">
                                Cancel
                            </button>
                        </div>
                    </form>
                    <p></p>
                    {responseMessage && (
                        <div className="alert alert-success" >
                            {responseMessage}
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default TodoDelete;