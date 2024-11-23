// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Import pages
// import Dashboard from "./pages/Dashboard";
// import Product from "./pages/Product";
// import Report from "./pages/Report";
// import Profile from "./pages/Profile";
// import Login from "./pages/Login";

// // Import MainLayout
// import MainLayout from "./component/MainLayout";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Mengecek status login saat halaman dimuat
//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Periksa token dari localStorage
//     if (token) {
//       setIsAuthenticated(true); // Jika token ada, set status sebagai authenticated
//     } else {
//       setIsAuthenticated(false); // Jika tidak ada token, set status sebagai not authenticated
//     }
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Halaman login */}
//         <Route
//           path="/"
//           element={<Login setIsAuthenticated={setIsAuthenticated} />}
//         />

//         {/* Halaman yang dilindungi, hanya bisa diakses jika sudah login */}
//         <Route
//           path="/dashboard"
//           element={
//             isAuthenticated ? (
//               <MainLayout>
//                 <Dashboard />
//               </MainLayout>
//             ) : (
//               <Navigate to="/" replace /> // Arahkan ke halaman login jika belum login
//             )
//           }
//         />
//         <Route
//           path="/product"
//           element={
//             isAuthenticated ? (
//               <MainLayout>
//                 <Product />
//               </MainLayout>
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />
//         <Route
//           path="/report"
//           element={
//             isAuthenticated ? (
//               <MainLayout>
//                 <Report />
//               </MainLayout>
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             isAuthenticated ? (
//               <MainLayout>
//                 <Profile />
//               </MainLayout>
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Report from "./pages/Report";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import MainLayout from "./component/MainLayout";

function App() {
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
