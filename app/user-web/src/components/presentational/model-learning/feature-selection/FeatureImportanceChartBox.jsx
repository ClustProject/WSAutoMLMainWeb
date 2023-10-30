import React from "react";
import { Column } from "@ant-design/plots";

const FeatureImportanceChartBox = (props) => {
  const rawData = props.data;
  const selectedFeatures = props.selectedFeatures;

  const data = Object.entries(rawData.data[0])
    .filter(([key, _]) => selectedFeatures.includes(key))
    .map(([key, value]) => ({
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
