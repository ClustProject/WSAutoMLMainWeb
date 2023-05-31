import React from "react";

import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const DataNavigationHeatMapChartBox2 = () => {
  const chartDiv = useRef(null);

  useEffect(() => {
    const root = am5.Root.new(chartDiv.current);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true,
    });

    yRenderer.grid.template.set("visible", false);

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        renderer: yRenderer,
        categoryField: "yField",
      })
    );

    const xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 10,
      opposite: false,
    });

    xRenderer.labels.template.set("rotation", -90);
    xRenderer.grid.template.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: "xField",
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        stroke: am5.color(0xffffff),
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: "xField",
        categoryYField: "yField",
        valueField: "value",
      })
    );

    series.columns.template.setAll({
      tooltipText: "{value}",
      strokeOpacity: 1,
      strokeWidth: 2,
      width: am5.percent(100),
      height: am5.percent(100),
    });

    series.columns.template.events.on("pointerover", function(event) {
      const di = event.target.dataItem;
      if (di) {
        heatLegend.showValue(di.get("value", 0));
      }
    });

    series.events.on("datavalidated", function() {
      heatLegend.set("startValue", series.getPrivate("valueHigh"));
      heatLegend.set("endValue", series.getPrivate("valueLow"));
    });

    series.set("heatRules", [
      {
        target: series.columns.template,
        min: am5.color(0xfffb77),
        max: am5.color(0xfe131a),
        dataField: "value",
        key: "fill",
      },
    ]);

    const heatLegend = chart.rightAxesContainer.children.push(
      am5.HeatLegend.new(root, {
        orientation: "vertical",
        endColor: am5.color(0xfffb77),
        startColor: am5.color(0xfe131a),
        reverseChildren: true,
        paddingLeft: 40,
      })
    );

    const data = require("./data-heatmap-chart2.json");

    const xCategories = data.columns.map((item) => {
      return { xField: item };
    });

    const yCategories = data.corr_index.map((item) => {
      return { yField: item };
    });

    const seriesData = data.data
      .map((row, rowIndex) => {
        return row.map((value, columnIndex) => {
          return {
            xField: data.columns[columnIndex],
            yField: data.corr_index[rowIndex],
            value: value,
          };
        });
      })
      .flat();
    console.log(seriesData);
    console.log(xCategories);
    console.log(yCategories);
    series.data.setAll(seriesData);
    yAxis.data.setAll(yCategories);
    xAxis.data.setAll(xCategories);

    return () => {
      chart.dispose();
      root.dispose();
    };
  }, []);
  return (
    <div
      ref={chartDiv}
      style={{ width: "700px", height: "600px", margin: "auto" }}
    ></div>
  );
};

export default DataNavigationHeatMapChartBox2;

// import React from "react";

// import { useEffect, useRef } from "react";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5xy from "@amcharts/amcharts5/xy";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// const DataNavigationHeatMapChartBox = () => {
//   const chartDiv = useRef(null);

//   useEffect(() => {
//     const root = am5.Root.new(chartDiv.current);

//     root.setThemes([am5themes_Animated.new(root)]);

//     const chart = root.container.children.push(
//       am5xy.XYChart.new(root, {
//         panX: false,
//         panY: false,
//         wheelX: "none",
//         wheelY: "none",
//         layout: root.verticalLayout,
//       })
//     );

//     const yRenderer = am5xy.AxisRendererY.new(root, {
//       visible: false,
//       minGridDistance: 20,
//       inversed: true,
//     });

//     yRenderer.grid.template.set("visible", false);

//     const yAxis = chart.yAxes.push(
//       am5xy.CategoryAxis.new(root, {
//         maxDeviation: 0,
//         renderer: yRenderer,
//         categoryField: "yField",
//       })
//     );

//     const xRenderer = am5xy.AxisRendererX.new(root, {
//       visible: false,
//       minGridDistance: 10,
//       opposite: false,
//     });

//     xRenderer.labels.template.set("rotation", -90);
//     xRenderer.grid.template.set("visible", false);

//     const xAxis = chart.xAxes.push(
//       am5xy.CategoryAxis.new(root, {
//         renderer: xRenderer,
//         categoryField: "xField",
//       })
//     );

//     const series = chart.series.push(
//       am5xy.ColumnSeries.new(root, {
//         calculateAggregates: true,
//         stroke: am5.color(0xffffff),
//         clustered: false,
//         xAxis: xAxis,
//         yAxis: yAxis,
//         categoryXField: "xField",
//         categoryYField: "yField",
//         valueField: "value",
//       })
//     );

//     series.columns.template.setAll({
//       tooltipText: "{value}",
//       strokeOpacity: 1,
//       strokeWidth: 2,
//       width: am5.percent(100),
//       height: am5.percent(100),
//     });

//     series.columns.template.events.on("pointerover", function(event) {
//       const di = event.target.dataItem;
//       if (di) {
//         heatLegend.showValue(di.get("value", 0));
//       }
//     });

//     series.events.on("datavalidated", function() {
//       heatLegend.set("startValue", series.getPrivate("valueHigh"));
//       heatLegend.set("endValue", series.getPrivate("valueLow"));
//     });

//     series.set("heatRules", [
//       {
//         target: series.columns.template,
//         min: am5.color(0xfffb77),
//         max: am5.color(0xfe131a),
//         dataField: "value",
//         key: "fill",
//       },
//     ]);

//     const heatLegend = chart.rightAxesContainer.children.push(
//       am5.HeatLegend.new(root, {
//         orientation: "vertical",
//         endColor: am5.color(0xfffb77),
//         startColor: am5.color(0xfe131a),
//         reverseChildren: true,
//         paddingLeft: 40,
//       })
//     );

//     const data = require("./data-heatmap-chart.json");

//     const xCategories = data.data.map((obj) => ({ xField: obj.index }));

//     const yCategories = Object.keys(data.data[0])
//       .filter((key) => key !== "index")
//       .map((key) => ({ yField: key }));

//     const seriesData = data.data.flatMap((obj) =>
//       Object.entries(obj)
//         .filter(([key, value]) => key !== "index")
//         .map(([key, value]) => ({
//           xField: obj.index,
//           yField: key,
//           value: value,
//         }))
//     );

//     series.data.setAll(seriesData);
//     yAxis.data.setAll(yCategories);
//     xAxis.data.setAll(xCategories);

//     return () => {
//       chart.dispose();
//       root.dispose();
//     };
//   }, []);
//   return (
//     <div
//       ref={chartDiv}
//       style={{ width: "700px", height: "600px", margin: "auto" }}
//     ></div>
//   );
// };

// export default DataNavigationHeatMapChartBox;
