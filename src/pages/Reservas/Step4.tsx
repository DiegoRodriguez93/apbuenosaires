import { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import PaypalButtonDiv from '../../components/Paypal';
import './steps.css';
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
    <>
      <Layout>
        <Row>
          <Col md={2} sm={12}></Col>
          <Col md={8} sm={12}>
            <h3>Detalles de su reserva</h3>
            <div>
              <p>Propiedad: {title}</p>
              <p>Fechas: {startDate} hasta: {endDate}</p>
              <p>Huéspedes: {guests}</p>
              <p>Precio total: USD {finalPrice}</p>
            </div>

            <h3>Ingrese su código de descuento si tiene uno</h3>
            <Form>
              <Form.Group controlId="discountCode">
                <Form.Label>Código de descuento:</Form.Label>
                <Form.Control
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  disabled={isApplyingDiscount || discountApplied} // Disable input if discount is applied
                />
              </Form.Group>
              {!discountApplied ? ( // Show button if discount is not applied
                <Button onClick={applyDiscount} disabled={isApplyingDiscount} style={{ marginTop: '10px' }}>
                  {isApplyingDiscount ? 'Aplicando...' : 'Aplicar código'}
                </Button>
              ) : ( // Show message if discount is applied
                <p style={{ color: 'green' }}>¡El descuento ha sido aplicado!</p>
              )}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </Form>

            <h3 style={{ marginTop: '10px' }}>Realiza el pago</h3>
            <PaypalButtonDiv
              price={finalPrice} // Use the discounted final price
              title={title}
              startDate={startDate}
              endDate={endDate}
              guests={guests}
            />
          </Col>
          <Col md={2} sm={12}></Col>
        </Row>
      </Layout>
    </>
  );
};
