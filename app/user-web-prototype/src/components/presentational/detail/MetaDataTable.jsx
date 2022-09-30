import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TitleTableCell = (props) => {
  return (
    <TableCell
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      sx={{
        border: '1px solid lightgray',
        width: '75px',
        padding: '10px',
        fontWeight: 'bold'
      }}
    >
      {props.title}
    </TableCell>
  )
}

const ContentTableCell = (props) => {
  return (
    <TableCell
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      sx={{
        border: '1px solid lightgray',
        width: '75px',
        padding: '10px',
        backgroundColor: 'white'
      }}
    >
      {props.title}
    </TableCell>
  )
}

const CatalogTableRow = (props) => {
  return (
    <TableRow sx={{
      backgroundColor: '#F8F6F1'
    }}>
      {props.cells}
    </TableRow>
  )
}

const DataSetTableRow = (props) => {
  return (
    <TableRow sx={{
      backgroundColor: '#F0F4F7'
    }}>
      {props.cells}
    </TableRow>
  )
}

const DistributionTableRow = (props) => {
  return (
    <TableRow sx={{
      backgroundColor: '#ECF7EE'
    }}>
      {props.cells}
    </TableRow>
  )
}

export default function MetaDataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{
        minWidth: 700
      }} aria-label="spanning table">
        <TableBody>
          <CatalogTableRow cells={
            <>
              <TitleTableCell title={"카테고리"} colSpan={2}/>
              <ContentTableCell title={"대기 환경"} colSpan={8}/>
            </>
          }/>

          <CatalogTableRow cells={
            <>
              <TitleTableCell title={"주제"} colSpan={2}/>
              <ContentTableCell title={"공기질"} colSpan={3}/>
              <TitleTableCell title={"주제 분류"} colSpan={2}/>
              <ContentTableCell title={"실외 대기"} colSpan={3}/>
            </>
          }/>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"파일명"} colSpan={2}/>
              <ContentTableCell title={"SURFACE_ASOS_95_MI_2022-01_2022-01_2022.csv"} colSpan={8}/>
            </>
          }>
          </DataSetTableRow>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"데이터 구축 기관"} rowSpan={3}/>
              <TitleTableCell title={"제공기관"}/>
              <ContentTableCell title={"기상청"} colSpan={8}/>
            </>
          }>
          </DataSetTableRow>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"생성자"}/>
              <ContentTableCell title={"위세아이텍"} colSpan={8}/>
            </>
          }>
          </DataSetTableRow>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"담당자"}/>
              <ContentTableCell title={"최태동"} colSpan={8}/>
            </>
          }>
          </DataSetTableRow>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"매체유형"} colSpan={2}/>
              <ContentTableCell title={"숫자"} colSpan={3}/>
              <TitleTableCell title={"식별자"} colSpan={2}/>
              <ContentTableCell title={"1"} colSpan={3}/>
            </>
          }>
          </DataSetTableRow>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"등록일자"} colSpan={2}/>
              <ContentTableCell title={"2022.08.15"} colSpan={3}/>
              <TitleTableCell title={"수정일자"} colSpan={2}/>
              <ContentTableCell title={"2022.08.15"} colSpan={3}/>
            </>
          }>
          </DataSetTableRow>


          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"라이센스"} colSpan={2}/>
              <ContentTableCell title={"Public"} colSpan={3}/>
              <TitleTableCell title={"권한"} colSpan={2}/>
              <ContentTableCell title={"All"} colSpan={3}/>
            </>
          }>
          </DataSetTableRow>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"데이터셋 설명"} colSpan={2}/>
              <ContentTableCell
                title={"종관기상관측이란 종관규모의 날씨를 파악하기 위하여 정해진 시각에 모든 관측소에서 같은 시각에 실시하는 지상관측을 말합니다. 종관규모는 일기도에 표현되어 있는 보통의 고기압이나 저기압의 공간적 크기 및 수명을 말하며, 주로 매일의 날씨 현상을 뜻합니다."}
                colSpan={8}/>
            </>
          }>
          </DataSetTableRow>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"키워드"} colSpan={2}/>
              <ContentTableCell title={"기온, 습도, 기압, 지면온도, 풍향, 풍속, 일조"} colSpan={8}/>
            </>
          }>
          </DataSetTableRow>

          <DistributionTableRow cells={
            <>
              <TitleTableCell title={"배포 파일 설명"} colSpan={2}/>
              <ContentTableCell title={"기상강원지방기상청 춘천기상대에서 측정한 데이터로 철원지점 해발고도 155m 지점에서 측정된 자료"} colSpan={8}/>
            </>
          }>
          </DistributionTableRow>

          <DistributionTableRow cells={
            <>
              <TitleTableCell title={"시간 단위"} colSpan={2}/>
              <ContentTableCell title={"1분"} colSpan={3}/>
              <TitleTableCell title={"제공 주기"} colSpan={2}/>
              <ContentTableCell title={"1일"} colSpan={3}/>
            </>
          }>
          </DistributionTableRow>

          <DistributionTableRow cells={
            <>
              <TitleTableCell title={"공간 정보"} colSpan={2}/>
              <ContentTableCell title={"위도 : 38.14787 경도 : 127.3042"} colSpan={3}/>
              <TitleTableCell title={"시간 정보"} colSpan={2}/>
              <ContentTableCell title={"2022.01.31~2022.01.31"} colSpan={3}/>
            </>
          }>
          </DistributionTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
