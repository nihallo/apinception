import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Grid , Paper, Button, Typography,TextField } from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux';
import {createApiProcessingSteps } from '../../../actions/apiProcessingSteps';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const initialState = { apiName:'', apiCode:'',apiProcessingStepsObject:''};

const ApiProcessingStepsForm = ()=>{

  const classes = useStyles();
  const dispatch = useDispatch();
  const [form, setForm ] = useState(initialState);

  const handleSubmit=(e)=>{      
    e.preventDefault();
    dispatch( createApiProcessingSteps(form) );
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
        <Paper className ={classes.paper} elevation ={3}>
              <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                      <TextField name="apiName" variant="outlined" label="API Name" fullWidth value={form.apiName} onChange={(e) => setForm({ ...form, apiName: e.target.value })} />
                      <TextField name="apiCode" variant="outlined" label="API Code" fullWidth value={form.apiCode} onChange={(e) => setForm({ ...form, apiCode: e.target.value })} />
                      <TextField name="apiProcessingSteps" variant="outlined" label="API Processing Steps" multiline rows={10} fullWidth 
                          value={form.apiProcessingStepsObject} onChange={(e) => setForm({ ...form, apiProcessingStepsObject: e.target.value })} />
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                      Submit
                  </Button>
              </form>
          </Paper>
      </AccordionDetails>
    </Accordion>

       
  )
}

export default ApiProcessingStepsForm;
