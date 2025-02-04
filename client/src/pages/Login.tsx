import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useUser } from "../contexts/userContext";
import requestAPI from "../api";
import "../styles/Auth.css";

export default function Login() {
    useAuthRedirect("/");
    const { userDispatch } = useUser();

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const getIsFormValid = () => {
        return formValues.email && formValues.password;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const navigate = useNavigate();
    const handleLogin = () => {
        const fetch = async () => {
            const response = await requestAPI("POST", "/user/login", formValues);
            const result = await response.json();
            if (response.ok) {
                userDispatch({
                    type: "UPDATE",
                    userInfo: result.data,
                });
                navigate("/");
            }
        };
        fetch();
    };

    return (
        <>
            <div className="auth-container">
                <div className="auth">
                    <fieldset className="auth-fieldset">
                        <h1>Login</h1>
                        <div className="auth-div">
                            <label className="auth-label">E-Mail</label>
                            <div className="auth-input">
                                <FontAwesomeIcon className="auth-icon" icon={faEnvelope} />
                                <input
                                    className="auth-input-field"
                                    name="email"
                                    value={formValues.email}
                                    type="email"
                                    onChange={handleInputChange}
                                    placeholder="E-Mail"
                                ></input>
                            </div>
                        </div>
                        <div className="auth-div">
                            <label className="auth-label">Password</label>
                            <div className="auth-input">
                                <FontAwesomeIcon className="auth-icon" icon={faKey} />
                                <input
                                    className="auth-input-field"
                                    name="password"
                                    value={formValues.password}
                                    type="password"
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                ></input>
                            </div>
                        </div>
                        <div className="auth-div">
                            <button className="auth-btn" disabled={!getIsFormValid()} onClick={() => handleLogin()}>
                                Confirm
                            </button>
                        </div>
                    </fieldset>
                    <Link className="auth-link" to="/register">
                        Don't have an account? Register here!
                    </Link>
                </div>
            </div>
        </>
    );
}
