import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
      const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome back, Deepanshu
                </h1>
                <p className="text-gray-500">
                    Here’s your financial overview
                </p>
            </div>

            <button
                onClick={() => navigate("/upload")}
                className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
            >
                Upload Another File
            </button>
        </div>
    )
}

export default Header