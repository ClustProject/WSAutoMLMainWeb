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
        <Link href='http://automl-main-web-load-balancer-213875655.ap-northeast-2.elb.amazonaws.com/'>
          관리자 페이지
        </Link>
      </Typography>
    </>
  );
}
