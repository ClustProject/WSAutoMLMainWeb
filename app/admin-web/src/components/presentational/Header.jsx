import * as React from "react";
import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import { getUserInfo } from "../../api/user";

function Header(props) {
  const [userInfo, setUserInfo] = useState({});
  const [tabIndex, setTabIndex] = useState(0);

  const LogoutButton = () => {
    const handleLogout = async () => {
      // 로그아웃 처리를 위한 API 호출
      await fetch("/user/logout", { method: "POST" });

      // Google 로그인 화면으로 리다이렉트
      window.location.href = "/";
    };

    return (
      <>
        <Typography color='inherit' sx={{ p: 1 }} variant='h6'>
          <IconButton onClick={handleLogout} sx={{ color: "white" }}>
            로그아웃
          </IconButton>
        </Typography>
      </>
    );
  };

  useEffect(() => {
    getUserInfo().then((userInfo) => setUserInfo(userInfo));
  }, []);

  return (
    <>
      <AppBar color='primary' position='sticky' elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems='center'>
            <Grid item>
              <Typography color='inherit'>{props.mainTitle}</Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <IconButton color='inherit' sx={{ p: 1.5 }}>
                <Avatar
                  src={userInfo.imageUrl}
                  alt={userInfo.name + "Avatar"}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <LogoutButton />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {props.tabNames && (
        <AppBar
          component='div'
          position='static'
          elevation={0}
          sx={{ zIndex: 0 }}
        >
          <Tabs value={tabIndex} textColor='inherit'>
            {props.tabNames.map((name, index) => (
              <Tab label={name} onClick={() => setTabIndex(index)} />
            ))}
          </Tabs>
        </AppBar>
      )}
    </>
  );
}

Header.propTypes = {
  mainTitle: PropTypes.string,
  tabNames: PropTypes.arrayOf(PropTypes.string),
};

export default Header;
