import { createContext, useContext, useState } from "react";

const StateContext = createContext({
	user: null,
	token: null,
	setUser: () => {},
	setToken: () => {},
});

export const ContextProvider = ({ children }) => {
	const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
	const [user, _setUser] = useState(localStorage.getItem("AUTH_USER"));

	const setToken = (token) => {
		_setToken(token);
		if (token) {
			localStorage.setItem("ACCESS_TOKEN", token);
		} else {
			localStorage.removeItem("ACCESS_TOKEN");
		}
	};

	const setUser = (user) => {
		_setUser(user);
		if (user) {
			localStorage.setItem("AUTH_USER", JSON.stringify(user));
		} else {
			localStorage.removeItem("AUTH_USER");
		}
	};

	return <StateContext value={{ user, token, setUser, setToken }}>{children}</StateContext>;
};
export const useStateContext = () => useContext(StateContext);
