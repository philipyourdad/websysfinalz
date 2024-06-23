import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

function App() {


  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
