import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign, faPlus } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar/Sidebar";
import requestAPI from "../api";
import RecordList from "../components/RecordList/RecordList";
import "../styles/Manage.css";
import "../styles/BudgetEntry.css";

enum Categories {
    "Rent",
    "Home",
    "Utilities",
    "Transport",
    "Groceries",
    "Dining",
    "Leisure",
    "Pets",
    "Other",
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
                <div className="manage-page">
                    <h1>Management</h1>
                    <BudgetEntry />
                    <RecordList />
                </div>
            </main>
        </>
    );
}

type Record = {
    description: string;
    amount: number;
    category: string;
    created_at: string;
};

function BudgetEntry() {
    const currency = <FontAwesomeIcon className="be-currency-icon" icon={faEuroSign} />;
    const [entries, setEntries] = useState<Record[]>([]);
    const [formValues, setFormValues] = useState({
        description: "",
        amount: 0,
        category: "Rent",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues((prevState) => ({ ...prevState, category: e.target.value }));
    };

    const handleAddClick = () => {
        const fetch = async () => {
            const response = await requestAPI("POST", "/record/add", formValues);
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                setEntries((prevState) => ({ ...prevState, formValues }));
            }
        };
        fetch();
    };

    return (
        <>
            <div className="be-container">
                <fieldset className="be-fieldset">
                    <div className="be-description">
                        <input
                            className="be-description-input"
                            name="description"
                            type="text"
                            placeholder="Activity, e.g. 'Monthly apartment rent'"
                            onChange={handleInputChange}
                        ></input>
                    </div>
                    <div className="be-amount">
                        <input
                            className="be-amount-input"
                            name="amount"
                            type="number"
                            placeholder="e.g. 600,00"
                            onChange={handleInputChange}
                        ></input>
                        {currency}
                    </div>
                    <div className="be-category">
                        <select className="be-category-select" onChange={handleChange}>
                            {Object.values(Categories)
                                .filter((key) => isNaN(Number(key)))
                                .map((item, index) => (
                                    <option className="be-category-option" key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="be-add">
                        <button className="be-add-btn" onClick={handleAddClick}>
                            <FontAwesomeIcon className="be-add-icon" icon={faPlus} />
                        </button>
                    </div>
                </fieldset>
            </div>
        </>
    );
}
