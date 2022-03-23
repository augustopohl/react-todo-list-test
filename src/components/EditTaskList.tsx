import { FormEvent, useState, useEffect } from 'react'

import '../styles/editTasklist.scss'

import { FiTrash, FiCheckSquare, FiEdit, FiArrowLeft } from 'react-icons/fi'
import { useTasks } from '../hooks/useTasks';
import { DialogWindow } from './DialogWindow';
import { Link, useHistory } from 'react-router-dom';

export function EditTaskList() {
  const { tasks, toggleTaskComplete } = useTasks()
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskId, setTaskId] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const history = useHistory();


  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  function handleToggleTaskCompletion(id: number) {
    toggleTaskComplete(id)
  }

  function handleRemoveTask(id: number) {
    setTaskId(id)
    handleOpenDialog()
  }

  function handleEditTask(id: number) {

  }

  return (
    <>
      <section className="task-list container">

        <header>
          <h2>Edit tasks</h2>
          <Link to="/" className="return-button">
              <FiArrowLeft size={16} color="#fff" />
            </Link>
        </header>

        <main>
          <div className="buttons-container">
            <button type="button" >
              Save all changes
            </button>
            <button type="button" >
              Revert all changes
            </button>
            <button type="button" >
              Undo last change
            </button>
            <button type="button" >
              Redo last change
            </button>
          </div>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label >
                    <input
                    className="task-input"
                      value={task.title}
                    />
                  </label>
                </div>
                <div>
                  <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                    <FiTrash size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>

      </section>
      {isDialogOpen ? (
        <DialogWindow
          taskId={taskId}
          onRequestClose={handleCloseDialog}
        >
          <h2>Are you sure you want to remove this task?</h2>
        </DialogWindow>
      ) : null
      }
    </>
  )
}