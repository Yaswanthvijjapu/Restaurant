import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [radius,setRadius] = useState(3);
  const [searchParams] = useSearchParams();

  const fetchRestaurants = useCallback(async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/restaurants/location?lat=${lat}&lng=${lng}&radius=${radius}`
      );
      const data = await response.json();

      console.log("API Response:", JSON.stringify(data, null, 2)); // Debugging

      if (Array.isArray(data)) {
        setRestaurants(data);
      } else {
        console.error("Invalid data format:", data);
        setRestaurants([]); // Ensure state is cleared if data is incorrect
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setRestaurants([]); // Clear the restaurants state on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    if (lat && lng) {
      setLatitude(lat);
      setLongitude(lng);
      fetchRestaurants(lat, lng);
    } else {
      console.error("Latitude and Longitude not provided");
    }
  }, [searchParams, fetchRestaurants]);

  if (!latitude || !longitude) {
    return (
      <div className="container mx-auto p-4 text-center">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          No location parameters found
        </motion.h1>
        <motion.div
          className="text-xl text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Please provide valid latitude and longitude in the URL.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Restaurants Around You 🌎
      </motion.h1>

      {loading ? (
        <motion.div
          className="text-center text-xl text-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => {
              const rest = restaurant.restaurant;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {rest?.featured_image ? (
                    <motion.img
                      src={rest.featured_image}
                      alt={rest.name}
                      className="w-full h-48 object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                      No image available
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      {rest?.name || "Unknown Restaurant"}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      {rest?.location?.address || "No address available"}
                    </p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="ml-1 text-gray-700">
                        {rest?.user_rating?.aggregate_rating || "N/A"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              className="text-center text-gray-500 col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No restaurants found within 3km.
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Location;
