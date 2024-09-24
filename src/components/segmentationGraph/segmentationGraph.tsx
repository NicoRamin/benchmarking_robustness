import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SegmentationChart: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: "line",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
    },
    yAxis: {
      title: {
        text: "MIoU",
      },
      min: 0,
      max: 100,
    },
    series: [
      {
        name: "Models with highest mIoU",
        type: "line",
        data: [
          { x: 0, y: 60, name: "FCN" },
          { x: 4, y: 65, name: "PSPNet" },
          { x: 7, y: 70, name: "DeepLabV3+" },
          { x: 8, y: 75, name: "Trans2Lab" },
          { x: 9, y: 80, name: "Trans2Seg" },
        ],
        color: "#00c4cc",
        marker: {
          enabled: true,
          symbol: "circle",
          radius: 5,
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.point.name;
          },
          style: {
            fontSize: "10px",
            color: "#000000",
            textOutline: "none",
          },
          align: "center",
          verticalAlign: "bottom",
          y: -10, // Adjust this value to position the labels above the points
        },
      },
      {
        name: "Other models",
        type: "scatter",
        data: [
          { x: 1, y: 55, name: "U-Net" },
          { x: 2, y: 50, name: "One Peace" },
          { x: 5, y: 60, name: "SegFormer" },
          { x: 6, y: 63, name: "DeepLabV2" },
          { x: 8, y: 68, name: "YOLO" },
        ],
        color: "#d3d3d3",
        marker: {
          symbol: "circle",
          radius: 5,
        },
      },
    ],
    tooltip: {
      formatter: function () {
        return `<b>${this.point.name || "Other model"}: ${this.y}`;
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SegmentationChart;
