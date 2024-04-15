import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Footer from "./Footer";

import "bootstrap/dist/css/bootstrap.min.css";


import AuthService from "../services/AuthService";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required!")
    .min(2, "Must be at least 2 characters!")
    .max(50, "Must be less then 50 characters!"),
  password: yup
    .string()
    .required("Password is required!")
});


const Signin = () => {
  const [responseMessage, setResponseMessage] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  const doSignin = async (formData) => {

    try {
      const result = await AuthService.login(formData)
      setResponseMessage(result.message)
      navigate("/profile");


    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <> 
      <div className="m-4 " style={{ fontFamily: 'Courier New' }}>
        <h1 >Login</h1>
        <hr />
        <h3>Sign in to handle your Todos!</h3>
      </div>
      <div className="col-md-12">
        <div className="card card-container border border-dark  border-4 rounded card-6 fw-bold">
          <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" className="profile-img-card" />
          <form onSubmit={handleSubmit(doSignin)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" {...register("username")} className="form-control bg-light border border-dark" />
              {errors?.username && <label className="error-feedback">{errors.username.message}</label>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} className="form-control bg-light border border-dark" />
              {errors?.password && <label className="error-feedback">{errors.password.message}</label>}
            </div>
            <p></p>
            <div className="form-group">
              <button className="btn btn-dark border border-2 border-dark  btn-block button-2" >
                Sign In
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
      <div className="mt-5">
        <Footer name="Website Made By: Hugo, Kim & Ella. Year 2024. Class: INF23F-Å." styling="text-light text-center border border-dark  p-3"></Footer>
      </div>
    </>
  )
}

export default Signin;