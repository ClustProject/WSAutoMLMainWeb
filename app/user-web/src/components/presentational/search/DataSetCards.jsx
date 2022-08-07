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
  },
  {
    "id": 4,
    "name": "d.csv",
    "description": "해당 데이터셋에 대한 설명"
  },
  {
    "id": 5,
    "name": "e.csv",
    "description": "해당 데이터셋에 대한 설명"
  },

  {
    "id": 6,
    "name": "f.csv",
    "description": "해당 데이터셋에 대한 설명"
  },

  {
    "id": 7,
    "name": "g.csv",
    "description": "해당 데이터셋에 대한 설명"
  },

  {
    "id": 8,
    "name": "h.csv",
    "description": "해당 데이터셋에 대한 설명"
  },

  {
    "id": 9,
    "name": "i.csv",
    "description": "해당 데이터셋에 대한 설명"
  },

  {
    "id": 10,
    "name": "j.csv",
    "description": "해당 데이터셋에 대한 설명"
  },
]

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

