import React, { useEffect, useState } from "react";
import { db } from "../Auth";
import { useParams, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Country, State, City } from "country-state-city";
import UploadinfImage from "./UploadinfImage";
import Complete from "../content/Complete";

interface SpecificInput {
  input: string;
  type: string;
  placeholder: string;
}

interface Category {
  name: string;
  specificInput: SpecificInput[];
  
}


const categories: Category[] = [
  {
    name: "wedding",
    specificInput: [
      { input: "Bride Name", type: "text", placeholder: "Bride Name" },
      { input: "Groom Name", type: "text", placeholder: "Groom Name" },
      { input: "Theme", type: "text", placeholder: "Theme" },
    ],
  },
  {
    name: "birthday",
    specificInput: [
      { input: "Celebrant Name", type: "text", placeholder: "Celebrant Name" },
      { input: "Age", type: "number", placeholder: "Celebrant Age" },
    ],
  },
  {
    name: "corporate",
    specificInput: [
      { input: "Company Name", type: "text", placeholder: "Company Name" },
      { input: "Event Type", type: "text", placeholder: "Event Type" },
    ],
  },
];

interface EventData {
  tickets: string;
  category: string;
  description: string;
  time: string;
  country: string;
  state: string;
  city: string;
}

const EventCreationPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState<EventData>({
    tickets: "",
    category: category || "General",
    description: "",
    time: "",
    country: "",
    state: "",
    city: "",
  })

 

  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categorySpecificFields, setCategorySpecificFields] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    // Updating category-specific fields
    const selectedCategoryData = categories.find((cat) => cat.name === selectedCategory);
    const fields = selectedCategoryData
      ? Object.fromEntries(selectedCategoryData.specificInput.map((input) => [input.input, ""]))
      : {};
    setCategorySpecificFields(fields);
  }, [selectedCategory]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySpecificChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCategorySpecificFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!imageUrl){
      alert("Please upload an image befoe sumbit");
      return;
    }
    setUploading(true);
    setStatus("Uploading...");

    try {
      await addDoc(collection(db, "Events"), {
        ...eventData,
        ...categorySpecificFields,
        imageUrl,
        createdAt: new Date().toISOString(),
      });

      setStatus("Completed ✅");
      setTimeout(() => {
        setStatus(null);
        navigate("/event-list");
      }, 3000);
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
      {status && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white p-6 rounded shadow text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            {status === "Uploading..." && (
              <div className="flex items-center justify-center space-x-2">
                <p className="font-serif text-blue-500 text-3xl">{status}</p>
                <motion.div className="w-3 h-3 bg-blue-500 rounded" animate={{y:[-10, 10, -10]}} transition={{repeat:Infinity, duration:0.6, delay:0.4}}></motion.div>
                <motion.div className="w-3 h-3 bg-blue-500 rounded" animate={{y:[-10, 10, -10]}} transition={{repeat:Infinity, duration:0.6, delay:0.4}}></motion.div>
                <motion.div className="w-3 h-3 bg-blue-500 rounded" animate={{y:[-10, 10, -10]}} transition={{repeat:Infinity, duration:0.6, delay:0.4}}></motion.div>
              </div>
            )}
            {status === "Completed ✅" && (
              <motion.p
                className="text-green-600 text-3xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Complete/>
                <div  className=" hidden">{status}</div>
              </motion.p>
            )}
          </motion.div>
        </div>
      )}

      <div className="bg-gray-800 bg-opacity-50 flex items-center justify-center z-20 fixed inset-0">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg w-full max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <h1 className="text-[30px] font-mono text-white">Create Event</h1>

            <div className="h-[400px] w-full overflow-y-auto hover:overflow-y-auto sm:overflow-y-auto sm:-webkit-overflow-scrolling-touch scrollbar-hide">
              <select
                value={selectedCategory || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategory(value);
                  setEventData((prev) => ({ ...prev, category: value })); 
                }}
                className="w-full p-2 mb-4 border rounded focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {Object.keys(categorySpecificFields).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={categorySpecificFields[key]}
                  onChange={handleCategorySpecificChange}
                  placeholder={`Enter ${key}`}
                  className="w-full p-2 mb-4 border rounded focus:outline-none"
                  required
                />
              ))}

              <input
                type="datetime-local"
                name="time"
                value={eventData.time}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded focus:outline-none"
              />

              <select
                name="country"
                value={eventData.country}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    country: e.target.value,
                    state: "",
                    city: "",
                  })
                }
                className="w-full p-2 mb-4 border rounded focus:outline-none"
              >
                <option value="">Select Country</option>
                {Country.getAllCountries().map((country) => (
                  <option value={country.isoCode} key={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
              {eventData.country && (
                <select
                  name="state"
                  value={eventData.state}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      state: e.target.value,
                      city: "",
                    })
                  }
                  className="w-full p-2 mb-4 border rounded focus:outline-none"
                >
                  <option value="">Select State</option>
                  {State.getStatesOfCountry(eventData.country).map((state) => (
                    <option value={state.isoCode} key={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              )}
              {eventData.state && (
                <select
                  name="city"
                  value={eventData.city}
                  onChange={(e) =>
                    setEventData({ ...eventData, city: e.target.value })
                  }
                  className="w-full p-2 mb-4 border rounded focus:outline-none"
                >
                  <option value="">Select City</option>
                  {City.getCitiesOfState(
                    eventData.country,
                    eventData.state
                  ).map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              )}
              <input
                type="number"
                name="tickets"
                value={eventData.tickets}
                onChange={handleInputChange}
                placeholder="Tickets Available"
                className="w-full p-2 mb-4 border rounded focus:outline-none"
              />
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                placeholder="Event Description"
                required
                className="w-full p-2 mb-4 border rounded focus:outline-none"
              />
              <UploadinfImage onUpload={(url)=>setImageUrl(url)} />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 border text-white rounded-lg hover:bg-white hover:text-green-600 transition-all w-1/2"
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


