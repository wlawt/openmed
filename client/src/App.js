import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

// IMPORT COMPONENTS
import Reseacher from "./components/forms/Researcher.jsx";
import Patient from "./components/forms/Patient.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Navbar from "./components/layout/Navbar";

import "./App.css";

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

              <Route exact path="/" component={Dashboard} />
              <Route exact path="/researcher" component={Reseacher} />
              <Route exact path="/patient" component={Patient} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
