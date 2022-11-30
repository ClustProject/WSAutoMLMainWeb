import React from "react";

import {Box} from "@mui/material";
import ContentMediaCard from "./ContentMediaCard";

const cardInfo = [
  {
    name: "검색",
    image: "/static/images/cards/search.jpg",
    link: "https://ws-automl.netlify.app/search"
  },
  {
    name: "모델 학습",
    image: "/static/images/cards/ai.jpeg",
    link: "https://ws-automl.netlify.app/model-learning"
  },
  {
    name: "시각화(예정)",
    image: "/static/images/cards/visualization.png"
  }
]

export default function ContentMediaCards() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: "center"
    }}>
      <Box sx={{
        width: "65%",
        height: "300px",
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        {cardInfo.map(it =>
          <ContentMediaCard
            name={it.name}
            image={it.image}
            link={it.link}
          />
        )}
      </Box></Box>
  );
}
