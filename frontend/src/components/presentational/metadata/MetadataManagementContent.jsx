import React, {useEffect, useReducer, useState} from 'react';
import {createMetadata, getMetadatas} from "../../../api/metadata";
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
import {scrap} from "../../../api/scrap/scrap";
import DataSetSelect from "./DataSetSelect";
import DataInfoContentText from "./DataInfoContentText";
import DataSetTextField from "./DataSetTextField";

const Input = styled('input')({});

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

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

const initCatalogArgs = {
  themes: [],
};

const initDataSetArgs = {
  contactPointNames: [],
  rightses: [],
};

const initDistributionArgs = {};

export default function MetadataManagementContent() {
  const [progressBarOpend, setProgressBarOpend] = useState(false);
  const [fileUploadPercent, setFileUploadPercent] = useState(0);

  function displayProgressBar() {
    setProgressBarOpend(true);
  }

  function closeProgressBar() {
    setProgressBarOpend(false);
  }

  async function handleInputLinkDialogNext() {
    const url = document.getElementById("sourceUrl").value;

    const result = await scrap(url);

    if (result !== undefined) {
      [dispatchDataSet, dispatchDistribution].forEach(it => it({
        type: 'data.go.kr',
        payload: result
      }))
    }

    closeInputLinkDialog();
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

  function clearAllStates() {
    [dispatchCatalog, dispatchDataSet, dispatchDistribution].forEach(it => {
      it({
        type: "clear"
      })
    })
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

  const [data, setData] = useState([]);
  const [page, setPage] = useState(DEFAULT_PAGE_COUNT);
  const [inputLinkDialogOpen, setInputLinkDialogOpen] = useState(false);
  const [inputDataInfoDialogOpen, setInputDataInfoDialogOpen] = useState(false);

  useEffect(() => {
    getMetadatas(DEFAULT_PAGE_COUNT, DISPLAY_COUNT)
      .then(it => {
        setData(it)
        setPage(DEFAULT_PAGE_COUNT)
      })
    // .catch(() => alert("데이터를 불러오는데에 실패하였습니다."));
  }, [])

  function onChangeCatalog(event) {
    dispatchCatalog({
      payload: event.target
    });
  }

  function catalogReducer(state, action) {
    const {type, payload} = action;

    if (type === "clear") {
      return {
        ...initCatalogArgs
      }
    }

    if (payload.name === "category") {
      return {
        ...state,
        [payload.name]: payload.value,
        themes: CATEGORY_THEME_MAP[payload.value] // 카테고리에 따른 주제 목록 리스트 설정
      };
    }

    return {
      ...state,
      [payload.name]: payload.value
    }
  }

  const [catalogState, dispatchCatalog] = useReducer(catalogReducer, initCatalogArgs)

  function dataSetReducer(state, action) {
    const {type, payload} = action;

    if (type === "clear") {
      return {
        ...initDataSetArgs
      }
    }

    if (type === "data.go.kr") {
      return {
        ...state,
        name: payload.name,
        description: payload.description,
        publisher: payload.creator.name,
        keyword: payload.keywords.reduce((acc, cur) => `${acc},${cur}`)
      }
    }

    if (payload.name === "creator") {
      return {
        ...state,
        [payload.name]: payload.value,
        contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP[payload.value]
      }
    }

    if (payload.name === "license") {
      return {
        ...state,
        [payload.name]: payload.value,
        rightses: LICENSE_RIGHTS_MAP[payload.value]
      }
    }

    return {
      ...state,
      [payload.name]: payload.value
    };
  }

  function onChangeDataSet(event) {
    dispatchDataSet({
      payload: event.target
    });
  }

  const [dataSetState, dispatchDataSet] = useReducer(dataSetReducer, initDataSetArgs)

  function onChangeDistribution(event) {
    dispatchDistribution({
      payload: event.target
    });
  }

  function distributionReducer(state, action) {
    const {type, payload} = action;

    if (type === "clear") {
      return {
        ...initDistributionArgs
      }
    }

    return {
      ...state,
      [payload.name]: payload.value
    };
  }

  const [distributionState, dispatchDistribution] = useReducer(distributionReducer, initDistributionArgs)

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
        categoryName: catalogState.category,
        themeName: catalogState.theme,
        themeTaxonomy: catalogState.themeTaxonomy
      },
      dataset: {
        creator: dataSetState.creator,
        contactPointName: dataSetState.contactPointName,
        type: dataSetState.type,
        title: dataSetState.title,
        publisher: dataSetState.publisher,
        keyword: dataSetState.keyword,
        license: dataSetState.license,
        rights: dataSetState.rights,
        description: dataSetState.description,
      },
      distribution: {
        title: distributionState.title,
        description: distributionState.description,
        temporalResolution: distributionState.temporalResolution,
        accurualPeriodicity: distributionState.accurualPeriodicity,
        spatial: distributionState.spatial,
        temporal: distributionState.temporal,
        downloadUrl: downloadUrl
      }
    }

    createMetadata(createMetadataAttributes)
      .then(async () => {
        displayProgressBar();
        await uploadFileToS3(preSignedUrl, file, setFileUploadPercent)
      })
      .then(() => {
        closeProgressBar();
        alert("저장 완료")
        window.location.reload();
      })
      .catch(err => {
        if (err.response.data.errors) {
          alert(err.response.data.errors[0].defaultMessage);
        }
      })

  }

  const totalDisplayedRowCount = (page + 1) * DISPLAY_COUNT;

  return (
    <>
      <Button variant="outlined" sx={{
        marginBottom: 2,
      }} onClick={() => setInputLinkDialogOpen(true)}>
        업로드
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
          />
          <DataSetSelect
            name={{eng: 'theme', kor: '주제'}}
            onChange={onChangeCatalog}
            list={catalogState.themes}
          />
          <DataSetTextField
            name={{eng: 'themeTaxonomy', kor: '주제 분류'}}
            onChange={onChangeCatalog}
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
          />
          <DataSetSelect
            name={{eng: 'contactPointName', kor: '담당자 이름'}}
            onChange={onChangeDataSet}
            list={dataSetState.contactPointNames}
          />
          <DataSetSelect
            name={{eng: 'type', kor: '유형'}}
            onChange={onChangeDataSet}
            list={TYPES}
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
          />
          <DataSetSelect
            name={{eng: 'rights', kor: '권한'}}
            onChange={onChangeDataSet}
            list={dataSetState.rightses}
          />
          <DataSetTextField
            name={{eng: 'description', kor: '설명'}}
            value={dataSetState.description}
            onChange={onChangeDataSet}
          />

          <DataInfoContentText name="배포"/>
          <DataSetTextField
            name={{eng: 'title', kor: '제목'}}
            value={distributionState.title}
            onChange={onChangeDistribution}
          />

          <DataSetTextField
            name={{eng: 'description', kor: '설명'}}
            onChange={onChangeDistribution}
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
          />

          <DataSetTextField
            name={{eng: 'accurualPeriodicity', kor: '제공 주기'}}
            onChange={onChangeDistribution}
          />
          <DataSetTextField
            name={{eng: 'spatial', kor: '공간 정보'}}
            onChange={onChangeDistribution}
          />
          <DataSetTextField
            name={{eng: 'temporal', kor: '시간 정보'}}
            onChange={onChangeDistribution}
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
        // checkboxSelection
        // disableSelectionOnClick
        paginationMode="server" // 서버에서 페이지네이션을 처리하므로 필수 옵션
        onPageChange={newPage => {
          getMetadatas(newPage, DISPLAY_COUNT)
            .then(data => {
              setData(data)
              setPage(newPage)
            })
        }}
        initialState={{
          pagination: {
            page: DEFAULT_PAGE_COUNT
          }
        }}
      />
    </>
  );
}
