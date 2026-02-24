import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

declare global {
  interface Window { Razorpay: any }
}

const Checkout = () => {
  const { total, cart } = useContext(CartContext);

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: total * 100,
      currency: "INR",
      name: "FitStore",
      handler: async () => {
        await addDoc(collection(db, "orders"), {
          items: cart,
          total,
          date: new Date()
        });
        alert("Payment Successful");
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Total: ₹{total}</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;