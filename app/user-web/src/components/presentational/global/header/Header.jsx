import React from "react";

import { Box, Avatar } from "@mui/material";
import MainLogo from "./MainLogo";
import AdminUsageListItems from "./AdminUsageListItems";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../../../authentication/AuthContext";

export default function Header() {
  const { user } = useAuth();

  const LogoutButton = () => {
    const handleLogout = async () => {
      // 로그아웃 처리를 위한 API 호출
      await fetch("/user/logout", { method: "POST" });

      // Google 로그인 화면으로 리다이렉트
      window.location.href = "/login"; // local Settings
      // window.location.href = "/";
    };

    return (
      <>
        <Typography color='inherit' sx={{ p: 1 }} variant='h6'>
          <IconButton onClick={handleLogout}>로그아웃</IconButton>
        </Typography>
      </>
    );
  };

  const UserInfo = () => {
    return (
      <>
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs />
          <Grid item>
            <IconButton color='inherit' sx={{ p: 1 }}>
              <Avatar src={user.imageUrl} alt={user.name + "Avatar"} />
            </IconButton>
          </Grid>
          <Grid item>
            <LogoutButton />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <MainLogo />
      {user && <UserInfo />}
      {user && (user.role === "MANAGER" || user.role === "ADMIN") && (
        <AdminUsageListItems />
      )}
    </Box>
  );
}
