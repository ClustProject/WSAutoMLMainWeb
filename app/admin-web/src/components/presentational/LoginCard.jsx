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
      height: 200
    }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{
          margin: '15px',
          textAlign: 'center'
        }}>
          로그인
        </Typography>
        <Box sx={{
          marginTop: '50px',
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
