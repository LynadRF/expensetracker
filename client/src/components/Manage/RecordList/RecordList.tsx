import { useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { RecordItem } from "../../../types/types";
import { Categories } from "../../../types/enums";
import { useRecords } from "../../../hooks/useContextCustom";
import Modal from "../../Modal/Modal";
import requestAPI from "../../../api";
import "./RecordList.css";

export default function RecordList() {
    const { records, setRecords } = useRecords();

    const handleDeleteRecord = (recordId: number): void => {
        setRecords((prevRecords) => prevRecords.filter((record) => record.id !== recordId));
    };

    const renderRecords = () => {
        return records.map((record) => <Record record={record} onDelete={handleDeleteRecord} key={record.id} />);
    };

    return (
        <>
            <div className="recordlist-container">{renderRecords()}</div>
        </>
    );
}

type RecordProps = {
    record: RecordItem;
    onDelete: (id: number) => void;
};

function Record({ record, onDelete }: RecordProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        description: record.description,
        amount: record.amount,
        category: record.category,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues((prevState) => ({ ...prevState, category: e.target.value }));
    };

    const currency = <FontAwesomeIcon className="record-currency-icon" icon={faEuroSign} />;

    const formatDateShort = (date: string) => {
        if (date === "now") return date;
        let result = "";
        result += date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
        return result;
    };

    const formatDateLong = (date: string) => {
        let result = "";
        result += date.slice(11, 16) + " - " + date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
        return result;
    };

    const submitEdit = () => {
        const fetch = async () => {
            const response = await requestAPI("POST", "/record/edit", {
                id: record.id,
                newDescription: formValues.description,
                newAmount: formValues.amount,
                newCategory: formValues.category,
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                record.description = formValues.description;
                record.amount = formValues.amount;
                record.category = formValues.category;
            }
        };
        fetch();
    };

    const submitDelete = () => {
        const fetch = async () => {
            const response = await requestAPI("DELETE", "/record/delete/" + record.id);
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                onDelete(record.id);
            }
        };
        fetch();
    };

    const modal = (
        <>
            {createPortal(
                <Modal
                    setIsOpen={setIsOpen}
                    children={
                        <>
                            <div className="record-modal-container">
                                <h2>Edit Record</h2>
                                <div className="record-modal-col">
                                    <p className="record-modal-p">Description:</p>
                                    <input
                                        className="record-modal-input"
                                        name="description"
                                        type="text"
                                        onChange={handleInputChange}
                                        value={formValues.description}
                                    />
                                </div>
                                <div className="record-modal-col">
                                    <p className="record-modal-p">Amount:</p>
                                    <input
                                        className="record-modal-input"
                                        name="amount"
                                        type="number"
                                        onChange={handleInputChange}
                                        value={formValues.amount}
                                    />
                                </div>
                                <div className="record-modal-col">
                                    <p className="record-modal-p">Created at:</p>
                                    <label>{formatDateLong(record.created_at)}</label>
                                </div>
                                <div className="record-modal-col">
                                    <p className="record-modal-p">Category:</p>
                                    <select className="recordentry-category-select" onChange={handleChange}>
                                        {Object.values(Categories)
                                            .filter((key) => isNaN(Number(key)))
                                            .map((item, index) => (
                                                <option
                                                    className="recordentry-category-option"
                                                    key={index}
                                                    value={item}
                                                    selected={item === formValues.category ? true : false}
                                                >
                                                    {item}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <button className="record-modal-btn" onClick={submitEdit}>
                                        Change
                                    </button>
                                </div>
                                <div>
                                    <button className="record-modal-btn record-delete" onClick={submitDelete}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                />,
                document.getElementById("root") || document.body
            )}
        </>
    );

    return (
        <>
            <div className="record-container">
                <div className="record-category">{record.category}</div>
                <div className="record-description">{record.description}</div>
                <div className="record-amount">
                    {record.amount}
                    {currency}
                </div>
                <div className="record-created_at">{formatDateShort(record.created_at)}</div>
                <div className="record-edit">
                    <button className="record-edit-btn" onClick={() => setIsOpen(true)}>
                        <FontAwesomeIcon className="record-edit-icon" icon={faPenToSquare} />
                    </button>
                </div>
                {isOpen && modal}
            </div>
        </>
    );
}
