import Cookies from "js-cookie";
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
} from "@fortawesome/free-solid-svg-icons";

export function renderCurrencyIcon(className: string): JSX.Element {
    const currency = Cookies.get("currency-symbol");
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
