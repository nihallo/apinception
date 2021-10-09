import React, {useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';

import { getTables } from '../../../actions/tables';

import Table from './Table/Table';

const TableListing = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTables());
  },[]);

  const tables = useSelector((state) => state.tables);

  return (
    !tables.length ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {tables.map((tableRecord) => (
          <Grid key={tableRecord._id} item xs={12} sm={12} md={12}>
            <Table tableRecord={tableRecord} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default TableListing;