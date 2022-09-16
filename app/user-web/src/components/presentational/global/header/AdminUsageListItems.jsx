import React from "react";
import {Link, Typography} from "@mui/material";

export default function AdminUsageListItems() {
  const [open, setOpen] = React.useState(false);

  return (
    <Typography
      variant="h6"
      sx={{
        margin: '25px'
      }}>
      <Link href="http://automl-main-web-load-balancer-213875655.ap-northeast-2.elb.amazonaws.com/">
        관리자 전환
      </Link>

    </Typography>
  );
}
