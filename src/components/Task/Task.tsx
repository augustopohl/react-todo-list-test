import React, { useContext } from "react";
import { FiTrash } from "react-icons/fi";
import "../../styles/task.scss";
import { NotesContext } from "../AppContextProvider/AppContextProvider";

export interface TaskProps {
  id: number;
  title: string;
  isComplete: boolean;
  editing: boolean;
  noteId: number;
}
const TaskComponent = ({
  id,
  title,
  isComplete,
  editing,
  noteId,
}: TaskProps) => {
  const { _toggleTaskComplete, _editTaskTitle, openConfirmation } =
    useContext(NotesContext);

  return (
    <li key={id} className="task">
      <div className={isComplete ? "completed" : ""}>
        {editing ? (
          <div className={isComplete ? "completed" : ""}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={isComplete}
                onClick={() => _toggleTaskComplete(noteId, id)}
              />
              <span className="checkmark"></span>
            </label>
            <label>
              <input
                className="task-input"
                value={title}
                onChange={(e) => _editTaskTitle(noteId, id, e.target.value)}
              />
            </label>
            {editing && (
              <button
                type="button"
                onClick={() => openConfirmation("exclude_task", noteId, id)}
              >
                <FiTrash size={16} />
              </button>
            )}
          </div>
        ) : (
          <p>{title}</p>
        )}
      </div>
    </li>
  );
};

export default TaskComponent;
