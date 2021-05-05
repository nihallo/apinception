import React, { useEffect, useState } from 'react';
import { Grid , Paper, Button, Typography,TextField} from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux';

import useStyles from './styles';
import {createApiStructure, updateApiStructure } from '../../../actions/apiStructure';

const initialState = { tableName:'', tableDesc:''};

const MasterDataUpload = ()=>{
    const classes = useStyles();
    const [form, setForm ] = useState(initialState);
    const dispatch = useDispatch();
    

    const handleSubmit=(e)=>{      
        e.preventDefault();
        if(currentId){
            dispatch( updateApiStructure(currentId,form) );
        }else {
            dispatch( createApiStructure(form) );
        }
        setForm(initialState);
    }

    useEffect(()=>{
        console.log('is apiRecord data updated: ', apiRecord);
        setForm({ ...apiRecord});
        console.log('is form data updated: ', form);
    },[currentId])

    return (
            <Paper className ={classes.paper} elevation ={3}>
            <Typography component="h1" variant="h5">{currentId? "Edit ":"Add " } Table Setup</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <TextField name="tableName" variant="outlined" label="Table Name" fullWidth value={form.tableName} onChange={(e) => setForm({ ...form, tableName: e.target.value })} />
                    <TextField name="tableDesc" variant="outlined" label="Table Description" multiline rows={10} fullWidth value={form.tableDesc} onChange={(e) => setForm({ ...form, tableDesc: e.target.value })} />
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Submit
                </Button>
            </form>

            </Paper>
    );
}

export default MasterDataUpload