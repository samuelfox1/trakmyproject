import React from 'react'
import './App.css';
import { SignUpForm } from './components/SignupForm/SignUpForm';


export const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to TrakMyProject!</h1>
        <p>Keep others up to date with <span className="emphasize">what</span> your building and <span className="emphasize">how</span> you're building it.</p>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Circle-icons-roadblock.svg/600px-Circle-icons-roadblock.svg.png" className="App-logo" alt="under construction" /> */}
      </header>
      <SignUpForm />

    </div >
  )
}
