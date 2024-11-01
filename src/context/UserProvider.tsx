import React, { useState, ReactNode } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

const url = process.env.REACT_APP_URL;

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const userFromSessionStorage = sessionStorage.getItem("user");
  const [user, setUser] = useState(
    userFromSessionStorage
      ? JSON.parse(userFromSessionStorage)
      : { email: "", password: "" }
  );
  const signUp = async () => {
    try {
      const json = JSON.stringify(user);
      const headers = { headers: { "Content-type": "application/json" } };
      await axios.post(`${url}/user/register`, json, headers);
      setUser({ email: "", password: "" });
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signIn = async () => {
    const json = JSON.stringify(user);
    const headers = { headers: { "Content-type": "application/json" } };
    try {
      const res = await axios.post(`${url}/user/login`, json, headers);
      setUser(res.data);
      sessionStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      setUser({ email: "", password: "" });
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
      {children}
    </UserContext.Provider>
  );
}
