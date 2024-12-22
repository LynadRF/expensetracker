import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useRecords } from "../contexts/recordContext";
import { renderCurrencyIcon } from "../utils/renderHelpers";
import RecordList from "../components/Manage/RecordList/RecordList";
import { RecordItem } from "../types/types";
import requestAPI from "../api";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const { allRecordsState, recordState } = useRecords();
    const [statistics, setStatistics] = useState<{
        oneMonth: { sum: number };
        threeMonths: { sum: number };
        sixMonths: { sum: number };
        oneYear: { sum: number };
        topFiveCategories: [{ category: string; sum: number }];
        topFiveExpenses: [{ description: string; amount: number }];
    }>({
        oneMonth: { sum: 0 },
        threeMonths: { sum: 0 },
        sixMonths: { sum: 0 },
        oneYear: { sum: 0 },
        topFiveCategories: [{ category: "", sum: 0 }],
        topFiveExpenses: [{ description: "", amount: 0 }],
    });

    useEffect(() => {
        const fetch = async () => {
            const response = await requestAPI("GET", "/record/dashboard-stats");
            const result = await response.json();
            console.log(result);
            if (response.ok) setStatistics(result.data);
        };
        fetch();
    }, [recordState]);

    const recentRecords = (amount: number) => {
        const recentRecords: RecordItem[] = [...allRecordsState];
        return <RecordList records={recentRecords.slice(0, amount + 1)} />;
    };

    const renderTopExpenses = () => {
        return (
            <>
                {statistics.topFiveExpenses.map((expense, index) => (
                    <div key={index}>
                        <span style={{ paddingRight: "5px" }}>{expense.description}:</span>
                        {expense.amount}
                        {renderCurrencyIcon()}
                    </div>
                ))}
            </>
        );
    };

    const renderTopExpensesByCategory = () => {
        return (
            <>
                {statistics.topFiveCategories.map((item, index) => (
                    <div key={index}>
                        <span style={{ paddingRight: "5px" }}>{item.category}:</span>
                        {item.sum}
                        {renderCurrencyIcon()}
                    </div>
                ))}
            </>
        );
    };

    return (
        <>
            <Sidebar />
            <main>
                <div className="dashboard-container">
                    <div className="dashboard-main-content">
                        <div className="dashboard-recent-expenses-overview">
                            <h3 className="dashboard-h3">Most recent expenses</h3>
                            <div className="dashboard-recent-records-list">{recentRecords(15)}</div>
                        </div>
                    </div>
                    <div className="dashboard-sidebar">
                        <div className="dashboard-expenses-overview">
                            <h3 className="dashboard-h3">Expenses over time</h3>
                            <div className="dashboard-expenses-entries">
                                <div>
                                    Last month: {statistics.oneMonth.sum}
                                    {renderCurrencyIcon()}
                                </div>
                                <div>
                                    Last 3 months: {statistics.threeMonths.sum}
                                    {renderCurrencyIcon()}
                                </div>
                                <div>
                                    Last 6 months: {statistics.sixMonths.sum}
                                    {renderCurrencyIcon()}
                                </div>
                                <div>
                                    Last year: {statistics.oneYear.sum}
                                    {renderCurrencyIcon()}
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-top-expenses-container">
                            <h3 className="dashboard-h3">Top 5 categories</h3>
                            <div className="dashboard-top-expenses">{renderTopExpenses()}</div>
                        </div>
                        <div className="dashboard-top-expenses-container">
                            <h3 className="dashboard-h3">Top 5 expenses</h3>
                            <div className="dashboard-top-expenses">{renderTopExpensesByCategory()}</div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
