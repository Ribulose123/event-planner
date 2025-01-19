import React from "react";
import { Link } from "react-router-dom";
import SampleEventCards from "../component/SampleEventCards";
import { fadein } from "../Variant";
import { motion } from "framer-motion";

const LandingPages: React.FC = () => {
  return (
    <div>
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url("/img/floral.jpeg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div
        variants={fadein('down', 0.1)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount:0.2}}
         className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
          <h1 className="text-6xl font-poppins font-bold mb-4">
            Plan Your Events Seamlessly!
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mb-6">
            Create unforgettable memories with our easy-to-use event planning
            tools. From scheduling to RSVPs, we’ve got you covered.
          </p>
          <div className="flex gap-4">
            <Link to="/event-creation">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                Create Event
              </button>
            </Link>
            <Link to="/learn-more">
              <button className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Highlights Section */}
        <motion.div
        variants={fadein('left', 0.4)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount:0.2}}
         className="absolute bottom-0 w-full py-4 bg-opacity-60 bg-black text-white">
          <div className="flex justify-around items-center max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">100+</h3>
              <p>Events Planned</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">50k</h3>
              <p>RSVPs Sent</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">4.9/5</h3>
              <p>Customer Rating</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Preview Section */}
      <section className="py-16 bg-gray-100">
        <motion.div
        variants={fadein('left', 0.1)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount:0.7}}
         className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">
            Featured Events
          </h2>
          <SampleEventCards />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <motion.div 
        variants={fadein("right", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="/img/calender.webp"
              alt="Calendar"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Event Scheduling</h3>
            <p className="text-gray-600">
              Plan your events with our seamless scheduling tools and never miss
              a moment.
            </p>
          </div>
          <div className="text-center">
            <img
              src="/img/EVENT.avif"
              alt="Invite"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Custom Invitations</h3>
            <p className="text-gray-600">
              Create beautiful custom invitations for any occasion.
            </p>
          </div>
          <div className="text-center">
            <img
              src="/img/pie.jpeg"
              alt="Analytics"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-gray-600">
              Track RSVPs and attendee engagement with detailed analytics.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <motion.div
        variants={fadein("left", 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
         className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="italic text-gray-600 mb-4">
                "This platform made organizing my wedding so much easier. Highly
                recommended!"
              </p>
              <h4 className="font-bold">- Emily R.</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="italic text-gray-600 mb-4">
                "I was amazed at how simple it was to manage RSVPs for my
                birthday bash."
              </p>
              <h4 className="font-bold">- Michael B.</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="italic text-gray-600 mb-4">
                "The analytics tools helped us refine our corporate event like
                never before."
              </p>
              <h4 className="font-bold">- Sarah K.</h4>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call-to-Action Section */}
      .<motion.section 
      variants={fadein("down", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
      className="py-10 bg-green-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Plan Your Next Event?
        </h2>
        <p className="mb-8">
          Join thousands of users who trust our platform to make their events
          unforgettable.
        </p>
        <Link to="/event-creation">
          <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-200 transition-all">
            Start Now
          </button>
        </Link>
      </motion.section>
    </div>
  );
};

export default LandingPages;
