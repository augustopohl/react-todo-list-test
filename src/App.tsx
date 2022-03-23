import './styles/global.scss'
import { TasksProvider } from './hooks/useTasks';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';

export function App() {

  return (
    <BrowserRouter>
      <TasksProvider>
        <Routes />
      </TasksProvider>
    </BrowserRouter>
  )
}