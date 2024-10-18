import { Link } from "react-router-dom";
import "./Sidebar.css";
import { ReactElement } from "react";

export default function Sidebar() {
    const sidebarData: { name: string; route: string; image: ReactElement }[] = [
        { name: "Home", route: "/home", image: <i className="bx bx-home"></i> },
        { name: "Manage", route: "/manage", image: <i className="bx bx-list-ul"></i> },
        { name: "Statistics", route: "/statistics", image: <i className="bx bx-stats"></i> },
        { name: "Settings", route: "/settings", image: <i className="bx bx-cog"></i> },
    ];
    return (
        <>
            <nav className="sidebar-container">
                <div className="sidebar-app">
                    <div className="app-icon">
                        <i className="bx bx-wallet"></i>
                    </div>
                    <p className="app-text-long">BudgetTracker</p>
                    <p className="app-text-short">BTracker</p>
                </div>
                <ul className="sidebar-ul">
                    {sidebarData.map((item, index) => (
                        <li className="sidebar-item" key={index}>
                            <Link className="sidebar-link" to={item.route}>
                                <div className="sidebar-link-icon">{item.image}</div>
                                <div className="sidebar-link-text">{item.name}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
