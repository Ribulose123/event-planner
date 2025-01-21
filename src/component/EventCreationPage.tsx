import React, { useState } from "react";
import { db } from "../Auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UploadinfImage from "./UploadinfImage";

interface EventData {
  name: string;
  location: string;
  tickets: string;
  flier: File | null;
}

const EventCreationPage: React.FC = () => {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    location: "",
    tickets: "",
    flier: null,
  });
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("")
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setStatus("Uploading...");

    try {
      // Add event data to Firestore
      await addDoc(collection(db, "Events"), {
        name: eventData.name,
        location: eventData.location,
        tickets: eventData.tickets,
        imageUrl,
        createdAt: new Date().toISOString(),
      });

      // Set status to completed
      setStatus("Completed ✅✅");

      // Delay navigation to ensure status is rendered
      setTimeout(() => {
        setStatus(null);
        navigate("/event-list");
      }, 4000);
    } catch (error) {
      console.error("Error creating event:", error);
      setStatus("Error creating event. Please try again.");
      setTimeout(() => setStatus(null), 3000);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section
      className="relative w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: 'url("/img/floral.jpeg")' }}
    >
      {/* Status Overlay with Animation */}
      {status && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white p-6 w-full roundeded shadow text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            {status === "Uploading..." && (
              <div className="flex items-center justify-center space-x-2">
                <p className=" font-bold text-blue-500 text-3xl">{status}</p>
                {/* Animated Dots */}
                <motion.div
                  className="w-3 h-3 bg-blue-500 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
                <motion.div
                  className="w-3 h-3 bg-blue-500 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                />
                <motion.div
                  className="w-3 h-3 bg-blue-500 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                />
              </div>
            )}
            {status === "Completed!" && (
              <motion.p
                className="text-green-600 text-3xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {status}
              </motion.p>
            )}
          </motion.div>
        </div>
      )}

      {/* Form Section */}
      <div className="bg-gray-800 bg-opacity-50 flex items-center justify-center z-20 fixed inset-0">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg w-full max-w-md mx-auto relative">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <h1 className="text-[30px] font-mono text-white">Create Event</h1>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleInputChange}
              placeholder="Event Name"
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded text-slate focus:outline-none"
            />
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              placeholder="Event Location"
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded text-slate focus:outline-none"
            />
            <input
              type="number"
              name="tickets"
              value={eventData.tickets}
              onChange={handleInputChange}
              placeholder="Tickets Available"
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded text-slate focus:outline-none"
            />
            <UploadinfImage onUpload={setImageUrl} />
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-all w-1/2 flex items-center justify-center"
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventCreationPage;
