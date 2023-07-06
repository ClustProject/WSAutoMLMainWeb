import React, { useEffect, useReducer, useState } from "react";
import {
  createMetadata,
  deleteMetadata,
  getMetadatas,
} from "../../../api/metadata";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Modal,
  styled,
  TextField,
} from "@mui/material";

import {
  CATEGORY_THEME_MAP,
  COLUMNS,
  CREATOR_CONTACT_POINT_NAME_MAP,
  DEFAULT_PAGE_COUNT,
  DISPLAY_COUNT,
  LICENSE_RIGHTS_MAP,
  TYPES,
} from "./constants";
import { DataGrid } from "@mui/x-data-grid";
import { getPreSignedUrl } from "../../../api/url";
import { uploadFileToS3, deleteFileFromS3 } from "../../../api/file-storage/s3";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  matchDataGoKrUrl,
  scrapDataGoKr,
} from "../../../api/scrap/scrapDataGoKr";
import DataSetSelect from "./DataSetSelect";
import DataInfoContentText from "./DataInfoContentText";
import DataSetTextField from "./DataSetTextField";
import CatalogReducer from "./reducers/CatalogReducer";
import DataSetReducer from "./reducers/DataSetReducer";
import DistributionReducer from "./reducers/DistributionReducer";

export const INIT_CATALOG_ARGS = {
  themes: [],
};

export const INIT_DATASET_ARGS = {
  contactPointNames: [],
  rightses: [],
};

export const INIT_DISTRIBUTION_ARGS = {};

const Input = styled("input")({});

const centerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

/**
 * 메타데이터 관리 컴포넌트.
 *
 * 메타데이터 페이지에서 매우 많은 비중을 차지하고 있습니다.
 * (데이터 입력에 따른 상태 변화는 각각의 reducer를 참조)
 */
export default function MetadataManagementContent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(DEFAULT_PAGE_COUNT);
  const [pageSize, setPageSize] = useState(DISPLAY_COUNT);

  const [inputLinkDialogOpen, setInputLinkDialogOpen] = useState(false);
  const [inputDataInfoDialogOpen, setInputDataInfoDialogOpen] = useState(false);

  const [progressBarOpend, setProgressBarOpend] = useState(false);
  const [fileUploadPercent, setFileUploadPercent] = useState(0);

  useEffect(() => {
    getMetadatas(DEFAULT_PAGE_COUNT, pageSize).then((it) => {
      setData(it);
      setPage(DEFAULT_PAGE_COUNT);
    });
    // .catch(() => alert("데이터를 불러오는데에 실패하였습니다."));
  }, [pageSize]);

  const [catalogState, dispatchCatalog] = useReducer(
    CatalogReducer,
    INIT_CATALOG_ARGS
  );

  function onChangeCatalog(event) {
    dispatchCatalog({
      payload: event.target,
    });
  }

  const [dataSetState, dispatchDataSet] = useReducer(
    DataSetReducer,
    INIT_DATASET_ARGS
  );

  function onChangeDataSet(event) {
    dispatchDataSet({
      payload: event.target,
    });
  }

  const [distributionState, dispatchDistribution] = useReducer(
    DistributionReducer,
    INIT_DISTRIBUTION_ARGS
  );

  function onChangeDistribution(event) {
    dispatchDistribution({
      payload: event.target,
    });
  }

  const totalDisplayedRowCount = (page + 1) * pageSize;

  const [selectedIds, setSelectedIds] = useState([]);
  const selectedUrls = data
    .filter((data) => selectedIds.includes(data.dataSet.id))
    .map((data) => data.distribution.downloadUrl);

  return (
    <>
      <Button
        id='uploadButton'
        variant='outlined'
        onClick={() => setInputLinkDialogOpen(true)}
      >
        업로드
      </Button>
      <Button
        variant='outlined'
        color='error'
        sx={{
          margin: 2,
        }}
        onClick={() => {
          if (selectedIds.length === 0) {
            return;
          }
          Promise.all(
            selectedUrls.map((downloadUrl) => {
              const key = downloadUrl.split("/").pop();
              return deleteFileFromS3(key);
            })
          )
            .then(() => deleteMetadata(selectedIds))
            .then(() => {
              alert("삭제가 완료되었습니다.");
              window.location.reload();
            })
            .catch((err) => {
              alert("삭제에 실패했습니다: " + err);
            });
        }}
      >
        삭제하기
      </Button>
      <Dialog open={inputLinkDialogOpen} onClose={closeInputLinkDialog}>
        <DialogTitle>URL 링크 입력</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>
            메타데이터 매핑을 위해 데이터를 받아온 URL을 입력해주세요.
          </Typography>
          <DialogContentText>
            * 메타데이터 자동 매핑이 제공되는 Url 링크는 아래와 같습니다.
          </DialogContentText>
          <DialogContentText>
            - '고속도로 공공데이터 포털>교통'
          </DialogContentText>
          <DialogContentText>
            - '기상자료개방포털>기상관측>지상'
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='sourceUrl'
            label='URL 입력 부분'
            fullWidth
            variant='standard'
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox id='linkCheckBox' onChange={setSourceUrlState} />
              }
              label='링크 없음'
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeInputLinkDialog}>취소</Button>
          <Button id='linkInputNextButton' onClick={handleInputLinkDialogNext}>
            다음
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={inputDataInfoDialogOpen} onClose={closeDataInfoDialog}>
        <DialogTitle>데이터 정보 입력</DialogTitle>
        <DialogContent>
          <DataInfoContentText name='카탈로그' />
          <DataSetSelect
            name={{ eng: "category", kor: "* 카테고리" }}
            onChange={onChangeCatalog}
            list={Object.keys(CATEGORY_THEME_MAP)}
            value={catalogState.category}
          />
          <DataSetSelect
            name={{ eng: "theme", kor: "* 주제" }}
            onChange={onChangeCatalog}
            list={catalogState.themes}
            value={catalogState.theme}
          />
          <DataSetTextField
            name={{ eng: "themeTaxonomy", kor: "주제 분류" }}
            onChange={onChangeCatalog}
            value={catalogState.themeTaxonomy}
          />

          <DataInfoContentText name='데이터셋' />
          <DataSetTextField
            name={{ eng: "title", kor: "* 제목" }}
            value={dataSetState.title}
            onChange={onChangeDataSet}
          />
          <DataSetTextField
            name={{ eng: "publisher", kor: "* 구축 기관" }}
            value={dataSetState.publisher}
            onChange={onChangeDataSet}
          />
          <DataSetSelect
            name={{ eng: "creator", kor: "* 생성 기관" }}
            onChange={onChangeDataSet}
            list={Object.keys(CREATOR_CONTACT_POINT_NAME_MAP)}
            value={dataSetState.creator}
          />
          <DataSetSelect
            name={{ eng: "contactPointName", kor: "* 담당자 이름" }}
            onChange={onChangeDataSet}
            list={dataSetState.contactPointNames}
            value={dataSetState.contactPointName}
          />
          <DataSetSelect
            name={{ eng: "type", kor: "* 유형" }}
            onChange={onChangeDataSet}
            list={TYPES}
            value={dataSetState.type}
          />
          <DataSetTextField
            name={{ eng: "keyword", kor: "* 키워드" }}
            value={dataSetState.keyword}
            onChange={onChangeDataSet}
          />
          <DataSetSelect
            name={{ eng: "license", kor: "* 라이센스" }}
            onChange={onChangeDataSet}
            list={Object.keys(LICENSE_RIGHTS_MAP)}
            value={dataSetState.license}
          />
          <DataSetSelect
            name={{ eng: "rights", kor: "* 권한" }}
            onChange={onChangeDataSet}
            list={dataSetState.rightses}
            value={dataSetState.rights}
          />
          <DataSetTextField
            name={{ eng: "description", kor: "* 설명" }}
            value={dataSetState.description}
            onChange={onChangeDataSet}
          />

          <DataInfoContentText name='배포' />
          <TextField
            id='distribution-title-text-field'
            label='* 제목'
            variant='filled'
            fullWidth
            disabled
            value='파일 업로드 시 자동으로 채워집니다'
          />

          <DataSetTextField
            name={{ eng: "description", kor: "설명" }}
            onChange={onChangeDistribution}
            value={distributionState.description}
          />

          <TextField
            id='downloadUrl-text-field'
            label='* 다운로드 URL'
            variant='filled'
            fullWidth
            disabled
            value='파일 업로드 시 자동으로 채워집니다'
          />

          <DataSetTextField
            name={{
              eng: "temporalResolution",
              kor: "* 시간 단위(ex. 1분, 5분, 15분, 30분, 1시간, 6시간, 1일)",
            }}
            onChange={onChangeDistribution}
            value={distributionState.temporalResolution}
          />

          <DataSetTextField
            name={{ eng: "accrualPeriodicty", kor: "제공 주기" }}
            onChange={onChangeDistribution}
            value={distributionState.accrualPeriodicty}
          />
          <DataSetTextField
            name={{ eng: "spatial", kor: "공간 정보" }}
            onChange={onChangeDistribution}
            value={distributionState.spatial}
          />
          <DataSetTextField
            name={{ eng: "temporal", kor: "시간 정보" }}
            onChange={onChangeDistribution}
            value={distributionState.temporal}
          />

          <label htmlFor='file'>
            <Input
              accept='.csv'
              id='file'
              type='file'
              onChange={onChangeDistribution}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDataInfoDialogPrevious}>뒤로가기</Button>
          <Button onClick={closeDataInfoDialog}>취소</Button>
          <Button id='finishButton' onClick={handleFinish}>
            완료
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={progressBarOpend}
        onClose={!progressBarOpend}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
        sx={{
          ...centerStyle,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            ...centerStyle,
          }}
        >
          <CircularProgress variant='determinate' value={fileUploadPercent} />
          <Box
            sx={{
              position: "absolute",
              ...centerStyle,
            }}
          >
            <Typography
              variant='caption'
              component='div'
              color='text.secondary'
            >
              {fileUploadPercent}%
            </Typography>
          </Box>
        </Box>
      </Modal>
      <Box sx={{ height: "90%" }}>
        <DataGrid
          rows={parseToRows(data)}
          rowCount={totalDisplayedRowCount + 1} // 다음 페이지로 넘어갈 수 있게 하나 더 추가
          columns={COLUMNS}
          page={page}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection={true}
          disableSelectionOnClick
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          paginationMode='server' // 서버에서 페이지네이션을 처리하므로 필수 옵션
          onPageChange={(newPage) => {
            getMetadatas(newPage, pageSize).then((it) => {
              setData(it);
              setPage(newPage);
            });
          }}
          initialState={{
            pagination: {
              page: DEFAULT_PAGE_COUNT,
            },
          }}
          onSelectionModelChange={(ids) => {
            setSelectedIds(ids);
          }}
        />
      </Box>
    </>
  );

  /**
   * data grid에서 row로 읽을 수 있도록 파싱합니다.
   */
  function parseToRows(metadatas) {
    return metadatas.map((metadata) => {
      return {
        ...metadata.catalog,
        ...metadata.dataSet,
        ...metadata.dataSet.organization,
        ...metadata.dataSet.organization.contactPoint,
        ...metadata.dataSet.licenseInfo,
        ...metadata.distribution,

        // dataSet과 distribution의 title과 description이 겹치므로 분리해서 사용
        dataSetTitle: metadata.dataSet.title,
        dataSetDescription: metadata.dataSet.description,
        distributionTitle: metadata.distribution.title,
        distributionDescription: metadata.distribution.description,
      };
    });
  }

  /**
   * 링크 입력 다이얼로그에서 다음 버튼을 누른 이후의 과정을 처리합니다.
   * 다이얼로그에서 입력한 url에 따라 dispatch 함수를 실행시켜 reducer를 호출합니다.
   *
   * See Also: https://ko.reactjs.org/docs/hooks-reference.html#usereducer
   */
  async function handleInputLinkDialogNext() {
    const url = document.getElementById("sourceUrl").value;

    if (url.startsWith("http://data.ex.co.kr")) {
      dispatchCatalog({
        type: "data.ex.co.kr",
      });

      const dispatches = [dispatchDataSet, dispatchDistribution];

      if (
        url ===
        "http://data.ex.co.kr/portal/fdwn/view?type=ETC&num=79&requestfrom=dataset"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "data-ex-79",
          })
        );
      }
      if (
        url ===
        "http://data.ex.co.kr/portal/fdwn/view?type=ETC&num=78&requestfrom=dataset"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "data-ex-78",
          })
        );
      }
      if (
        url ===
        "http://data.ex.co.kr/portal/fdwn/view?type=VDS&num=38&requestfrom=dataset"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "data-ex-38",
          })
        );
      }
      if (
        url ===
        "http://data.ex.co.kr/portal/fdwn/view?type=VDS&num=23&requestfrom=dataset"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "data-ex-23",
          })
        );
      }
    }

    //교통 하드 코딩
    if (url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS")) {
      dispatchCatalog({
        type: "ex/tcs",
      });

      const dispatches = [dispatchDataSet];

      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=34")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/34",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=35")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/35",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=32")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/32",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=31")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/31",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=39")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/39",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=65")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/65",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=64")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/64",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=C7")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/C7",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=17")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/17",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=33")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/33",
          })
        );
      }
      //페이지 전환
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=67")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/67",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=C5")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/C5",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=18")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/18",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=B6")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/B6",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=B1")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/B1",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=B5")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/B5",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=B3")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/B3",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=68")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/68",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=B4")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/B4",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=B2")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/B2",
          })
        );
      }
      //페이지 전환
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=B7")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/B7",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=C2")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/C2",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=C4")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/C4",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=C3")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/C3",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=66")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/66",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=A2")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/A2",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=B9")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/B9",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=C0")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/C0",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=A5")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/A5",
          })
        );
      }
      if (
        url.startsWith("http://data.ex.co.kr/portal/fdwn/view?type=TCS&num=69")
      ) {
        dispatches.forEach((it) =>
          it({
            type: "ex/tcs/69",
          })
        );
      }
    }
    //교통 하드 코딩

    if (
      url ===
      "https://data.kma.go.kr/data/grnd/selectAsosRltmList.do?pgmNo=36&tabNo=1"
    ) {
      [dispatchCatalog, dispatchDataSet, dispatchDistribution].forEach((it) =>
        it({
          type: "data-kma-36",
        })
      );
    }

    // kma 하드 코딩
    if (url.startsWith("https://data.kma.go.kr")) {
      dispatchCatalog({
        type: "kma",
      });

      const dispatches = [dispatchDataSet];

      if (
        url ===
        "https://data.kma.go.kr/data/grnd/selectAsosRltmList.do?pgmNo=36"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "kma/grnd_Asos",
          })
        );
      }

      if (
        url === "https://data.kma.go.kr/data/grnd/selectAwsRltmList.do?pgmNo=56"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "kma/grnd_Aws",
          })
        );
      }

      if (
        url === "https://data.kma.go.kr/data/grnd/selectAgrRltmList.do?pgmNo=72"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "kma/grnd_Agr",
          })
        );
      }

      if (
        url === "https://data.kma.go.kr/data/grnd/selectNkRltmList.do?pgmNo=58"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "kma/grnd_Nk",
          })
        );
      }

      if (
        url ===
        "https://data.kma.go.kr/data/grnd/selectAwosRltmList.do?pgmNo=638"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "kma/grnd_Awos",
          })
        );
      }

      if (
        url ===
        "https://data.kma.go.kr/data/seasonObs/seasonObsDataList.do?pgmNo=648"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "kma/season",
          })
        );
      }

      if (
        url ===
        "https://data.kma.go.kr/data/seasonObs/seasonObsDataList.do?pgmNo=648&tabNo=1"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "kma/season_Obs",
          })
        );
      }

      if (
        url ===
        "https://data.kma.go.kr/data/climate/selectDustRltmList.do?pgmNo=68"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "kma/climate",
          })
        );
      }

      if (
        url ===
        "https://data.kma.go.kr/data/lightning/lightningRltmList.do?pgmNo=641"
      ) {
        dispatches.forEach((it) =>
          it({
            type: "kma/lightning",
          })
        );
      }
    }
    // kma 하드 코딩

    if (matchDataGoKrUrl(url)) {
      const payload = await scrapDataGoKr(url);

      [dispatchDataSet, dispatchDistribution].forEach((it) =>
        it({
          type: "data.go.kr",
          payload,
        })
      );
    }

    closeInputLinkDialog();
    openDataInfoDialog();
  }

  function openDataInfoDialog() {
    setInputDataInfoDialogOpen(true);
  }

  function closeInputLinkDialog() {
    setInputLinkDialogOpen(false);
  }

  function setSourceUrlState() {
    const sourceUrl = document.getElementById("sourceUrl");
    const disabled = sourceUrl.getAttribute("disabled");

    if (disabled === null) {
      sourceUrl.setAttribute("disabled", "");
      sourceUrl.value = "";
    } else {
      sourceUrl.removeAttribute("disabled");
    }
  }

  function closeDataInfoDialog() {
    setInputDataInfoDialogOpen(false);

    clearAllStates();
  }

  function handleDataInfoDialogPrevious() {
    setInputDataInfoDialogOpen(false);
    clearAllStates();

    setInputLinkDialogOpen(true);
  }

  function clearAllStates() {
    [dispatchCatalog, dispatchDataSet, dispatchDistribution].forEach((it) => {
      it({
        type: "clear",
      });
    });
  }

  /**
   * 마지막 과정을 처리합니다.
   *
   * 데이터를 파일 저장소(S3)에 저장 및 DB에 입력한 메타데이터를 저장합니다.
   */
  async function handleFinish() {
    const file = document.getElementById("file").files[0];
    if (file === undefined) {
      alert("파일을 업로드 해주세요.");
      return;
    }

    const preSignedUrl = await getPreSignedUrl(file.name);
    const downloadUrl = preSignedUrl.split("?")[0];

    const createMetadataAttributes = {
      catalog: {
        ...catalogState,
      },
      dataset: {
        ...dataSetState,
      },
      distribution: {
        ...distributionState,
        title: file.name,
        downloadUrl,
      },
    };

    createMetadata(createMetadataAttributes)
      .then(() => displayProgressBar())
      .then(() => uploadFileToS3(preSignedUrl, file, setFileUploadPercent))
      .then(() => {
        closeProgressBar();
        // alert("저장 완료")
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.data.errors) {
          alert(err.response.data.errors[0].defaultMessage);
          return;
        }

        if (err.response.data.message) {
          alert(err.response.data.message);
          return;
        }

        alert("예상치 못한 에러가 발생했습니다. 관리자에게 문의하세요");
      });
  }

  function displayProgressBar() {
    setProgressBarOpend(true);
  }

  function closeProgressBar() {
    setProgressBarOpend(false);
  }
}
