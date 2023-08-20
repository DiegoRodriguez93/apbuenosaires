import { Col, Row } from "react-bootstrap";
import PaypalButtonDiv from "../../components/Paypal";
import "./steps.css";

export const Step3 = () => {
  return (
    <>
      <h3>Realiza el pago</h3>
      <Row>
        <Col md={2} sm={12}></Col>
        <Col md={8} sm={12}>
          <PaypalButtonDiv />
        </Col>
        <Col md={2} sm={12}></Col>
      </Row>
    </>
  );
};
