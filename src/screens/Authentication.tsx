import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authentication.css";
import { useUser } from "../context/useUser";
import { AxiosError, AuthenticationProps } from "../PropInterface";

export const AuthenticationMode = Object.freeze({
  Login: "Login",
  Register: "Register",
});

export default function Authentication({ mode }: AuthenticationProps) {
  const { user, setUser, signUp, signIn } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (mode === AuthenticationMode.Register) {
        await signUp();
        navigate("/signin");
      } else {
        await signIn();
        navigate("/");
      }
    } catch (error) {
      const message =
        (error as AxiosError)?.response?.data?.error ||
        "An unexpected error occurred.";
      alert(message);
    }
  };

  return (
    <div>
      <h3>{mode === AuthenticationMode.Login ? "Sign in" : "Sign up"}</h3>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email </label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div>
          <button>
            {mode === AuthenticationMode.Login ? "Sign in" : "Sign up"}
          </button>
        </div>
        <div>
          <Link to={mode === AuthenticationMode.Login ? "/signup" : "/signin"}>
            {mode === AuthenticationMode.Login
              ? "No account? Sign up"
              : "Already signed up? Sign in"}
          </Link>
        </div>
      </form>
    </div>
  );
}
