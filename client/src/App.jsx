import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'

import Home from './Pages/Home/Home'
import Login from './Pages/Auth/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import Profile from './Pages/Profile/Profile'
import Settings from './Pages/Settings/Settings'
import Curriculum from "./Pages/Curriculum/Curriculum"
import StudyCurriculum from './Pages/StudyCurriculum/StudyCurriculum'
import TakeTest from './Components/TakeTest/TakeTest'
import Quiz from './Pages/Quiz/Quiz'
import NotFound from './Components/NotFound/NotFound'
import AnalyticsPage from './Pages/Analytics/AnalyticsPage'

function AppWrapper() {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    if (!token){
      // Don't redirect if on home or login page
      const path = window.location.pathname
      if (path !== '/' && path !== '/login') {
        navigate('/login')
      }
      return
    } 
  }, [token])

  // Apply saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'minimal'
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={(t) => { setToken(t); localStorage.setItem('token', t) }} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/study-curriculum/:id" element={<StudyCurriculum />} />
        <Route path="/test/:id/:day" element={<TakeTest />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/report/:id" element={<AnalyticsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}
