import { renderCurrencyIcon } from "../../utils/renderHelpers";

type CustomTooltipProps = {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
};

export default function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    background: "var(--color3)",
                    padding: "4px 8px",
                    borderRadius: "5px",
                }}
            >
                <span style={{ padding: "0", margin: "0" }}>{`Expenses in ${label}: ${payload[0].value}`}</span>
                <span style={{ padding: "0 0 0 2px", margin: "0" }}>{renderCurrencyIcon()}</span>
            </div>
        );
    }
    return null;
}
