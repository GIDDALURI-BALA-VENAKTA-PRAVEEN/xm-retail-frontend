import { useEffect, useState } from "react";

import {FaTrash} from "react-icons/fa";
import axios from "axios";

export default function Admindash() {
  const [images, setImages] = useState<(string | null)[]>(Array(9).fill(null));
  const SERVER_URL = "http://localhost:5000";
  

  // Fetch images from the backend
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/images`);
      const fetchedImages = response.data.map((img: string) =>
        img ? `${SERVER_URL}${img}` : null
      );

      // Ensure exactly 9 slots are available
      const updatedImages = Array(9).fill(null).map((_, idx) => fetchedImages[idx] || null);
      setImages(updatedImages);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  // Handle image upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`${SERVER_URL}/api/upload`, formData);
      const newImageUrl = `${SERVER_URL}${response.data.url}`;

      // Update only the selected index
      setImages((prev) => prev.map((img, idx) => (idx === index ? newImageUrl : img)));
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  // Handle image deletion
  const deleteImage = async (index: number) => {
    try {
      const imageUrl = images[index];
      if (!imageUrl) return;

      await axios.delete(`${SERVER_URL}/api/delete`, { data: { url: imageUrl.replace(SERVER_URL, "") } });

      // Remove the image from the state
      setImages((prev) => prev.map((img, idx) => (idx === index ? null : img)));
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-2  ">
      {/* Header Section */}
      <div className="flex  p-4  mb-4">
        <h2 className="text-2xl font-bold  text-center justify-center items-center">Carousel Dashboard</h2>
      </div>

      {/* Uploaded Images Grid */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Manage Images (Max 9)</h3>
        <div className="grid grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group border border-gray-300 p-2 rounded-lg">
              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
                className="hidden"
                id={`upload-${index}`}
              />

              {/* Image Display / Upload Placeholder */}
              <label htmlFor={`upload-${index}`} className="cursor-pointer block">
                {img ? (
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg transition transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-300 flex items-center justify-center rounded-lg text-sm font-semibold">
                    Upload Image {index + 1}
                  </div>
                )}
              </label>

              {/* Delete Button */}
              {img && (
                <button
                  onClick={() => deleteImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
}
