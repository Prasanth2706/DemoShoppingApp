import React, { useEffect } from "react";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  // Add keyboard support to close modal with Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" width="32" height="32">
                <circle cx="12" cy="12" r="11" fill="#4CAF50" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <h2 className="modal-title">Success</h2>
            <p className="modal-message">{message}</p>
          </div>
          <div className="modal-footer">
            <button className="modal-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;