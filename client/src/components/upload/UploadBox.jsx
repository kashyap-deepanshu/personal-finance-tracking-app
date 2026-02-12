import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const UploadBox = ({ onFileSelect, setError, file, validateFile }) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState("");

    // DRAG EVENTS
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        setError("");

        const droppedFile = e.dataTransfer.files[0];

        if (validateFile(droppedFile)) {
            setFileName(droppedFile.name);
            onFileSelect(droppedFile);
        }
    };

    // FILE PICKER
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setError("");

        if (validateFile(selectedFile)) {
            setFileName(selectedFile.name);
            onFileSelect(selectedFile);
        }
    };

    // Reset filename if parent clears file
    useEffect(() => {
        if (!file) {
            setFileName("");
        }
    }, [file]);

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mt-6 border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer
        ${dragActive
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 bg-gray-50"
                }`}
        >
            <input
                type="file"
                accept=".pdf,.xlsx"
                id="fileUpload"
                className="hidden"
                onChange={handleFileChange}
            />

            <label
                htmlFor="fileUpload"
                className="flex flex-col items-center gap-3 cursor-pointer"
            >
                <ArrowUpTrayIcon className="w-12 h-12 text-indigo-600" />

                <p className="text-gray-700 font-medium">
                    {fileName ? fileName : "Drag & Drop your file here"}
                </p>

                <p className="text-sm text-gray-500">
                    or click to browse (PDF / XLSX)
                </p>
            </label>
        </div>
    );
};

export default UploadBox;
