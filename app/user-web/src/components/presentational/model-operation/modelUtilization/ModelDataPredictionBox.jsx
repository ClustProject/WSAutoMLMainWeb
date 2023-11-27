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
  Button,
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
} from "../../../../api/api";

const SpaceBetweenFlexBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px",
});

const SelectConzon = ({ onChange }) => {
  const [conzons, setConzons] = useState([]);
  const [selectedConzon, setSelectedConzon] = useState("");

  useEffect(() => {
    const fetchConzonNames = async () => {
      try {
        const fetchedConzons = await getConzonRowNames();

        setConzons(fetchedConzons);
        if (fetchedConzons.length > 0) {
          const firstConzonId = fetchedConzons[0].conzonId;
          setSelectedConzon(firstConzonId);
          if (onChange) {
            onChange(firstConzonId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch conzons", error);
      }
    };

    fetchConzonNames();
  }, [onChange]);

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

const SelectDate = ({ value, onChange }) => {
  const [allowedDates, setAllowedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const fetchedDates = await getConzonRowDatesById();
        const formattedDates = fetchedDates.map((item) => item.conzonDate);
        setAllowedDates(formattedDates);

        // 첫 번째 값을 selectedDate로 설정
        if (formattedDates.length > 0) {
          setSelectedDate(dayjs(formattedDates[0]));
          if (onChange) {
            onChange(dayjs(formattedDates[0]));
          }
        }
      } catch (error) {
        console.error("Failed to fetch dates", error);
      }
    };

    fetchDates();
  }, [onChange]);
  console.log(selectedDate);
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
  // const { open, onClose, selectedRowData } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [selectedConzon, setSelectedConzon] = useState("");
  const [conzonData, setConzonData] = useState(null);

  const handleDateChange = useCallback((newValue) => {
    setSelectedDate(dayjs(newValue));
  }, []); // dependencies 배열이 비어있으므로 컴포넌트가 마운트될 때만 함수가 생성됩니다.

  const handleTooltipChange = useCallback((speed) => {
    setCurrentSpeed(speed);
  }, []); // dependencies 배열이 비어있으므로 컴포넌트가 마운트될 때만 함수가 생성됩니다.

  useEffect(() => {
    // selectedConzon과 selectedDate가 변경될 때마다 데이터를 가져옵니다.
    const fetchConzonData = async () => {
      if (selectedConzon && selectedDate) {
        try {
          const data = await getConzonRowData(
            selectedConzon,
            dayjs(selectedDate).format("YYYY-MM-DD")
          );
          setConzonData(JSON.parse(data[0].conzonData));
        } catch (error) {
          console.error("Failed to fetch conzon data", error);
        }
      }
    };

    fetchConzonData();
  }, [selectedConzon, selectedDate]);
  return (
    <>
      {/* <Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
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
          <ContentWrappingBox> */}
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          margin: "25px",
          width: "100%",
        }}
      >
        <SpaceBetweenFlexBox>
          <SelectConzon onChange={setSelectedConzon} />
          <SelectDate value={selectedDate} onChange={handleDateChange} />
          <Button variant='outlined' sx={{ height: "56px" }} disabled>
            데이터 다운로드
          </Button>
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
      {/* </ContentWrappingBox>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default ModelDataPredictionBox;
