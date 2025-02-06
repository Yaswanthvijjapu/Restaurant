import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState();
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
          navigate(`/restaurants/location?lat=${lat}&lng=${lng}&radius=${10}`);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 p-6">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Welcome to Restaurants Finder
        </h2>
        <p className="text-sm sm:text-lg text-gray-700 mt-4">Discover the best places to eat</p>
      </div>

      <div className="w-full max-w-md mt-6 ml-18">
        <input
          type="text"
          placeholder="Search Restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-95 p-3 rounded-lg bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-md"
        />
        <div className="flex flex-col sm:flex-row sm:space-x-6 mt-4">
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto"
          >
            Search Restaurants
          </motion.button>
          <motion.button
            onClick={() => navigate("/restaurants")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto mt-3 sm:mt-0"
          >
            View Restaurants
          </motion.button>
        </div>
      </div>

      <div className="w-full max-w-md mt-8 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter Latitude..."
          onChange={(e) => setLatitude(e.target.value)}
          className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter Longitude..."
          onChange={(e) => setLongitude(e.target.value)}
          className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Enter Radius (in km)"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <motion.button
            onClick={handleNearbySearch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 w-full"
          >
            Search Nearby ({radius}km)
          </motion.button>
          <motion.button
            onClick={handleUseMyLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 w-full"
          >
            Use My Location ({radius}km)
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;
