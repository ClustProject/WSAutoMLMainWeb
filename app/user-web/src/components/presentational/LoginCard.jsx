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
          WS-AutoML에 오신 것을 환영합니다. <br />
          페이지를 이용하려면 로그인이 필요합니다.
        </Typography>
        <Box
          sx={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <GoogleButton
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
