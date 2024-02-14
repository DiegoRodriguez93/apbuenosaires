import { Col, Row } from 'react-bootstrap';
import PaypalButtonDiv from '../../components/Paypal';
import './steps.css';
import { FC } from 'react';
import { Layout } from '../../components/Layout';
import { useLocation } from 'react-router-dom';


export const Step4 = () => {
  const location = useLocation();
  const { price, startDate, endDate, guests, title } = location.state || {}; // Destructure the details from the state

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
        <p>Precio total: USD {price}</p>
      </div>
      <h3>Realiza el pago</h3>
          <PaypalButtonDiv price={price} title={title} startDate={startDate} endDate={endDate} guests={guests} />
        </Col>
        <Col md={2} sm={12}></Col>
      </Row>
      </Layout>
    </>
  );
};
