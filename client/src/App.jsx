import { Route, Routes } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import SkillsPage from './pages/SkillsPage'
import Preview from './pages/Preview'
import Login from './pages/Login'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

const App = () => {
  const dispatch = useDispatch()

  const getUserData = useCallback(async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const { data } = await api.get('/api/users/data', {
          headers: { Authorization: `Bearer ${token}` }
        })

        const userData = data.user || data
        if (userData) {
          dispatch(login({ token, user: userData }))
        }
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)
    }
  }, [dispatch])

  useEffect(() => {
    getUserData()
  }, [getUserData])

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login initialState="signup" />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          <Route path="skills/:resumeId" element={<SkillsPage />} />
        </Route>
        <Route path="/view/:resumeId" element={<Preview />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
