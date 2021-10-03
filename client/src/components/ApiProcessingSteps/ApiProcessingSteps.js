import React, {useEffect} from 'react';
import { Container, Grow, Divider ,Card} from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';

import { getApiProcessingSteps } from '../../actions/apiProcessingSteps';

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
