import { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes as RoutesReactRouterDom,
} from "react-router-dom";
import { Fallback } from "../pages/Fallback";

import {
  Home,
  GenericNotFound,
  Ubicacion,
  Comodidades,
  Fotos,
  Otrosservicios,
  Reservas,
  Administrador,
  SubirPropiedad,
} from "./paths";
import PropertyId, { EditProperty } from "../pages/property/edit/[propertyId]";
import SingleProperty from "../pages/property/[propertyId]";
import { Step4 } from "../pages/Reservas/Step4";

export const Routes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <RoutesReactRouterDom>
        <Route path="/" element={<Home />} />
        <Route path="/ubicaciones" element={<Ubicacion />} />
        <Route path="/nuestra-propuesta" element={<Comodidades />} />
        <Route path="/fotos" element={<Fotos />} />
        <Route path="/otros-servicios" element={<Otrosservicios />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/subir-propiedad" element={<SubirPropiedad />} />
        <Route path="/properties/:propertyId" element={<PropertyId />} /> 
        <Route path="/property/:propertyId" element={<SingleProperty />} /> 
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<GenericNotFound />} />
        <Route path="/payment" element={<Step4/>} />
      </RoutesReactRouterDom>
    </Suspense>
  );
};
