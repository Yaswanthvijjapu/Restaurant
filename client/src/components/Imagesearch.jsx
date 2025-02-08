import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import RestaurantCard from "../components/Restaurantcard";
import Navbar from "./Navbar";

const ImageSearch = () => {
  const location = useLocation();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 9;

  // Extract image from state
  const image = location.state?.image;

  useEffect(() => {
    if (!image) {
      console.warn("No image found in state");
      return;
    }

    console.log("Received image in ImageSearch:", image.name);

    const fetchRestaurants = async () => {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch("http://localhost:5000/restaurants/imgsearch", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.restaurants) {
          setRestaurants(data.restaurants);
        } else {
          console.warn("No restaurants found in API response");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        alert("Failed to fetch restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [image]);

  // Get current restaurants based on pagination
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-8 pt-16 bg-gradient-to-r from-slate-100 via-gray-200 to-stone-300 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Image-Based Restaurant Search</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading restaurants...</p>
      ) : currentRestaurants.length === 0 ? (
        <p className="text-center text-gray-500">No restaurants found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRestaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-white font-bold rounded-lg ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
            >
              Previous
            </button>

            <span className="text-gray-700 text-lg">Page {currentPage}</span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastRestaurant >= restaurants.length}
              className={`px-4 py-2 text-white font-bold rounded-lg ${indexOfLastRestaurant >= restaurants.length ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default ImageSearch;
