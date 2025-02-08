import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RestaurantsList from "./components/RestaurantsList";
import RestaurantsDetail from "./components/RestaurantsDetail";
import Location from "./components/Location";
import Namesearch from "./components/Namesearch";
import Imagesearch from "./components/Imagesearch";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantsList />} />
        <Route path="/restaurant/:id" element={<RestaurantsDetail />} />
        <Route path="restaurants/location" element={<Location />} />
        <Route path="/namesearch" element={<Namesearch />} />
        <Route path="/imagesearch" element={<Imagesearch />} />
        </Routes>
    </Router>
  );
};

export default App;
