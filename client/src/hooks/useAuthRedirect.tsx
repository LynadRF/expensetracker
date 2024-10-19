import { useEffect } from "react";
import requestAPI from "../api";
import { useNavigate } from "react-router-dom";

export default function useAuthRedirect(loggedIn: string = "", loggedOut: string = "") {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthentication = async () => {
            try {
                const response = await requestAPI("GET", "/user/authenticate");
                console.log(response);
                if (response.ok) navigate(loggedIn);
                else navigate(loggedOut);
            } catch (error) {
                console.error("Error redirecting:", error);
            }
        };
        fetchAuthentication();
    }, [navigate, loggedIn, loggedOut]);
}
