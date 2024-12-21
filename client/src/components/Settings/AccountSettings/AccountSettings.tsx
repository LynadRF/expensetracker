import { useState } from "react";
import { createPortal } from "react-dom";
import { useUser } from "../../../contexts/userContext";
import Modal from "../../Modal/Modal";
import "./AccountSettings.css";
import requestAPI from "../../../api";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
    const { userState, userDispatch } = useUser();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        username: "",
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const [changeEmailIsOpen, setChangeEmailIsOpen] = useState(false);
    const handleEmailChange = () => {
        const fetch = async () => {
            const response = await requestAPI("POST", "/user/change-email", {
                newEmail: formValues.email,
                password: formValues.password,
            });
            const result = await response.json();
            if (response.ok) {
                userDispatch({
                    type: "UPDATE",
                    userInfo: { ...userState, email: result.data },
                });
                setChangeEmailIsOpen(false);
            }
            console.log(result);
        };
        fetch();
    };
    const changeEmailModel = (
        <>
            {createPortal(
                <Modal
                    setIsOpen={setChangeEmailIsOpen}
                    children={
                        <>
                            <h2 style={{ color: "var(--color5)" }}>Change Email</h2>
                            <div className="account-settings-modal-row">
                                <label className="account-settings-label">New email</label>
                                <input
                                    className="account-settings-input"
                                    name="email"
                                    type="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="account-settings-modal-row">
                                <label className="account-settings-label">Password</label>
                                <input
                                    className="account-settings-input"
                                    name="password"
                                    type="password"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="account-settings-btn-div">
                                <button
                                    className="settings-btn settings-btn-hover-green"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={handleEmailChange}
                                >
                                    Change
                                </button>
                                <button
                                    className="settings-btn settings-btn-hover-red"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={() => setChangeEmailIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    }
                />,
                document.getElementById("root") || document.body
            )}
        </>
    );

    const [changeUsernameIsOpen, setChangeUsernameIsOpen] = useState(false);
    const handleChangeUsername = () => {
        const fetch = async () => {
            const response = await requestAPI("POST", "/user/change-username", { newUsername: formValues.username });
            const result = await response.json();
            if (response.ok) {
                userDispatch({ type: "UPDATE", userInfo: { ...userState, username: result.data } });
                setChangeUsernameIsOpen(false);
            }
            console.log(result);
        };
        fetch();
    };
    const changeUsernameModal = (
        <>
            {createPortal(
                <Modal
                    setIsOpen={setChangeUsernameIsOpen}
                    children={
                        <>
                            <h2 style={{ color: "var(--color5)" }}>Change Username</h2>
                            <div className="account-settings-modal-row">
                                <label className="account-settings-label">New username</label>
                                <input
                                    className="account-settings-input"
                                    name="username"
                                    type="text"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="account-settings-btn-div">
                                <button
                                    className="settings-btn settings-btn-hover-green"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={handleChangeUsername}
                                >
                                    Change
                                </button>
                                <button
                                    className="settings-btn settings-btn-hover-red"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={() => setChangeUsernameIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    }
                />,
                document.getElementById("root") || document.body
            )}
        </>
    );

    const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false);
    const handleChangePassword = () => {
        const fetch = async () => {
            if (formValues.newPassword !== formValues.newPasswordRepeat) return;
            const response = await requestAPI("POST", "/user/change-password", {
                oldPassword: formValues.oldPassword,
                newPassword: formValues.newPassword,
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) setChangePasswordIsOpen(false);
        };
        fetch();
    };
    const changePasswordModal = (
        <>
            {createPortal(
                <Modal
                    setIsOpen={setChangePasswordIsOpen}
                    children={
                        <>
                            <h2 style={{ color: "var(--color5)" }}>Change Password</h2>
                            <div className="account-settings-modal-row">
                                <label className="account-settings-label">Old password</label>
                                <input
                                    className="account-settings-input"
                                    name="oldPassword"
                                    type="password"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="account-settings-modal-row">
                                <label className="account-settings-label">New password</label>
                                <input
                                    className="account-settings-input"
                                    name="newPassword"
                                    type="password"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="account-settings-modal-row">
                                <label className="account-settings-label">Repeat new password</label>
                                <input
                                    className="account-settings-input"
                                    name="newPasswordRepeat"
                                    type="password"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="account-settings-btn-div">
                                <button
                                    className="settings-btn settings-btn-hover-green"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={handleChangePassword}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="settings-btn settings-btn-hover-red"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={() => setChangePasswordIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    }
                />,
                document.getElementById("root") || document.body
            )}
        </>
    );

    const [logoutIsOpen, setLogoutIsOpen] = useState(false);
    const handleLogout = () => {
        const fetch = async () => {
            const response = await requestAPI("POST", "/user/logout");
            if (response.ok) {
                navigate("/login");
            }
        };
        fetch();
    };
    const logoutModal = (
        <>
            {createPortal(
                <Modal
                    setIsOpen={setLogoutIsOpen}
                    children={
                        <>
                            <h2 style={{ color: "var(--color5)" }}>Are you sure?</h2>
                            <div className="account-settings-btn-div">
                                <button
                                    className="settings-btn settings-btn-hover-red"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                                <button
                                    className="settings-btn settings-btn-hover-red"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={() => setLogoutIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    }
                />,
                document.getElementById("root") || document.body
            )}
        </>
    );

    const [deleteAccountIsOpen, setDeleteAccountIsOpen] = useState(false);
    const handleAccountDeletion = () => {
        const fetch = async () => {
            const response = await requestAPI("DELETE", "/user/delete", { password: formValues.password });
            if (response.ok) {
                navigate("/login");
                localStorage.clear();
            }
        };
        fetch();
    };
    const deleteAccountModal = (
        <>
            {createPortal(
                <Modal
                    setIsOpen={setDeleteAccountIsOpen}
                    children={
                        <>
                            <h2 style={{ color: "var(--color5)", marginBottom: "0" }}>Are you sure?</h2>
                            <h3 style={{ color: "var(--color_red)" }}>This action is irreversible</h3>
                            <div className="account-settings-modal-row">
                                <label className="account-settings-label">Password</label>
                                <input
                                    className="account-settings-input"
                                    name="password"
                                    type="password"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="account-settings-btn-div">
                                <button
                                    className="settings-btn settings-btn-hover-red"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={handleAccountDeletion}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="settings-btn settings-btn-hover-red"
                                    style={{ fontSize: "max(12px, 0.9vw)" }}
                                    onClick={() => setDeleteAccountIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    }
                />,
                document.getElementById("root") || document.body
            )}
        </>
    );

    return (
        <>
            <div className="account-settings-1">
                <h3 className="settings-h3">My Account</h3>
                <div className="my-account-container">
                    <label className="my-account-label">EMAIL:</label>
                    <div className="my-account-row">
                        <div>{userState.email}</div>
                        <button
                            className="settings-btn my-account-edit-btn settings-btn-hover-blue"
                            onClick={() => setChangeEmailIsOpen(true)}
                        >
                            Edit
                        </button>
                    </div>
                    <label className="my-account-label">USERNAME:</label>
                    <div className="my-account-row">
                        <div>{userState.username}</div>
                        <button
                            className="settings-btn my-account-edit-btn settings-btn-hover-blue"
                            onClick={() => setChangeUsernameIsOpen(true)}
                        >
                            Edit
                        </button>
                    </div>
                    <label className="my-account-label">CREATED AT:</label>
                    <div className="my-account-row">
                        <div>{userState.createdAt}</div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="settings-h3">Security and Password</h3>
                <div className="password-settings-container">
                    <button
                        className="settings-btn settings-btn-hover-blue"
                        onClick={() => setChangePasswordIsOpen(true)}
                    >
                        Change Password
                    </button>
                    <button className="settings-btn my-account-btn-red-hl" onClick={() => setLogoutIsOpen(true)}>
                        Logout
                    </button>
                </div>
            </div>
            <div>
                <h3 className="settings-h3">Permanent Actions</h3>
                <button className="my-account-delete-btn" onClick={() => setDeleteAccountIsOpen(true)}>
                    Delete Account
                </button>
            </div>
            {changeEmailIsOpen && changeEmailModel}
            {changeUsernameIsOpen && changeUsernameModal}
            {changePasswordIsOpen && changePasswordModal}
            {logoutIsOpen && logoutModal}
            {deleteAccountIsOpen && deleteAccountModal}
        </>
    );
}
