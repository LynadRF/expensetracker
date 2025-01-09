import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import requestAPI from "../api";
import { useUser } from "../contexts/userContext";

export default function useAuthRedirect(loggedIn: string = "", loggedOut: string = "") {
    const { userState, userDispatch } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthentication = async () => {
            try {
                const response = await requestAPI("GET", "/user/authenticate");
                const result = await response.json();
                if (response.ok) {
                    userDispatch({ type: "UPDATE", userInfo: result.data });
                    if (loggedIn) navigate(loggedIn); // if loggedIn = "" do not redirect
                } else if (loggedOut) navigate(loggedOut);
            } catch (error) {
                console.error("Error redirecting:", error);
            }
        };
        if (!userState.email && !userState.username) fetchAuthentication();
    }, [navigate, loggedIn, loggedOut, userDispatch, userState]);
}
