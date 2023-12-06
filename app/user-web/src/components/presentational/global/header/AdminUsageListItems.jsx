import React from "react";
import { Link, Typography } from "@mui/material";

export default function AdminUsageListItems() {
  return (
    <>
      <Typography
        variant='h6'
        sx={{
          margin: "25px",
          width: "20%",
          textAlign: "right",
        }}
      >
        <Link href='https://admin.wsautoml.com/home'>관리자 페이지</Link>
      </Typography>
    </>
  );
}
