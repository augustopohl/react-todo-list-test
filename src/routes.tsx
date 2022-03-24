import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditNote from "./pages/EditNote";

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route
        path="/edit/:noteId"
        children={({ match }: { match: any }) => (
          <EditNote id={match.params.noteId} />
        )}
      />
      <Route path="/" children={<Home />} />
    </Switch>
  );
};

export default Routes;
