import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const UploadBox = ({onFileSelect}) => {

            const [fileName, setFileName] = useState('')

    const handleFileChange=(e)=>{
        const file = e.target.files[0];
        if(!file) return // agr file present nhe hue to function ruk jayega

        setFileName(file.name)
        onFileSelect(file)
    }

    return (
        <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
                type="file"
                accept=".pdf,.xlsx"
                id="fileUpload"
                className="hidden"
                onChange={handleFileChange}
            />

            <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col items-center gap-3"
            >
                <ArrowUpTrayIcon className="w-12 h-12 text-blue-600" />

                <p className="text-gray-700 font-medium">
                    {fileName? fileName : "Upload PDF or Excel file"}
                </p>

                <p className="text-sm text-gray-500">
                    Supported formats: PDF, XLSX
                </p>
            </label>
        </div>
    );
};

export default UploadBox;
