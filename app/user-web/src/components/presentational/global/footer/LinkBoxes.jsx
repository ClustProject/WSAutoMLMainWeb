import React from "react";

import { Box } from "@mui/material";
import LinkBox from "./LinkBox";

const linkBoxInfo = [
  {
    title: "Page",
    links: [
      { name: "메인페이지", href: "/" },
      {
        name: "데이터 검색",
        href: "https://wsautoml.com/search",
      },
      { name: "데이터 활용" },
      {
        name: "- 모델 학습",
        href: "https://wsautoml.com/model-learning",
      },
      {
        name: "- 모델 운영",
        href: "https://wsautoml.com/model-operation",
      },
    ],
  },
  {
    title: "Consortium",
    links: [
      {
        name: "한국전자기술연구원",
        href: "https://www.keti.re.kr",
      },
      {
        name: "달리웍스㈜",
        href: "https://www.daliworks.net",
      },
      {
        name: "㈜위세아이텍",
        href: "http://www.wise.co.kr",
      },
      {
        name: "케이웨더㈜",
        href: "https://www.kweather.co.kr",
      },
      {
        name: "고려대학교",
        href: "https://www.korea.ac.kr",
      },
      {
        name: "광운대학교",
        href: "https://www.kw.ac.kr",
      },
    ],
  },
  {
    title: "Vocabulary",
    links: [
      {
        name: "용어사전",
        href: "/vocabulary",
      },
    ],
  },
];

export default function LinkBoxes() {
  return (
    <Box
      sx={{
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {linkBoxInfo.map((it) => (
        <LinkBox title={it.title} links={it.links} />
      ))}
    </Box>
  );
}
