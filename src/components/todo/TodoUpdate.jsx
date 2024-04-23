import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get params from the router
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Todo.css';

import UserService from '../../services/UserService.js'

import schema from './todoValidationSchema.js'

const TodoUpdate = () => {
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
    const doUpdate = async (formData) => {

        try {
            const response = await UserService.changeTodoForUser(todoId, formData);
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
                <div className="card card-container card-9 fw-bold">
                    <h1>Edit todo</h1>
                    <form onSubmit={handleSubmit(doUpdate)}>
                        <div className="form-group">
                            <label htmlFor="todo">Todo</label>
                            <input type="text" {...register("todo")} defaultValue = {currentTodo.todo} className="form-control bg-light border border-dark"/>
                            {errors?.todo && <label className="error-feedback">{errors.todo.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input type="text" {...register("category")} defaultValue = {currentTodo.category} className="form-control bg-light border border-dark"/>
                            {errors?.category && <label className="error-feedback">{errors.category.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <input type="text" {...register("status")} defaultValue = {currentTodo.status} className="form-control bg-light border border-dark"/>
                            {errors?.status && <label className="error-feedback">{errors.status.message}</label>}
                        </div>
                        <p></p>
                        <div className="form-group d-flex justify-content-between">
                            
                            <button onClick={handleCancel} className="btn btn-dark border border-2 border-dark button-10 btn-block">
                                Cancel
                            </button>
                            <button className="btn btn-dark border border-2 border-dark button-9 btn-block" >
                                Update
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

export default TodoUpdate;