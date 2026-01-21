
import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            axios.get("/user", {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => setUser(res.data))
                .catch(() => logout());
        }
    }, [token]);


    const login = async (email, password) => {
        const res = await axios.post("/login", { email, password });
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
    };

    const logout = async () => {
        await axios.post("/logout", {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}