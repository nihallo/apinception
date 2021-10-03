import React, {useEffect} from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';

import { getApiProcessingSteps } from '../../actions/apiProcessingSteps';

import ApiProcessingStepsListing from './ApiProcessingStepsListing/ApiProcessingStepsListing';
import ApiProcessingStepsForm from './ApiProcessingStepsForm/ApiProcessingStepsForm';

const ApiProcessingSteps = () => {

  return (
    <Grow in>
      <Container>
        <Container>
          <h1>create tables</h1>
        </Container>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <ApiProcessingStepsListing />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ApiProcessingStepsForm />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Grow>
  );
};

export default ApiProcessingSteps;
