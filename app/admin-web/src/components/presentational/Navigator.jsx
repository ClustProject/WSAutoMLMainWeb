import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const categories = [
  {
    id: "메타데이터",
    children: [
      {
        id: "관리",
        icon: <DnsRoundedIcon />,
        link: "/metadata/management",
      },
    ],
  },
  {
    id: "유저 관리",
    children: [
      {
        id: "권한 관리",
        icon: <ManageAccountsIcon />,
        link: "/user-management/role",
      },
    ],
  },
  {
    id: "WS-AutoML",
    link: "https://wsautoml.com",
    children: [
      {
        id: "검색",
        icon: <SearchIcon />,
        link: "https://wsautoml.com/search",
      },
      {
        id: "모델 학습",
        icon: <ModelTrainingIcon />,
        link: "https://wsautoml.com/model-learning",
      },
      {
        id: "모델 운영",
        icon: <QueryStatsIcon />,
        link: "https://wsautoml.com/model-operation",
      },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 18, color: "#fff" }}
        >
          WS-AutoML 관리자 페이지
        </ListItem>

        {categories.map(({ id, icon, link, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            {children ? (
              <ListItem>
                <ListItemButton
                  href={link}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover, &:focus": {
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  <ListItemText>{id}</ListItemText>
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem disablePadding sx={{ marginTop: "15px" }}>
                <ListItemButton href={link} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{id}</ListItemText>
                </ListItemButton>
              </ListItem>
            )}

            {children &&
              children.map(
                ({ id: childId, icon: childIcon, link: childLink, active }) => (
                  <ListItem key={childId}>
                    <ListItemButton
                      href={childLink}
                      selected={active}
                      sx={item}
                    >
                      <ListItemIcon>{childIcon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                )
              )}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
