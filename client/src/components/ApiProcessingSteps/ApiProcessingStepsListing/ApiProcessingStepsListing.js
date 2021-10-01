import React from 'react';
import { Container, Grow, Grid,CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import ApiProcessingStepsRecord from './ApiProcessingStepRecord/ApiProcessingStepsRecord';

const ApiProcessingStepsListing = ()=>{

  const apiProcessingStepsListing = useSelector((state) => state.apiProcessingStepsListing);
  
  return (
  !apiProcessingStepsListing.length ? <CircularProgress /> : (
    <Grid container alignItems="stretch" spacing={3}>
      {apiProcessingStepsListing.map((apiProcessingStepsRecord) => (
        <Grid key={apiProcessingStepsRecord._id} item xs={12} sm={12} md={12}>
          <ApiProcessingStepsRecord apiProcessingStepsRecord={apiProcessingStepsRecord} />
        </Grid>
      ))}
    </Grid>
  )
  )
}

export default ApiProcessingStepsListing;
