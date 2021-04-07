// Packages
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';

// Pages
import Home from './pages/Home';
import Splash from './pages/Splash';
import Greeting from './pages/Greeting';

// Components
import UserContext from './components/UserContext';

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
  const [ selectedCollection, setSelectedCollection ] = useState('');

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
        
        API.getSelectedCollection(token).then( (response) => {
          setSelectedCollection(response.data);
        }).catch( (err) => {
          console.log(err)
        });
      }).catch( (err) => {
        console.log(err);
      });
    }
  }, [  ]);

  const signIn = async ( username, password ) => {
    try {
      const { data } = await API.signin({ username, password })

      localStorage.setItem('token', data.accessToken)
      
      setUser({
        userId: data._id,
        rootId: data.root,
        token: data.accessToken,
        isSignedIn: true
      })

      API.getSelectedCollection(data.accessToken).then(response => {
        setSelectedCollection(response.data)
      }).catch( err => {
        console.log(err)
      })
    } catch (err) {
      return err.response.data
    }
  } 

  const theme = {
    global: {
      font: {
        family: "Overpass"
      },
      drop: {
        border: { 
          radius: '10px'
        }
      }
    }
  }

  return (
    <Grommet theme={theme}>
    <UserContext.Provider value={{
      user: user, 
      selectBookmark: setSelectedBookmark, 
      selectedBookmark: selectedBookmark,
      selectedCollection: selectedCollection,
      selectCollection: setSelectedCollection
    }} >
    <Router>
      <Switch>
        <Route exact path='/'>
          { user.isSignedIn ? <Redirect to='/home' /> : <Greeting handleSignIn={signIn} /> }
        </Route>
        <Route exact path='/home'>
          { user.isSignedIn ? 
            <UserContext.Consumer>
              { (data) => <Home user={data.user} 
                                selectedCollection={data.selectedCollection}
                                selectCollection={data.selectCollection}
                                selectedBookmark={data.selectedBookmark} 
                                selectBookmark={data.selectBookmark}/> 
              }
            </UserContext.Consumer> : <Redirect to='/' /> }
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
