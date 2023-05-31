import React from "react";
import { Column } from "@ant-design/plots";

const FeatureImportanceChartBox = (props) => {
  const rawData = props;
  console.log(rawData);
  const data = Object.entries(rawData.data.data[0]).map(([key, value]) => ({
    variable_name: key,
    importance: value,
  }));
  data.sort((a, b) => b.importance - a.importance);

  const config = {
    data,
    xField: "variable_name",
    yField: "importance",
    seriesField: "importance",
    autoFit: true,
    label: {
      position: "top",
      content: (originData) => {
        const val = parseFloat(originData.importance);
        if (val < 0.5) {
          return (val * 100).toFixed(1) + "%";
        }
      },
    },
    tooltip: {
      fields: ["importance"],
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    legend: false,
  };
  return (
    <Column
      {...config}
      style={{ width: "48%", height: "400px", marginRight: "2%" }}
    />
  );
};

export default FeatureImportanceChartBox;
