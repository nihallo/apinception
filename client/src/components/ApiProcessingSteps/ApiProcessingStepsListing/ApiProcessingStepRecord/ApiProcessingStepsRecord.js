import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteApiProcessingStep } from '../../../../actions/apiProcessingSteps'

import ReactJson from 'react-json-view'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grow from '@mui/material/Grow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/material';

const ApiProcessingStepsRecord = ({apiProcessingStepsRecord})=>{
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));
  const handleDelete = (id) =>{
    dispatch(deleteApiProcessingStep(id));
  };

  const showJson = false;

  return (
    <Grow in>
      <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant ="h4">{apiProcessingStepsRecord.apiName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <Grid container direction = "row" justifyContent="space-between" alignItems="center" spacing={12}>
                    <Grid item >
                      <Typography variant ="h5">{apiProcessingStepsRecord.apiCode}</Typography>
                    </Grid>
                    <Grid item> 
                      {(user?.result?.googleId === apiProcessingStepsRecord?.creator || user?.result?._id === apiProcessingStepsRecord?.creator) 
                        && (
                            <div>
                                <Button onClick={()=>{handleDelete(apiProcessingStepsRecord._id)}} size="small" color = "secondary">
                                    <DeleteIcon> Delete</DeleteIcon>
                                </Button>
                            </div>
                        )
                      }
                    </Grid>
                  </Grid>
                <ReactJson src={apiProcessingStepsRecord.apiProcessingStepsObject}/>
              </CardContent>
            </Card>
          </AccordionDetails>
      </Accordion>

    </Grow>

  )
}

export default ApiProcessingStepsRecord;
