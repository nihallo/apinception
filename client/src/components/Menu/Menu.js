import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Link, useHistory, useLocation } from 'react-router-dom';


export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTableManagementClose = ()=>{
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to={'/dashboard'}>Dashboard </Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to={'/home'}>API Listing </Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to={'/tables'}>Look Up Table Table</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to={'/apiProcessingSteps'}>API Processing Steps </Link></MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
