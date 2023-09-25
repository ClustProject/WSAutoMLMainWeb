import React, { useState, useEffect } from "react";
import { Area } from "@ant-design/plots";
import dayjs from "dayjs";

const ConzonAreaChartComponent = React.memo(
  ({ selectedDate, conzonData, onTooltipChange }) => {
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
      if (conzonData) {
        setFilteredData(Object.values(conzonData));
      }
    }, [conzonData]);

    const setTooltipPosition = (evt, plot) => {
      const { x, y } = evt.gEvent;
      const currentData = plot.chart.getTooltipItems({ x, y });
      if (currentData && currentData.length > 0) {
        const speed = currentData[0].data["평균속도"];
        if (speed !== undefined) {
          onTooltipChange(speed);
        }
      }
    };

    const config = {
      data: filteredData,
      xField: "집계시분",
      yField: "평균속도",
      smooth: true,
      areaStyle: () => ({
        fill: "l(270) 0:#ffffff 0.5:#cdcdcd 1:#232323",
      }),
      yAxis: {
        label: {
          formatter: (value) => `${value} km/h`,
        },
      },
      xAxis: {
        tickCount: 5,
      },
      animation: false,
      slider: {
        start: 0.1,
        end: 0.9,
        trendCfg: {
          isArea: true,
        },
      },
      tooltip: {
        showTitle: false,
        title: "교통정보",
        fields: ["집계시분", "평균속도"],
      },
    };

    return (
      <Area
        {...config}
        key={dayjs(selectedDate).format("YYYY-MM-DD")}
        onReady={(plot) => {
          plot.on("mousemove", (evt) => {
            setTooltipPosition(evt, plot);
          });
        }}
      />
    );
  }
);

export default ConzonAreaChartComponent;
