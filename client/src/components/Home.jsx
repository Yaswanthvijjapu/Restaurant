import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const Home = () => {
  const [searchType, setSearchType] = useState("name");
  const [inputValue, setInputValue] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Correctly handle image file
    }
  };

  const handleSearch = () => {
    if (searchType === "name" && inputValue.trim()) {
      navigate(`/namesearch?search=${inputValue.trim()}`);
    } else if (searchType === "location" && latitude.trim() && longitude.trim() && radius.trim()) {
      navigate(`/restaurants/location?lat=${latitude}&lng=${longitude}&radius=${radius}`);
    } else if (searchType === "image" && imageFile) {
      navigate("/imagesearch", { state: { image: imageFile } }); // Pass the image file correctly
    } else {
      alert("Please enter valid input!");
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
          navigate(`/restaurants/location?lat=${lat}&lng=${lng}&radius=20`);
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
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 p-6">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Welcome to Restaurants Finder
        </h2>
        <p className="text-sm sm:text-lg text-gray-700 mt-4">Discover the best places to eat</p>
      </div>

      <div className="w-full max-w-lg mt-6 flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <motion.button onClick={() => setSearchType("location")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${searchType === "location" ? "bg-blue-700 text-white" : "bg-gray-200"}`}>Location Search</motion.button>
          <motion.button onClick={() => setSearchType("name")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${searchType === "name" ? "bg-blue-700 text-white" : "bg-gray-200"}`}>Search by Name</motion.button>
          <motion.button onClick={() => setSearchType("image")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${searchType === "image" ? "bg-blue-700 text-white" : "bg-gray-200"}`}>Search by Image</motion.button>
        </div>

        {searchType === "location" ? (
          <>
            <input
              type="text"
              placeholder="Enter Latitude..."
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full p-3 mb-2 rounded-lg bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-md"
            />
            <input
              type="text"
              placeholder="Enter Longitude..."
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full p-3 mb-2 rounded-lg bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-md"
            />
            <input
              type="text"
              placeholder="Enter Radius (in km)..."
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-full p-3 mb-2 rounded-lg bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-md"
            />
            <motion.button onClick={handleUseMyLocation} className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
              Use My Location
            </motion.button>
          </>
        ) : (
          <input
            type={searchType === "image" ? "file" : "text"}
            placeholder={searchType === "name" ? "Search Restaurants by Name..." : "Upload an Image"}
            value={searchType !== "image" ? inputValue : ""}
            onChange={(e) => searchType === "image" ? handleFileChange(e) : setInputValue(e.target.value)}
            className="w-full p-3 rounded-lg bg-white bg-opacity-80 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-md"
          />
        )}

        <motion.button
          onClick={handleSearch}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto"
        >
          Search Restaurants
        </motion.button>

        <motion.button
          onClick={() => navigate("/restaurants")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto"
        >
          View Restaurants
        </motion.button>
      </div>
    </div>
    </>

  );
};

export default Home;
