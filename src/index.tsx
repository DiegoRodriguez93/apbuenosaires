import React /* , { FC } */ from 'react';
import { render } from 'react-dom';
/* import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; */

import App from './App';

const rootElement = document.getElementById('root');

/* // or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'es', ['common'])),
  },
});
 */
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
);
