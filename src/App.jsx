import React, { useEffect, useState } from "react";
// import { supabase } from "./lib/supabase";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./pages/home/Navbar";
import Hero from "./pages/home/Hero";
import PropertyListings from "./pages/properties/PropertyListings";
import FeaturedProperties from "./pages/properties/FeaturedProperties";
import Footer from "./pages/footer/Footer";
import PropertyDetails from "./pages/properties/PropertyDetails";
import Agents from "./pages/Agents";
import Contact from "./pages/Contact";
import Rent from "./pages/Rent";
import Buy from "./pages/Buy";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import PropertyUploadForm from "./pages/properties/PropertyUploadForm";
import ProtectedRoute from "./pages/properties/ProtectedRoute"; // Add this import
import toast, { Toaster } from "react-hot-toast";
import PageNotFound from "./components/PageNotFound";
import ForgetPassword from "./pages/auth/forgetPassword";
import useUserType from "./Utilities/hooks/useUserType";
import SecurePaymentPage from "./pages/auth/PayMe";
// import { usePaystackPayment } from "./Utilities/usePayment";
// import { supabase } from "./lib/supabase";

function App() {
//   const [paymentSuccess, setPaymentSuccess] = useState(localStorage.getItem('hasAccessPayment') === 'true');
// const [checkingPayment, setCheckingPayment] = useState(true);
const {isAgent} = useUserType();
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/payment" element={<SecurePaymentPage />} />
            {/* <Route path='/payment' element={<Pa />} /> */}
            <Route
              path="/"
              index
              element={
                <div>
                  <Hero />
                  <FeaturedProperties />
                  <PropertyListings />
                </div>
              }
            />
            <Route
              path="/property/:id"
              element={
                  <ProtectedRoute>
                    <PropertyDetails />
                  </ProtectedRoute>
              }
            />
            <Route
              path="/rent"
              element={
                <ProtectedRoute>
                  <Rent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buy"
              element={
                <ProtectedRoute>
                  <Buy />
                </ProtectedRoute>
              }
            />

            {
            isAgent && (
              <Route
              path="/upload-property"
              element={
                <ProtectedRoute>
                  <PropertyUploadForm />
                </ProtectedRoute>
              }
            />
              )
            }                             
            <Route
              path="/agents"
              element={
                <ProtectedRoute>
                  <Agents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            // backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
