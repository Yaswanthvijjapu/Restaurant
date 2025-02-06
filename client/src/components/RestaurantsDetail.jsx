import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantsDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        console.log("Fetching restaurant details for ID:", id);
        const response = await fetch(`https://restaurant-production-06c2.up.railway.app/api/restaurants/${id}`);
        const data = await response.json();

        console.log("API Response:", data);

        if (!data || !data.restaurant) {
          console.error("Invalid response structure:", data);
        } else {
          setRestaurant(data.restaurant);
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return <div className="text-center text-gray-600 text-xl mt-10">Loading restaurant details...</div>;
  }

  // Function to determine rating color
  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    if (rating >= 2) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50"> {/* Added light background color here */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Restaurant Image */}
        <img
          src={restaurant.featured_image || restaurant.thumb || "https://via.placeholder.com/600x300"}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-lg"
        />

        {/* Restaurant Name & Details */}
        <h1 className="text-3xl font-bold mt-4">{restaurant.name}</h1>
        <p className="text-gray-600 mt-1">{restaurant.location?.locality_verbose || "Unknown Location"}</p>
        <p className="text-gray-800 mt-2">Cuisines: <span className="font-semibold">{restaurant.cuisines || "N/A"}</span></p>
        <p className="text-gray-800">Average Cost for Two: <span className="font-semibold">Rs. {restaurant.average_cost_for_two || "N/A"}</span></p>

        {/* Rating Section */}
        <div className="flex items-center mt-3">
          <span className={`px-3 py-1 text-white text-lg font-semibold rounded ${getRatingColor(restaurant.user_rating?.aggregate_rating)}`}>
            ⭐ {restaurant.user_rating?.aggregate_rating || "N/A"}
          </span>
          <span className="ml-2 text-gray-600">({restaurant.user_rating?.votes || 0} votes)</span>
        </div>

        {/* Online Delivery & Table Booking */}
        <div className="mt-4 flex flex-col space-y-2 text-gray-800">
          <p><strong>Online Delivery:</strong> {restaurant.has_online_delivery ? "✅ Available" : "❌ Not Available"}</p>
          <p><strong>Table Booking:</strong> {restaurant.has_table_booking ? "✅ Available" : "❌ Not Available"}</p>
          <p><strong>Price Range:</strong> {"💰".repeat(restaurant.price_range)}</p>
        </div>

        {/* External Links */}
        <div className="mt-6 flex justify-center gap-6">
          <a href={restaurant.menu_url} target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            📜 View Menu
          </a>
          <a href={restaurant.photos_url} target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition">
            📸 View Photos
          </a>
          <a href={restaurant.url} target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
            🔗 Visit on Zomato
          </a>
        </div>

        {/* Book Food Button */}
        <div className="mt-6 text-center">
        <a href={restaurant.url}><button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
            🍽 Book Food
          </button></a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsDetail;