import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Landing from "./pages/Landing";
import Home from './pages/Home'
import SignUp from "./pages/SignUp";
import { UserContext } from "./UserContext";
import Nav from "./components/Nav/Nav";


function App() {
  const [loggedInUser, setLoggedInUser] = useState({ loggedIn: false })


  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <Nav />
          <Route exact path='/'>
            <Landing />
          </Route>

          <Route exact path='/signup'>
            <SignUp />
          </Route>

          <Route exact path='/user/:username'>
            <Home />
          </Route>

        </UserContext.Provider>
      </div >
    </Router >
  )
}

export default App