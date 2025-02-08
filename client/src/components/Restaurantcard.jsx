import React from "react";

const Restaurantcard = ({ restaurant }) => {
  const imageSrc = restaurant?.featured_image || "https://via.placeholder.com/400"; // Fallback image

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={imageSrc}
        alt={restaurant?.name || "Restaurant"}
        className="w-full h-48 object-cover"
        onError={(e) => e.target.src = "https://via.placeholder.com/400"} // Handles image load errors
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{restaurant?.name || "Unknown Restaurant"}</h3>
        <p className="text-gray-600">{restaurant?.location?.address || "Address not available"}</p>
        <p className="text-gray-700">
          <strong>Cuisine:</strong> {restaurant?.cuisines || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Rating:</strong> {restaurant?.user_rating?.aggregate_rating || "No rating"} ⭐ ({restaurant?.user_rating?.votes || 0} votes)
        </p>
        <p className="text-gray-700">
          <strong>Price Range:</strong> {"₹".repeat(restaurant?.price_range || 1)}
        </p>
        <div className="flex justify-between mt-4">
          {restaurant?.menu_url && (
            <a
              href={restaurant?.menu_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View Menu
            </a>
          )}
          {restaurant?.url && (
            <a
              href={restaurant?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
            >
              Visit Page
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurantcard;
