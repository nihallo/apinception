import React from 'react';
import { Card, Container,Paper, Button, Typography, Grid } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from './styles';

import { deleteTable } from '../../../../actions/tables';
import { updateCurrentId } from '../../../../actions/currentId';

const Table = ({ table }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  console.log("inside table.js, how table looks like: ",table);
  const handleCurrentIdChange = (currentId)=>{
    dispatch(updateCurrentId(currentId));
  }
  
  const handleDelete =(id)=>{
    dispatch(deleteTable(id));
  }

  return (
      <>
        <Card>
            <Container component="main" maxWidth="xs">
            <Paper className ={classes.paper} elevation ={3} >
                <Typography variant="h6">{table.tableName}</Typography>
                <Typography variant="body2">created: {moment(table.createdAt).fromNow()}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{table.tableDesc}</Typography>
                <Grid>
                  {table.columns.map( (column)=>(
                    <Grid key={column._id}>
                      <Typography>Column Name: {column.columnName}</Typography>
                      <Typography>Column Type: {column.columnType}</Typography>
                    </Grid>
                  ))}
                </Grid>
                {(user?.result?.googleId === table?.creator || user?.result?._id === table?.creator) && (
                <div>
                    <Button onClick={()=>{handleCurrentIdChange(table._id)}} size="small" color="primary">
                       <EditIcon>Edit</EditIcon> 
                    </Button>
                    <Button onClick={()=>{handleDelete(table._id)}} size="small" color = "secondary">
                        <DeleteIcon> Delete</DeleteIcon>
                    </Button>
                </div>
                )}
            </Paper>
        </Container>
        </Card>
      </>
  );
};

export default Table;
