import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "./Navbar";

const Namesearch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const restaurantName = queryParams.get("search")?.trim();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 16;

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!restaurantName) {
        console.log("No restaurant name provided, skipping API call.");
        return;
      }
    
      setLoading(true);
      console.log(`Fetching restaurants for search term: "${restaurantName}"`);
    
      try {
        const response = await fetch(
          `https://restaurant-production-06c2.up.railway.app/restaurants/?name=${encodeURIComponent(restaurantName)}`
        );
        console.log("API request sent successfully.");
    
        if (!response.ok) throw new Error("Failed to fetch restaurants");
    
        const data = await response.json();
        console.log("API Response Data:", data);
    
        if (Array.isArray(data?.restaurants)) {
          console.log("Found 'restaurants' array in response:", data.restaurants);
    
          const restaurantList = data.restaurants.map((item) => item?.restaurants?.restaurant);
    
          console.log("Extracted Restaurants:", restaurantList);
          setRestaurants(restaurantList);
        } else {
          console.log("No valid 'restaurants' array found in the response.");
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
        console.log("API fetch complete.");
      }
    };
    
    fetchRestaurants();
    setCurrentPage(1);
  }, [restaurantName]);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  const totalPages = Math.max(Math.ceil(restaurants.length / restaurantsPerPage), 1);

  console.log("Current Page:", currentPage);
  console.log("Total Restaurants:", restaurants.length);
  console.log("Displayed Restaurants:", currentRestaurants);

  const getRatingColor = (rating) => {
    console.log("Rating:", rating);
    return rating >= 4 ? "bg-green-500" : rating >= 3 ? "bg-yellow-500" : "bg-red-500";
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-8 pt-16">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Search Results for "{restaurantName || 'All'}"
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading restaurants...</p>
      ) : currentRestaurants.length === 0 ? (
        <p className="text-center text-gray-500">No restaurants found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentRestaurants.map((restaurant) => {
              if (!restaurant) {
                console.log("Skipping undefined restaurant.");
                return null;
              }
              const { id, name, location, average_cost_for_two, user_rating, featured_image, thumb } = restaurant;
              console.log(`Rendering restaurant: ${name}, ID: ${id}`);

              return (
                <div
                  key={id}
                  className=" p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center"
                >
                  <img
                    src={featured_image || thumb || "https://via.placeholder.com/150"}
                    alt={name || "Unnamed Restaurant"}
                    className="w-full h-40 sm:h-48 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="mt-4 text-center">
                    <h2 className="text-lg sm:text-xl font-semibold mt-3 text-gray-800 hover:text-blue-600 transition-colors duration-300">
                      {name || "Unnamed Restaurant"}
                    </h2>
                    <p className="text-gray-600 mt-1">{location?.city || "Unknown City"}</p>
                    <p className="text-gray-800 mt-1 text-sm sm:text-base">
                      Avg Cost for two: Rs. {average_cost_for_two || "N/A"}
                    </p>

                    <div className="flex justify-center items-center mt-3">
                      <span className={`px-3 py-1 text-white text-xs sm:text-sm rounded-full ${getRatingColor(user_rating?.aggregate_rating)}`}>
                        ⭐ {user_rating?.aggregate_rating || "N/A"}
                      </span>
                      <span className="ml-2 text-gray-600 text-xs sm:text-sm">
                        ({user_rating?.votes || 0} votes)
                      </span>
                    </div>

                    <Link
                      to={`/restaurant/${id}`}
                      className="mt-4 inline-block text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300 text-sm sm:text-base"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {restaurants.length > restaurantsPerPage && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-white font-bold rounded-lg ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
              >
                Previous
              </button>

              <span className="text-gray-700 text-lg">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages}
                className={`px-4 py-2 text-white font-bold rounded-lg ${currentPage >= totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
};

export default Namesearch;