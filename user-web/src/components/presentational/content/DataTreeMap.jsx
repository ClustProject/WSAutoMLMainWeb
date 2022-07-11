import React, {useEffect, useState} from "react";

import {ResponsiveContainer, Treemap} from "recharts";

/**
 * API 연결 시 이러한 데이터를 받아오도록 수정해야 합니다.
 */
const mockData = [
  {name: "대기 환경", size: 14},
  {name: "농장", size: 18},
  {name: "공장", size: 6},
  {name: "생체", size: 8},
  {name: "생활/영상", size: 9},
  {name: "에너지", size: 5},
  {name: "환경", size: 14},
  {name: "도시", size: 8},
  {name: "오픈데이터", size: 3}
];

export default function DataTreeMap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(mockData)
  }, [])

  return (
    <ResponsiveContainer>
      <Treemap
        data={data.filter(it => it.size !== 0)
          .map(it => {
            return {
              size: it.size,
              name: `${it.name} ${it.size}건`,
            }
          })}
        dataKey="size"
        ratio={4 / 3}
        stroke="#fff"
      />
    </ResponsiveContainer>
  );
}
