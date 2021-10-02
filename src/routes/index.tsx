import { Switch, Route } from "react-router-dom";

import WatchLater from "pages/WatchLater";
import Movies from "pages/Movies";
import FourOhFour from "pages/FourOhFour";

const Router = () => {
  return (
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
};

export default Router;
