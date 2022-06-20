import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PersonIcon from '@mui/icons-material/Person';

const categories = [
  {
    id: '메인',
    children: [
      {id: '데이터', icon: <DnsRoundedIcon/>},
    ],
  },
  {
    id: '기타',
    children: [
      {id: '유저', icon: <PersonIcon/>},
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const {...other} = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}>
          AutoML
        </ListItem>
        <ListItem sx={{...item, ...itemCategory}}>
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText>대시보드</ListItemText>
        </ListItem>
        {categories.map(({id, children}) => (
          <Box key={id} sx={{bgcolor: '#101F33'}}>
            <ListItem sx={{py: 2, px: 3}}>
              <ListItemText sx={{color: '#fff'}}>{id}</ListItemText>
            </ListItem>
            {children.map(({id: childId, icon, active}) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{mt: 2}}/>
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
