import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { db } from '../../firebase'; // Make sure this path is correct
import { doc, setDoc, collection } from "firebase/firestore"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type PaypalButtonDivProps = {
  price: number;
  title: string; // Assuming you pass these additional props
  startDate: string;
  endDate: string;
  guests: number;
};

const PaypalButtonDiv: React.FC<PaypalButtonDivProps> = ({ price, title, startDate, endDate, guests }) => {
    const CLIENT_ID = "ARVXddgbFxt6kk-e5ZY3H74PpIa6a77OAwAdO7fk9ZW8q8gaZl3x9IcnHBfSek80Cu_uOyjpQ3Nj1gUW";

    const handleSuccess = async (details: any, data: any) => {
      console.log("Pago exitoso:", details, data);
      // Here you would write the reservation details to Firestore
      try {
        const reservationRef = doc(collection(db, "reservations")); // Create a new doc in the reservations collection
        await setDoc(reservationRef, {
          title,
          startDate,
          endDate,
          guests,
          price,
          paymentDetails: details, // Store some payment details if necessary
          createdAt: new Date() // Timestamp for when the reservation was made
        });
        toast.success("Reserva realizada, nos contactaremos con usted a la brevedad.");
        console.log("Reservation saved to Firestore successfully!");
        // Redirect the user or show a success message
      } catch (error) {
        console.error("Error saving reservation to Firestore:", error);
        // Handle the error (e.g., show an error message)
      }
    };

    return (
      <div className="input-group cien">
        <div>
          <PayPalButton
            amount={price}
            onSuccess={handleSuccess}
            catchError={(err: any) => {
              console.error("Error en el pago:", err);
            }}
            onError={(err: any) => {
              console.error("Error:", err);
            }}
            options={{
              clientId: CLIENT_ID,
              currency: 'USD'
            }}
            shippingPreference="NO_SHIPPING"
          />
        </div>
        <ToastContainer position="top-center" autoClose={10000} />
      </div>
    );
  };
  
  export default PaypalButtonDiv;