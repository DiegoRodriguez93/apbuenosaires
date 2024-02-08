import { lazy } from 'react';

export const Home = lazy(() =>
  import('../pages/Home').then((module) => ({
    default: module.Home,
  })),
);

export const SubirPropiedad = lazy(() =>
  import('../pages/SubirPropiedad').then((module) => ({
    default: module.SubirPropiedad,
  })),
);

export const Ubicacion = lazy(() =>
  import('../pages/Ubicacion').then((module) => ({
    default: module.Ubicacion,
  })),
);
export const Comodidades = lazy(() =>
  import('../pages/Comodidades').then((module) => ({
    default: module.Comodidades,
  })),
);
export const Fotos = lazy(() =>
  import('../pages/Fotos').then((module) => ({
    default: module.Fotos,
  })),
);
export const Otrosservicios = lazy(() =>
  import('../pages/Otrosservicios').then((module) => ({
    default: module.Otrosservicios,
  })),
);
export const Reservas = lazy(() =>
  import('../pages/Reservas/Reservas').then((module) => ({
    default: module.Reservas,
  })),
);

export const Administrador = lazy(() =>
  import('../pages/Administrador').then((module) => ({
    default: module.Administrador,
  })),
);

export const GenericNotFound = lazy(() =>
  import('../pages/GenericNotFound').then((module) => ({
    default: module.GenericNotFound,
  })),
);
