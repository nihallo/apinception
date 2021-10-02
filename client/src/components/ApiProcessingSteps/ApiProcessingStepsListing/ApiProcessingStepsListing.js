import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid,CircularProgress } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import { getApiProcessingSteps } from '../../../actions/apiProcessingSteps';

import ApiProcessingStepsRecord from './ApiProcessingStepRecord/ApiProcessingStepsRecord';

const ApiProcessingStepsListing = ()=>{

  const apiProcessingStepsListing = useSelector((state) => state.apiProcessingStepsListing);
  console.log("get listing from state: " ,apiProcessingStepsListing);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getApiProcessingSteps());
  }, [apiProcessingStepsListing]);

/*   useEffect(()=>{
    console.log("listing use effect with: apiProcessingStepsListing: ", apiProcessingStepsListing);
  },[apiProcessingStepsListing]) */

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
