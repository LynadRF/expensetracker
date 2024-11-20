import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faHouse, faList, faChartSimple, faGear } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

export default function Sidebar() {
    const sidebarData: { name: string; route: string; image: ReactElement }[] = [
        { name: "Dashboard", route: "/dashboard", image: <FontAwesomeIcon icon={faHouse} /> },
        { name: "Manage", route: "/records/manage", image: <FontAwesomeIcon icon={faList} /> },
        { name: "Statistics", route: "/records/statistics", image: <FontAwesomeIcon icon={faChartSimple} /> },
        { name: "Settings", route: "/settings", image: <FontAwesomeIcon icon={faGear} /> },
    ];

    return (
        <>
            <nav className="sidebar-container">
                <div className="sidebar-app">
                    <div className="app-icon">
                        <FontAwesomeIcon icon={faWallet} />
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
