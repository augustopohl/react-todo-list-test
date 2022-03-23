import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import EditTasks from './pages/EditTasks';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/edit" component={EditTasks} />
    </Switch>
  );
};

export default Routes;