import React from 'react';
import { Layout } from '../components/Layout';
import './generic.css';
import serv01IMG from '../ubi1.jpg';
import serv02IMG from '../ubi2.jpg';
import serv03IMG from '../ubi3.jpg';
import serv04IMG from '../ubi4.jpg';

export const Ubicacion = () => {
  return (
    <Layout>
      <div className="page-container">
        <h2>En el barrio de Montserrat contamos con 3 apartamentos:</h2>

        <p>
          Dos de ellos están ubicados en la calle Santiago del Estero 661.
          El otro se encuentra a 400 metros de allí, en Santiago del Estero 1008.
        </p>

        <p>
          Si te hospedas en los apartamentos de Montserrat estarás a 250 metros de la Avenida 9 de Julio, a menos de 2 km del Obelisco
          y a pocos minutos de San Telmo, Puerto Madero y Recoleta, entre otros lugares a destacar.
        </p>

        <div className="custom-image-gallery">
          <img src={serv01IMG} alt="Ubicación 1" />
          <img src={serv02IMG} alt="Ubicación 2" />
        </div>

        <p>
          <strong>Tendrás un rápido acceso desde el momento de tu llegada, ya que se encuentra aproximadamente a:</strong>
        </p>
        <ul>
          <li>25 minutos del Aeroparque Internacional Jorge Newbery.</li>
          <li>18 minutos de la Terminal Buquebus.</li>
          <li>15 minutos de la Terminal Colonia Express.</li>
          <li>17 minutos de la Terminal de Ómnibus de Retiro.</li>
        </ul>

        <p>
          <strong>Además, está muy cerca de avenidas importantes, por ejemplo:</strong>
        </p>
        <ul>
          <li>
            Av. Independencia, Av. Belgrano, Av. Entre Ríos y muy cerca del nudo vial que conecta las autopistas más importantes de la ciudad
            con la Avenida 9 de Julio. Estas son: Autopista 25 de Mayo, Autopista Ricardo Balbín, Autopista Arturo Frondizi.
          </li>
        </ul>

        <p>
          Si tu idea es recorrer la ciudad a pie, estás a solo 400 metros del acceso a la Red de Subterráneos,
          en la estación Independencia de la línea D.
        </p>

        <p>
          <strong>Si tu motivo de viaje es por estudio, estás:</strong>
        </p>
        <ul>
          <li>A 400 metros de la UADE (Universidad Argentina de la Empresa).</li>
          <li>
            A 400 metros de la Facultad de Ciencias Sociales de la UBA (Universidad de Buenos Aires) o a 50 metros desde el otro apartamento.
          </li>
          <li>A 500 / 800 metros de UAI (Universidad Abierta Interamericana).</li>
          <li>A menos de 2 km de la Facultad de Ingeniería y de Universidad Católica Argentina.</li>
        </ul>

        <div className="custom-image-gallery">
          <img src={serv03IMG} alt="Ubicación 3" />
          <img src={serv04IMG} alt="Ubicación 4" />
        </div>

        <p>
          <strong>Algunas opciones muy cercanas e interesantes para que vayas a conocer:</strong>
        </p>
        <ul>
          <li>Palacio Barolo (1.2 km): a 5 min en auto / a 11 min caminando.</li>
          <li>Plaza del Congreso (1.6 km): a 7 min en auto / a 15 min caminando.</li>
          <li>Plaza de Mayo (1.7 km): a 8 min en auto / a 22 min caminando.</li>
          <li>La Trastienda (1.8 km): a 6 min en auto / a 15 min caminando.</li>
          <li>Teatro Colón y Plaza Lavalle (1.9 km): a 11 min en auto / a 24 min caminando.</li>
          <li>Plaza Dorrego (2 km): a 6 min en auto / a 21 min caminando.</li>
          <li>Puente de la Mujer, Puerto Madero (2.5 km): a 9 min en auto / a 30 min caminando.</li>
          <li>Parque Lezama (2.6 km): a 9 min en auto / a 28 min caminando.</li>
          <li>Galerías Pacífico (2.9 km): a 14 min en auto.</li>
          <li>Paseo La Plaza (3.1 km): a 13 min en auto.</li>
          <li>Casino Buenos Aires (4.1 km): a 12 min en auto.</li>
          <li>Caminito, La Boca (4.7 km): a 16 min en auto.</li>
        </ul>

        <h2>En el barrio de Palermo contamos con 1 apartamento:</h2>

        <p>
          <strong>Tendrás un rápido acceso desde el momento de tu llegada, ya que se encuentra aproximadamente a:</strong>
        </p>
        <ul>
          <li>25 minutos del Aeropuerto Internacional Jorge Newbery.</li>
          <li>20 minutos de la Terminal Buquebus.</li>
          <li>25 minutos de la Terminal Colonia Express.</li>
          <li>20 minutos de la Terminal de Ómnibus de Buenos Aires.</li>
        </ul>

        <p>
          Si te hospedas en este apartamento estarás a solo 50 metros de la Avenida Córdoba, a 450 metros de Avenida Corrientes y a 900 metros de la Avenida Pueyrredón.
        </p>

        <p>
          Para ir de compras, estarás a 7 cuadras del Abasto Shopping, a 10 cuadras de Alto Palermo Shopping y a 8 cuadras de la Avenida Santa Fe.
        </p>

        <p>
          Si tu idea es recorrer la ciudad a pie, sobre la Avenida Córdoba pasan muchas líneas de colectivos y a menos de 10 cuadras cuentas
          con 3 estaciones de acceso a la Red de Subterráneos (estaciones Medrano y Carlos Gardel de la línea B y la estación Córdoba de la línea H).
        </p>

        <p>
          <strong>Si tu motivo de viaje es por estudio, estarás:</strong>
        </p>
        <ul>
          <li>A 200 metros de la Universidad de Palermo.</li>
          <li>A 15 cuadras de la Facultad de Medicina de Buenos Aires.</li>
        </ul>

        <p>
          <strong>Algunas opciones muy cercanas e interesantes para que vayas a conocer:</strong>
        </p>
        <ul>
          <li>Ciudad Cultural Konex (1 km): a 5 min en auto / a 11 min caminando.</li>
          <li>Plaza Serrano (1.5 km): a 7 min en auto / a 15 min caminando.</li>
          <li>Parque Centenario (1.7 km): a 8 min en auto / a 18 min caminando.</li>
          <li>Jardín Botánico (2 km): a 10 min en auto / a 22 min caminando.</li>
          <li>Plaza Italia (2 km): a 10 min en auto / a 22 min caminando.</li>
          <li>
            A menos de 3 km puedes visitar: El Rosedal, el Planetario, el Jardín Japonés, el Teatro Colón, Galerías Pacífico, el Obelisco.
          </li>
        </ul>
      </div>
    </Layout>
  );
};
