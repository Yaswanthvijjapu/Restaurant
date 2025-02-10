import { Link } from "react-router-dom";
import { FaHome, FaUtensils } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-100 p-4 text-gray-900 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        
        {/* Logo and Name (Restaurant Finder) */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-blue-700 hidden md:block">
            Restaurant Finder
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-lg font-semibold flex items-center space-x-2 transition-all duration-300 hover:text-blue-700"
          >
            <FaHome className="text-2xl text-blue-700" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link
            to="/restaurants"
            className="text-lg font-semibold flex items-center space-x-2 transition-all duration-300 hover:text-blue-700"
          >
            <FaUtensils className="text-2xl text-blue-700" />
            <span className="hidden md:inline">Restaurants</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
