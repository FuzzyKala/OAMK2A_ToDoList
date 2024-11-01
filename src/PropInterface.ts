import { Dispatch, SetStateAction } from "react";

export interface Task {
  id: number;
  description: string;
}

export interface User {
  email: string;
  password: string;
  token?: string;
}

export interface UserContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
}

export interface AxiosError {
  response?: {
    data: {
      error: string;
    };
  };
}

export interface AuthenticationProps {
  mode: "Login" | "Register";
}
