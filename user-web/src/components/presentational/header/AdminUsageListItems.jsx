import React, {useState} from "react";

import {Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";

export default function AdminUsageListItems() {
  const [open, setOpen] = useState(false);

  return (
    <List
      sx={{margin: "20px", maxWidth: 200, bgcolor: 'background.paper'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <SupervisorAccountIcon/>
        </ListItemIcon>
        <ListItemText primary="관리자 기능"/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DnsRoundedIcon/>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography type="body2" style={{color: '#000000'}}>
                  메타데이터
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
