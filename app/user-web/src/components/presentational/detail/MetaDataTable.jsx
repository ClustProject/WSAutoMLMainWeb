import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { getMetadatas } from "../../../api/api";

const TitleTableCell = (props) => {
  return (
    <TableCell
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      sx={{
        border: "1px solid lightgray",
        width: "75px",
        padding: "10px",
        fontWeight: "bold",
      }}
    >
      {props.title}
    </TableCell>
  );
};

const ContentTableCell = (props) => {
  return (
    <TableCell
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      sx={{
        border: "1px solid lightgray",
        width: "75px",
        padding: "10px",
        backgroundColor: "white",
      }}
    >
      {props.title}
    </TableCell>
  );
};

const CatalogTableRow = (props) => {
  return (
    <TableRow
      sx={{
        backgroundColor: "#F8F6F1",
      }}
    >
      {props.cells}
    </TableRow>
  );
};

const DataSetTableRow = (props) => {
  return (
    <TableRow
      sx={{
        backgroundColor: "#F0F4F7",
      }}
    >
      {props.cells}
    </TableRow>
  );
};

const DistributionTableRow = (props) => {
  return (
    <TableRow
      sx={{
        backgroundColor: "#ECF7EE",
      }}
    >
      {props.cells}
    </TableRow>
  );
};

export default function MetaDataTable({ data, setData }) {
  const { id } = useParams();

  useEffect(() => {
    getMetadatas()
      .then((it) => {
        console.log(it);
        const filteredData = it.filter((item) => item.dataSet.id == id);
        setData(filteredData);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 700,
        }}
        aria-label='spanning table'
      >
        <TableBody>
          <CatalogTableRow
            cells={
              <>
                <TitleTableCell title={"카테고리"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0 ? data[0].catalog.category : ""
                  }
                  colSpan={8}
                />
              </>
            }
          />

          <CatalogTableRow
            cells={
              <>
                <TitleTableCell title={"주제"} colSpan={2} />
                <ContentTableCell
                  title={data && data.length > 0 ? data[0].catalog.theme : ""}
                  colSpan={3}
                />
                <TitleTableCell title={"주제 분류"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0 ? data[0].catalog.themeTaxonomy : ""
                  }
                  colSpan={3}
                />
              </>
            }
          />

          <DataSetTableRow
            cells={
              <>
                <TitleTableCell title={"파일명"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0 ? data[0].distribution.title : ""
                  }
                  colSpan={8}
                />
              </>
            }
          ></DataSetTableRow>

          <DataSetTableRow
            cells={
              <>
                <TitleTableCell title={"데이터 구축 기관"} rowSpan={3} />
                <TitleTableCell title={"제공기관"} />
                <ContentTableCell
                  title={
                    data && data.length > 0
                      ? data[0].dataSet.organization.publisher
                      : ""
                  }
                  colSpan={8}
                />
              </>
            }
          ></DataSetTableRow>

          <DataSetTableRow
            cells={
              <>
                <TitleTableCell title={"생성자"} />
                <ContentTableCell
                  title={
                    data && data.length > 0
                      ? data[0].dataSet.organization.creator
                      : ""
                  }
                  colSpan={8}
                />
              </>
            }
          ></DataSetTableRow>

          <DataSetTableRow
            cells={
              <>
                <TitleTableCell title={"담당자"} />
                <ContentTableCell
                  title={
                    data && data.length > 0
                      ? data[0].dataSet.organization.contactPoint.name
                      : ""
                  }
                  colSpan={8}
                />
              </>
            }
          ></DataSetTableRow>

          <DataSetTableRow
            cells={
              <>
                <TitleTableCell title={"매체유형"} colSpan={2} />
                <ContentTableCell
                  title={data && data.length > 0 ? data[0].dataSet.type : ""}
                  colSpan={3}
                />
                <TitleTableCell title={"식별자"} colSpan={2} />
                <ContentTableCell
                  title={data && data.length > 0 ? data[0].dataSet.id : ""}
                  colSpan={3}
                />
              </>
            }
          ></DataSetTableRow>

          <DataSetTableRow
            cells={
              <>
                <TitleTableCell title={"등록일자"} colSpan={2} />
                <ContentTableCell
                  title={data && data.length > 0 ? data[0].dataSet.issued : ""}
                  colSpan={3}
                />
                <TitleTableCell title={"수정일자"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0 ? data[0].dataSet.modified : ""
                  }
                  colSpan={3}
                />
              </>
            }
          ></DataSetTableRow>

          <DataSetTableRow
            cells={
              <>
                <TitleTableCell title={"라이센스"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0
                      ? data[0].dataSet.licenseInfo.license
                      : ""
                  }
                  colSpan={3}
                />
                <TitleTableCell title={"권한"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0
                      ? data[0].dataSet.licenseInfo.rights
                      : ""
                  }
                  colSpan={3}
                />
              </>
            }
          ></DataSetTableRow>

          <DataSetTableRow
            cells={
              <>
                <TitleTableCell title={"데이터셋 설명"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0 ? data[0].dataSet.description : ""
                  }
                  colSpan={8}
                />
              </>
            }
          ></DataSetTableRow>

          <DataSetTableRow
            cells={
              <>
                <TitleTableCell title={"키워드"} colSpan={2} />
                <ContentTableCell
                  title={data && data.length > 0 ? data[0].dataSet.keyword : ""}
                  colSpan={8}
                />
              </>
            }
          ></DataSetTableRow>

          <DistributionTableRow
            cells={
              <>
                <TitleTableCell title={"배포 파일 설명"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0
                      ? data[0].distribution.description
                      : ""
                  }
                  colSpan={8}
                />
              </>
            }
          ></DistributionTableRow>

          <DistributionTableRow
            cells={
              <>
                <TitleTableCell title={"시간 단위"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0
                      ? data[0].distribution.temporalResolution
                      : ""
                  }
                  colSpan={3}
                />
                <TitleTableCell title={"제공 주기"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0
                      ? data[0].distribution.accrualPeriodicty
                      : ""
                  }
                  colSpan={3}
                />
              </>
            }
          ></DistributionTableRow>

          <DistributionTableRow
            cells={
              <>
                <TitleTableCell title={"공간 정보"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0 ? data[0].distribution.spatial : ""
                  }
                  colSpan={3}
                />
                <TitleTableCell title={"시간 정보"} colSpan={2} />
                <ContentTableCell
                  title={
                    data && data.length > 0 ? data[0].distribution.temporal : ""
                  }
                  colSpan={3}
                />
              </>
            }
          ></DistributionTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
