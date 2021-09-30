import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import TableManagement from './components/TableManagement/TableManagement';
import ApiProcessingSteps from './components/ApiProcessingSteps/ApiProcessingSteps';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/table" exact component={TableManagement} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/tables" exact component={TableManagement} />
        <Route path="/apiProcessingSteps" exact component={ApiProcessingSteps} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;
