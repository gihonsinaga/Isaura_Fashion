import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Report from "./pages/Report";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import MainLayout from "./component/MainLayout";

function App() {
  const [isDesktop, setIsDesktop] = useState(true);

  const checkDevice = () => {
    // Cek apakah layar lebih kecil dari 1024px
    setIsDesktop(window.innerWidth > 1024);
  };

  useEffect(() => {
    checkDevice(); // Cek saat halaman dimuat
    window.addEventListener("resize", checkDevice); // Cek saat layar diubah
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!isDesktop) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "blue" }}>
        <h1 className="mt-64">
          Maaf, Untuk saat ini website ini hanya dapat diakses pada perangkat
          desktop.
        </h1>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/product"
          element={
            <MainLayout>
              <Product />
            </MainLayout>
          }
        />
        <Route
          path="/report"
          element={
            <MainLayout>
              <Report />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
