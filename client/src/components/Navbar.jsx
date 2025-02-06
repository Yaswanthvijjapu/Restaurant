import { Link } from "react-router-dom";
import { FaHome, FaUtensils } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        
        {/* Logo and Name (Restaurant Finder) */}
        <Link to="/" className="flex items-center space-x-2 font-poppins">
          <span className="text-3xl font-bold text-white font-poppins hidden md:block">
            Restaurant Finder
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 font-roboto">
          <Link
            to="/"
            className="text-lg font-semibold flex items-center space-x-2 hover:text-yellow-400 transition-all duration-300"
          >
            <FaHome className="text-2xl text-white" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link
            to="/restaurants"
            className="text-lg font-semibold flex items-center space-x-2 hover:text-yellow-400 transition-all duration-300"
          >
            <FaUtensils className="text-2xl text-white" />
            <span className="hidden md:inline">Restaurants</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
