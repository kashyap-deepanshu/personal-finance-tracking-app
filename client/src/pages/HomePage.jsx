import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

import HeroSection from '../components/home/HeroSection'
import ActionButtons from '../components/home/ActionButtons'

const HomePage = () => {

  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return;

    const storedSummary = JSON.parse(localStorage.getItem("summary"));

    if (user && storedSummary) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate])

  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleTrackClick = () => {
    const storedSummary = JSON.parse(localStorage.getItem("summary"));

    if (user && storedSummary) {
      navigate("/dashboard")
    } else if (user) {
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
