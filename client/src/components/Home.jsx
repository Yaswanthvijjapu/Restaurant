import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState(3);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${searchQuery.trim()}`);
    }
  };

  const handleNearbySearch = () => {
    if (latitude.trim() && longitude.trim() && radius) {
      navigate(`/restaurants/location?lat=${latitude}&lng=${longitude}&radius=${radius}`);
    } else {
      alert("Please enter valid latitude and longitude!");
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);
          navigate(`/restaurants/geolocation?lat=${lat}&lng=${lng}&radius=${radius}`);
        },
        () => {
          alert("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100">
        <div className="top-40 inset-0 flex flex-col items-center justify-center text-gray-900 text-center p-7 z-10">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Welcome to Restaurants Finder
          </h2>
          <p className="text-sm sm:text-lg text-gray-700 mb-6">Discover the best places to eat</p>
          <input
            type="text"
            placeholder="Search Restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-4 w-full sm:w-80 md:w-[400px] lg:w-[500px] rounded-xl bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 shadow-lg"
          />
          <div className="mt-6 space-x-0 sm:space-x-8 flex flex-col sm:flex-row">
            <motion.button
              onClick={handleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 w-full sm:w-auto mb-4 sm:mb-0"
            >
              Search Restaurants
            </motion.button>
            <motion.button
              onClick={() => navigate("/restaurants")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
            >
              View Restaurants
            </motion.button>
          </div>
        </div>
      </div>

      {/* Latitude and Longitude Input Section */}
      <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-1/2 lg:w-1/3 z-20">
        <input
          type="text"
          placeholder="Enter Latitude..."
          onChange={(e) => setLatitude(e.target.value)}
          className="mb-4 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter Longitude..."
          onChange={(e) => setLongitude(e.target.value)}
          className="mb-4 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Enter Radius (in km)"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="mb-4 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <motion.button
            onClick={handleNearbySearch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 w-full"
          >
            Search Nearby ({radius}km)
          </motion.button>
          <motion.button
            onClick={handleUseMyLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 w-full"
          >
            Use My Location for Nearby Restaurants ({radius}km)
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;
