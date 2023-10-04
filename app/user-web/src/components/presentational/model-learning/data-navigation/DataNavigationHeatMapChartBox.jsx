import React from "react";
import { Heatmap } from "@ant-design/plots";

const DataNavigationHeatMapChartBox = (props) => {
  const json = props.heatMapData;

  const data = [];

  json.columns.forEach((column, i) => {
    json.corr_index.forEach((corr_index, j) => {
      data.push({
        corr_index: corr_index,
        columns: column,
        data: json.data[j][i],
      });
    });
  });

  const config = {
    width: 700,
    height: 500,
    autoFit: false,
    data,
    xField: "corr_index",
    yField: "columns",
    colorField: "data",
    color: ["#174c83", "#7eb6d4", "#efefeb", "#efa759", "#9b4d16"],
    xAxis: {
      label: {
        autoRotate: true, // x축 레이블 90도 회전
      },
    },
    legend: {
      position: "right-top",
    },
    tooltip: {
      fields: ["data"],
      showTitle: false,
      formatter: (data) => {
        return { name: "", value: data.data };
      },
    },
  };

  return <Heatmap {...config} />;
};

export default DataNavigationHeatMapChartBox;
