import * as React from "react";
import {useState} from "react";
import * as PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import {Avatar} from "@mui/material";

/**
 * 하드코딩된 유저 정보.
 *
 * 유저 정보를 받아 실제 유저 정보에 맞춰서 넣어줘야 한다.
 */
function HardCodedUserInfo() {
  return <>
    <Grid item>
      <Typography color="inherit">
        박주영
      </Typography>
    </Grid>
    <Grid item>
      <IconButton color="inherit" sx={{p: 1.5}}>
        <Avatar src="/static/images/avatar/2.jpg" alt="My Avatar"/>
      </IconButton>
    </Grid>
  </>;
}

function Header(props) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography color="inherit">
                {props.mainTitle}
              </Typography>
            </Grid>
            <Grid item xs/>

            {/*<HardCodedUserInfo/>*/}
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0}}>
        <Tabs value={tabIndex} textColor="inherit">
          {props.tabNames.map((name, index) =>
            <Tab label={name} onClick={() => setTabIndex(index)}/>
          )}
        </Tabs>
      </AppBar>
    </>
  );
}

Header.propTypes = {
  mainTitle: PropTypes.string,
  tabNames: PropTypes.arrayOf(PropTypes.string)
};

export default Header;
