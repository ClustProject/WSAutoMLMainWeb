import React from "react";
import Header from "../presentational/global/header/Header";
import MainAppBar from "../presentational/global/appbar/MainAppBar";
import {Container} from "@mui/material";
import Footer from "../presentational/global/footer/Footer";
import ModelLearningContent from "../presentational/model-learning/ModelLearningContent";

function ModelLearningContainer() {
  return (
    <>
      <Header/>
      <MainAppBar/>

      <Container sx={{
        marginTop: "15px"
      }}>
        <ModelLearningContent/>
      </Container>

      <Footer/>
    </>
  );
}

export default ModelLearningContainer;
