import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Accueil from '../../routes/accueil';
import User from '../../routes/User';
import Login from '../../routes/Login';
import Signup from '../../routes/Signup';
import Profil from '../Profil/Profil';

const app = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route path="/profil" component={Profil} />
        <Route path="/user/:id" component={User} /> 
        <Route component={ () => <div>404</div>} />
      </Switch>
    </Router>
  );
};

export default app;