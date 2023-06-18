import { Suspense } from 'react';
import { Navigate, Route, Routes as RoutesReactRouterDom } from 'react-router-dom';
import { Fallback } from '../pages/Fallback';

import { Home, GenericNotFound } from './paths';

export const Routes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <RoutesReactRouterDom>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<GenericNotFound />} />
      </RoutesReactRouterDom>
    </Suspense>
  );
};
