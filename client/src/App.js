import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

// IMPORT COMPONENTS
import Reseacher from "./components/forms/Researcher.jsx";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
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

              <Route exact path="/" component={Reseacher} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
