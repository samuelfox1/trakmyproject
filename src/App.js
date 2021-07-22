import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { UserProjectsContext } from "./utils/context/UserProjectsContext";
import { useUserData } from './utils/context/UserProvider'
import Nav from "./components/Nav/Nav";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Home from './pages/Home'
import './App.css';
import Footer from "./components/Footer/Footer";
import { Flex } from "./components/Elements/Elements";


function App() {
  const [userProjects, setUserProjects] = useState([])
  const { loggedInUser } = useUserData()
  const { loggedIn, username } = loggedInUser


  return (
    <Router>
      <UserProjectsContext.Provider value={{ userProjects, setUserProjects }}>

        <Nav />
        <Flex className='App'>

          <Route exact path='/'>
            {
              loggedIn
                ? <Redirect to={`/user/${username}`} />
                : <Landing />
            }
          </Route>

          <Route exact path='/signup'>
            {
              loggedIn
                ? <Redirect to={`/user/${username}`} />
                : <SignUp />
            }
          </Route>

          <Route exact path='/user/:username'>
            {
              !loggedIn
                ? <Redirect to='/' />
                : <Home />
            }
          </Route>

        </Flex>
        <Footer />

      </UserProjectsContext.Provider>
    </Router >
  )
}

export default App