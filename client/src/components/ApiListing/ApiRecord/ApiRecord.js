import React, { useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia,Container,Paper, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from './styles';

import {deleteApiStructure } from '../../../actions/apiStructure'
import { updateCurrentId } from '../../../actions/currentId';

const ApiRecord = ({ apiRecord }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();

  const handleCurrentIdChange = (currentId)=>{
    dispatch(updateCurrentId(currentId));
  }
  
  const handleDelete =(id)=>{
    dispatch(deleteApiStructure(id));
  }

  return (
      <>
        <Card>
            <Container component="main" maxWidth="xs">
            <Paper className ={classes.paper} elevation ={3} >
                <Typography variant="h6">{apiRecord.apiName}</Typography>
                <Typography gutterBottom variant="h6" > {apiRecord.apiCode}</Typography>
                <Typography variant="body2">created: {moment(apiRecord.createdAt).fromNow()}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{apiRecord.apiStructureText}</Typography>
                {(user?.result?.googleId === apiRecord?.creator || user?.result?._id === apiRecord?.creator) && (
                <div>
                    <Button onClick={()=>{handleCurrentIdChange(apiRecord._id)}} size="small" color="primary">
                       <EditIcon>Edit</EditIcon> 
                    </Button>
                    <Button onClick={()=>{handleDelete(apiRecord._id)}} size="small" color = "secondary">
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

export default ApiRecord;
