// Packages
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';

// Pages
import Home from './pages/Home';
import Splash from './pages/Splash';

// Components
import UserContext from './components/UserContext';
import NavBar from './components/NavBar';

// Utilities
import API from './utils/API';

import './App.css'

function App() {

  const [user, setUser] = useState({
    userId: '',
    rootId: '',
    token: '',
    isSignedIn: false
  });

  const [ selectedBookmark, setSelectedBookmark ] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      API.authenticate(token).then( (response) => {
        setUser({ ...user,
          userId: response.data.data.id, 
          rootId: response.data.data.root,
          token: token,
          isSignedIn: true
        });
      }).catch( (err) => {
        console.log(err);
      });
    }
  }, []);

  const theme = {
    global: {
      font: {
        family: "Overpass"
      }
    }
  };

  return (
    <Grommet theme={theme}>
    <UserContext.Provider value={{
      user: user, 
      selectBookmark: setSelectedBookmark, 
      selectedBookmark: selectedBookmark
    }} >
    <Router>
      <Switch>
        <Route exact path='/'>
          { user ? '/home' : '/splash'}
        </Route>
        <Route exact path='/home'>
          <UserContext.Consumer>
            { (data) => <Home user={data.user} 
                              selectedBookmark={data.selectedBookmark} 
                              selectBookmark={data.selectBookmark}/> 
            }
          </UserContext.Consumer>
        </Route>
        <Route exact path='/splash'>
          <Splash />
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
    </Grommet>
  );
}

export default App;
