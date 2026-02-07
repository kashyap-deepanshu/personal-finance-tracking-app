import UploadBox from "../components/upload/UploadBox";
import PrivacyNote from "../components/upload/PrivacyNote";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const UploadPage = () => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); //  fieldname MUST be "file"

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      // console.log("Backend response:", response.data);
      alert("File uploaded successfully");

    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
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

        <UploadBox onFileSelect={setFile} /> {/* yha hmne setFile ko onFileSelct ke name se child mai pass kra hai */}
        <PrivacyNote />
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
