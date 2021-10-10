import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteTable } from '../../../../actions/tables'

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

const Table = ({tableRecord})=>{
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));
  const handleDelete = (id) =>{
    dispatch(deleteTable(id));
  };
  console.log("data for table: ", tableRecord);
  
  return (
    <Grow in>
      <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant ="h4">{tableRecord.tableName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <Grid container direction = "row" justifyContent="space-between" alignItems="center" spacing={12}>
                    <Grid item >
                      <Typography variant ="h5">{tableRecord.tableCode}</Typography>
                    </Grid>
                    <Grid item> 
                      {(user?.result?.googleId === tableRecord?.creator || user?.result?._id === tableRecord?.creator) 
                        && (
                            <div>
                                <Button onClick={()=>{handleDelete(tableRecord._id)}} size="small" color = "secondary">
                                    <DeleteIcon> Delete</DeleteIcon>
                                </Button>
                            </div>
                        )
                      }
                    </Grid>
                  </Grid>
                <ReactJson src={tableRecord.tableDataObject}/>
              </CardContent>
            </Card>
          </AccordionDetails>
      </Accordion>

    </Grow>

  )
}

export default Table;