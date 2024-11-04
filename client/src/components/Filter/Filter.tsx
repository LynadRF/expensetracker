import { useState } from "react";
import { useRecords } from "../../contexts/recordContext";
import { parseDate } from "../../utils/parseData";
import requestAPI from "../../api";
import "./Filter.css";

export default function Filter() {
    const { recordDispatch } = useRecords();

    const [formValues, setFormValues] = useState({
        from: "",
        to: "",
    });

    const applyFilter = () => {
        const fetch = async () => {
            const response = await requestAPI("POST", "/record/records", {
                from: parseDate(formValues.from, "start"),
                to: parseDate(formValues.to, "end"),
                limit: 9999,
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                recordDispatch({ type: "UPDATE", records: result.data });
            }
        };
        fetch();
    };

    const resetFilter = () => {
        const fetch = async () => {
            const response = await requestAPI("POST", "/record/records");
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                recordDispatch({ type: "UPDATE", records: result.data });
            }
        };
        fetch();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Remove any characters that are not digits or slashes
        const formattedValue = value.replace(/[^0-9/]/g, "");

        // Split by slashes to apply further restrictions
        const parts = formattedValue.split("/");

        // Apply restrictions to each part of the date
        switch (parts.length) {
            case 3: // DD/MM/YYYY
                if (parts[0].length > 2 || parts[1].length > 2 || parts[2].length > 4) return;
                break;
            case 2: // MM/YYYY
                if (parts[0].length > 2 || parts[1].length > 4) return;
                break;
            case 1: // YYYY
                if (parts[0].length > 4) return;
                break;
            default:
                return;
        }

        // Update form values
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: formattedValue,
        }));
    };

    return (
        <>
            <div className="filter-container">
                <div className="filter-child">
                    From:
                    <input
                        className="filter-input"
                        type="text"
                        name="from"
                        value={formValues.from}
                        onChange={handleInputChange}
                        placeholder="e.g. DD/MM/YYYY or MM/YYYY"
                        pattern="^(?:(\d{2})\/)?(\d{2})\/(\d{4})|(\d{4})$"
                        title="Please enter a date in DD/MM/YYYY, MM/YYYY, or YYYY format"
                    />
                </div>
                <div className="filter-child">
                    To:
                    <input
                        className="filter-input"
                        type="text"
                        name="to"
                        value={formValues.to}
                        onChange={handleInputChange}
                        placeholder="e.g. DD/MM/YYYY or MM/YYYY"
                        pattern="^(?:(\d{2})\/)?(\d{2})\/(\d{4})|(\d{4})$"
                        title="Please enter a date in DD/MM/YYYY, MM/YYYY, or YYYY format"
                    />
                </div>
                <div className="filter-child">
                    <button className="filter-button filter-apply" onClick={applyFilter}>
                        Apply Filter
                    </button>
                </div>
                <div className="filter-child">
                    <button className="filter-button filter-reset" onClick={resetFilter}>
                        Reset Filter
                    </button>
                </div>
            </div>
        </>
    );
}
