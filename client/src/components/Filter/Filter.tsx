import { useState } from "react";
import { useRecords } from "../../contexts/recordContext";
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
                from: formValues.from,
                to: formValues.to,
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
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="filter-container">
                <div className="filter-child">
                    <p className="filter-p">From:</p>
                    <input
                        type="date"
                        className="filter-input-date"
                        name="from"
                        value={formValues.from}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-child">
                    <p className="filter-p">To:</p>
                    <input
                        type="date"
                        className="filter-input-date"
                        name="to"
                        value={formValues.to}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-child">
                    <button className="filter-button filter-apply" onClick={applyFilter}>
                        <p className="filter-p" id="filterp1">
                            Apply Filter
                        </p>
                        <p className="filter-p" id="filterp2">
                            Apply
                        </p>
                    </button>
                </div>
                <div className="filter-child">
                    <button className="filter-button filter-reset" onClick={resetFilter}>
                        <p className="filter-p" id="filterp1">
                            Reset Filter
                        </p>
                        <p className="filter-p" id="filterp2">
                            Reset
                        </p>
                    </button>
                </div>
            </div>
        </>
    );
}
