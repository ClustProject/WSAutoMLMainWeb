import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DataUtilizationMenus from "./DataUtilizationMenus";
import LoginButton from "./LoginButton";

const pages = ['홈페이지', '데이터 검색'];
const buttonSx = {
  my: 2, // margin top,bottom
  color: 'white'
};

export default function MainAppBar() {
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
