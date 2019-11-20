import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

// IMPORT COMPONENTS
import Reseacher from "./components/forms/Researcher";
import Patient from "./components/forms/Patient";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AddPublication from "./components/payments/R_Form";

import "./App.css";

import {
  setCurrentUser,
  logoutUser,
  clearCurrentUser
} from "./actions/authActions";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/common/PrivateRoute";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Clear user
    store.dispatch(clearCurrentUser());

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              {/* 
                Name
                field of study
                purpose research
                academic institute
                  canadian university 
                research firms 
                creds
              */}

              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
              </Switch>
              <Route exact path="/researcher" component={Reseacher} />
              <Route exact path="/patient" component={Patient} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/add_publication" component={AddPublication} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
