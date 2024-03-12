import { Layout } from '../components/Layout';
import './generic.css';
import serv01IMG from '../a1.jpg';
import serv02IMG from '../a2.jpg';
import serv03IMG from '../a3.jpg';

export const Comodidades = () => {
  return (
    <Layout>
      <div className="contenido">
      <h2>Nuestra Propuesta</h2><br/>
      <p><strong>Ofrecemos alquileres temporarios en Buenos Aires.</strong><br/><br/>

      Hemos armado cada departamento poniendo mucha dedicación y esmero, pensando en todos los detalles e incluyendo
todas las comodidades para que te sientas como en tu propia casa.<br/><br/>

Los apartamentos los hemos pensado tanto para viajes de turismo, como de trabajo, de estudio o cualquier motivo que te acerque a esta maravillosa ciudad.<br/><br/>

Contamos con 3 apartamentos en el barrio de Montserrat(pegadito a San Telmo) para hasta 6 personas y un apartamento en la zona de Palermo para hasta 4 personas.<br/><br/>

Te esperamos!
<br/><br/></p>

<div className="imasServicios">
      <img src={serv01IMG} alt='Traslados'/><img src={serv02IMG} alt='Compras'/><img src={serv03IMG} alt='Recepción de correo'/>
      </div>
</div>
    </Layout>
  );
};
