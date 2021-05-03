import React, { useEffect, useState } from 'react';
import { Container, Grid , Paper, Button, Typography,TextField} from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux';

import useStyles from './styles';
import {createApiStructure, updateApiStructure, deleteApiStructure } from '../../actions/apiStructure';

const initialState = { apiName:'', apiCode:'',apiStructureText:''};

const ApiStructure = ()=>{
    const classes = useStyles();
    const [form, setForm ] = useState(initialState);
    const dispatch = useDispatch();
    const currentId = useSelector((state) => (state.currentId));
//    console.log('currentId after use selector, ', currentId);
    console.log('what is in the state: ',useSelector((state) => (state)));
    const apiRecord = useSelector((state) => (currentId ? state.apiStructure.find((message) => message._id === currentId) : null));
    console.log('apiRecord based on currentId after use selector, ', apiRecord);

    const handleChange =(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
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
            <Typography component="h1" variant="h5">{currentId? "Edit ":"Add " } API Structure at home</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <TextField name="apiName" variant="outlined" label="API Name" fullWidth value={form.apiName} onChange={(e) => setForm({ ...form, apiName: e.target.value })} />
                    <TextField name="apiCode" variant="outlined" label="API Code" fullWidth value={form.apiCode} onChange={(e) => setForm({ ...form, apiCode: e.target.value })} />
                    <TextField name="apiStructureText" variant="outlined" label="API Structure" multiline rows={10} fullWidth value={form.apiStructureText} onChange={(e) => setForm({ ...form, apiStructureText: e.target.value })} />
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Submit
                </Button>
            </form>

            </Paper>
    );
}

export default ApiStructure