import { useEffect, useState } from "react";
import requestAPI from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { RecordItem } from "../../Charts/chartTypes";
import "./RecordList.css";

export default function RecordList() {
    const [records, setRecords] = useState<RecordItem[]>([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const response = await requestAPI("GET", "/record/records");
            const result = await response.json();
            console.log(result);
            if (response.ok) setRecords(result.data);
        };
        fetchRecords();
    }, []);

    const renderRecords = () => {
        return records.map((record, index) => <Record record={record} key={index} />);
    };

    return (
        <>
            <div className="recordlist-container">{renderRecords()}</div>
        </>
    );
}

type RecordProps = {
    record: RecordItem;
};

function Record({ record }: RecordProps) {
    const currency = <FontAwesomeIcon className="record-currency-icon" icon={faEuroSign} />;
    const formatDate = (date: string) => {
        let result = "";
        result += date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
        return result;
    };
    return (
        <>
            <div className="record-container">
                <div className="record-category">{record.category}</div>
                <div className="record-description">{record.description}</div>
                <div className="record-amount">
                    {record.amount}
                    {currency}
                </div>
                <div className="record-created_at">{formatDate(record.created_at)}</div>
                <div className="record-edit">
                    <button className="record-edit-btn">
                        <FontAwesomeIcon className="record-edit-icon" icon={faPenToSquare} />
                    </button>
                </div>
            </div>
        </>
    );
}
