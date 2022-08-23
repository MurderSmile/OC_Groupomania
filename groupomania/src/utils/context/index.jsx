import { createContext } from "react";
import { useState } from "react";

export const authContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState('')
    const toggleAuth = () => {}
 
    return (
        <authContext.Provider value={{ auth, toggleAuth }}>
            {children}
        </authContext.Provider>
    )
}