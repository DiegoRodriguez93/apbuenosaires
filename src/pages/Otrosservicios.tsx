import { Layout } from '../components/Layout';
import './generic.css';
import serv01IMG from '../servicios01.jpg';
import serv02IMG from '../servicios02.jpg';
import serv03IMG from '../servicios03.jpg';
export const Otrosservicios = () => {
  return (
    <Layout>
      <div className="contenido">
      <h1>Consulte por otros servicios adicionales:</h1><br/>
      <p>- Traslados desde Terminal de Autobuses Retiro, Aeropuertos Jorge Newbery o Ezeiza,<br/>Terminales Fluviales como Buquebus o Colonia Express.<br/><br/>
      - Compra de bebidas o alimentos para el momento de tu llegada.<br/><br/>
      - Recepción de compras on line previas a tu fecha de ingreso.<br/><br/>
      - Cambio de divisas.<br/><br/>
      - Todas las informaciones sobre Buenos Aires, no dudes en consultarnos!<br/><br/>
      </p>
      <div className="imasServicios">
      <img src={serv01IMG} alt='Traslados'/><img src={serv02IMG} alt='Compras'/><img src={serv03IMG} alt='Recepción de correo'/>
      </div>
      </div>
    </Layout>
  );
};