import React, {useEffect, useReducer, useState} from 'react';
import {createMetadata, deleteMetadata, getMetadatas} from "../../../api/metadata";
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
  TextField
} from "@mui/material";

import {
  CATEGORY_THEME_MAP,
  COLUMNS,
  CREATOR_CONTACT_POINT_NAME_MAP,
  DEFAULT_PAGE_COUNT,
  DISPLAY_COUNT,
  LICENSE_RIGHTS_MAP,
  TYPES
} from "./constants";
import {DataGrid} from "@mui/x-data-grid";
import {getPreSignedUrl} from "../../../api/url";
import {uploadFileToS3} from "../../../api/file-storage/s3";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {matchDataGoKrUrl, scrapDataGoKr} from "../../../api/scrap/scrapDataGoKr";
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

const Input = styled('input')({});

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default function MetadataManagementContent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(DEFAULT_PAGE_COUNT);

  const [inputLinkDialogOpen, setInputLinkDialogOpen] = useState(false);
  const [inputDataInfoDialogOpen, setInputDataInfoDialogOpen] = useState(false);

  const [progressBarOpend, setProgressBarOpend] = useState(false);
  const [fileUploadPercent, setFileUploadPercent] = useState(0);

  useEffect(() => {
    getMetadatas(DEFAULT_PAGE_COUNT, DISPLAY_COUNT)
      .then(it => {
        setData(it)
        setPage(DEFAULT_PAGE_COUNT)
      })
    // .catch(() => alert("데이터를 불러오는데에 실패하였습니다."));
  }, [])

  const [catalogState, dispatchCatalog] = useReducer(CatalogReducer, INIT_CATALOG_ARGS)

  function onChangeCatalog(event) {
    dispatchCatalog({
      payload: event.target
    });
  }

  const [dataSetState, dispatchDataSet] = useReducer(DataSetReducer, INIT_DATASET_ARGS)

  function onChangeDataSet(event) {
    dispatchDataSet({
      payload: event.target
    });
  }

  const [distributionState, dispatchDistribution] = useReducer(DistributionReducer, INIT_DISTRIBUTION_ARGS)

  function onChangeDistribution(event) {
    dispatchDistribution({
      payload: event.target
    });
  }

  const totalDisplayedRowCount = (page + 1) * DISPLAY_COUNT;

  const [selectedIds, setSelectedIds] = React.useState([]);

  return (
    <>
      <Button variant="outlined" onClick={() => setInputLinkDialogOpen(true)}>
        업로드
      </Button>
      <Button variant="outlined" color="error" sx={{
        margin: 2
      }} onClick={() => {
        if (selectedIds.length === 0) {
          return;
        }

        deleteMetadata(selectedIds)
          .then(() => {
            alert("삭제 완료")
            window.location.reload()
          })
      }
      }>
        삭제하기
      </Button>
      <Dialog open={inputLinkDialogOpen} onClose={closeInputLinkDialog}>
        <DialogTitle>링크 입력</DialogTitle>
        <DialogContent>
          <DialogContentText>
            데이터를 다운받은 링크를 먼저 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="sourceUrl"
            label="다운받은 URL"
            fullWidth
            variant="standard"
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={setSourceUrlState}
                />
              }
              label="링크 없음"/>
          </FormGroup>

        </DialogContent>
        <DialogActions>
          <Button onClick={closeInputLinkDialog}>취소</Button>
          <Button onClick={handleInputLinkDialogNext}>다음</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={inputDataInfoDialogOpen} onClose={closeDataInfoDialog}>
        <DialogTitle>데이터 정보 입력</DialogTitle>
        <DialogContent>

          <DataInfoContentText name="카탈로그"/>
          <DataSetSelect
            name={{eng: 'category', kor: '카테고리'}}
            onChange={onChangeCatalog}
            list={Object.keys(CATEGORY_THEME_MAP)}
            value={catalogState.category}
          />
          <DataSetSelect
            name={{eng: 'theme', kor: '주제'}}
            onChange={onChangeCatalog}
            list={catalogState.themes}
            value={catalogState.theme}
          />
          <DataSetTextField
            name={{eng: 'themeTaxonomy', kor: '주제 분류'}}
            onChange={onChangeCatalog}
            value={catalogState.themeTaxonomy}
          />

          <DataInfoContentText name="데이터셋"/>
          <DataSetTextField
            name={{eng: 'title', kor: '제목'}}
            value={dataSetState.title}
            onChange={onChangeDataSet}
          />
          <DataSetTextField
            name={{eng: 'publisher', kor: '구축 기관'}}
            value={dataSetState.publisher}
            onChange={onChangeDataSet}
          />
          <DataSetSelect
            name={{eng: 'creator', kor: '생성 기관'}}
            onChange={onChangeDataSet}
            list={Object.keys(CREATOR_CONTACT_POINT_NAME_MAP)}
            value={dataSetState.creator}
          />
          <DataSetSelect
            name={{eng: 'contactPointName', kor: '담당자 이름'}}
            onChange={onChangeDataSet}
            list={dataSetState.contactPointNames}
            value={dataSetState.contactPointName}
          />
          <DataSetSelect
            name={{eng: 'type', kor: '유형'}}
            onChange={onChangeDataSet}
            list={TYPES}
            value={dataSetState.type}
          />
          <DataSetTextField
            name={{eng: 'keyword', kor: '키워드'}}
            value={dataSetState.keyword}
            onChange={onChangeDataSet}
          />
          <DataSetSelect
            name={{eng: 'license', kor: '라이센스'}}
            onChange={onChangeDataSet}
            list={Object.keys(LICENSE_RIGHTS_MAP)}
            value={dataSetState.license}
          />
          <DataSetSelect
            name={{eng: 'rights', kor: '권한'}}
            onChange={onChangeDataSet}
            list={dataSetState.rightses}
            value={dataSetState.rights}
          />
          <DataSetTextField
            name={{eng: 'description', kor: '설명'}}
            value={dataSetState.description}
            onChange={onChangeDataSet}
          />

          <DataInfoContentText name="배포"/>
          <TextField
            id="distribution-title-text-field"
            label="제목"
            variant="filled"
            fullWidth
            disabled
            value="파일 업로드 시 자동으로 채워집니다"
          />

          <DataSetTextField
            name={{eng: 'description', kor: '설명'}}
            onChange={onChangeDistribution}
            value={distributionState.description}
          />

          <TextField
            id="downloadUrl-text-field"
            label="다운로드 URL"
            variant="filled"
            fullWidth
            disabled
            value="파일 업로드 시 자동으로 채워집니다"
          />

          <DataSetTextField
            name={{eng: 'temporalResolution', kor: '측정 단위'}}
            onChange={onChangeDistribution}
            value={distributionState.temporalResolution}
          />

          <DataSetTextField
            name={{eng: 'accurualPeriodicity', kor: '제공 주기'}}
            onChange={onChangeDistribution}
            value={distributionState.accurualPeriodicity}
          />
          <DataSetTextField
            name={{eng: 'spatial', kor: '공간 정보'}}
            onChange={onChangeDistribution}
            value={distributionState.spatial}
          />
          <DataSetTextField
            name={{eng: 'temporal', kor: '시간 정보'}}
            onChange={onChangeDistribution}
            value={distributionState.temporal}
          />

          <label htmlFor="file">
            <Input
              accept=".csv"
              id="file"
              type="file"
              onChange={onChangeDistribution}
            />
          </label>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDataInfoDialogPrevious}>뒤로가기</Button>
          <Button onClick={closeDataInfoDialog}>취소</Button>
          <Button onClick={handleFinish}>완료</Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={progressBarOpend}
        onClose={!progressBarOpend}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{
          ...centerStyle,
        }}
      >
        <Box sx={{
          backgroundColor: 'white',
          ...centerStyle
        }}>
          <CircularProgress variant="determinate" value={fileUploadPercent}/>
          <Box
            sx={{
              position: 'absolute',
              ...centerStyle,
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {fileUploadPercent}%
            </Typography>
          </Box>
        </Box>
      </Modal>


      <DataGrid
        rows={parseToRows(data)}
        rowCount={totalDisplayedRowCount + 1} // 다음 페이지로 넘어갈 수 있게 하나 더 추가
        columns={COLUMNS}
        page={page}
        pageSize={DISPLAY_COUNT}
        rowsPerPageOptions={[DISPLAY_COUNT]}
        checkboxSelection={true}
        disableSelectionOnClick
        paginationMode="server" // 서버에서 페이지네이션을 처리하므로 필수 옵션
        onPageChange={newPage => {
          getMetadatas(newPage, DISPLAY_COUNT)
            .then(it => {
              setData(it)
              setPage(newPage)
            })
        }}
        initialState={{
          pagination: {
            page: DEFAULT_PAGE_COUNT
          }
        }}
        onSelectionModelChange={(ids) => {
          setSelectedIds(ids);
        }}
      />
    </>
  );

  /**
   * data grid에서 row로 읽을 수 있도록 파싱합니다.
   */
  function parseToRows(metadatas) {
    return metadatas.map(metadata => {
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
      }
    });
  }

  async function handleInputLinkDialogNext() {
    const url = document.getElementById("sourceUrl").value;

    if (url.startsWith("http://data.ex.co.kr")) {
      dispatchCatalog({
        type: "data.ex.co.kr"
      })

      const dispatches = [dispatchDataSet, dispatchDistribution];

      if (url === "http://data.ex.co.kr/portal/fdwn/view?type=ETC&num=79&requestfrom=dataset") {
        dispatches.forEach(it => it({
          type: "data-ex-79"
        }))
      }

      if (url === "http://data.ex.co.kr/portal/fdwn/view?type=ETC&num=78&requestfrom=dataset") {
        dispatches.forEach(it => it({
          type: 'data-ex-78'
        }))
      }

      if (url === "http://data.ex.co.kr/portal/fdwn/view?type=VDS&num=38&requestfrom=dataset") {
        dispatches.forEach(it => it({
          type: 'data-ex-38'
        }))
      }

      if (url === "http://data.ex.co.kr/portal/fdwn/view?type=VDS&num=23&requestfrom=dataset") {
        dispatches.forEach(it => it({
          type: 'data-ex-23'
        }))
      }
    }

    if (url === "https://data.kma.go.kr/data/grnd/selectAsosRltmList.do?pgmNo=36&tabNo=1") {
      [dispatchCatalog, dispatchDataSet, dispatchDistribution].forEach(it => it({
        type: 'data-kma-36'
      }))
    }

    if (matchDataGoKrUrl(url)) {
      const payload = await scrapDataGoKr(url);

      [dispatchDataSet, dispatchDistribution].forEach(it => it({
        type: 'data.go.kr',
        payload
      }))
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
    const sourceUrl = document.getElementById("sourceUrl")
    const disabled = sourceUrl.getAttribute("disabled");

    if (disabled === null) {
      sourceUrl.setAttribute("disabled", "")
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
    [dispatchCatalog, dispatchDataSet, dispatchDistribution].forEach(it => {
      it({
        type: "clear"
      })
    })
  }

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
        ...catalogState
      },
      dataset: {
        ...dataSetState
      },
      distribution: {
        ...distributionState,
        title: file.name,
        downloadUrl
      }
    }

    createMetadata(createMetadataAttributes)
      .then(() => displayProgressBar())
      .then(() => uploadFileToS3(preSignedUrl, file, setFileUploadPercent))
      .then(() => {
        closeProgressBar();
        alert("저장 완료")
        window.location.reload();
      })
      .catch(err => {
        if (err.response.data.errors) {
          alert(err.response.data.errors[0].defaultMessage);
          return;
        }

        if (err.response.data.message) {
          alert(err.response.data.message);
          return;
        }

        alert("예상치 못한 에러가 발생했습니다. 관리자에게 문의하세요");
      })

  }

  function displayProgressBar() {
    setProgressBarOpend(true);
  }

  function closeProgressBar() {
    setProgressBarOpend(false);
  }

}
