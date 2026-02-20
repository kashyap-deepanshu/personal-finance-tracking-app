import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import generatePDFReport from '../../utils/generatePDFReport'

const Header = ({ financialYear, monthlySummary, overallSummary }) => {

    const navigate = useNavigate()
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()                      // clear localStorage + context
        navigate("/", { replace: true })  // redirect to home safely
    }

    return (
        <div className="flex justify-between items-center mb-10">

            <div>
                <h1 className="md:text-4xl text-2xl font-bold text-gray-800">
                    Welcome back, {user?.name || "User"}
                </h1>
                <p className="text-gray-500">
                    Here’s your financial overview
                </p>
                <p className="text-gray-500 font-semibold text-sm">
                    {financialYear || ""}
                </p>
            </div>

            <div className="flex-col sm:flex-row  gap-3">

                {/* Download PDF */}
                <button
                    onClick={() =>
                        generatePDFReport({
                            overallSummary,
                            monthlySummary,
                        })
                    }
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                >
                    📄 Download Report
                </button>

                {/* Upload Again */}
                <button
                    onClick={() => navigate("/upload")}
                    className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                >
                    Upload Another File
                </button>

                {/* Logout */}
                {user && (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                )}

            </div>

        </div>
    )
}

export default Header
