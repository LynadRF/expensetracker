import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEuroSign,
    faDollarSign,
    faYenSign,
    faSterlingSign,
    faFrancSign,
    faWonSign,
    faRupeeSign,
    faLiraSign,
    faPesoSign,
    faRubleSign,
    faHouse,
    faPlug,
    faCartShopping,
    faUtensils,
    faPaw,
    faIcons,
    faC,
    faGem,
    faRoad,
    faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import { Categories } from "../types/enums";

export function renderCurrencyIcon(className?: string): JSX.Element {
    const currency = localStorage.getItem("currency-symbol");
    switch (currency) {
        case "Euro":
            return <FontAwesomeIcon className={className} icon={faEuroSign} />;
        case "Dollar":
            return <FontAwesomeIcon className={className} icon={faDollarSign} />;
        case "Yen":
            return <FontAwesomeIcon className={className} icon={faYenSign} />;
        case "Sterling":
            return <FontAwesomeIcon className={className} icon={faSterlingSign} />;
        case "Franc":
            return <FontAwesomeIcon className={className} icon={faFrancSign} />;
        case "Won":
            return <FontAwesomeIcon className={className} icon={faWonSign} />;
        case "Rupee":
            return <FontAwesomeIcon className={className} icon={faRupeeSign} />;
        case "Lira":
            return <FontAwesomeIcon className={className} icon={faLiraSign} />;
        case "Peso":
            return <FontAwesomeIcon className={className} icon={faPesoSign} />;
        case "Ruble":
            return <FontAwesomeIcon className={className} icon={faRubleSign} />;
        default:
            return <FontAwesomeIcon className={className} icon={faEuroSign} />;
    }
}

export function renderCategoryItems(category: string): JSX.Element {
    switch (category) {
        case "Rent":
            return <FontAwesomeIcon icon={faFileSignature} />;
        case "Home":
            return <FontAwesomeIcon icon={faHouse} />;
        case "Utilities":
            return <FontAwesomeIcon icon={faPlug} />;
        case "Transport":
            return <FontAwesomeIcon icon={faRoad} />;
        case "Groceries":
            return <FontAwesomeIcon icon={faCartShopping} />;
        case "Dining":
            return <FontAwesomeIcon icon={faUtensils} />;
        case "Leisure":
            return <FontAwesomeIcon icon={faIcons} />;
        case "Pets":
            return <FontAwesomeIcon icon={faPaw} />;
        case "Other":
            return <FontAwesomeIcon icon={faGem} />;
        default:
            return <FontAwesomeIcon icon={faC} />;
    }
}

type RenderCategoryOptionsProps = {
    className?: string;
    style?: React.CSSProperties;
    selected?: string;
};

export function renderCategoryOptions({ className, style, selected }: RenderCategoryOptionsProps): JSX.Element[] {
    const categoryStorage: string = localStorage.getItem("custom-categories") || "[]";
    const customCategories: string[] = JSON.parse(categoryStorage);
    const totalCategories: JSX.Element[] = [];

    // push defaultCategories
    Object.values(Categories)
        .filter((key) => isNaN(Number(key)))
        .map((item, index) =>
            totalCategories.push(
                <option key={index} value={item} className={className} style={style} selected={item === selected}>
                    {item}
                </option>
            )
        );

    // push customCategories
    Object.values(customCategories)
        .filter((key) => isNaN(Number(key)))
        .map((item, index) =>
            totalCategories.push(
                <option
                    key={index + Object.keys(Categories).length - 1}
                    value={item}
                    className={className}
                    style={style}
                    selected={item === selected}
                >
                    {item}
                </option>
            )
        );

    return totalCategories;
}
