import React from 'react';
import { Grid, Paper, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import ApiRecord from './ApiRecord/ApiRecord';

const ApiListing = ({ setCurrentId }) => {
  const apiListing = useSelector((state) => state.apiStructure);
    console.log('listing data: ', apiListing);
  return (
    !apiListing.length ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {apiListing.map((apiRecord) => (
          <Grid key={apiRecord._id} item xs={12} sm={6} md={6}>
            <ApiRecord apiRecord={apiRecord} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};
export default ApiListing;
