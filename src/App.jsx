import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Purchases from "./pages/Purchases";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const loading = useSelector((state) => state.loading);

  return (
    <HashRouter>
      <div>
        {loading && <Loader />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/Purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
