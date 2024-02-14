import { Navbar as BootstrapNavBar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './navbar.css'

export const Navbar = () => {
  // const { t } = useTranslation('footer');
  const isActiveStyle = ({ isActive }: { isActive: boolean }) => (isActive ? 'text-danger nav-link navbarLink' : 'nav-link navbarLink');

  return (
    <BootstrapNavBar bg="light" expand="lg" variant="light" className="w-100">
          <Nav className="me-auto d-flex justify-content-center w-100">
          <NavLink className={isActiveStyle} to="/nuestra-propuesta" style={{ marginRight: '10px' }}>
          Nuestra propuesta
        </NavLink>
        <NavLink className={isActiveStyle} to="/ubicaciones" style={{ marginRight: '10px' }}>
          Ubicaciones
        </NavLink>
        <NavLink className={isActiveStyle} to="/fotos" style={{ marginRight: '10px' }}>
          Fotos
        </NavLink>
        <NavLink className={isActiveStyle} to="/otros-servicios" style={{ marginRight: '10px' }}>
          Otros servicios
        </NavLink>
        <NavLink className={isActiveStyle} to="/reservas">
          Reservas
        </NavLink>
          </Nav>
      </BootstrapNavBar>
  );
};
