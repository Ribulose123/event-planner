import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SampleEventCards: React.FC = () => {
  const navigate = useNavigate();
  const events = [
    { name: "Wedding", status: "Attending", category: "wedding" },
    { name: "Birthday Bash", status: "Pending", category: "birthday" },
    { name: "Corporate Gala", status: "Declined", category: "corporate" },
  ];

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleFlip = (index: number) => {
    if (flippedCards.includes(index)) {
      setFlippedCards(flippedCards.filter((i) => i !== index));
    } else {
      setFlippedCards([...flippedCards, index]);
    }
  };

  const handleCardClick = (category: string) => {
    navigate(`/category-list/${category}`);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-6">
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="relative w-64 h-48 cursor-pointer perspective"
          onMouseOver={() => handleFlip(index)}
          onClick={() => handleCardClick(event.category)}
        >
          <motion.div
            className={`absolute w-full h-full transition-transform duration-500 transform ${
              flippedCards.includes(index) ? "rotate-y-180" : ""
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front of the Card */}
            <div className="absolute backface-hidden w-full h-full bg-[#4CAF50] shadow-lg flex flex-col justify-center items-center text-white rounded-lg p-6">
              <h2 className="text-xl font-bold">{event.name}</h2>
            </div>

            {/* Back of the Card */}
            <div className="absolute rotate-y-180 backface-hidden w-full h-full bg-[#1B5E20] shadow-lg flex flex-col justify-center items-center text-white rounded-lg p-4">
              <h2 className="text-xl font-bold">Status</h2>
              <p className="text-sm">{event.status}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default SampleEventCards;
