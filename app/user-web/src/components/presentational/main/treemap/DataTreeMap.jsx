import React, {useEffect, useState} from "react";

import {Box} from "@mui/material";

import {ResponsiveContainer, Treemap} from "recharts";
import getCategoryCount from "../../../../api/get-category-count";

const categoryNameKoreanEnglishMap = {
  "atmosphericEnvironment": "대기 환경",
  "farm": "농장",
  "factory": "공장",
  "vital": "생체",
  "lifeAndVideo": "생활/영상",
  "energy": "에너지",
  "environment": "환경",
  "city": "도시",
  "openData": "오픈데이터"
}

export default function DataTreeMap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCategoryCount()
      .then(it => setData(it));
  }, [])

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: "center"
    }}>
      <Box sx={{
        width: "50%",
        height: "350px",
        marginTop: "25px"
      }}>
        <ResponsiveContainer>
          <Treemap
            data={
              Object.keys(data)
                .map(it => {
                  const count = data[it];
                  const koreanName = categoryNameKoreanEnglishMap[it];

                  return {
                    name: `${koreanName} (${count}건)`,
                    size: count
                  }
                })
            }
            dataKey="size"
            ratio={4 / 3}
            stroke="#fff"
          />
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
