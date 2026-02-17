import React from 'react'

const ActionButtons = ({ onLoginClick, onTrackClick }) => {

    return (
        <div className='flex gap-4 justify-center pb-10'>

            {/* Login Button */}
            <button
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                onClick={onLoginClick}
            >
                Login
            </button>

            {/* Track Expense Button */}
            <button
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                onClick={onTrackClick}
            >
                Track Your Expenses
            </button>

        </div>
    )
}

export default ActionButtons
