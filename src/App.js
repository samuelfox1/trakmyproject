import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Flex } from "./components/Flex/Flex";
import Nav from "./components/Nav/Nav";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Home from './pages/Home'
import './App.css';
import Footer from "./components/Footer/Footer";


function App() {
  const [loggedInUser, setLoggedInUser] = useState({ loggedIn: false })


  return (
    <Router>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>

        <Nav />
        <Flex className='App'>

          <Route exact path='/'>
            {loggedInUser.loggedIn ? <Redirect to={`/user/${loggedInUser.username}`} /> : <Landing />}
          </Route>

          <Route exact path='/signup'>
            {/* {loggedInUser.loggedIn ? <Redirect to={`/user/${loggedInUser.username}`} /> : <SignUp />} */}
            <SignUp />
          </Route>

          <Route exact path='/user/:username'>
            {!loggedInUser.loggedIn ? <Redirect to='/' /> : <Home />}
          </Route>

        </Flex>
        <Footer />

      </UserContext.Provider>
    </Router >
  )
}

export default App