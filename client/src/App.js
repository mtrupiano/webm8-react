// Packages
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Splash from './pages/Splash';

// Components
import UserContext from './components/UserContext';
import NavBar from './components/NavBar';

// Utilities
import API from './utils/API';

function App() {

  const [user, setUser] = useState({
    userId: '',
    rootId: '',
    token: '',
    isSignedIn: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      API.authenticate(token).then( (response) => {
        setUser({ 
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

  return (
    <UserContext.Provider value={user}>
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          { user ? '/home' : '/splash'}
        </Route>
        <Route exact path='/home'>
          <UserContext.Consumer>
            { (data) => <Home user={data} /> }
          </UserContext.Consumer>
        </Route>
        <Route exact path='/splash'>
          <Splash />
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
