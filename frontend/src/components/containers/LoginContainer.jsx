import React from 'react'
import {Box, Container} from "@mui/material";
import LoginCard from "../presentational/LoginCard";

export default function LoginContainer() {
  return (
    <Container>
      <Box sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <LoginCard/>
      </Box>
    </Container>
  )
}
