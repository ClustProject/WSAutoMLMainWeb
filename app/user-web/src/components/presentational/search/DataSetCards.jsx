import React, { useEffect, useState } from "react";

import DataSetCard from "./DataSetCard";
import { Pagination, Stack } from "@mui/material";
/**
 * 오름차순 정렬
 */
function ascOrder() {
  return (a, b) => {
    if (a.name === b.name) {
      return 0;
    }

    return a.name > b.name ? -1 : 1;
  };
}

const getFilteredData = (metadataArray, filters, searchKeyword) => {
  let filteredData = metadataArray;

  const filterConditions = {
    domain: [],
    theme: [],
    organization: [],
    timeUnit: [],
  };

  filters.forEach((filter) => {
    const [categoryKey, filterValue] = Object.entries(filter)[0];
    filterConditions[categoryKey].push(filterValue);
  });

  // 검색어를 사용하여 데이터를 필터링합니다.
  if (searchKeyword && searchKeyword.trim() !== "") {
    filteredData = filteredData.filter(
      (metadata) =>
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
  }

  filteredData = filteredData.filter((metadata) => {
    return (
      (filterConditions.domain.length === 0 ||
        filterConditions.domain.includes(metadata.catalog.category)) &&
      (filterConditions.theme.length === 0 ||
        filterConditions.theme.includes(metadata.catalog.theme)) &&
      (filterConditions.organization.length === 0 ||
        filterConditions.organization.includes(
          metadata.dataSet.organization.creator
        )) &&
      (filterConditions.timeUnit.length === 0 ||
        filterConditions.timeUnit.includes(
          metadata.distribution.temporalResolution
        ))
    );
  });

  return filteredData;
};

export default function DataSetCards({
  searchKeyword,
  setCountDataSet,
  filters,
  filteredMetadata,
}) {
  const [page, setPage] = useState(1); // 현재 페이지
  const [filteredData, setFilteredData] = useState([]); // 검색된 데이터셋 목록
  const pageSize = 5; // 페이지 당 데이터셋 수
  const totalPage = Math.ceil(filteredData.length / pageSize); // 전체 페이지 수
  const startIndex = (page - 1) * pageSize; // 현재 페이지에서 시작하는 인덱스
  const endIndex = startIndex + pageSize; // 현재 페이지에서 끝나는 인덱스

  useEffect(() => {
    const filteredData = getFilteredData(
      filteredMetadata, // use props instead of calling getMetadatas
      filters,
      searchKeyword
    );
    setFilteredData(filteredData);
    setCountDataSet(filteredData.length);
    setPage(1);
  }, [searchKeyword, filters, filteredMetadata]); // add filteredMetadata to dependency array

  useEffect(() => {
    if (filteredData.length > 0) {
      setCountDataSet(filteredData.length);
    }
  }, [filteredData.length, setCountDataSet]);

  return (
    <>
      {filteredData
        .sort(ascOrder())
        .slice(startIndex, endIndex)
        .map((it) => (
          <DataSetCard
            key={it.dataSet.id}
            id={it.dataSet.id}
            name={it.distribution.title}
            title={it.dataSet.title}
            description={it.distribution.description}
            keyword={it.dataSet.keyword}
          />
        ))}
      <Stack spacing={2} direction='row' justifyContent='center'>
        <Pagination
          count={totalPage}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Stack>
    </>
  );
}
