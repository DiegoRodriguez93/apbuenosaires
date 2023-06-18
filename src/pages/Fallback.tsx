import { Col, Row } from 'react-bootstrap';

import { Layout } from '../components/Layout/index';

export const Fallback = () => {
  return (
    <Layout>
      <Row>
        <Col sm={12} className="text-center">
          <h1>Loading...</h1>
        </Col>
      </Row>
    </Layout>
  );
};
