import { FC, ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import { Header } from './Header';
import { Navbar } from './Navbar';
import BackgroundImg from './BackgroundImg';

type LayoutType = {
  children?: ReactNode;
  withBG?: boolean;
};

export const Layout: FC<LayoutType> = ({ children, withBG }) => {
  return (
    <>
      <Header />
      <Navbar />
      {withBG && <BackgroundImg />}
      <Container>{children}</Container>
    </>
  );
};
