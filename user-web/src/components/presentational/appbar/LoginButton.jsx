import React from "react";

import Button from "@mui/material/Button";

export default function LoginButton(props) {
  return (
    <Button
      key="로그인"
      sx={props.sx}
    >
      로그인
    </Button>
  );
}
