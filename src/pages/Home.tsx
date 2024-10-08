import React from 'react';
import { Layout } from '../components/Layout';
import BackgroundImg from '../components/Layout/BackgroundImg';
import './Home.css'; // Import the CSS file for styling

export const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        <h2>
          LA CIUDAD DE BUENOS AIRES: ENTRE LOS DIEZ MEJORES DESTINOS DE AMÉRICA
          DEL SUR
        </h2>
        <p>
          - Millones de usuarios en todo el mundo la posicionaron dentro de los
          10 mejores destinos, en los premios Travellers' Choice - Lo Mejor de
          lo Mejor, que entrega Tripadvisor en función de las opiniones y
          calificaciones de sus usuarios el último año.
          <br />
          - La Ciudad fue elegida por su oferta cultural, gastronomía de nivel
          internacional y la calidad de sus servicios turísticos.
          <br />
          <br />
          <a href="https://www.facebook.com/people/AP-Buenos-Aires-Alquiler-Temporario/61564429754942/">
            Visita nuestra página en Facebook
          </a>
          <br />

          <a href="https://www.facebook.com/GCBA">
            Visita la página de la Ciudad de Buenos Aires en Facebook
          </a>
        </p>

        {/* Embed the Facebook video */}
        <div className="video-container">
          <iframe
            src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Felobservador.newsok%2Fvideos%2F982381620253708%2F&show_text=false&width=268&t=0"
            width="268"
            height="476"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Buenos Aires Video"
          ></iframe>
        </div>

        <BackgroundImg />
      </div>
    </Layout>
  );
};
