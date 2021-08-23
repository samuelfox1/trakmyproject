import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Redirect, Route, useHistory } from "react-router-dom";
import { useUserContext } from './utils/context/UserProvider'
import Nav from "./components/Nav/Nav";
import Landing from "./pages/Landing/Landing";
import Home from './pages/Home/Home'
import Footer from "./components/Footer/Footer";
import { Flex } from "./components/Elements/Elements";
import { checkToken } from "./utils/userAPI";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import './App.css';


function App() {
  const { loggedInUser, setLoggedInUser } = useUserContext()
  const { loggedIn, username } = loggedInUser
  const { getLoadingStatus, setLoadingStatus } = useUserContext()
  const token = localStorage.getItem('tmpToken')
  const history = useHistory()

  const loadingKey = 'loadingUserData'
  useEffect(() => localStorage.setItem(loadingKey, false))

  const loadUserData = useCallback((data, status) => {
    if (status !== 200) return setLoadingStatus(false)
    const { user, token } = data

    localStorage.setItem('tmpToken', token)
    setLoggedInUser({ ...user, loggedIn: true, projects: user.projects })
    setLoadingStatus(false)
    history.push(`/user/${user.username}`)

  }, [history, setLoggedInUser, setLoadingStatus])

  const isTokenExpired = useCallback(() => {
    if (!token || getLoadingStatus()) return

    setLoadingStatus(true)
    checkToken(token)
      .then(({ data, status }) => loadUserData(data, status))
      .catch(error => console.log(error))

  }, [token, loadUserData, getLoadingStatus, setLoadingStatus])

  useEffect(() => {
    isTokenExpired()
  }, [token, isTokenExpired])


  return (
    <Router>
      {loggedIn && <Redirect to={`/user/${username}`} />}
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