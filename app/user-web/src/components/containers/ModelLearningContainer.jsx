import React from "react";
import Header from "../presentational/global/header/Header";
import MainAppBar from "../presentational/global/appbar/MainAppBar";
import { Grid, Container } from "@mui/material";
import Footer from "../presentational/global/footer/Footer";
import ModelLearningContent from "../presentational/model-learning/ModelLearningContent";
import ModelLearningSideBar from "../presentational/model-learning/ModelLearningSideBar";

function ModelLearningContainer() {
  return (
    <>
      <Header />
      <MainAppBar />
      <Container maxWidth={false} sx={{ marginTop: "15px" }}>
        <Grid container spacing={1} justify='flex-start'>
          <Grid
            item
            md={2}
            sx={{
              display: "block",
              "@media (max-width: 1240px)": { display: "none" },
              borderRight: "1px solid",
              borderColor: "grey.300",
            }}
          >
            <ModelLearningSideBar />
          </Grid>
          <Grid item md={10}>
            <ModelLearningContent />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default ModelLearningContainer;
