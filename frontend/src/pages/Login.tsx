/** @format */

// import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";

function Login() {
  return (
    <div className="my-24 flex items-center justify-center">
      <div className="form-container">
        <h2 className="text-3xl text-center flex flex-col gap-4">
          Login to
          <span className="text-6xl font-train-one text-brand-red">MFLIX</span>
        </h2>

        <LoginForm />

        <div className="text-xl text-center space-y-1">
          <p>
            <Link to="/forgot-password" className="link">
              Forgot password?
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
