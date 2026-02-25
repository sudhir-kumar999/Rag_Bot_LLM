import { useState } from "react";
import API from "../../api/axios";

export default function UploadPanel() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Select file first");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ FormData banana zaroori hai
      const formData = new FormData();
      formData.append("file", file);

      // ✅ backend call
      const res = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Upload successful ✅");
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">📄 Upload Document</h2>

      {/* DROP AREA */}
      <div className="border-2  border-dashed rounded-xl p-8 text-center flex-1 flex flex-col justify-center">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        {file ? (
          <p className="text-green-600 font-medium">Selected: {file.name}</p>
        ) : (
          <p className="text-gray-500">Upload PDF to chat with AI</p>
        )}
      </div>

      {/* STATUS MESSAGE */}
      {message && (
        <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
      )}

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
