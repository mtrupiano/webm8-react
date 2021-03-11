
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import API from './utils/API';

function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      API.authenticate(token).then( (response) => {
        console.log(response);
      }).catch( (err) => {
        console.log(err);
      });
    }
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/'>

        </Route>
      </Switch>
    </Router>
  );
}

export default App;
