import { FormEvent, useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare, FiEdit } from 'react-icons/fi'
import { useTasks } from '../hooks/useTasks';
import { DialogWindow } from './DialogWindow';
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const { tasks, addNewTask, removeTask, toggleTaskComplete } = useTasks()
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskId, setTaskId] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    addNewTask(newTaskTitle)
    setNewTaskTitle('');
  };

  function handleToggleTaskCompletion(id: number) {
    toggleTaskComplete(id)
  }

  function handleRemoveTask(id: number) {
    setTaskId(id)
    handleOpenDialog()
  }

  return (
    <>
      <section className="task-list container">

        <header>
          <h2>My tasks</h2>

          <form onSubmit={handleCreateNewTask} className="input-group">
            <input
              type="text"
              placeholder="Add a new todo task"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button">
              <FiCheckSquare size={16} color="#fff" />
            </button>
          </form>
        </header>

        <main>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>
                <div>
                  <button type="button" data-testid="edit-task-button" >
                    <FiEdit size={16} />
                  </button>

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