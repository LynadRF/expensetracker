import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import useAuthRedirect from "../hooks/useAuthRedirect";
import requestAPI from "../api";
import "../styles/Auth.css";

export default function Register() {
    useAuthRedirect("/");
    const [formValues, setFormValues] = useState({
        email: "",
        username: "",
        password: "",
    });

    const getIsFormValid = () => {
        return formValues.email && formValues.username && formValues.password;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleRegister = () => {
        const fetch = async () => {
            const response = await requestAPI("POST", "/user/register", formValues);
            const result = await response.json();
            console.log(result);
        };
        fetch();
    };

    return (
        <>
            <div className="auth-container">
                <div className="auth">
                    <fieldset>
                        <h1>Register</h1>
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
                            <label className="auth-label">Username</label>
                            <div className="auth-input">
                                <FontAwesomeIcon className="auth-icon" icon={faUser} />
                                <input
                                    className="auth-input-field"
                                    name="username"
                                    value={formValues.username}
                                    type="text"
                                    onChange={handleInputChange}
                                    placeholder="Username"
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
                            <button className="auth-btn" disabled={!getIsFormValid()} onClick={() => handleRegister()}>
                                Confirm
                            </button>
                        </div>
                    </fieldset>
                    <Link to="/login">Already have an account? Log in here!</Link>
                </div>
            </div>
        </>
    );
}
