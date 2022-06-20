import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {useLocation} from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">

            <Grid item>
              <Typography color="inherit">
                {location.pathname}
              </Typography>
            </Grid>
            <Grid sx={{display: {sm: 'none', xs: 'block'}}} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
              >
                <MenuIcon/>
              </IconButton>
            </Grid>
            <Grid item xs/>

            {/*<Grid item>*/}
            {/*  <Typography color="inherit">*/}
            {/*    박주영*/}
            {/*  </Typography>*/}
            {/*</Grid>*/}
            {/*<Grid item>*/}
            {/*  <IconButton color="inherit" sx={{p: 0.5}}>*/}
            {/*    <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar"/>*/}
            {/*  </IconButton>*/}
            {/*</Grid>*/}
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{zIndex: 0}}
      >
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0}}>
        <Tabs value={0} textColor="inherit">
          <Tab label="메인"/>
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
