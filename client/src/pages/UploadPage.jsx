import UploadBox from "../components/upload/UploadBox";
import PrivacyNote from "../components/upload/PrivacyNote";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";



const UploadPage = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [error, setError] = useState(" ")
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


  // VALIDATE FILE
  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 5MB.");
      return false;
    }

    return true;
  };


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
        "/api/upload",
        formData
      );
      // console.log("Backend Summary - ",response.data);
      setSummary(response.data)

      localStorage.setItem("summary", JSON.stringify(response.data));
      navigate('/dashboard', { state: { summary: response.data } })

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
          Upload Paytm Bank Statement
        </h2>

        <UploadBox onFileSelect={setFile} file={file} setError={setError} validateFile={validateFile} /> {/* yha hmne setFile ko onFileSelct ke name se child mai pass kra hai */}
        <PrivacyNote />

        {file && (
          <div className="bg-gray-100 p-3 rounded-lg mb-4 flex justify-between items-center">
            <span className="text-sm text-gray-700 truncate">
              {file.name}
            </span>
            <button
              onClick={() => setFile(null)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
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
