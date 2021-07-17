import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import ApiRecord from './ApiRecord/ApiRecord';

const ApiListing = () => {
  const apiListing = useSelector((state) => state.apiStructure);
  console.log('Inside ApiListing component:listing data: ', apiListing);
  return (
    !apiListing.length ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {apiListing.map((apiRecord) => (
          <Grid key={apiRecord._id} item xs={12} sm={12} md={12}>
            <ApiRecord apiRecord={apiRecord} />
          </Grid>
        ))}
      </Grid>
    )
  );
};
export default ApiListing;
