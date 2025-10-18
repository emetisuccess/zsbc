import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider"
import toast from "react-hot-toast";

export default function GoogleSuccess() {
    const { setUser, setToken } = useStateContext();
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const encrypted = urlParams.get("data");
        if (encrypted) {
            // Send encrypted data to backend to decrypt securely
            fetch(`${import.meta.env.VITE_BASE_URL}/user/decrypt-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ encrypted }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.res.token) {
                        toast.success("Successfully Authenticated!", { "id": 3 });
                        setToken(data.res.token);
                        setUser(data.res.user);
                        navigate("/");
                    }
                });
        } else {
            toast.error("Not Authenticated, Try Again!", { "id": 4 });
            navigate("/");
        }
    }, [location, navigate, setUser, setToken]);

    return <p className="text-[#0061a1] text-2xl font-bold">Authenticating...</p>;
}
