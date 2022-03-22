import { useTasks } from '../hooks/useTasks';
import '../styles/dialog.scss'

interface DialogProps {
  id?: string;
  children: React.ReactElement,
  onRequestClose: () => void;
  taskId: number;
}

export function DialogWindow({ taskId, onRequestClose, id = 'dialog', children }: DialogProps) {
  const { removeTask } = useTasks()

  const handleOutsideClick = (e: any) => {
    if (e.target.id === id) {
      onRequestClose();
    }
  }

  const handleConfirm = (e: any) => {
    e.preventDefault();
    removeTask(taskId)
    onRequestClose();
  }

  return (
    <div id={id} className="dialog" onClick={handleOutsideClick}>
      <div className="container">
        <div className="content">{children}</div>
        <div className="buttons-container">
          <button className="accept" onClick={handleConfirm}>Yes</button>
          <button className="cancel" onClick={onRequestClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
