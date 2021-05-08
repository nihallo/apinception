import React, { useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';

import { getApiListing } from '../../actions/apiStructure';
import ApiStructure from '../ApiStructure/ApiStructure';
import ApiListing from '../ApiListing/ApiListing';

const Home = () => {
  console.log('start of Home compnents');

  const dispatch = useDispatch();
  const currentId = useSelector((state) => (state.currentId));

  useEffect(() => {
    dispatch(getApiListing());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>

          <h1 color="primary">create tables</h1>
      
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <ApiListing ></ApiListing>
              </Grid>
              <Grid item xs={12} sm={4}>
                <ApiStructure></ApiStructure>
              </Grid>
            </Grid>
        </Container>
      </Container>
    </Grow>
  );
};

export default Home;
