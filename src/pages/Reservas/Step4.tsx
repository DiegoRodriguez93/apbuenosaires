import { useState } from 'react';
import PaypalButtonDiv from '../../components/Paypal';
import '../generic.css'; // Import the generic styles
import { Layout } from '../../components/Layout';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase'; // Import Firebase
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment'; // Import moment for date calculations

export const Step4 = () => {
  const location = useLocation();
  const { price, startDate, endDate, guests, title } = location.state || {}; // Destructure the details from the state

  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0); // To store the discount percentage
  const [finalPrice, setFinalPrice] = useState(price); // To store the final price after applying the discount
  const [error, setError] = useState(''); // To handle error messages
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false); // Loading state
  const [discountApplied, setDiscountApplied] = useState(false); // State to track if discount is applied

  // Calculate the number of days between start and end dates
  const calculateDays = (start: string, end: string): number => { // Specify parameter types and return type
    const startMoment = moment(start, 'DD-MM-YYYY'); // Assuming your date format is DD-MM-YYYY
    const endMoment = moment(end, 'DD-MM-YYYY');
    return endMoment.diff(startMoment, 'days');
  };

  const daysOfStay = calculateDays(startDate, endDate);

  // Function to handle discount code validation
  const applyDiscount = async () => {
    setIsApplyingDiscount(true);
    setError(''); // Clear previous errors

    try {
      const querySnapshot = await getDocs(collection(db, 'discountCodes'));
      let validCode = false;
      const inputCode = discountCode.trim().toLowerCase(); // Convert input code to lowercase

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const storedCode = data.name.toLowerCase(); // Convert stored code to lowercase for comparison

        if (storedCode === inputCode) {
          validCode = true;
          let discountPercentage = data.percentage;

          // Apply special logic for reservations of 7 days or more with a discount less than 10%
          if (discountPercentage < 10 && daysOfStay >= 7) {
            discountPercentage = 10; // Set discount to 10% if the days of stay are 7 or more
          }

          setDiscountAmount(discountPercentage);

          // Calculate the new final price after applying the discount
          const discountedPrice = price - (price * discountPercentage) / 100;
          setFinalPrice(discountedPrice);
          setDiscountApplied(true); // Set discount applied to true
        }
      });

      if (!validCode) {
        setError('El código de descuento no es válido.');
        setFinalPrice(price); // Reset to original price if code is invalid
      }
    } catch (error) {
      console.error('Error applying discount code:', error);
      setError('Error al aplicar el código de descuento.');
    } finally {
      setIsApplyingDiscount(false);
    }
  };

  return (
    <Layout>
      <div className="page-container form-container">
        <h3>Detalles de su reserva</h3>
        <div>
          <p><strong>Propiedad:</strong> {title}</p>
          <p><strong>Fechas:</strong> {startDate} hasta {endDate}</p>
          <p><strong>Huéspedes:</strong> {guests}</p>
          <p><strong>Precio total:</strong> USD {finalPrice.toFixed(2)}</p>
        </div>

        <h3>Ingrese su código de descuento si tiene uno</h3>
        <div>
          <label htmlFor="discountCode">Código de descuento:</label>
          <input
            type="text"
            id="discountCode"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            disabled={isApplyingDiscount || discountApplied}
          />
          {!discountApplied ? (
            <button
              className="apply-discount-button" // Add this class
              onClick={applyDiscount}
              disabled={isApplyingDiscount}
              style={{ marginTop: '10px' }}
            >
              {isApplyingDiscount ? 'Aplicando...' : 'Aplicar código'}
            </button>
          ) : (
            <p className="success-message">¡El descuento ha sido aplicado!</p>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="payment-section">
          <h3>Realiza el pago</h3>
          <PaypalButtonDiv 
            price={finalPrice}
            title={title}
            startDate={startDate}
            endDate={endDate}
            guests={guests}
          />
        </div>
      </div>
    </Layout>
  );
};