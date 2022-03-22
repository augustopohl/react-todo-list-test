import { useState } from 'react';
import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";
import './styles/global.scss'
// import { TasksProvider } from './hooks/useTasks';
import { DialogWindow } from './components/DialogWindow';

export function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }


  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <Header />
      <TaskList onOpenDialog={handleOpenDialog} />
      {isDialogOpen ? (
        <DialogWindow
          onRequestClose={handleCloseDialog}
        >
          <h2>Modal</h2>
        </DialogWindow>
      ) : null
      }
    </>
  )
}