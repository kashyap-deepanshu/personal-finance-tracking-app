import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/> } />
        <Route path='/upload' element={<UploadPage/> } />
        <Route path='/login' element={<LoginPage/> } />
        <Route path='/dashboard' element={<DashboardPage/> } />
        <Route path='/register' element={<RegisterPage/> } />
        <Route path='*' element={<NotFoundPage/> } />

      </Routes>

    </div>
  )
}

export default App