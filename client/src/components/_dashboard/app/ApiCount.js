import React from 'react';
import { Card,Paper, Typography } from "@material-ui/core"
import ApiIcon from '@mui/icons-material/Api';

export default function ApiCount(){

    return (
        <Paper elevation={3} >
            <ApiIcon/>
            <Typography> 750 k</Typography>
            <Typography> api count </Typography>
        </Paper>
    )

}
