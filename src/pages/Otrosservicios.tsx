import React from 'react';
import { Layout } from '../components/Layout';
import './generic.css';
import serv01IMG from '../servicios01.jpg';
import serv02IMG from '../servicios02.jpg';
import serv03IMG from '../servicios03.jpg';

export const Otrosservicios = () => {
  return (
    <Layout>
      <div className="page-container">
        <h2>Consulte por otros servicios adicionales:</h2>

        <ul>
          <li>
            Traslados desde Terminal de Autobuses Retiro, Aeropuertos Jorge Newbery o Ezeiza, Terminales Fluviales como Buquebus o Colonia Express.
          </li>
          <li>Compra de bebidas o alimentos para el momento de tu llegada.</li>
          <li>Venta de entradas para partidos de River o Boca.</li>
          <li>Recepción de compras online previas a tu fecha de ingreso.</li>
          <li>Cambio de divisas.</li>
          <li>Ofrecemos pagos directos en Uruguay y Brasil, otros países consultar.</li>
          <li>Todas las informaciones sobre Buenos Aires, ¡no dudes en consultarnos!</li>
        </ul>

        <div className="custom-image-gallery">
          <img src={serv01IMG} alt="Traslados" />
          <img src={serv02IMG} alt="Compras" />
          <img src={serv03IMG} alt="Recepción de correo" />
        </div>
      </div>
    </Layout>
  );
};
