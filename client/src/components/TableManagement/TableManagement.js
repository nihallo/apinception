import React, { useState, useEffect } from 'react';
import { Container, Grow, Divider ,Card} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getTables } from '../../actions/tables';
import TableForm from './TableForm/TableForm';
import TableListing from './TableListing/TableListing';

const TableManagement = () => {

  return (
    <Grow in>
      <Container>
        <h1>Add Look Up Data</h1>
        <TableForm />
        <Divider />
        <Container>
            <h1>Look Up Data Listing</h1>
            <TableListing/>
        </Container>
      </Container>
    </Grow>
  );
};

export default TableManagement;
