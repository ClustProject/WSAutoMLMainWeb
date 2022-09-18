import React, {useEffect, useState} from "react";

import DataSetCard from './DataSetCard'

const mockDataSetInfo = [
  {
    "id": 1,
    "name": "SURFACE_ASOS_95_MI_2022-01_2022-01_2022.csv",
    "title": "종관기상관측",
    "description": "기상강원지방기상청 춘천기상대에서 측정한 데이터로 철원지점 해발고도 155m 지점에서 측정된 자료",
    "keyword": "기온, 습도, 기압, 지면온도, 풍향, 풍속, 일조"
  },
  {
    "id": 1,
    "name": "VDS_23_01_01_570513.csv",
    "title": "구간 통행속도",
    "description": "집계일자(PK), 집계시분 Or 집계시 Or 제외(PK), 콘존ID(PK), 차로유형구분코드(PK), 평균속도\n집계일자(PK), 집계시분 Or 집계시 Or 제외(PK), 콘존ID(PK), 차로유형구분코드(PK), 평균속도",
    "keyword": "구간, 통행속도, VDS, 콘존"
  },
  {
    "id": 1,
    "name": "VDS_38_01_01_210028.csv",
    "title": "구간 교통량",
    "description": "집계일자(PK), 집계시분 Or 집계시 Or 제외(PK), 콘존ID(PK), 차로유형구분코드(PK), 교통량",
    "keyword": "구간, 교통량, VDS, 콘존"
  }
];

export default function DataSetCards() {
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    setDataSet(mockDataSetInfo)
  })

  return (
    <>
      {dataSet.map(it => (
        <DataSetCard
          id={it.id}
          name={it.name}
          title={it.title}
          description={it.description}
          keyword={it.keyword}
        />
      ))}
    </>
  );
}

