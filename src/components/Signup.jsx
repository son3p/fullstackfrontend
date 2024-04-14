import { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "bootstrap/dist/css/bootstrap.min.css";
import './css/Auth.css';
import Footer from "./Footer";


import AuthService from "../services/AuthService";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required!")
    .min(2, "Must be at least 2 characters!")
    .max(50, "Must be less then 50 characters!"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Email is invalid!")
    .max(100, "Must be maximum 100 characters!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Must be at least 6 characters!")
    .max(40, "Must be maximum 40 characters!"),
});

const Signup = () => {
  const [responseMessage, setResponseMessage] = useState();

  // we like to use the reset form method, the registration of the handlers for a element ( for example for onChange, onBlur and so), connect the handling of submit and to receive the errors, and lastly use the yup schema to resolv the input compared to the schema
  // The resolvment should happen when input changed, ie BEFORE the submit in this case-
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  const doSignup = async (formData) => {
    try {
      const result = await AuthService.register(formData)
      setResponseMessage(result.message)
      reset();
      return

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  return (
    <>
    <div className="m-4 " style={{ fontFamily: 'Courier New' }}>
        <h1 >Register</h1>
        <hr />
        <h3>Register to use application!</h3>
      </div>
      <div className="col-md-12">
        <div className="card card-container border border-dark  border-4 rounded card-5 fw-bold ">
          <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" className="profile-img-card" />
          { !responseMessage && (
  
          <form onSubmit={handleSubmit(doSignup)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" {...register("username")} className="form-control bg-light border border-dark" />
              {errors?.username && <label className="error-feedback">{errors.username.message}</label>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" {...register("email")} className="form-control bg-light border border-dark" />
              {errors?.email && <label className="error-feedback">{errors.email.message}</label>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} className="form-control bg-light border border-dark"/>
              {errors?.password && <label className="error-feedback">{errors.password.message}</label>}
            </div>
            <p></p>
            <div className="form-group">
              <button className="btn btn-dark border border-2 border-dark  button-1" >
                Sign Up
              </button>
            </div>
          </form>
          )}
          <p></p>
          { responseMessage && (
            <div className="alert alert-success" >
              {responseMessage}
            </div>)
          }
        </div>
      </div>
      <div className="mt-5">
            <Footer name="Website Made By: Hugo, Kim & Ella. Year 2024. Class: INF23F-Å." styling="text-light text-center border border-dark  p-3"></Footer>
        </div> 
    </>
  )
}

export default Signup;