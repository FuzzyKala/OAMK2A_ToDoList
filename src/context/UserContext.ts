import { createContext } from "react";
import { UserContextType } from "../PropInterface";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
