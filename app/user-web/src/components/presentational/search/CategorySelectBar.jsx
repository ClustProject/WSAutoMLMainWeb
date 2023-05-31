import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListSubheader, Typography } from "@mui/material";
import { getMetadatas } from "../../../api/api";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export default function CategorySelectBar(props) {
  const {
    filters,
    setFilters,
    dateRange,
    setDateRange,
    setFilteredMetadata,
    searchKeyword,
  } = props;
  const [data, setData] = useState({
    domain: { name: "도메인", children: [] },
    theme: { name: "주제", children: [] },
    organization: { name: "기관", children: [] },
    timeUnit: { name: "시간단위", children: [] },
  });

  const [collapsed, setCollapsed] = useState({
    domain: false,
    theme: false,
    organization: false,
    timeUnit: false,
  });

  function countOccurrences(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  }

  const handleFilterClick = (categoryKey, name) => {
    const newFilter = { [categoryKey]: name };
    const existingFilterIndex = filters.findIndex(
      (filter) => filter[categoryKey] === name
    );

    if (existingFilterIndex === -1) {
      setFilters([...filters, newFilter]);
    } else {
      const updatedFilters = [...filters];
      updatedFilters.splice(existingFilterIndex, 1);
      setFilters(updatedFilters);
    }
  };

  useEffect(() => {
    getMetadatas()
      .then((metadataArray) => {
        const domain = [];
        const theme = [];
        const organization = [];
        const timeUnit = [];

        let filteredMetadataArray = metadataArray.filter((metadata) => {
          // Date range filtering
          const issuedDate = dayjs(metadata.dataSet.issued);
          const startDate = dateRange.startDate
            ? dayjs(dateRange.startDate)
            : null;
          const endDate = dateRange.endDate ? dayjs(dateRange.endDate) : null;

          if (startDate && endDate) {
            return issuedDate.isBetween(startDate, endDate, null, "[]");
          } else if (startDate) {
            return issuedDate.isSameOrAfter(startDate);
          } else if (endDate) {
            return issuedDate.isSameOrBefore(endDate);
          }

          return true;
        });

        // 검색어 필터링 추가
        if (searchKeyword) {
          filteredMetadataArray = filteredMetadataArray.filter((metadata) => {
            return (
              metadata.distribution.title
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ||
              metadata.dataSet.keyword
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ||
              metadata.dataSet.title
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ||
              metadata.distribution.description
                .toLowerCase()
                .includes(searchKeyword.toLowerCase())
            );
          });
        }

        filteredMetadataArray.forEach((metadata) => {
          domain.push(metadata.catalog.category);
          theme.push(metadata.catalog.theme);
          organization.push(metadata.dataSet.organization.creator);
          timeUnit.push(metadata.distribution.temporalResolution);
        });

        const domainCounts = countOccurrences(domain);
        const themeCounts = countOccurrences(theme);
        const organizationCounts = countOccurrences(organization);
        const timeUnitCounts = countOccurrences(timeUnit);

        setData({
          domain: { name: "도메인", children: domainCounts },
          theme: { name: "주제", children: themeCounts },
          organization: { name: "기관", children: organizationCounts },
          timeUnit: { name: "시간단위", children: timeUnitCounts },
        });
        setFilteredMetadata(filteredMetadataArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dateRange, searchKeyword]);

  console.log(data);
  console.log(dateRange);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          flexDirection: "column",
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              border: "1px solid gray",
              position: "relative",
              padding: "15px 5px 5px",
            }}
          >
            <Typography
              variant='h6'
              component='div'
              sx={{
                position: "absolute",
                top: "-15px",
                left: "5px",
                backgroundColor: "white",
                padding: "0px 5px",
              }}
            >
              데이터 등록일자
            </Typography>
            <Stack spacing={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='시작일'
                  value={dateRange.startDate}
                  openTo='year'
                  views={["year", "month", "day"]}
                  format='YYYY-MM-DD'
                  onChange={(newValue) => {
                    setDateRange((prevDateRange) => ({
                      ...prevDateRange,
                      startDate: newValue
                        ? dayjs(newValue).format("YYYY-MM-DD")
                        : null,
                    }));
                  }}
                  shouldDisableDate={(date) => {
                    // 종료일이 설정되어 있고, 선택하려는 시작일이 종료일보다 늦으면 선택할 수 없게 함
                    if (
                      dateRange.endDate &&
                      dayjs(date).isAfter(dayjs(dateRange.endDate))
                    ) {
                      return true;
                    }
                    return false;
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label='종료일'
                  value={dateRange.endDate}
                  openTo='year'
                  views={["year", "month", "day"]}
                  format='YYYY-MM-DD'
                  onChange={(newValue) => {
                    setDateRange((prevDateRange) => ({
                      ...prevDateRange,
                      endDate: newValue
                        ? dayjs(newValue).format("YYYY-MM-DD")
                        : null,
                    }));
                  }}
                  shouldDisableDate={(date) => {
                    // 시작일이 설정되어 있고, 선택하려는 종료일이 시작일보다 이전이면 선택할 수 없게 함
                    if (
                      dateRange.startDate &&
                      dayjs(date).isBefore(dayjs(dateRange.startDate))
                    ) {
                      return true;
                    }
                    return false;
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Box>
          {Object.keys(data).map((categoryKey) => (
            <Box
              sx={{
                width: "100%",
                border: "1px solid gray",
              }}
            >
              <List
                subheader={
                  <ListSubheader
                    component='div'
                    id='nested-list-subheader'
                    sx={{
                      backgroundColor: "#6573c3",
                      color: "white",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={() =>
                      setCollapsed({
                        ...collapsed,
                        [categoryKey]: !collapsed[categoryKey],
                      })
                    }
                  >
                    <Typography variant='h5'>
                      {data[categoryKey].name}
                    </Typography>
                    {collapsed[categoryKey] ? (
                      <ExpandMoreIcon />
                    ) : (
                      <ExpandLessIcon />
                    )}
                  </ListSubheader>
                }
              >
                <Collapse in={!collapsed[categoryKey]}>
                  {Object.entries(data[categoryKey].children).map(
                    ([name, count]) => (
                      <>
                        <Divider />
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() => handleFilterClick(categoryKey, name)}
                          >
                            <ListItemText primary={name} />
                            <ListItemText
                              primary={count}
                              sx={{
                                textAlign: "right",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      </>
                    )
                  )}
                </Collapse>
              </List>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
