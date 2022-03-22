import '../styles/dialog.scss'

interface DialogProps {
  id?: string;
  children: React.ReactElement,
  onRequestClose: () => void;
}

export function DialogWindow({ onRequestClose, id = 'dialog', children }: DialogProps) {
  const handleOutsideClick = (e: any) => {
    if (e.target.id === id) {
      onRequestClose();
    }
  }

  const handleConfirm = (e: any) => {
    e.preventDefault();

    onRequestClose();
  }

  return (
    <div id={id} className="dialog" onClick={handleOutsideClick}>
      <div className="container">
        <div className="content">{children}</div>
        <button className="accept" onClick={handleConfirm}>Accept</button>
        <button className="cancel" onClick={onRequestClose}>Cancel</button>
      </div>
    </div>
  )
}
