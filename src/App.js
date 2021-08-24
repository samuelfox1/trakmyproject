import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Redirect, Route, useHistory } from "react-router-dom";
import { useUserContext } from './utils/context/UserProvider'
import { useDisplayContext } from "./utils/context/DisplayProvider";
import Nav from "./components/Nav/Nav";
import Landing from "./pages/Landing/Landing";
import Home from './pages/Home/Home'
import Footer from "./components/Footer/Footer";
import { Flex } from "./components/Elements/Elements";
import { checkToken } from "./utils/userAPI";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";
import './App.css';


function App() {
  const { user, setUser } = useUserContext()
  const { getLoadingStatus, setLoadingStatus } = useDisplayContext()
  const token = localStorage.getItem('tmpToken')
  const history = useHistory()

  const loadUserData = useCallback((data, status) => {
    if (status !== 200) return setLoadingStatus(false)
    const { user, token } = data

    localStorage.setItem('tmpToken', token)
    setUser({ ...user, isLoggedIn: true, projects: user.projects })
    setLoadingStatus(false)
    console.log(user)
    history?.push(`/user/${user.username}`)

  }, [history, setUser, setLoadingStatus])

  const isTokenExpired = useCallback(() => {
    if (!token || getLoadingStatus()) return

    setLoadingStatus(true)
    checkToken(token)
      .then(({ data, status }) => loadUserData(data, status))
      .catch(error => console.log(error))

  }, [token, loadUserData, getLoadingStatus, setLoadingStatus, user.isLoggedIn])

  useEffect(() => {
    isTokenExpired()
  }, [token, isTokenExpired])


  return (
    <Router>
      {user.isLoggedIn && <Redirect to={`/user/${user.username}`} />}
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