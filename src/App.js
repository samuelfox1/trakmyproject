import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Redirect, Route, useHistory } from "react-router-dom";
import { useUserData } from './utils/context/UserProvider'
import Nav from "./components/Nav/Nav";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Home from './pages/Home'
import './App.css';
import Footer from "./components/Footer/Footer";
import { Flex } from "./components/Elements/Elements";
import { checkToken } from "./utils/userAPI";
import LoginForm from "./components/LoginForm/LoginForm";


function App() {
  const { loggedInUser, setLoggedInUser } = useUserData()
  const { loggedIn, username } = loggedInUser
  const history = useHistory()

  const token = localStorage.getItem('tmpToken')
  const loadingKey = 'loadingUserData'
  useEffect(() => localStorage.setItem(loadingKey, false))

  const setLoadingStatus = (boolean) => localStorage.setItem(loadingKey, boolean)
  const getLoadingStatus = () => localStorage.getItem(loadingKey) === 'true' ? true : false


  const loadUserData = useCallback((data, status) => {
    if (status !== 200) return setLoadingStatus(false)
    const { user, token } = data

    localStorage.setItem('tmpToken', token)
    setLoggedInUser({ ...user, loggedIn: true, projects: user.projects })
    setLoadingStatus(false)
    history.push(`/user/${user.username}`)

  }, [history, setLoggedInUser])

  const isTokenExpired = useCallback(() => {
    if (!token || getLoadingStatus()) return

    setLoadingStatus(true)
    checkToken(token)
      .then(({ data, status }) => loadUserData(data, status))
      .catch(error => console.log(error))

  }, [token, loadUserData])

  useEffect(() => {
    isTokenExpired()
  }, [token, isTokenExpired])


  return (
    <Router>
      {loggedIn && <Redirect to={`/user/${username}`} />}
      <Nav />
      <Flex className='App'>

        <Route exact path='/'>
          <Landing />
        </Route>

        <Route exact path='/login'>
          <LoginForm
            getLoadingStatus={getLoadingStatus}
            setLoadingStatus={setLoadingStatus}
            loadUserData={loadUserData}
          />
        </Route>

        <Route exact path='/signup'>
          <SignUp />
        </Route>

        <Route exact path='/user/:username'>
          <Home />
        </Route>

      </Flex>
      <Footer />
    </Router >
  )
}

export default App