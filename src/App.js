import React, { useState } from "react";
import { BrowserRouter as Switch, Route, Link, useHistory } from "react-router-dom";
import './App.css';
import { Button, Image, H1 } from "./components/Elements/Elements";
import { SignUpForm } from './components/SignupForm/SignUpForm';


export const App = () => {
  const [loggedInUser, setLoggedInUser] = useState()
  const history = useHistory()

  const handleHistory = (route) => {
    window.location.href = route
  }
  return (
    <Switch>
      <div className="App">
        <header className="App-header">
          <H1 text="Welcome to TrakMyProject!" />
          <p>Keep others up to date with<br />
            <span className="emphasize"> what</span><br />
               your building and<br />
            <span className="emphasize"> how</span><br />
               you're building it.</p>
        </header>
        <Route exact path='/'>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Circle-icons-roadblock.svg/600px-Circle-icons-roadblock.svg.png" className="App-logo" alt="under construction" />
          <br />
          <Button text="sign up" action={() => handleHistory('/signup')} />
        </Route>

        <Route exact path='/signup'>
          <SignUpForm loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        </Route>
      </div >
    </Switch >
  )
}
