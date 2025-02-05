import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/10 p-4 text-white shadow-xl fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and App Name */}
        <Link
          to="/"
          className="text-3xl font-bold hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
        >
          <span className="font-serif bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Restaurant Finder
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-lg font-semibold hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <span className="font-serif bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Home
            </span>
          </Link>
          <Link
            to="/restaurants"
            className="text-lg font-semibold hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            <span className="font-serif bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Restaurants
            </span>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="text-xl hover:text-yellow-400 transition-all duration-300 transform hover:scale-110">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;