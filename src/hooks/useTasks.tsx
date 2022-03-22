import { createContext, FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
interface Task {
    id: number;
    title: string;
    isComplete: boolean;
}
interface TasksProviderProps {
    children: ReactNode;
}
interface TasksContextData {
    tasks: Task[];
    setTasks: ([]) => void;
    addNewTask: (title: string) => void;
    removeTask: (taskId: number) => void;
    toggleTaskComplete: (taskId: number) => void;
}

const TasksContext = createContext<TasksContextData>(
    {} as TasksContextData
);

export function TasksProvider({ children }: TasksProviderProps): JSX.Element {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const tasks = localStorage.getItem("tasksInfo");
        if (tasks) {
          setTasks(JSON.parse(tasks));
        }
      }, [])

      function addNewTask(title: string) {
        try {
            const updatedTasks = [...tasks]
      
            if (title) {
              const newTask = {
                id: new Date().getUTCMilliseconds(),
                title: title,
                isComplete: false,
              };
              updatedTasks.push(newTask)
      
              setTasks(updatedTasks)
      
              localStorage.setItem("tasksInfo", JSON.stringify(updatedTasks));
      
            } else {
              throw Error();
            }
          } catch {
            console.log('You cannot add an empty task');
          }
      }

      function removeTask(taskId: number) {
        try {
            const updatedTasks = [...tasks];
            const productIndex = updatedTasks.findIndex(task => task.id === taskId)
      
            if (productIndex >= 0) {
              updatedTasks.splice(productIndex, 1);
      
              setTasks(updatedTasks);
      
              localStorage.setItem('tasksInfo', JSON.stringify(updatedTasks))
            }
          } catch {
            throw Error();
          }
      }

      function toggleTaskComplete(taskId: number) {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, isComplete: !task.isComplete } : { ...task }));
      }

    return (
        <TasksContext.Provider value={{ tasks, setTasks, addNewTask, removeTask, toggleTaskComplete }}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks(): TasksContextData {
    const context = useContext(TasksContext);

    return context;
}