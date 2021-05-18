import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "./pages/Landing";
import Home from './pages/Home'
import SignUp from "./pages/SignUp";


export default function App() {
  const [loggedInUser, setLoggedInUser] = useState({ loggedIn: false })


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>

          <Route exact path='/signup'>
            <SignUp loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
          </Route>

          <Route exact path='/user/:username'>
            <Home />
          </Route>

        </Switch>
      </div >
    </Router >
  )
}
