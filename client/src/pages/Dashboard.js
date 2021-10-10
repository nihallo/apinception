import React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import { ApiCount, ApiProcessingStepCount } from '../components/_dashboard/app';

const Dashboard = ()=> {
    return (
        <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
                <Typography variant="h4">Hi, Welcome back</Typography>
            </Box>
            <Grid container spacing={3} >
                <Grid item xs={12} sm={6} md={6} >
                    <ApiCount />
                </Grid>
                <Grid item xs={12} sm={6} md={6} >
                    <ApiProcessingStepCount />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard;