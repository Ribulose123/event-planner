import React, { useState } from "react";

interface UploadinfImageProps {
  onUpload: (url: string) => void;
}

const UploadinfImage: React.FC<UploadinfImageProps> = ({ onUpload }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "event planner");
    data.append("cloud_name", "dmev0bkt1");

    setLoading(true);
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmev0bkt1/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();

      if (result.secure_url) {
        onUpload(result.secure_url); // Pass the URL to the parent component
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" required onChange={handleFileChange}  className="w-full p-2 mb-4 border border-gray-300 rounded text-slate focus:outline-none"/>
      {loading && <p>Uploading image...</p>}
    </div>
  );
};

export default UploadinfImage;
