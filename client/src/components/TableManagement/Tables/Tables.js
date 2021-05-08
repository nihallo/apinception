import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Table from './Table/Table';
import useStyles from './styles';

const Tables = () => {
  const tables = useSelector((state) => state.tables);

  return (
    !tables.length ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {tables.map((table) => (
          <Grid key={table._id} item xs={12} sm={6} md={6}>
            <Table table={table} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Tables;