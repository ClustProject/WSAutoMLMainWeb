import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import DataUtilizationMenus from "./DataUtilizationMenus";

const buttonSx = {my: 2, color: 'white', display: 'block'};

function LoginButton() {
  return (
    <Button
      key="로그인"
      sx={buttonSx}
    >
      로그인
    </Button>
  );
}

export default function MainAppBar() {
  const pages = ['홈페이지', '데이터 검색'];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
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
          <LoginButton/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
