import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from '../../pages/Home';
import Trending from '../../pages/Trending';
import Profil from '../../pages/Profil';


const index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/Home" exact component>
            {Home}
          </Route>
          <Route path="/Profil" exact component>
            {Profil}
          </Route>
          <Route path="/Trending" exact component>
            {Trending}
          </Route>
          <Redirect to='/'/>
        </Switch>
      </Router>
    </div>
  );
};

export default index;
