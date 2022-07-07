import React, {useEffect, useReducer, useState} from 'react';
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

import {
  CATEGORY_THEME_MAP,
  COLUMNS,
  CREATOR_CONTACT_POINT_NAME_MAP,
  DEFAULT_PAGE_COUNT,
  DISPLAY_COUNT, LICENSE_RIGHTS_MAP, TYPES
} from "./constants";
import {DataGrid} from "@mui/x-data-grid";

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

function DataInfoContentText(props) {
  return (
    <DialogContentText sx={{margin: "10px"}}>
      {props.name} 정보
    </DialogContentText>
  );
}

function CommonTextField(props) {
  const {eng, kor} = props.name;

  return <TextField
    id={eng}
    label={kor}
    variant="filled"
    fullWidth
    name={eng} // note: reducer에서 해당 값을 쓰고있음
    onChange={props.onChange}
  />;
}

function CommonSelect(props) {
  const {eng, kor} = props.name;

  const labelName = `${eng}-label`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelName}>{kor}</InputLabel>
      <Select
        labelId={labelName}
        id={eng}
        label={kor}
        name={eng} // note: reducer에서 해당 값을 쓰고있음
        fullWidth
        onChange={props.onChange}
      >
        {props.list.map(it => (
          <MenuItem value={it}>{it} </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function MetadataManagementContent() {
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
    dispatchCatalog(event.target);
  }

  function catalogReducer(state, action) {
    const {name, value} = action;

    if (name === "category") {
      return {
        ...state,
        [name]: value,
        themes: CATEGORY_THEME_MAP[value] // 카테고리에 따른 주제 목록 리스트 설정
      }
    }

    return {
      ...state,
      [name]: value
    }
  }

  const [catalogState, dispatchCatalog] = useReducer(catalogReducer, {
    categories: Object.keys(CATEGORY_THEME_MAP),
    themes: [],
  })

  function dataSetReducer(state, action) {
    const {name, value} = action;

    if (name === "creator") {
      return {
        ...state,
        [name]: value,
        contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP[value]
      }
    }

    if (name === "license") {
      return {
        ...state,
        [name]: value,
        rightses: LICENSE_RIGHTS_MAP[value]
      }
    }

    return {
      ...state,
      [name]: value
    };
  }

  const [dataSetState, dispatchDataSet] = useReducer(dataSetReducer, {
    creators: Object.keys(CREATOR_CONTACT_POINT_NAME_MAP),
    contactPointNames: [],
    licenses: Object.keys(LICENSE_RIGHTS_MAP),
    rightses: [],
    types: TYPES
  })

  function onChangeDataSet(event) {
    dispatchDataSet(event.target);
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
      <Dialog open={inputDataInfoDialogOpen} onClose={closeDataInfoDialog}>
        <DialogTitle>데이터 정보 입력</DialogTitle>
        <DialogContent>

          <DataInfoContentText name="카탈로그"/>
          <CommonSelect
            name={{eng: 'category', kor: '카테고리'}}
            onChange={onChangeCatalog}
            list={catalogState.categories}
          />
          <CommonSelect
            name={{eng: 'theme', kor: '주제'}}
            onChange={onChangeCatalog}
            list={catalogState.themes}
          />
          <CommonTextField
            name={{eng: 'themeTaxonomy', kor: '주제 분류'}}
            onChange={onChangeCatalog}
          />

          <DataInfoContentText name="데이터셋"/>
          <CommonTextField
            name={{eng: 'title', kor: '제목'}}
            onChange={onChangeDataSet}
          />
          <CommonTextField
            name={{eng: 'publisher', kor: '구축 기관'}}
            onChange={onChangeDataSet}
          />
          <CommonSelect
            name={{eng: 'creator', kor: '생성 기관'}}
            onChange={onChangeDataSet}
            list={dataSetState.creators}
          />
          <CommonSelect
            name={{eng: 'contactPointName', kor: '담당자 이름'}}
            onChange={onChangeDataSet}
            list={dataSetState.contactPointNames}
          />
          <CommonSelect
            name={{eng: 'type', kor: '유형'}}
            onChange={onChangeDataSet}
            list={dataSetState.types}
          />
          <CommonTextField
            name={{eng: 'keyword', kor: '키워드'}}
            onChange={onChangeDataSet}
          />
          <CommonSelect
            name={{eng: 'license', kor: '라이센스'}}
            onChange={onChangeDataSet}
            list={dataSetState.licenses}
          />
          <CommonSelect
            name={{eng: 'rights', kor: '권한'}}
            onChange={onChangeDataSet}
            list={dataSetState.rightses}
          />
          <CommonTextField
            name={{eng: 'description', kor: '설명'}}
            onChange={onChangeDataSet}
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
