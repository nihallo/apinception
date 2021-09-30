import React from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import ApiProcessingStepsRecord from './ApiProcessingStepRecord/ApiProcessingStepsRecord';

const ApiProcessingStepsListing = ()=>{

  return (
    <Grow in>
        <Container>
          <h1>ApiProcessingStepsListing to show list of records</h1>
        </Container>
        <Container>
            <ApiProcessingStepsRecord></ApiProcessingStepsRecord>
        </Container>
    </Grow>
  )
}

export default ApiProcessingStepsListing;
