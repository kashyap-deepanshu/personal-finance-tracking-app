import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import generatePDFReport from '../../utils/generatePDFReport'

const Header = ({ financialYear, monthlySummary, overallSummary }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate()
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()                      // clear localStorage + context
        navigate("/", { replace: true })  // redirect to home safely
    }
    const capitalizeWords = (str) => {
        if (!str) return "";

        return str
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div className="flex justify-between items-center mb-10">

            <div>
                <h1 className="md:text-4xl text-2xl font-bold text-gray-800">
                    Welcome, {capitalizeWords(user?.name) || "User"}
                </h1>
                <p className="text-gray-500">
                    Here’s your financial overview
                </p>
                <p className="text-gray-500 font-semibold text-sm">
                    {financialYear || ""}
                </p>
            </div>

            <div className="relative">

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-3">

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

                    <button
                        onClick={() => navigate("/upload")}
                        className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                    >
                        Upload Another File
                    </button>

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    )}

                </div>

                {/* Mobile Burger Icon */}
                <div className="md:hidden flex justify-end">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-lg p-4 flex flex-col gap-3 md:hidden z-50">

                        <button
                            onClick={() => {
                                generatePDFReport({ overallSummary, monthlySummary });
                                setIsOpen(false);
                            }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            📄 Download Report
                        </button>

                        <button
                            onClick={() => {
                                navigate("/upload");
                                setIsOpen(false);
                            }}
                            className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                        >
                            Upload Another File
                        </button>

                        {user && (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        )}

                    </div>
                )}

            </div>

        </div>
    )
}

export default Header
