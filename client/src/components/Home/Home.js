import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getApiListing } from '../../actions/apiStructure';
import ApiStructure from '../ApiStructure/ApiStructure';
import ApiListing from '../ApiListing/ApiListing';

const Home = () => {
  console.log('start of Home compnents');
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiListing());
  }, [currentId, dispatch]);

  return (
    <Grow>

      <Container>
        <Container>
          <h1>create tables</h1>
        </Container>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <ApiListing currentId={currentId} setCurrentId={setCurrentId} ></ApiListing>
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
