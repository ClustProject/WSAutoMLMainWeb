import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GoogleButton from "react-google-button";
import { Box } from "@mui/material";

export default function LoginCard() {
  return (
    <Card
      sx={{
        width: 450,
      }}
    >
      <CardContent>
        <Typography
          variant='h6'
          component='div'
          sx={{
            margin: "15px",
            textAlign: "center",
          }}
        >
          WS-AutoML 관리자 전용 페이지로 <br />
          허가 받은 사용자만 접속이 가능합니다.
        </Typography>
        <Box
          sx={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <GoogleButton
            id='googleLoginButton'
            type='light'
            label='Google로 로그인'
            // onClick={() =>
            //   (window.location.href =
            //     "http://localhost:8080/oauth2/authorization/google")
            // } // local settings
            onClick={() =>
              (window.location.href = "/oauth2/authorization/google")
            } // prod settings
          />
        </Box>
      </CardContent>
    </Card>
  );
}
