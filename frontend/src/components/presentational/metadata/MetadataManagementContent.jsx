import React, {useEffect, useReducer, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {getMetadatas} from "../../../api/metadata";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";

const DEFAULT_WIDTH = 110;

const columns = [
  {
    field: 'id',
    headerName: '아이디',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'category',
    headerName: '카테고리',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'theme',
    headerName: '주제',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'themeTaxonomy',
    headerName: '주제 분류',
    width: 150,
  },
  {
    field: 'dataSetTitle',
    headerName: '제목',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'publisher',
    headerName: '제공 기관',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'creator',
    headerName: '생성 기관',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'name',
    headerName: '구축기관 담당자 이름',
    width: 180,
  },
  {
    field: 'email',
    headerName: '구축기관 담당자 이메일',
    width: 180,
  },
  {
    field: 'type',
    headerName: '유형',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'keyword',
    headerName: '키워드',
    width: 500,
  },
  {
    field: 'license',
    headerName: '라이센스',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'rights',
    headerName: '권한',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'dataSetDescription',
    headerName: '데이터셋 설명',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'distributionTitle',
    headerName: '배포 파일 제목',
    width: 300,
  },
  {
    field: 'distributionDescription',
    headerName: '배포 파일 설명',
    width: 700,
  },
  {
    field: 'downloadUrl',
    headerName: '다운로드 URL',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'temporalResolution',
    headerName: '측정 단위',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'accurualPeriodicity',
    headerName: '제공 주기',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'spatial',
    headerName: '공간 정보',
    width: DEFAULT_WIDTH,
  },
  {
    field: 'temporal',
    headerName: '시간 정보',
    width: DEFAULT_WIDTH,
  },
];

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

const categoryThemeMap = {
  "대기 환경": [
    "공기질"
  ],
  "농장": [
    "농장 환경"
  ],
  "공장": [
    "공장모터",
    "건설장비",
  ],
  "생체": [
    "작업자",
    "음성",
    "움직임",
    "생체 데이터",
  ],
  "생활/영상": [
    "활동영상"
  ],
  "에너지": [
    "태양광",
    "실외대기",
  ],
  "환경": [
    "방문객"
  ],
  "도시": [
    "국내교통"
  ],
  "오픈데이터": [
    "교통",
    "캘린더"
  ],
}

const DEFAULT_PAGE_COUNT = 0;
const DISPLAY_COUNT = 5;

export default function MetadataManagementContent() {
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
      .catch(() => alert("데이터를 불러오는데에 실패하였습니다."));
  }, [])

  function handleInputLinkDialogNext() {
    closeInputLinkDialog();
    setInputDataInfoDialogOpen(true);
  }

  function closeInputLinkDialog() {
    setInputLinkDialogOpen(false);
  }

  /**
   * 링크 입력 텍스트 필드를 비활성화 합니다.
   */
  function setLinkInputDisable() {
    const urlTextField = document.getElementById("urlTextField");
    const disabled = urlTextField.getAttribute("disabled");

    if (disabled === null) {
      urlTextField.setAttribute("disabled", "")
      urlTextField.value = "";
    } else {
      urlTextField.removeAttribute("disabled");
    }
  }

  function closeDataInfoDialog() {
    setInputDataInfoDialogOpen(false);
  }

  function handleDataInfoDialogPrevious() {
    setInputDataInfoDialogOpen(false);
    setInputLinkDialogOpen(true);
  }

  const [catalogState, dispatchCatalog] = useReducer(catalogReducer, {
    categories: Object.keys(categoryThemeMap),
    category: '',
    themes: [],
    theme: '',
    themeTaxonomy: '',
  })

  function onChangeCatalog(event) {
    dispatchCatalog(event.target);
  }

  function catalogReducer(state, action) {
    const {name, value} = action;

    if (name === "category") {
      return {
        ...state,
        [name]: value,
        themes: categoryThemeMap[value] // 카테고리에 따른 주제 목록 리스트 설정
      }
    }

    return {
      ...state,
      [name]: value
    }
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
            id="urlTextField"
            label="데이터 링크"
            fullWidth
            variant="standard"
          />

          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={setLinkInputDisable}/>} label="링크 없음"/>
          </FormGroup>

        </DialogContent>
        <DialogActions>
          <Button onClick={closeInputLinkDialog}>취소</Button>
          <Button onClick={handleInputLinkDialogNext}>다음</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={inputDataInfoDialogOpen} onClose={closeInputLinkDialog}>
        <DialogTitle>데이터 정보 입력</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            marginBottom: '10px'
          }}> 카탈로그 정보</DialogContentText>

          <FormControl sx={{width: '500px'}}>
            <InputLabel id="category">카테고리</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              label="카테고리"
              name="category" // note: reducer에서 해당 값을 쓰고있음
              onChange={onChangeCatalog}
            >
              {catalogState.categories.map(category => (
                <MenuItem value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{width: '500px'}}>
            <InputLabel id="theme-label">주제</InputLabel>
            <Select
              labelId="theme-label"
              id="theme"
              label="주제"
              name="theme" // note: reducer에서 해당 값을 쓰고있음
              onChange={onChangeCatalog}
            >
              {catalogState.themes.map(theme => (
                <MenuItem value={theme}>{theme}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="themeTaxonomy"
            label="주제 분류"
            variant="filled"
            name="themeTaxonomy" // note: reducer에서 해당 값을 쓰고있음
            onChange={onChangeCatalog}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDataInfoDialogPrevious}>뒤로가기</Button>
          <Button onClick={closeDataInfoDialog}>취소</Button>
          <Button onClick={handleInputLinkDialogNext}>다음</Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        rows={parseToRows(data)}
        rowCount={totalDisplayedRowCount + 1} // 다음 페이지로 넘어갈 수 있게 하나 더 추가
        columns={columns}
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
