import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { useUserContext } from './context/UserProvider'
import Nav from "./components/Nav/Nav";
import Landing from "./pages/Landing/Landing";
import Home from './pages/Home/Home'
import Footer from "./components/Footer/Footer";
import { Flex } from "./components/Elements/Elements";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";
import './App.css';


function App() {
  const { user } = useUserContext()

  return (
    <Router>
      {user?.isLoggedIn && <Redirect to={`/user/${user?.username}`} />}
      <Nav />
      <Flex id='App' className='App'>

        <Route exact path='/'>
          <Landing />
        </Route>

        <Route exact path='/user/:username'>
          <Home />
        </Route>

        {/* <Route path='/'>
          <PageNotFound />
        </Route> */}

      </Flex>
      <Footer />
    </Router >
  )
}

export default App