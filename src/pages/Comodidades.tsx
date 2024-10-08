import React from 'react';
import { Layout } from '../components/Layout';
import './generic.css';
import serv01IMG from '../a1.jpg';
import serv02IMG from '../a2.jpg';
import serv03IMG from '../a3.jpg';
import serv04IMG from '../a4.jpg';

export const Comodidades = () => {
  return (
    <Layout>
      <div className="page-container">
        <h2>Nuestra Propuesta</h2>

        <p>
          <strong>Ofrecemos alquileres temporarios en Buenos Aires.</strong>
        </p>

        <p>
          Hemos armado cada departamento poniendo mucha dedicación y esmero, pensando en todos los detalles e incluyendo
          todas las comodidades para que te sientas como en tu propia casa.
        </p>

        <p>
          Los apartamentos los hemos pensado tanto para viajes de turismo, como de trabajo, de estudio o cualquier motivo que te acerque a esta maravillosa ciudad.
          Contamos con 3 apartamentos en el barrio de Montserrat (pegadito a San Telmo) para hasta 6 personas y un apartamento en la zona de Palermo para hasta 4 personas.
          ¡Te esperamos!
        </p>

        <div className="custom-image-gallery">
          <img src={serv01IMG} alt="Apto 3" />
          <img src={serv02IMG} alt="Apto A" />
          <img src={serv03IMG} alt="Apto 2" />
          <img src={serv04IMG} alt="Apto C" />
        </div>
      </div>
    </Layout>
  );
};
