import React, { useState } from "react";
import { db, storage } from "../Auth";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";

interface EventData {
  name: string;
  location: string;
  tickets: string;
  flier: File | null; 
}

const CreateEventForm: React.FC = () => {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    location: "",
    tickets: "",
    flier: null,
  });

  const location = useLocation()

  const [uploading, setUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventData((prev) => ({ ...prev, flier: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    location('/event-list')

    try {
      let flierUrl = "";

      
      if (eventData.flier) {
        const flierRef = ref(storage, `fliers/${eventData.flier.name}`);
        await uploadBytes(flierRef, eventData.flier);
        flierUrl = await getDownloadURL(flierRef);
      }

      // Add event data to Firestore
      await addDoc(collection(db, "events"), {
        name: eventData.name,
        location: eventData.location,
        tickets: eventData.tickets,
        flier: flierUrl,
        createdAt: new Date().toISOString(),
      });

      alert("Event created successfully!");
      setEventData({ name: "", location: "", tickets: "", flier: null });
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section
      className="relative w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: 'url("/img/floral.jpeg")' }}
    >
      
      <div className="bg-gray-800 bg-opacity-50 flex items-center justify-center z-20 fixed inset-0">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg  p-6 rounded-lg w-full max-w-md mx-auto relative ">
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "400px", margin: "0 auto" }}
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
              className="w-full p-2 mb-4 border border-gray-300 rounded text-slate
               focus:outline-none"
            />
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              placeholder="Event Location"
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded text-slate
               focus:outline-none"
            />
            <input
              type="number"
              name="tickets"
              value={eventData.tickets}
              onChange={handleInputChange}
              placeholder="Tickets Available"
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded text-slate
               focus:outline-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded text-slate
               focus:outline-none"
            />
            <button type="submit" disabled={uploading} className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-all w-1/2 flex items-center justify-center">
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateEventForm;
