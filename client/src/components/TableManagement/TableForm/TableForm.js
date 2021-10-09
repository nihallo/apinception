import React, { useEffect, useState } from 'react';
import { Grid , Paper, Button, Typography,TextField } from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux';
import {createTable } from '../../../actions/tables';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const initialState = { tableName:'', tableCode:'',tableDataObject:''};

const TableForm = ()=>{

  const dispatch = useDispatch();
  const [form, setForm ] = useState(initialState);

  const handleSubmit=(e)=>{      
    e.preventDefault();
    dispatch( createTable(form) );
  }

  return (
    <Accordion>
      <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
      <Typography> Add Processing Steps </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper elevation ={3}>
              <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                      <TextField name="tableName" variant="outlined" label="Table Name" fullWidth value={form.tableName} onChange={(e) => setForm({ ...form, tableName: e.target.value })} />
                      <TextField name="tableCode" variant="outlined" label="Table Code" fullWidth value={form.tableCode} onChange={(e) => setForm({ ...form, tableCode: e.target.value })} />
                      <TextField name="tableDataObject" variant="outlined" label="Table Data in Json" multiline rows={10} fullWidth 
                          value={form.tableDataObject} onChange={(e) => setForm({ ...form, tableDataObject: e.target.value })} />
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" color="primary" >
                      Submit
                  </Button>
              </form>
          </Paper>
      </AccordionDetails>
    </Accordion>

       
  )
}

export default TableForm;
