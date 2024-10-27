import { ReactElement } from "react";
import "./Modal.css";

type ModalProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactElement;
};

export default function Modal({ setIsOpen, children }: ModalProps) {
    return (
        <div className="modal">
            <div className="modal-dark-bg" onClick={() => setIsOpen(false)}></div>
            <div className="modal-content">{children}</div>
        </div>
    );
}
