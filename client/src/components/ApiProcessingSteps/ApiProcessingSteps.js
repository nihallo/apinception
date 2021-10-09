import React from 'react';
import { Container, Grow, Divider} from '@material-ui/core';

import ApiProcessingStepsListing from './ApiProcessingStepsListing/ApiProcessingStepsListing';
import ApiProcessingStepsForm from './ApiProcessingStepsForm/ApiProcessingStepsForm';

const ApiProcessingSteps = () => {

  return (
    <Grow in>
      <Container>

          <h1>Add Processing Steps for API</h1>
          <ApiProcessingStepsForm />

        <Divider />
        <Container>
        
            <h1>API Processing Step Listing</h1>
            <ApiProcessingStepsListing />
          
        </Container>
      </Container>
    </Grow>
  );
};

export default ApiProcessingSteps;
