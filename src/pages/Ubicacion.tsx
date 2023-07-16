import { Layout } from '../components/Layout';
import './generic.css';
import mapaWebIMG from '../mapaWeb.jpg';
export const Ubicacion = () => {
  return (
    <Layout>
    <div className="contenido">
      <h1>Excelente ubicación</h1><br/>
      <p>Emplazado en el barrio de Monserrat, ubicado en el tercer piso de la calle Santiago del Estero 661,<br/>
      sobre una calle céntrica pero tranquila,<b> a sólo 15 cuadras del Obelisco y a 10 minutos de Puerto Madero.</b><br/><br/>
<b>Rápido acceso desde el momento de tu llegada, ya que se encuentra:</b><br/><br/>
A 25 minutos del Aeroparque Internacional Jorge Newbery<br/>
A 18 minutos de la Terminal Buquebus<br/>
A 15 minutos de la Terminal Colonia Express<br/>
A 17 minutos de la Terminal de Ómnibus de Buenos Aires<br/><br/>
<b>Además está muy cerca de avenidas importantes, por ejemplo:</b><br/>
A 150 metros de Av. Independencia<br/>
A 250 metros de Av. Belgrano<br/>
A 300 metros de Av. 9 de Julio<br/>
A 550 metros de Av. Entre Ríos<br/>
A 800 metros del nudo vial que conecta las autopistas más importantes de la ciudad<br/>
con la Avenida 9 de Julio. Estas son: Autopista 25 de Mayo, Autopista Ricardo Balbin, Autopista Arturo Frondizi.</p>
<a href="https://goo.gl/maps/hfGc7xsCgVEaN3wL7" target='_blank'>
<img src={mapaWebIMG}/><br/><br/>
</a>
<p><b>Si tu idea es recorrer la ciudad a pie, estás a sólo 400 metros del acceso a la Red de Subterráneos,<br/>en la estación Independencia de la línea D</b>
<br/><br/>
<b>Si tu motivo de viaje es por estudio, estás:</b><br/><br/>
A 400 metros de la UADE (Universidad Argentina de la Empresa)<br/>
A 400 metros de la Facultad de Ciencias Sociales de la UBA (Universidad de Buenos Aires)<br/>
A 800 metros de UAI (Universidad Abierta Interamericana)<br/><br/>

<b>Algunas opciones muy cercanas e interesantes para que vayas a conocer:</b><br/><br/>

Palacio Barolo (1,2 km): a 5 min en auto // a 11 min caminando<br/>
Plaza del Congreso (1,6 km): a 7 min en auto // a 15 min caminando<br/>
Plaza de mayo (1,7 km):  a 8 min en auto // a 22 min caminando<br/>
La Trastienda (1,8 km): a 6 min en auto // a 15 min caminando<br/>
Teatro Colón y Plaza Lavalle (1,9 km): a 11 min en auto // a 24 min caminando<br/>
Plaza Dorrego (2 km): a 6 min en auto // a 21 min caminando<br/>
Puente de la mujer, Puerto Madero (2,5 km): a 9 min en auto // a 30 min caminando<br/>
Parque Lezama (2,6 km): a 9 min en auto // a 28 min caminando <br/>
Galerías Pacífico (2,9 km): a 14 min en auto <br/>
Paseo La Plaza (3,1 km): a 13 min en auto<br/>
Casino Buenos Aires (4,1 km): a 12 min en auto<br/>
Caminito, La Boca (4,7 km): a 16 min en auto<br/>
</p>
</div>
    </Layout>
  );
};
