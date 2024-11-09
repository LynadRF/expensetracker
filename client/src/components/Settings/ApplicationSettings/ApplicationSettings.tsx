import { useState } from "react";
import Cookies from "js-cookie";
import { Currency } from "../../../types/enums";
import "./ApplicationSettings.css";

export default function ApplicationSettings() {
    const currentCurrency = Cookies.get("currency-symbol") || "Euro";
    const [currency, setCurrency] = useState(currentCurrency);

    const setCurrencyCookie = () => {
        Cookies.set("currency-symbol", currency);
    };

    return (
        <>
            <div className="application-settings-1">
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
                    <button className="settings-btn" style={{ marginLeft: "2vw" }} onClick={setCurrencyCookie}>
                        Confirm
                    </button>
                </div>
            </div>
        </>
    );
}
