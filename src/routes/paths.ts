import { lazy } from 'react';

export const Home = lazy(() =>
  import('../pages/Home').then((module) => ({
    default: module.Home,
  })),
);

export const Ubicacion = lazy(() =>
  import('../pages/Ubicacion').then((module) => ({
    default: module.Ubicacion,
  })),
);

export const GenericNotFound = lazy(() =>
  import('../pages/GenericNotFound').then((module) => ({
    default: module.GenericNotFound,
  })),
);
