import { useState } from "react";
import { Currency } from "../../../types/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ApplicationSettings.css";

export default function ApplicationSettings() {
    const currentCurrency: string = localStorage.getItem("currency-symbol") || "Euro";
    const [currency, setCurrency] = useState<string>(currentCurrency);

    const setCurrencyLocalStorage = () => {
        localStorage.setItem("currency-symbol", currency);
    };

    const [newCategoryName, setNewCategoryName] = useState<string>("");

    const categoryStorage: string = localStorage.getItem("custom-categories") || "[]";
    const [customCategories, setCustomCategories] = useState<string[]>(JSON.parse(categoryStorage));

    const handleAddCustomCategory = () => {
        if (newCategoryName && !customCategories.includes(newCategoryName)) {
            setCustomCategories([...customCategories, newCategoryName]);
            localStorage.setItem("custom-categories", JSON.stringify([...customCategories, newCategoryName]));
        }
    };

    const handleDeleteCustomCategory = (categoryIndex: number) => {
        const filteredCustomCategory = customCategories.filter((_category, index) => index !== categoryIndex);
        setCustomCategories(filteredCustomCategory);
        localStorage.setItem("custom-categories", JSON.stringify(filteredCustomCategory));
    };

    const renderCustomCategories = () => {
        return (
            <>
                <div className="custom-categories-li-container">
                    <h5 className="application-settings-h5" style={{ marginTop: "1vh" }}>
                        Your custom categories:
                    </h5>
                    <li className="custom-categories-li">
                        {customCategories.map((category, index) => (
                            <div className="custom-category-ul-container" key={index}>
                                <ul className="custom-categories-ul">{category}</ul>
                                <button
                                    className="custom-category-delete-btn"
                                    onClick={() => handleDeleteCustomCategory(index)}
                                >
                                    <FontAwesomeIcon style={{ fontSize: "max(1vw, 12px)" }} icon={faTrash} />
                                </button>
                            </div>
                        ))}
                    </li>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="application-settings">
                <h3 className="settings-h3">Currency Symbol</h3>
                <div className="currency-container">
                    <select className="currency-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        {Object.values(Currency)
                            .filter((key) => isNaN(Number(key)))
                            .map((item, index) => (
                                <option className="currency-option" key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                    </select>
                    <button
                        className="settings-btn settings-btn-hover-blue"
                        style={{ marginLeft: "2vw" }}
                        onClick={setCurrencyLocalStorage}
                    >
                        Confirm
                    </button>
                </div>
            </div>
            <div className="application-settings">
                <h3 className="settings-h3">Custom Categories</h3>
                <div className="custom-categories-container">
                    <h5 className="application-settings-h5">Add custom category:</h5>
                    <div className="custom-categories-add">
                        <input
                            type="text"
                            className="custom-categories-input"
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <button
                            onClick={handleAddCustomCategory}
                            className="settings-btn settings-btn-hover-green"
                            style={{ marginLeft: "2vw" }}
                        >
                            Add
                        </button>
                    </div>
                    {customCategories.length > 0 ? (
                        <>{renderCustomCategories()}</>
                    ) : (
                        <>
                            <h5 className="application-settings-h5" style={{ marginTop: "1vh" }}>
                                Your custom categories:
                            </h5>
                            <p style={{ margin: "max(1vh,5px) 0", fontSize: "max(0.8vw, 10px)" }}>
                                You haven't added any custom categories
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
