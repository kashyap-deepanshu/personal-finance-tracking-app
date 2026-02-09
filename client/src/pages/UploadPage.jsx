import UploadBox from "../components/upload/UploadBox";
import PrivacyNote from "../components/upload/PrivacyNote";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const UploadPage = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [error, setError] = useState("    ")
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); //  fieldname MUST be "file"

    try {
      setLoading(true);
      setError("")
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      // console.log("Backend Summary - ",response.data);
      setSummary(response.data)
      navigate('/dashboard',{state:{summary:response.data}})

      // alert("File uploaded successfully");

    } catch (error) {
      console.error("Upload error:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Upload Bank Statement
        </h2>

        <UploadBox onFileSelect={setFile} setError={setError} /> {/* yha hmne setFile ko onFileSelct ke name se child mai pass kra hai */}
        <PrivacyNote />

        {file && (
          <p className="text-sm text-gray-600 mb-2">
            Selected: {file.name}
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}
        
        <button onClick={handleAnalyze}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Expense"}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
