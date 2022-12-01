import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DataUtilizationMenus from "./DataUtilizationMenus";

import HomeIcon from '@mui/icons-material/Home';
import {IconButton} from "@mui/material";

const pages = [
  {
    "icon": <HomeIcon/>,
    "name": '홈페이지',
    "link": "http://automl-user-load-balancer-366843044.ap-northeast-2.elb.amazonaws.com"
  },
  {
    "name": '데이터 검색',
    "link": "/search"
  }
];

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
            <>
              {page.icon ?
                <IconButton
                  aria-label="home"
                  onClick={() => window.location.href = page.link}
                  sx={{
                    color: 'white'
                  }}
                >
                  {page.icon}
                </IconButton>
                :
                <Button
                  key={page.name}
                  sx={{
                    my: 2, // margin top,bottom
                    color: 'white'
                  }}
                  onClick={() => window.location.href = page.link}
                >
                  {page.name}
                </Button>
              }

            </>
          ))}
          <DataUtilizationMenus/>
        </Box>
      </Box>
    </AppBar>
  );
}
