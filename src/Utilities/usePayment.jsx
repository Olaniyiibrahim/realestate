import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

export const usePaystackScript = () => {
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  
  
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="paystack"]');
    if (existingScript) {
      setPaystackLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    script.onerror = () => {
      toast.error('Failed to load payment system');
      setPaystackLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  return paystackLoaded;
};

// Hook for customer information
export const useCustomerInfo = (initialValues = { name: '', email: '' }) => {
  const [customerInfo, setCustomerInfo] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetCustomerInfo = () => {
    setCustomerInfo(initialValues);
  };

  const isValidEmail = customerInfo.email && /\S+@\S+\.\S+/.test(customerInfo.email);
  
return {
  customerInfo,
  handleInputChange,
  resetCustomerInfo,
  isValidEmail
};
};

// Hook for payment verification
export const usePaymentVerification = () => {
  // const navigate = useNavigate()
  const verifyPayment = async (reference, metadata) => {
    try {
      const verifyResponse = await fetch('https://kyinlmxwqomlybwbfblm.supabase.co/functions/v1/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference,
          metadata
        }),
      });
      
      if (!verifyResponse.ok) {
        throw new Error('Payment verification failed');
      }
      
      const verificationData = await verifyResponse.json();
      if(verificationData.status === 'success'){
        // navigate('/')
      }
      return verificationData;
      
    } catch (error) {
      console.error('Verification error:', error);
      throw error;
    }
  };

  return { verifyPayment };
};

// Main payment hook
export const usePaystackPayment = ({ 
  amount, 
  // propertyId, 
  onSuccess, 
  onError,
  enableVerification = false 
}) => {
  const [loading, setLoading] = useState(false);
  const paystackLoaded = usePaystackScript();
  const { customerInfo, handleInputChange, isValidEmail } = useCustomerInfo();
  const { verifyPayment } = usePaymentVerification();


  const validatePayment = () => {
    if (!paystackLoaded) {
      toast.error('Payment system is still loading. Please try again.');
      return false;
    }

    if (!isValidEmail) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY) {
      toast.error('Payment system not configured. Please contact support.');
      return false;
    }

    return true;
  };

  const handlePaymentSuccess = (response) => {
      // const navigate = useNavigate()
    console.log('Payment successful:', response);
    
    if (enableVerification) {
      // Handle verification asynchronously without blocking the callback
      verifyPayment(response.reference, {
        // property_id: propertyId,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email
      }).then(() => {
        toast.success('Payment verified successfully!');
      }).catch((error) => {
        toast.error('Payment verification failed: ' + error.message);
        if (onError) {
          onError(error);
        }
      }).finally(() => {
        setLoading(false);
      });
    } else {
      toast.success('Payment successful!');
      // navigate('/')
      setLoading(false);
    }

    if (onSuccess) {
      onSuccess(response);
      // navigate('/')
    }
  };

  const initiatePayment = async () => {
    if (!validatePayment()) {
      return;
    }

    setLoading(true);

    try {
      // Generate unique reference
      const reference = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      // Initialize Paystack payment
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: customerInfo.email,
        amount: amount * 100, // Amount in kobo
        currency: 'NGN',
        reference: reference,
        metadata: {
          // property_id: propertyId,
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
        },
        callback: handlePaymentSuccess,
        onClose: () => {
          toast.error('Payment was cancelled');
          setLoading(false);
        }
      });

      handler.openIframe();
    } catch (error) { 
      toast.error('Payment failed: ' + error.message);
      console.error('Payment error:', error);
      setLoading(false);
      if (onError) {
        onError(error);
      }
    }
  };

  return {
    loading,
    paystackLoaded,
    customerInfo,
    handleInputChange,
    initiatePayment,
    isValidEmail
  };
};

