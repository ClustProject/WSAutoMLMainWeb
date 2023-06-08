import React, { useState, useEffect } from "react";
import Header from "../presentational/global/header/Header";
import MainAppBar from "../presentational/global/appbar/MainAppBar";
import { Box, Container } from "@mui/material";
import Footer from "../presentational/global/footer/Footer";
import MetaDataTable from "../presentational/detail/MetaDataTable";
import MetaDataDownloadButton from "../presentational/detail/MetaDataDownloadButton";
import MetaDataInfoBox from "../presentational/detail/MetaDataInfoBox";
import FileDataDetailBox from "../presentational/detail/FileDataDetailBox";
import FileDataDetailCard from "../presentational/detail/FileDataDetailCard";
import MetaDataPreviewBox from "../presentational/detail/MetaDataPreviewBox";

const marginSize = "25px";

function MetadataDetailContainer() {
  const [data, setData] = useState([]);
  const [fileDownloadUrl, setFileDownloadUrl] = useState(null);
  useEffect(() => {
    if (data && data.length > 0) {
      setFileDownloadUrl(data[0].distribution.downloadUrl);
    }
  }, [data]);

  return (
    <>
      <Header />
      <MainAppBar />

      <Container
        sx={{
          marginTop: marginSize,
          fontWeight: "bold",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <FileDataDetailBox />
        </Box>
        <Box
          sx={{
            my: "15px",
          }}
        >
          <FileDataDetailCard />
        </Box>
        <Box
          sx={{
            display: "flex",
            marginBottom: "15px",
          }}
        >
          <MetaDataInfoBox />
          <MetaDataDownloadButton fileDownloadUrl={fileDownloadUrl} />
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <MetaDataTable data={data} setData={setData} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            margin: "10px",
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          미리보기
          <p style={{ fontSize: "14px", color: "#D0021B" }}>
            ※ 파일 데이터의 일부 내용을 제공하고 있으며, 전체 내용이 필요한 경우
            해당 파일을 다운로드 받으시기 바랍니다.
          </p>
        </Box>
        <MetaDataPreviewBox fileDownloadUrl={fileDownloadUrl} />
      </Container>

      <Footer />
    </>
  );
}

export default MetadataDetailContainer;
