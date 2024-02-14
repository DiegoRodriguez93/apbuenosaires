import { Navbar as BootstrapNavBar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './navbar.css'

export const Navbar = () => {
  // const { t } = useTranslation('footer');
  const isActiveStyle = ({ isActive }: { isActive: boolean }) => (isActive ? 'text-danger nav-link navbarLink' : 'nav-link navbarLink');

  return (
    <Container fluid>
      <BootstrapNavBar bg="light" expand="lg">
        <Container>
          <Nav className="me-auto d-flex justify-content-center w-100">
            <NavLink className={isActiveStyle} to="/nuestra-propuesta">
              Nuestra propuesta
            </NavLink>
            <NavLink className={isActiveStyle} to="/ubicaciones">
              Ubicaciones
            </NavLink>
            <NavLink className={isActiveStyle} to="/fotos">
              Fotos
            </NavLink>
            <NavLink className={isActiveStyle} to="/otros-servicios">
              Otros servicios
            </NavLink>
            <NavLink className={isActiveStyle} to="/reservas">
              Reservas
            </NavLink>
          </Nav>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
};
