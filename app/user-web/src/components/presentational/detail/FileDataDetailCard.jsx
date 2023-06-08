import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMetadatas } from "../../../api/api";

function FileDataDetailCard() {
  const { id } = useParams();
  const numId = Number(id); // id 형변환
  const [data, setData] = useState();

  useEffect(() => {
    getMetadatas()
      .then((it) => {
        console.log(it);
        const filteredData = it.filter((item) => item.dataSet.id === numId);
        setData(filteredData);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography
          variant='h5'
          component='div'
          sx={{
            fontWeight: "bold",
          }}
        >
          {data && data.length > 0 ? data[0].dataSet.title : ""}
        </Typography>
        <Typography variant='body2'>
          {data && data.length > 0 ? data[0].distribution.description : ""}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FileDataDetailCard;
