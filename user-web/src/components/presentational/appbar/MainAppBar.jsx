import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DataUtilizationMenus from "./DataUtilizationMenus";

function LoginButton(props) {
  return (
    <Button
      key="로그인"
      sx={props.sx}
    >
      로그인
    </Button>
  );
}

export default function MainAppBar() {
  const pages = ['홈페이지', '데이터 검색'];
  const buttonSx = {
    my: 2,
    color: 'white'
  };

  return (
    <AppBar position="static">
      <Box sx={{
        mx: '20px', // margin left,right
        display: 'flex',
      }}>
        <Box sx={{
          flexGrow: 1,
        }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={buttonSx}
            >
              {page}
            </Button>
          ))}
          <DataUtilizationMenus/>
        </Box>
        <LoginButton sx={buttonSx}/>
      </Box>
    </AppBar>
  );
}
