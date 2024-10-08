import { Col, Row , Spinner } from 'react-bootstrap';

import { Layout } from '../components/Layout/index';

export const Fallback = () => {
  return (
    <Layout>
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
      >
        <Col sm={12} className="text-center">
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            style={{ width: '3rem', height: '3rem' }}
          >
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>Cargando...</p>
        </Col>
      </Row>
    </Layout>
  );
};
