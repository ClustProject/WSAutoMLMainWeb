import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AllInboxIcon from "@mui/icons-material/AllInbox";

const ModelOperationDashboard = (props) => {
  return (
    <Box sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
      <Paper elevation={3} sx={{ p: "1rem", height: 100 }}>
        <Grid container spacing={2} justifyContent='center'>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mb: "0.5rem", margin: "1rem" }}>
              <AllInboxIcon sx={{ fontSize: 56 }} color='info' />
            </Box>
            <Box>
              <Typography textAlign='center'>모델 개수</Typography>
              <Typography textAlign='center' variant='h4'>
                {props.data.length}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mb: "0.5rem", margin: "1rem" }}>
              <AutoModeIcon sx={{ fontSize: 56 }} color='info' />
            </Box>
            <Box>
              <Typography textAlign='center'>학습중</Typography>
              <Typography textAlign='center' variant='h4'>
                {
                  props.data.filter((row) => row.result.state === "학습중")
                    .length
                }
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mb: "0.5rem", margin: "1rem" }}>
              <PublishedWithChangesIcon sx={{ fontSize: 56 }} color='info' />
            </Box>
            <Box>
              <Typography textAlign='center'>학습완료</Typography>
              <Typography textAlign='center' variant='h4'>
                {
                  props.data.filter((row) => row.result.state === "학습완료")
                    .length
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ModelOperationDashboard;
