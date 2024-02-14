import { Container, Row, Col } from 'react-bootstrap';
import logoIMG from './logo.png';
import whatsIMG from './whatsapp.png';
import emailLogoIMG from './emailLogo.png';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Ensure this path is correct

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Container className="bg-dark text-light header-container" fluid>
      <Container>
        <Row className="d-flex flex-row justify-content-center align-items-center text-center header-row" style={{ height: 'auto' }}> {/* Adjusted for custom responsiveness */}
          <Col md={6} sm={12} className="header-logo">
            <img src={logoIMG} alt="AP Buenos Aires - Alquileres temporarios" onClick={() => navigate('/')} />
          </Col>
          <Col md={6} sm={12} className="header-contact">
            <a href="https://api.whatsapp.com/send/?phone=5491132918963&text&app_absent=0" className="text-light" target="_blank" rel="noopener noreferrer">
            <img src={whatsIMG} alt="Whatsapp" className="whatsapp-logo" />
              +54 9 11 3291-8963{' '}
            </a>
            <a href="https://api.whatsapp.com/send/?phone=5491156167916&text&app_absent=0" className="text-light" target="_blank" rel="noopener noreferrer">
            <img src={whatsIMG} alt="Whatsapp" className="whatsapp-logo" />
              +54 9 11 5616-7916
            </a>
            <a href="mailto:aptobuenosaires661@gmail.com" className="text-light" target="_blank" rel="noopener noreferrer">
            <img src={emailLogoIMG} alt="Email" className="email-logo" />
                 aptobuenosaires661@gmail.com
                </a>
          </Col>

        </Row>
      </Container>
    </Container>
  );
};
