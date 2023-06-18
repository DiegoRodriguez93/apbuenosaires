import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export const Header = () => {
  // const navigate = useNavigate();

  return (
    <Container className="bg-dark text-light" fluid>
      <Container>
        <Row className="d-flex flex-row justify-content-center align-items-center text-center" style={{ height: '120px' }}>
          <Col md={6} sm={12}>
            <h4>APBuenos Aires</h4>
            <h6>Alquileres temporarios</h6>
          </Col>
          <Col md={6} sm={12}>
            <Link className="text-light" to="/favorites">
              +54 9 11 3291-8963 / +54 9 11 5616-7916
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
