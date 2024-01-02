import React, { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ConzonAreaChartComponent from "../modelChart/ConzonAreaChartComponent";
import ConzonGuageComponent from "../modelChart/ConzonGuageComponent";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  getConzonRowNames,
  getConzonRowDatesById,
  getConzonRowData,
  getConzonImputatedNames,
  getConzonImputatedDatesById,
  getConzonImputatedData,
} from "../../../../api/api";
import ModelUtilizationDataDownloadBox from "./ModelUtilizationDataDownloadBox";

const SpaceBetweenFlexBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px",
});

const SelectConzon = ({ selectData, onChange }) => {
  const [conzons, setConzons] = useState([]);
  const [selectedConzon, setSelectedConzon] = useState("");

  const fetchConzonNames = async () => {
    try {
      let fetchedConzons;
      if (selectData === "data_predict") {
        fetchedConzons = await getConzonRowNames();
      } else if (selectData === "data_interpolate") {
        fetchedConzons = await getConzonImputatedNames();
      }
      setConzons(fetchedConzons || []);

      // 현재 선택된 값이 새로운 리스트에 있는지 확인
      if (
        !fetchedConzons.some((conzon) => conzon.conzonId === selectedConzon)
      ) {
        // 새로운 리스트에 현재 선택된 값이 없다면, 첫 번째 값을 선택
        const firstConzonId =
          fetchedConzons.length > 0 ? fetchedConzons[0].conzonId : "";
        setSelectedConzon(firstConzonId);
        if (onChange) {
          onChange(firstConzonId);
        }
      }
    } catch (error) {
      console.error("Failed to fetch conzons", error);
    }
  };

  useEffect(() => {
    fetchConzonNames();
    const intervalId = setInterval(fetchConzonNames, 15000);

    return () => clearInterval(intervalId);
  }, [selectedConzon, onChange]);

  return (
    <FormControl variant='outlined' sx={{ width: "300px" }}>
      <InputLabel id='conzon-label'>구간 선택</InputLabel>
      <Select
        labelId='conzon-label'
        value={selectedConzon}
        onChange={(e) => {
          setSelectedConzon(e.target.value);
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        label='구간 선택'
      >
        {conzons.map((conzon) => (
          <MenuItem key={conzon.conzonId} value={conzon.conzonId}>
            {conzon.conzonName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SelectDate = ({ selectData, value, onChange }) => {
  const [allowedDates, setAllowedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const fetchDates = async () => {
    try {
      let fetchedDates;
      if (selectData === "data_predict") {
        fetchedDates = await getConzonRowDatesById();
      } else if (selectData === "data_interpolate") {
        fetchedDates = await getConzonImputatedDatesById();
      }
      const formattedDates = fetchedDates.map((item) => item.conzonDate);
      setAllowedDates(formattedDates);

      // 현재 선택된 날짜가 새로운 리스트에 있는지 확인
      if (!formattedDates.includes(dayjs(selectedDate).format("YYYY-MM-DD"))) {
        // 새로운 리스트에 현재 선택된 날짜가 없다면, 첫 번째 값을 선택
        if (formattedDates.length > 0) {
          const newSelectedDate = dayjs(formattedDates[0]);
          setSelectedDate(newSelectedDate);
          if (onChange) {
            onChange(newSelectedDate);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch dates", error);
    }
  };

  useEffect(() => {
    fetchDates();
    const intervalId = setInterval(fetchDates, 15000);

    return () => clearInterval(intervalId);
  }, [selectedDate, onChange]);
  // console.log(selectedDate);
  const shouldDisableDate = (date) => {
    return !allowedDates.includes(dayjs(date).format("YYYY-MM-DD"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label='집계일자 선택'
        value={selectedDate || value}
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
  const { selectData, work } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [selectedConzon, setSelectedConzon] = useState("");
  const [conzonData, setConzonData] = useState(null);
  const handleDateChange = useCallback((newValue) => {
    setSelectedDate(dayjs(newValue));
  }, []); // dependencies 배열이 비어있으므로 컴포넌트가 마운트될 때만 함수가 생성됩니다.

  const handleTooltipChange = useCallback((speed) => {
    // 소수점 둘째 자리까지만 나타내기
    const formattedSpeed = parseFloat(speed).toFixed(2);
    setCurrentSpeed(formattedSpeed);
  }, []); // dependencies 배열이 비어있으므로 컴포넌트가 마운트될 때만 함수가 생성됩니다.

  useEffect(() => {
    const fetchData = async () => {
      if (selectedConzon && selectedDate) {
        try {
          let data;
          if (selectData === "data_predict") {
            data = await getConzonRowData(
              selectedConzon,
              dayjs(selectedDate).format("YYYY-MM-DD")
            );
          } else if (selectData === "data_interpolate") {
            data = await getConzonImputatedData(
              selectedConzon,
              dayjs(selectedDate).format("YYYY-MM-DD")
            );
          }
          setConzonData(data ? JSON.parse(data[0].conzonData) : null);
        } catch (error) {
          console.error("Failed to fetch conzon data", error);
        }
      }
    };

    fetchData();
  }, [selectedConzon, selectedDate, selectData]);
  return (
    <>
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          margin: "25px",
          width: "100%",
        }}
      >
        <SpaceBetweenFlexBox>
          <SelectConzon onChange={setSelectedConzon} selectData={selectData} />
          <SelectDate
            value={selectedDate}
            onChange={handleDateChange}
            selectData={selectData}
          />
          <ModelUtilizationDataDownloadBox work={work} />
        </SpaceBetweenFlexBox>

        <SpaceBetweenFlexBox>
          <Box sx={{ width: "75%", height: "370px" }}>
            <ConzonAreaChartComponent
              selectedDate={selectedDate}
              conzonData={conzonData}
              onTooltipChange={handleTooltipChange}
            />
          </Box>
          <Box sx={{ width: "25%" }}>
            <Box sx={{ height: "240px" }}>
              <ConzonGuageComponent speed={currentSpeed} />
            </Box>
            <SpeedInfo />
          </Box>
        </SpaceBetweenFlexBox>
      </Box>
    </>
  );
};

export default ModelDataPredictionBox;
