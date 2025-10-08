import { useState } from 'react';
import { usePaystackPayment } from '../../Utilities/usePayment';
import { supabase } from '../../lib/supabase';

const PaymentForm = ({ amount = 1000, onSuccess }) => {
  const {
    loading,
    paystackLoaded,
    customerInfo,
    handleInputChange,
    initiatePayment,
    isValidEmail
  } = usePaystackPayment({
    amount,
    onSuccess,
    enableVerification: false // Set to true to enable backend verification
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    initiatePayment();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              isValidEmail ? 'border-gray-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500'
            }`}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Optional Name Field - Comment out if you don't want it */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Payment Information Note */}
        <div className="bg-green-50 p-4 rounded-md border border-green-200">
          <p className="text-sm text-green-700">
            💳 You'll enter your card details in the secure Paystack popup after clicking "Pay Now"
          </p>
        </div>

        {/* Amount Display */}
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount:</span>
            <span className="text-xl font-bold" >₦{amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!paystackLoaded || loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          // onClick={handlePaymentVerification}
          >
          {loading ? 'Processing...' : `Pay ₦${amount.toLocaleString()}`}
        </button>
      </form>

      {/* Security Notice */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>🔒 Your payment information is encrypted and secure</p>
        <p className="mt-1">Powered by Paystack</p>
      </div>
    </div>
  );
};

// Main component wrapper
const SecurePaymentPage = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePaymentSuccess = async (response, amount) => {
  console.log('Payment successful:', response);
  
  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from('payments').insert({
    user_id: user.id,
    amount: amount * 100, // already in Naira from PaymentForm
    reference: response.reference,
    status: 'successful',
    payment_data: response
  });

  console.log('Payment record saved to database');
  setPaymentComplete(true);
};


  if (paymentComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Thank you for your payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <PaymentForm
        amount={1000} 
        onSuccess={handlePaymentSuccess} 
      />
    </div>
  );
};

export default SecurePaymentPage;