import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import './generic.css'; // Ensure this path is correct
import airbnbProfileImage from './perfilAirbnb.png'; // Adjust the path as needed


declare global {
  interface Window {
    AirbnbAPI?: {
      bootstrap: () => void;
    };
  }
}

export const Valoraciones = () => {
  // List of Airbnb apartment IDs
  const apartmentIds = [
    '1071821399648210904',
    '913639485717411250',
    '1125452717680763885',
    '999155290396663744',
  ];

  // Load Airbnb SDK when the component mounts
  useEffect(() => {
    const airbnbScriptId = 'airbnb-sdk';

    if (!document.getElementById(airbnbScriptId)) {
      const script = document.createElement('script');
      script.id = airbnbScriptId;
      script.src = 'https://es.airbnb.com/embeddable/airbnb_jssdk';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if ((window as any).AirbnbAPI) {
          (window as any).AirbnbAPI.bootstrap();
        }
      };
    } else {
      if ((window as any).AirbnbAPI) {
        (window as any).AirbnbAPI.bootstrap();
      }
    }
  }, []);

  return (
    <Layout>
      <section className="airbnb-section">
        <h2>Ve nuestros apartamentos en Airbnb</h2>
        <p>Puedes ver nuestras reseñas y más en nuestras publicaciones de Airbnb o nuestro perfil!</p>

        {/* Airbnb Profile Image Link */}
        <a
          href="https://www.airbnb.com.ar/users/show/91054616"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={airbnbProfileImage}
            alt="Visita nuestro perfil en Airbnb"
            className="airbnb-profile-image"
          />
        </a>

        <div className="airbnb-grid">
          {apartmentIds.map((id) => (
            <div
              key={id}
              className="airbnb-embed-frame"
              data-id={id}
              data-view="home"
              data-locale="es" // Set locale to Spanish
              data-hide-price="true"
              style={{ margin: 'auto' }} // Height handled in CSS
            >
              <a
                href={`https://es.airbnb.com/rooms/${id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Airbnb
              </a>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};