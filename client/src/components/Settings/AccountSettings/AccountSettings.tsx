import { useUser } from "../../../contexts/userContext";
import "./AccountSettings.css";

export default function AccountSettings() {
    const { userState } = useUser();
    return (
        <div className="account-settings-container">
            <div className="account-settings-1">
                <h3 className="account-settings-h3">My Account</h3>
                <div className="my-account-container">
                    <label className="my-account-label">EMAIL:</label>
                    <div className="my-account-row">
                        <div>{userState.email}</div>
                        <button className="my-account-btn my-account-edit-btn">Edit</button>
                    </div>
                    <label className="my-account-label">USERNAME:</label>
                    <div className="my-account-row">
                        <div>{userState.username}</div>
                        <button className="my-account-btn my-account-edit-btn">Edit</button>
                    </div>
                    <label className="my-account-label">CREATED AT:</label>
                    <div className="my-account-row">
                        <div>{userState.createdAt} UTC</div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="account-settings-h3">Security and Password</h3>
                <div className="password-settings-container">
                    <button className="my-account-btn">Change Password</button>
                    <button className="my-account-btn my-account-btn-red-hl">Logout</button>
                </div>
            </div>
            <div>
                <h3 className="account-settings-h3">Permanent Actions</h3>
                <button className="my-account-delete-btn">Delete Account</button>
            </div>
        </div>
    );
}
