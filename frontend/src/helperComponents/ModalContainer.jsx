export default function ModalContainer({ message, onClose }) {
    return (
      <div className="modal">
        <span>{message} was clicked</span>
        <button onClick={onClose}>Close Pop-up</button>
      </div>
    );
  }
  