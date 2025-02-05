import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]); // Stores restaurants
  const [page, setPage] = useState(1); // Page number
  const [totalPages, setTotalPages] = useState(1); // Total pages from API
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Loading state

  // Extract search query from URL parameters
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  // Memoize filtered restaurants to prevent re-filtering on every render
  const filteredRestaurants = useMemo(() => {
    if (!searchQuery) return restaurants;
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, restaurants]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true); // Set loading state to true
      try {
        const url = `https://restaurant-production-06c2.up.railway.app/api/restaurants?page=${page}&limit=16`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        let restaurantsData = [];

        // Loop through the response to extract restaurants
        for (let i = 0; i < data.restaurants.length; i++) {
          if (data.restaurants[i]?.restaurant) {
            restaurantsData.push(data.restaurants[i].restaurant);
          }
        }

        setRestaurants(restaurantsData);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading state to false once data is fetched
      }
    };

    fetchRestaurants();
  }, [page]); // ✅ Updates when page changes, keeping search independent

  // Function to determine rating color
  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    if (rating >= 2) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-blue-50 to-green-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800"><span className=" font-serif">Restaurant List</span></h1>

      {/* Loading Indicator */}
      {loading && <div className="text-center text-gray-600">Loading...</div>}

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!loading && filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="border p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-purple-200 via-pink-100 to-yellow-100 flex flex-col items-center"
            >
              <img
                src={restaurant.featured_image || restaurant.thumb || "https://via.placeholder.com/150"}
                alt={restaurant.name}
                className="w-full h-40 sm:h-48 object-cover rounded-md hover:scale-105 transition-transform duration-300 loading='lazy'"
              />
              <div className="mt-4 text-center">
                <h2 className="text-lg sm:text-xl font-semibold mt-3 text-gray-800 hover:text-blue-600 transition-colors duration-300">
                  {restaurant.name || "Unnamed Restaurant"}
                </h2>
                <p className="text-gray-600 mt-1">{restaurant.location?.city || "Unknown City"}</p>
                <p className="text-gray-800 mt-1 text-sm sm:text-base">Avg Cost for two: Rs. {restaurant.average_cost_for_two || "N/A"}</p>

                {/* Rating Section */}
                <div className="flex justify-center items-center mt-3">
                  <span className={`px-3 py-1 text-white text-xs sm:text-sm rounded-full ${getRatingColor(restaurant.user_rating?.aggregate_rating)}`}>
                    ⭐ {restaurant.user_rating?.aggregate_rating || "N/A"}
                  </span>
                  <span className="ml-2 text-gray-600 text-xs sm:text-sm">({restaurant.user_rating?.votes || 0} votes)</span>
                </div>

                <Link
                  to={`/restaurant/${restaurant.id}`}
                  className="mt-4 inline-block text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300 text-sm sm:text-base"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-600 col-span-full">No restaurants found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-6">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-400 to-teal-500 text-white rounded-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-200 to-orange-200 text-gray-800 rounded-lg text-sm sm:text-base">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-400 to-teal-500 text-white rounded-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantsList;
