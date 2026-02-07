import React from 'react'

const HeroSection = () => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        Track Your Expenses Smartly
      </h1>
      <p className="mt-4 text-gray-600 max-w-xl">
        Upload your bank statement and instantly understand where your money goes.
      </p>
    </section>
  )
}

export default HeroSection