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
              <ContentTableCell title={"오픈데이터"} colSpan={8}>오픈데이터</ContentTableCell>
            </>
          }/>

          <CatalogTableRow cells={
            <>
              <TitleTableCell title={"주제"} colSpan={2}/>
              <ContentTableCell title={"교통"} colSpan={3}/>
              <TitleTableCell title={"주제 분류"} colSpan={2}/>
              <ContentTableCell title={"국내 교통"} colSpan={3}/>
            </>
          }/>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"파일명"} colSpan={2}/>
              <ContentTableCell title={"a.csv"} colSpan={8}/>
            </>
          }>
          </DataSetTableRow>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"데이터 구축 기관"} rowSpan={3}/>
              <TitleTableCell title={"제공기관"}/>
              <ContentTableCell title={"한국도로교통공사"} colSpan={8}/>
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
              <ContentTableCell title={"type"} colSpan={3}/>
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
              <ContentTableCell title={"..."} colSpan={8}/>
            </>
          }>
          </DataSetTableRow>

          <DataSetTableRow cells={
            <>
              <TitleTableCell title={"키워드"} colSpan={2}/>
              <ContentTableCell title={"교통,도로,평균시속"} colSpan={8}/>
            </>
          }>
          </DataSetTableRow>

          <DistributionTableRow cells={
            <>
              <TitleTableCell title={"배포 파일 설명"} colSpan={2}/>
              <ContentTableCell title={"..."} colSpan={8}/>
            </>
          }>
          </DistributionTableRow>

          <DistributionTableRow cells={
            <>
              <TitleTableCell title={"측정 단위"} colSpan={2}/>
              <ContentTableCell title={"..."} colSpan={3}/>
              <TitleTableCell title={"제공 주기"} colSpan={2}/>
              <ContentTableCell title={"..."} colSpan={3}/>
            </>
          }>
          </DistributionTableRow>

          <DistributionTableRow cells={
            <>
              <TitleTableCell title={"공간 정보"} colSpan={2}/>
              <ContentTableCell title={"..."} colSpan={3}/>
              <TitleTableCell title={"시간 정보"} colSpan={2}/>
              <ContentTableCell title={"..."} colSpan={3}/>
            </>
          }>
          </DistributionTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
