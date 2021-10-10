import React from 'react';
import { Card, Typography } from "@material-ui/core"
import ApiIcon from '@mui/icons-material/Api';

export default function ApiProcessingStepCount(){

    return (
        <Card justifyContent="center" >
            <ApiIcon/> 
            <Typography> 750 k</Typography>
            <Typography> API Processing Steps </Typography>
        </Card>
    )

}
