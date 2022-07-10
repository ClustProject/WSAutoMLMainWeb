import React from "react";
import Button from "@mui/material/Button";
import {Box, Menu, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function AdminUsageListItems() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{
      margin: "20px"
    }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(event) => setOpen(event.currentTarget)}
      >
        <Typography variant="h6">관리자 기능</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={open}
        open={open}
        onClose={() => setOpen(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>메타데이터 관리</MenuItem>
      </Menu>
    </Box>
  );
}
