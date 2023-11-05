import { Col, Row } from 'react-bootstrap';
import PaypalButtonDiv from '../../components/Paypal';
import './steps.css';
import { FC } from 'react';

type Step4Props = {
  price: number;
};

export const Step4: FC<Step4Props> = ({ price }) => {
  return (
    <>
      <h3>Realiza el pago</h3>
      <Row>
        <Col md={2} sm={12}></Col>
        <Col md={8} sm={12}>
          <PaypalButtonDiv price={price} />
        </Col>
        <Col md={2} sm={12}></Col>
      </Row>
    </>
  );
};
