import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { UserProjectsContext } from "./context/UserProjectsContext";
import Nav from "./components/Nav/Nav";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Home from './pages/Home'
import './App.css';
import Footer from "./components/Footer/Footer";
import { Flex } from "./components/Elements/Elements";


function App() {
  const [loggedInUser, setLoggedInUser] = useState({ loggedIn: false })
  const [userProjects, setUserProjects] = useState([])


  return (
    <Router>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <UserProjectsContext.Provider value={{ userProjects, setUserProjects }}>

          <Nav />
          <Flex className='App'>

            <Route exact path='/'>
              {
                loggedInUser.loggedIn
                  ? <Redirect to={`/user/${loggedInUser.username}`} />
                  : <Landing />
              }
            </Route>

            <Route exact path='/signup'>
              {
                loggedInUser.loggedIn
                  ? <Redirect to={`/user/${loggedInUser.username}`} />
                  : <SignUp />
              }
            </Route>

            <Route exact path='/user/:username'>
              {
                !loggedInUser.loggedIn
                  ? <Redirect to='/' />
                  : <Home />
              }
            </Route>

          </Flex>
          <Footer />

        </UserProjectsContext.Provider>
      </UserContext.Provider>
    </Router >
  )
}

export default App