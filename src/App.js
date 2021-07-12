import React from 'react';
import logo from './logo.svg';
import UserLogin from './features/login/UserLogin';
import Dashboard from './features/secured/Dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <UserLogin />
            </Route>
            {/* <Route path="/about">
              <About />
            </Route> */}
            <Route path="/dashboard">
              <Dashboard username={''} />
            </Route>
          </Switch>
        </div>
      </Router>
      {/* <UserLogin /> */}
    </div>
  );
}

export default App;
