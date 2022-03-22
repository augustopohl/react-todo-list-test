import { FormEvent, useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { api } from '../services/api';
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}
interface TaskListProps {
  onOpenDialog: () => void;
}

export function TaskList({ onOpenDialog }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [hasBeenConfirmed, setHasBeenConfirmed] = useState(false);

  useEffect(() => {
    api.get('tasks')
    .then(response => setTasks(response.data.tasks))
  }, [])

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (newTaskTitle) {
      const data = {
        id: new Date().getUTCMilliseconds(),
        title: newTaskTitle,
        isComplete: false,
      };
      api.post('tasks', data)

      setNewTaskTitle('');
    } else {
      console.log('You cannot add an empty task');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : { ...task }));
  }

  function handleRemoveTask(id: number) {
    setHasBeenConfirmed(false)
    if (hasBeenConfirmed) {
      setTasks(tasks.filter(task => task.id !== id));
    }
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
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
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

                <button type="button" data-testid="remove-task-button" onClick={onOpenDialog}>
                  <FiTrash size={16} />
                </button>
              </li>
            ))}

          </ul>
        </main>
      </section>
    </>
  )
}