import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import data from "./dict_test_data.json";
import { Gauge, G2, Area } from "@ant-design/plots";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ContentWrappingBox = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

const SpaceBetweenFlexBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "20px",
  "& > :first-child": {
    marginRight: "20px",
  },
});

const getAllowedDates = () => {
  // data에서 '집계일자'에 해당하는 모든 고유한 날짜를 추출합니다.
  const uniqueDates = new Set(data.map((item) => item.집계일자));
  return [...uniqueDates];
};

const allowedDates = getAllowedDates();

const shouldDisableDate = (date) => {
  // JS Date 객체를 dayjs 객체로 변환하여 비교
  return !allowedDates.includes(dayjs(date).format("YYYY-MM-DD"));
};

const SelectConzon = ({ value, onChange }) => {
  return (
    <FormControl variant='outlined' sx={{ width: "300px" }}>
      <InputLabel id='conzon-label'>구간 선택</InputLabel>
      <Select
        labelId='conzon-label'
        value={value}
        onChange={onChange}
        label='존 선택'
      >
        {/* 예제 아이템들. 실제 데이터에 따라 수정 필요. */}
        <MenuItem value={10}>존1</MenuItem>
        <MenuItem value={20}>존2</MenuItem>
        <MenuItem value={30}>존3</MenuItem>
      </Select>
    </FormControl>
  );
};

const SelectDate = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label='집계일자 선택'
        value={value}
        openTo='day'
        views={["day"]}
        format='YYYY-MM-DD'
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        shouldDisableDate={shouldDisableDate} // 비활성화 조건을 지정하는 prop 추가
      />
    </LocalizationProvider>
  );
};

const DataAreaChart = React.memo(({ date, onTooltipChange }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const newFilteredData = data.filter(
      (item) => item["집계일자"] === dayjs(date).format("YYYY-MM-DD")
    );
    setFilteredData(newFilteredData);
  }, [date]);

  const setTooltipPosition = (evt, plot) => {
    const { x, y } = evt.gEvent;
    const currentData = plot.chart.getTooltipItems({ x, y });
    if (currentData && currentData.length > 0 && currentData[0].data) {
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
      key={dayjs(date).format("YYYY-MM-DD")}
      onReady={(plot) => {
        plot.on("mousemove", (evt) => {
          setTooltipPosition(evt, plot);
        });
      }}
    />
  );
});

const GaugeComponent = ({ speed }) => {
  const ticks = [0, 0.33, 0.66, 1];
  const { registerShape, Util } = G2;

  registerShape("point", "custom-gauge-indicator2", {
    draw(cfg, container) {
      const { indicator, defaultColor } = cfg.customInfo;
      const { pointer, pin } = indicator;
      const group = container.addGroup();

      const center = this.parsePoint({
        x: 0,
        y: 0,
      });

      if (pointer) {
        const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate);
        const radius = this.coordinate.getRadius();
        const midAngle = (startAngle + endAngle) / 2;
        const { x: x1, y: y1 } = Util.polarToCartesian(
          center.x,
          center.y,
          radius / 15,
          midAngle + 1 / Math.PI
        );
        const { x: x2, y: y2 } = Util.polarToCartesian(
          center.x,
          center.y,
          radius / 15,
          midAngle - 1 / Math.PI
        );
        const { x, y } = Util.polarToCartesian(
          center.x,
          center.y,
          radius * 0.65,
          midAngle
        );
        const { x: x0, y: y0 } = Util.polarToCartesian(
          center.x,
          center.y,
          radius * 0.1,
          midAngle + Math.PI
        );
        const path = [
          ["M", x0, y0],
          ["L", x1, y1],
          ["L", x, y],
          ["L", x2, y2],
          ["Z"],
        ]; // pointer

        group.addShape("path", {
          name: "pointer",
          attrs: {
            path,
            fill: defaultColor,
            ...pointer.style,
          },
        });
      }

      if (pin) {
        const pinStyle = pin.style || {};
        const {
          lineWidth = 2,
          fill = defaultColor,
          stroke = defaultColor,
        } = pinStyle;
        const r = 6;
        group.addShape("circle", {
          name: "pin-outer",
          attrs: {
            x: center.x,
            y: center.y,
            ...pin.style,
            fill: "transparent",
            r: r * 1.5,
            lineWidth,
            stroke: stroke,
          },
        });
        group.addShape("circle", {
          name: "pin-inner",
          attrs: {
            x: center.x,
            y: center.y,
            r,
            stroke: "transparent",
            fill,
          },
        });
      }

      return group;
    },
  });
  const speedText = useMemo(() => `${speed} km/h`, [speed]);

  const config = useMemo(
    () => ({
      percent: speed / 120, // assuming max speed is 120
      range: {
        ticks: [0, 0.33, 0.66, 1],
        color: ["orangered", "khaki", "darkseagreen"],
      },
      indicator: {
        shape: "custom-gauge-indicator2",
        pointer: {
          style: {
            stroke: "#D0D0D0",
            lineWidth: 1,
            fill: "#D0D0D0",
          },
        },
        pin: {
          style: {
            lineWidth: 2,
            stroke: "#D0D0D0",
            fill: "#D0D0D0",
          },
        },
      },
      axis: {
        label: {
          formatter(v) {
            return Number(v) * 120;
          },
        },
        subTickLine: {
          count: 2,
        },
      },
      statistic: {
        title: {
          formatter: () => speedText,
          style: () => {
            return {
              fontSize: "18px",
              lineHeight: 1,
            };
          },
        },
        content: {
          offsetY: 36,
          style: ({ percent }) => {
            if (percent < ticks[1]) {
              return {
                fontSize: "24px",
                color: "orangered",
              };
            }

            if (percent < ticks[2]) {
              return {
                fontSize: "24px",
                color: "khaki",
              };
            }

            return {
              fontSize: "24px",
              color: "darkseagreen",
            };
          },
          formatter: ({ percent }) => {
            if (percent < ticks[1]) {
              return "정체";
            }

            if (percent < ticks[2]) {
              return "서행";
            }

            return "원활";
          },
        },
      },
    }),
    [speed]
  );

  return <Gauge {...config} />;
};

const SpeedInfo = () => {
  return (
    <>
      <Box
        sx={{
          marginY: "20px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f0f8ff",
        }}
      >
        <Box display='grid' justifyContent='space-around' width='100%'>
          <Box display='flex' alignItems='center'>
            <Box
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: "orangered",
                marginRight: "10px",
              }}
            ></Box>
            <Typography>정체: 40km/h 이하</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: "khaki",
                marginRight: "10px",
              }}
            ></Box>
            <Typography>서행: 40~80km/h</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: "darkseagreen",
                marginRight: "10px",
              }}
            ></Box>
            <Typography>원활: 80km/h 이상</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const ModelDataPredictionBox = (props) => {
  const { open, onClose, selectedRowData } = props;
  const [selectedDate, setSelectedDate] = useState(dayjs(getAllowedDates()[0]));
  const [currentSpeed, setCurrentSpeed] = useState(0);

  const handleDateChange = useCallback((newValue) => {
    setSelectedDate(dayjs(newValue));
  }, []); // dependencies 배열이 비어있으므로 컴포넌트가 마운트될 때만 함수가 생성됩니다.

  const handleTooltipChange = useCallback((speed) => {
    setCurrentSpeed(speed);
  }, []); // dependencies 배열이 비어있으므로 컴포넌트가 마운트될 때만 함수가 생성됩니다.

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
        <DialogTitle>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='h5'>예측 데이터 분석</Typography>
            <IconButton
              edge='end'
              color='inherit'
              onClick={onClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <ContentWrappingBox>
            <Box
              sx={{
                overflow: "auto",
                height: "100%",
                padding: "25px",
                width: "100%",
              }}
            >
              <SpaceBetweenFlexBox>
                <SelectConzon
                // value={selectedConzon}
                // onChange={handleConzonChange}
                />
                <SelectDate value={selectedDate} onChange={handleDateChange} />
              </SpaceBetweenFlexBox>

              <SpaceBetweenFlexBox>
                <Box sx={{ width: "75%" }}>
                  <DataAreaChart
                    date={selectedDate}
                    onTooltipChange={handleTooltipChange}
                  />
                </Box>
                <Box sx={{ width: "25%" }}>
                  <Box sx={{ height: "270px" }}>
                    <GaugeComponent speed={currentSpeed} />
                  </Box>
                  <SpeedInfo />
                </Box>
              </SpaceBetweenFlexBox>
            </Box>
          </ContentWrappingBox>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModelDataPredictionBox;
