import React, { useEffect, useState } from 'react';
import { db } from '../Auth';
import { where, getDocs, collection, query } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Loader from '../content/Loader';

// Define the Event type based on your Firestore document structure
interface Event {
  id: string;
  name: string;
  imageUrl: string;
  date: string;
  category: string;
  tickets:number;
}

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // Show loader
      try {
        const q = query(collection(db, 'Events'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        setEvents(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Event[]
        );
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Error fetching events. Please try again later.');
      } finally {
        setLoading(false); // Hide loader
      }
    };
  
    fetchEvents();
  }, [category]);
  
  if (loading){
    return <div><Loader/> </div>
  }

  return (
    <div>
    <h1 className='flex justify-center items-center text-4xl font-bold mb-8'>Category: {category || "Not Found"}</h1>
  {error && <p className="text-red-500">{error}</p>}

  {events.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {events.map((event) => (
        <li key={event.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
          <img
                src={event.imageUrl || "https://via.placeholder.com/150"}
                alt={event.name}
                className="w-full h-56 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-4">{event.name}</h2>
              
              <p className="text-gray-800">Tickets Available: {event.tickets}</p>
              <button
                onClick={() => alert(`Buying ticket for ${event.name}`)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Buy Ticket
              </button>
        </li>
      ))}
    </ul>
  ) : !error ? (
    <p>No {category} events available.</p>
  ) : null}
</div>

  );
};

export default Category;
