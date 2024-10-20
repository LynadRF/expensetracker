import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign, faPlus } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/BudgetEntry.css";

enum Categories {
    Rent,
    Utilities,
    Transport,
    Groceries,
    Dining,
    Leisure,
    Home,
    Pets,
    Other,
}

enum Currencies {
    EUR,
    USD,
}

export default function Manage() {
    return (
        <>
            <Sidebar />
            <main>
                <h1>Management</h1>
                <BudgetEntry />
            </main>
        </>
    );
}

function BudgetEntry() {
    const currency = <FontAwesomeIcon className="be-currency-icon" icon={faEuroSign} />;
    return (
        <>
            <div className="be-container">
                <fieldset className="be-fieldset">
                    <div className="be-description">
                        <input className="be-description-input" type="text"></input>
                    </div>
                    <div className="be-amount">
                        <input className="be-amount-input" type="number"></input>
                        {currency}
                    </div>
                    <div className="be-category">
                        <select className="be-category-select">
                            {Object.values(Categories)
                                .filter((key) => isNaN(Number(key)))
                                .map((item, index) => (
                                    <option className="be-category-option" value={index}>
                                        {item}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="be-add">
                        <button className="be-add-btn">
                            <FontAwesomeIcon className="be-add-icon" icon={faPlus} />
                        </button>
                    </div>
                </fieldset>
            </div>
        </>
    );
}
