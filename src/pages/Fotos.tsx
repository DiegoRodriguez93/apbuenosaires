import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Layout } from "../components/Layout";
import "./generic.css";
import Foto01 from "./Fotos/foto01.webp";
import Foto02 from "./Fotos/foto02.webp";
import Foto03 from "./Fotos/foto03.webp";
import Foto04 from "./Fotos/foto04.webp";
import Foto05 from "./Fotos/foto05.webp";
import Foto06 from "./Fotos/foto06.webp";
import Foto07 from "./Fotos/foto07.webp";
import Foto08 from "./Fotos/foto08.webp";
import Foto09 from "./Fotos/foto09.webp";

export const Fotos = () => {
  const images = [
    Foto01,
    Foto09,
    Foto02,
    Foto03,
    Foto04,
    Foto05,
    Foto06,
    Foto07,
    Foto08,
  ];

  return (
    <Layout>
      <h2>Apto 1</h2>
      <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 750: 2, 900: 3 }}>
        <Masonry columnsCount={3} gutter="10px">
          {images.map((image, i) => (
            <img
              alt="gallery apto 1"
              key={i}
              src={image}
              style={{ width: "100%", display: "block" }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Layout>
  );
};
