import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";
import './styles/global.scss'
import { TasksProvider } from './hooks/useTasks';

export function App() {

  return (
    <TasksProvider>
      <Header />
      <TaskList />
    </TasksProvider>
  )
}