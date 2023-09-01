import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Product from "./pages/products/Product";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";
import DetailProduct from "./pages/products/DetailProduct";
import ApproveProduct from "./pages/products/ApproveProduct";
import { useState } from "react";
import Commission from "./pages/Commission";


function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  return (
    <div className="app">
      <Router>
        <Navbar isAdmin={isAdmin}/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit" element={<EditProduct />} />
          <Route path="/product/detail" element={<DetailProduct isAdmin={isAdmin} />} />
          <Route path="/product-approval" element={<ApproveProduct isAdmin={isAdmin} />} />
          <Route path="/commission" element={<Commission />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
