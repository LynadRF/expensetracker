import { useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { RecordItem } from "../../../types/types";
import { useRecords } from "../../../contexts/recordContext";
import Modal from "../../Modal/Modal";
import requestAPI from "../../../api";
import { renderCategoryItems, renderCategoryOptions, renderCurrencyIcon } from "../../../utils/renderHelpers";
import "./RecordList.css";

type RecordListProps = {
    records: RecordItem[];
};

export default function RecordList({ records }: RecordListProps) {
    const { allRecordsDispatch, recordDispatch } = useRecords();

    const handleDeleteRecord = (recordId: number): void => {
        recordDispatch({ type: "DELETE", recordId: recordId });
        allRecordsDispatch({ type: "DELETE", recordId: recordId });
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
    const { allRecordsDispatch, recordDispatch } = useRecords();
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState<{ description: string; amount: number; category: string }>({
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

    const formatDate = (date: string) => {
        const splitDate: string[] = date.split(/-| /);
        let result = "";
        result += splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
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
                const recordEdit: RecordItem = {
                    id: record.id,
                    description: formValues.description,
                    amount: formValues.amount,
                    category: formValues.category,
                    created_at: record.created_at,
                };
                recordDispatch({ type: "EDIT", record: recordEdit });
                allRecordsDispatch({ type: "EDIT", record: recordEdit });
                setIsOpen(false);
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
                setIsOpen(false);
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
                                        placeholder={record.description}
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
                                        placeholder={record.amount.toString()}
                                        value={formValues.amount}
                                    />
                                </div>
                                <div className="record-modal-col">
                                    <p className="record-modal-p">Created at:</p>
                                    <label style={{ fontSize: "max(12px, 1vw)" }}>
                                        {formatDate(record.created_at)}
                                    </label>
                                </div>
                                <div className="record-modal-col">
                                    <p className="record-modal-p">Category:</p>
                                    <select
                                        className="recordentry-category-select"
                                        onChange={handleChange}
                                        style={{ fontSize: "max(12px, 1vw)" }}
                                        defaultValue={record.category}
                                    >
                                        {renderCategoryOptions({
                                            className: "recordentry-category-option",
                                        })}
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
                <div className="record-category-short">{renderCategoryItems(record.category)}</div>
                <div className="record-description">{record.description}</div>
                <div className="record-amount">
                    {record.amount}
                    {renderCurrencyIcon("record-currency-icon")}
                </div>
                <div className="record-created_at">{formatDate(record.created_at)}</div>
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
