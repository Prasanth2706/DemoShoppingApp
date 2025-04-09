import React from "react";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  return (
    <div className={`modal ${isOpen ? "modal-open" : "modal-closed"}`}>
      {isOpen && (
        <div className="modal-content">
          <p className="modal-message">{message}</p>
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;
