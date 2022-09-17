import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GoogleButton from 'react-google-button';
import {Box} from "@mui/material";

export default function LoginCard() {
  return (
    <Card sx={{
      width: 350,
    }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{
          margin: '15px',
          textAlign: 'center'
        }}>
          관리자 전용 페이지로 허가 받은 <br/>사용자만 접속이 가능합니다.
        </Typography>
        <Box sx={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <GoogleButton
            type="light"
            label="Google로 로그인"
            onClick={() => window.location.href = '/home'}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
