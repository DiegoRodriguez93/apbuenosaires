import { Container, Row, Col } from 'react-bootstrap';
import logoIMG from './logo.png';
import whatsIMG from './whatsapp.png';
// import { useNavigate } from 'react-router-dom';

export const Header = () => {
  // const navigate = useNavigate();

  return (
    <Container className="bg-dark text-light" fluid>
      <Container>
        <Row className="d-flex flex-row justify-content-center align-items-center text-center" style={{ height: '120px' }}>
          <Col md={6} sm={12}>
            <img src={logoIMG} alt="AP Buenos Aires - Alquileres temporarios" />
          </Col>
          <Col md={6} sm={12}>
            <a href="https://api.whatsapp.com/send/?phone=5491132918963&text&app_absent=0" className="text-light" style={{ textDecoration: 'none'}} target="_blank">
              <img src={whatsIMG} alt="Whatsapp" />
              +54 9 11 3291-8963{' '}
            </a>
            <a href="https://api.whatsapp.com/send/?phone=5491156167916&text&app_absent=0" className="text-light" style={{ textDecoration: 'none'}} target="_blank">
              | +54 9 11 5616-7916
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
