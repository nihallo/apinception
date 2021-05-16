import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getTables } from '../../actions/tables';
import TableForm from './TableForm/TableForm';
import Tables from './Tables/Tables';

const TableManagement = () => {
//  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTables());
  }, [//currentId, 
    dispatch]);

  return (
    <Grow in>

      <Container>
        <Container>
          <h1>create tables</h1>
        </Container>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Tables></Tables>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TableForm></TableForm>
              </Grid>
            </Grid>
        </Container>
      </Container>
    </Grow>
  );
};

export default TableManagement;
