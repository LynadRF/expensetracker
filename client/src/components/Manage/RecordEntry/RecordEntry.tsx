import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign, faPlus } from "@fortawesome/free-solid-svg-icons";
import requestAPI from "../../../api";
import "./RecordEntry.css";

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

export default function RecordEntry() {
    const currency = <FontAwesomeIcon className="recordentry-currency-icon" icon={faEuroSign} />;
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
        };
        fetch();
    };

    return (
        <>
            <div className="recordentry-container">
                <fieldset className="recordentry-fieldset">
                    <div className="recordentry-description">
                        <input
                            className="recordentry-description-input"
                            name="description"
                            type="text"
                            placeholder="Activity, e.g. 'Monthly apartment rent'"
                            onChange={handleInputChange}
                        ></input>
                    </div>
                    <div className="recordentry-amount">
                        <input
                            className="recordentry-amount-input"
                            name="amount"
                            type="number"
                            placeholder="e.g. 600,00"
                            onChange={handleInputChange}
                        ></input>
                        {currency}
                    </div>
                    <div className="recordentry-category">
                        <select className="recordentry-category-select" onChange={handleChange}>
                            {Object.values(Categories)
                                .filter((key) => isNaN(Number(key)))
                                .map((item, index) => (
                                    <option className="recordentry-category-option" key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="recordentry-add">
                        <button className="recordentry-add-btn" onClick={handleAddClick}>
                            <FontAwesomeIcon className="recordentry-add-icon" icon={faPlus} />
                        </button>
                    </div>
                </fieldset>
            </div>
        </>
    );
}