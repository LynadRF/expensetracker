import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRecords } from "../../../contexts/recordContext";
import requestAPI from "../../../api";
import { renderCategoryOptions, renderCurrencyIcon } from "../../../utils/renderHelpers";
import "./RecordEntry.css";

export default function RecordEntry() {
    const { recordDispatch } = useRecords();
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
                const today = new Date();
                recordDispatch({
                    type: "ADD",
                    record: {
                        id: result.data.id,
                        description: formValues.description,
                        amount: formValues.amount,
                        category: formValues.category,
                        created_at: today.toISOString().split("T")[0],
                    },
                });
            }
        };
        fetch();
    };

    return (
        <>
            <div className="recordentry-container">
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
                    {renderCurrencyIcon("recordentry-currency-icon")}
                </div>
                <div className="recordentry-category">
                    <select className="recordentry-category-select" onChange={handleChange}>
                        {renderCategoryOptions({ className: "recordentry-category-option" })}
                    </select>
                </div>
                <div className="recordentry-add">
                    <button className="recordentry-add-btn" onClick={handleAddClick}>
                        <FontAwesomeIcon className="recordentry-add-icon" icon={faPlus} />
                    </button>
                </div>
            </div>
        </>
    );
}
