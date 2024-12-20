import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useRecords } from "../contexts/recordContext";
import "../styles/Dashboard.css";
import { renderCurrencyIcon } from "../utils/renderHelpers";

export default function Dashboard() {
    const { allRecordsState, recordState } = useRecords();
    const [expenseState, setExpenseState] = useState({
        oneYear: 0,
        sixMonths: 0,
        threeMonths: 0,
        oneMonth: 0,
    });

    const today: Date = new Date();

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const getExpensesFrom = (from: Date) => {
        let result: number = 0;

        // Six Months ago + set to first of the month

        allRecordsState.forEach((record) => {
            const recordDate: Date = new Date(record.created_at);
            if (recordDate >= from && recordDate <= today) result += record.amount;
        });
        return result;
    };

    useEffect(() => {
        setExpenseState({
            oneYear: getExpensesFrom(oneYearAgo),
            sixMonths: getExpensesFrom(sixMonthsAgo),
            threeMonths: getExpensesFrom(threeMonthsAgo),
            oneMonth: getExpensesFrom(oneMonthAgo),
        });
    }, [recordState]);

    return (
        <>
            <Sidebar />
            <main>
                <div className="dashboard-container">
                    <div className="dashboard-expenses-overview">
                        <h3>Expenses</h3>
                        <div className="dashboard-expenses-overview-child">
                            Last month: {expenseState.oneMonth}
                            {renderCurrencyIcon()}
                        </div>
                        <div className="dashboard-expenses-overview-child">
                            Last 3 months: {expenseState.threeMonths}
                            {renderCurrencyIcon()}
                        </div>
                        <div className="dashboard-expenses-overview-child">
                            Last 6 months: {expenseState.sixMonths}
                            {renderCurrencyIcon()}
                        </div>
                        <div className="dashboard-expenses-overview-child">
                            Last year: {expenseState.oneYear}
                            {renderCurrencyIcon()}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
