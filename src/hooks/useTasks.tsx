import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface Task {
    id: number;
    title: string;
    isComplete: boolean;
}

interface TasksProviderProps {
    children: ReactNode;
}


interface TasksContextData {
    newTaskTitle: string;
    tasks: Task[];
    handleCreateNewTask: () => void;
    setNewTaskTitle: (title: string) => void;
    setTasks: ([]) => void;
}

const TasksContext = createContext<TasksContextData>(
    {} as TasksContextData
);

export function TasksProvider({ children }: TasksProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');


    function handleCreateNewTask() {
        if (newTaskTitle) {
            setTasks([
              ...tasks,
              {
                id: new Date().getUTCMilliseconds(),
                title: newTaskTitle,
                isComplete: false,
              }
            ]);
      
            setNewTaskTitle('');
          } else {
            console.log('You cannot add an empty task');
          }
    }

    return (
        <TasksContext.Provider value={{ tasks: [], setTasks, handleCreateNewTask , newTaskTitle: '', setNewTaskTitle}}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TasksContext);

    return context;
}