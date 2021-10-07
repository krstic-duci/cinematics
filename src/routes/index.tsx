import { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const FourOhFour = lazy(() => import("pages/FourOhFour"));
const WatchLater = lazy(() => import("pages/WatchLater"));
const Movies = lazy(() => import("pages/Movies"));

const Router = () => (
  <Switch>
    <Route path="/watch-later">
      <WatchLater />
    </Route>
    <Route path="/" exact>
      <Movies />
    </Route>
    <Route path="*">
      <FourOhFour />
    </Route>
  </Switch>
);

export default Router;
