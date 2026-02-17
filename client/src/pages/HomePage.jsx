import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

import HeroSection from '../components/home/HeroSection'
import ActionButtons from '../components/home/ActionButtons'

const HomePage = () => {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Login button click
  const handleLoginClick = () => {
    navigate("/login")
  }

  // Track Expense button click
  const handleTrackClick = () => {
    if (user) {
      navigate("/upload")
    } else {
      navigate("/login")
    }
  }

  return (
    <div>
      <HeroSection />

      <ActionButtons
        onLoginClick={handleLoginClick}
        onTrackClick={handleTrackClick}
      />
    </div>
  )
}

export default HomePage
