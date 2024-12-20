import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useRecords } from "../contexts/recordContext";
import { renderCurrencyIcon } from "../utils/renderHelpers";
import RecordList from "../components/Manage/RecordList/RecordList";
import { DataItem, RecordItem } from "../types/types";
import "../styles/Dashboard.css";
import RecordEntry from "../components/Manage/RecordEntry/RecordEntry";

export default function Dashboard() {
    const { allRecordsState, getSortedRecords } = useRecords();
    const [expenseState, setExpenseState] = useState({
        oneYear: 0,
        sixMonths: 0,
        threeMonths: 0,
        oneMonth: 0,
    });

    const recentRecords = (amount: number) => {
        const recentRecords: RecordItem[] = [...allRecordsState];
        return <RecordList records={recentRecords.slice(0, amount + 1)} />;
    };

    const getTopExpensesByCategory = (limit: number) => {
        const expensesByCategory: DataItem[] = getSortedRecords({ by: "category" });
        const expensesByCategoryJSX: JSX.Element[] = [];
        for (let i = 0; i < expensesByCategory.length && i < limit; i++) {
            expensesByCategoryJSX.push(
                <div>
                    <span style={{ paddingRight: "8px" }}>{expensesByCategory[i].name}:</span>
                    {expensesByCategory[i].value}
                    {renderCurrencyIcon()}
                </div>
            );
        }
        return expensesByCategoryJSX;
    };

    const topExpensesByCategory: JSX.Element[] = getTopExpensesByCategory(5);

    const getTopExpenses = (limit: number) => {
        const allExpenses: RecordItem[] = [...allRecordsState];
        allExpenses.sort((a, b) => b.amount - a.amount);
        const topExpensesJSX: JSX.Element[] = [];
        for (let i = 0; i < allExpenses.length && i < limit; i++) {
            topExpensesJSX.push(
                <div>
                    <span style={{ paddingRight: "8px" }}>{allExpenses[i].description}:</span>
                    {allExpenses[i].amount}
                    {renderCurrencyIcon()}
                </div>
            );
        }
        return topExpensesJSX;
    };

    const topExpenses: JSX.Element[] = getTopExpenses(5);

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
    }, []);

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
                                    Last month: {expenseState.oneMonth}
                                    {renderCurrencyIcon()}
                                </div>
                                <div>
                                    Last 3 months: {expenseState.threeMonths}
                                    {renderCurrencyIcon()}
                                </div>
                                <div>
                                    Last 6 months: {expenseState.sixMonths}
                                    {renderCurrencyIcon()}
                                </div>
                                <div>
                                    Last year: {expenseState.oneYear}
                                    {renderCurrencyIcon()}
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-top-expenses-container">
                            <h3 className="dashboard-h3">Top 5 categories</h3>
                            <div className="dashboard-top-expenses">
                                <div>{topExpensesByCategory[0]}</div>
                                <div>{topExpensesByCategory[1]}</div>
                                <div>{topExpensesByCategory[2]}</div>
                                <div>{topExpensesByCategory[3]}</div>
                                <div>{topExpensesByCategory[4]}</div>
                            </div>
                        </div>
                        <div className="dashboard-top-expenses-container">
                            <h3 className="dashboard-h3">Top 5 expenses</h3>
                            <div className="dashboard-top-expenses">
                                <div>{topExpenses[0]}</div>
                                <div>{topExpenses[1]}</div>
                                <div>{topExpenses[2]}</div>
                                <div>{topExpenses[3]}</div>
                                <div>{topExpenses[4]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
