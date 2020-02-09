import React from 'react';
import { Container } from './client.styles';

interface Props {
  restockReport: any;
}

const Client: React.FC<Props> = ({ restockReport }) => {
  console.log(restockReport);
  return (
    <Container>
      <h1>Client View</h1>
    </Container>
  );
};

export default Client;
