import { Suspense } from 'react';
import { Navigate, Route, Routes as RoutesReactRouterDom } from 'react-router-dom';
import { Fallback } from '../pages/Fallback';

import { Home, GenericNotFound, Ubicacion, Comodidades, Fotos, Otrosservicios, Reservas } from './paths';

export const Routes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <RoutesReactRouterDom>
        <Route path="/" element={<Home />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/comodidades" element={<Comodidades />} />
        <Route path="/fotos" element={<Fotos />} />
        <Route path="/otrosservicios" element={<Otrosservicios />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<GenericNotFound />} />
      </RoutesReactRouterDom>
    </Suspense>
  );
};
