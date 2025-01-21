import React, { useEffect, useState } from "react";
import { db } from "../Auth"; // Firestore instance
import { collection, getDocs } from "firebase/firestore";

interface Event {
  id: string;
  name: string;
  location: string;
  tickets: number;
  imageUrl: string;
  createdAt: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsCollection = collection(db, "events");
        const snapshot = await getDocs(eventsCollection);
        const eventsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center">Loading events...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Event List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{event.name}</h2>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-gray-800">Tickets Available: {event.tickets}</p>
            <button
              onClick={() => alert(`Buying ticket for ${event.name}`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Buy Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
