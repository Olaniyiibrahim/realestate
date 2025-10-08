import React, { useEffect, useState } from "react";
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
import { usePaystackPayment } from "./Utilities/usePayment";
import { supabase } from "./lib/supabase";

function App() {
  const [paymentSuccess, setPaymentSuccess] = useState(localStorage.getItem('hasAccessPayment') === 'true');
const [checkingPayment, setCheckingPayment] = useState(true);
const { user} = useUserType();
useEffect(() => {
  const checkUserPayment = async () => {
    setCheckingPayment(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'successful')
        .maybeSingle();  // instead of limit(1)

      if (data) {
        setPaymentSuccess(true);
        localStorage.setItem('hasAccessPayment', 'true');
      } else {
        setPaymentSuccess(false);
        localStorage.removeItem('hasAccessPayment');
      }
    }
    setCheckingPayment(false);
  };

  if (user) checkUserPayment();
}, [user]);

const { 
  loading: paymentLoading, 
  customerInfo, 
  handleInputChange, 
  initiatePayment 
} = usePaystackPayment({
  amount: 1000,
  onSuccess: async (response) => {
    console.log('Payment successful:', response);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase.from('payments').insert({
          user_id: user.id,
          amount: 1000,
          reference: response.reference,
          status: 'successful',
          payment_data: response
        });

        if (error) {
          console.error('Database insert error:', error);
          toast.error('Payment recorded but failed to save: ' + error.message);
          return;
        }

        console.log('Payment saved to database:', data);
        
        // Update state immediately
        setPaymentSuccess(true);
        localStorage.setItem('hasAccessPayment', 'true');
        
        toast.success('Payment successful! Redirecting...');
        
        // Force refresh after short delay
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Payment save error:', error);
      toast.error('Error saving payment: ' + error.message);
    }
  },
  enableVerification: false 
});

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
              element={checkingPayment ? (
                  <div className="flex items-center justify-center min-h-screen">
                    <p>Checking your payment status...</p>
                  </div>
                ) : user && paymentSuccess ? (
                  <ProtectedRoute>
                    <PropertyDetails />
                  </ProtectedRoute>
                ) :(
                  <div>
                  {
                  !user ?
                    (
                      <ProtectedRoute>
                        <SignIn />
                      </ProtectedRoute>
                    )
                    :
                    (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {/* <SecurePaymentPage /> */}
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                      <h3 className="text-xl font-bold mb-4">
                        Get Full Access
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Pay ₦1,000 to access all features
                      </p>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full p-3 border rounded mb-4"
                      />
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="w-full p-3 border rounded mb-4"
                      />

                      <div className="flex gap-4">
                        <button
                          onClick={() => window.history.back()}
                          className="flex-1 bg-gray-500 text-white p-3 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={initiatePayment}
                          disabled={paymentLoading}
                          className="flex-1 bg-green-600 text-white p-3 rounded"
                        >
                          {paymentLoading ? "Processing..." : "Pay ₦1,000"}
                        </button>
                      </div>
                    </div>
                  </div>
                    )
                    
                  }
                  </div>
                 
                )
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
              user && paymentSuccess && (
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
