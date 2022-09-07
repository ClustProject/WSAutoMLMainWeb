import React, {useEffect, useState} from "react";

import DataSetCard from './DataSetCard'

const mockDataSetInfo = [
  {
    "id": 1,
    "name": "a.csv",
    "description": "해당 데이터셋에 대한 설명"
  },
  {
    "id": 2,
    "name": "b.csv",
    "description": "해당 데이터셋에 대한 설명"
  },
  {
    "id": 3,
    "name": "c.csv",
    "description": "해당 데이터셋에 대한 설명"
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
          name={it.name}
          description={it.description}
        />
      ))}
    </>
  );
}

