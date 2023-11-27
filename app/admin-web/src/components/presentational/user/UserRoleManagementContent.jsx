import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { getUsers, putUsersRole } from "../../../api/user";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const columns = [
  {
    field: "id",
    headerName: "아이디",
    width: 90,
  },
  {
    field: "name",
    headerName: "이름",
    width: 150,
  },
  {
    field: "email",
    headerName: "이메일",
    width: 150,
  },
  {
    field: "role",
    headerName: "권한",
    width: 110,
  },
];

const EMPTY_STRING = "";

const reload = () => {
  window.location.reload();
};

export default function UserRoleManagementContent() {
  const [users, setUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [role, setRole] = useState(EMPTY_STRING);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getUsers().then((it) => setUsers(it));
  }, []);

  const openDialog = () => {
    if (userIds.length === 0) {
      alert("유저를 먼저 선택해주세요");
      return;
    }

    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const changeUsersRole = () => {
    if (role === EMPTY_STRING) {
      return;
    }

    putUsersRole(userIds, role)
      .then((_) => {
        alert("변경 완료되었습니다.");
        reload();
      })
      .catch((err) => {
        alert(`에러가 발생했습니다: ${err.message}`);
        reload();
      });
  };

  return (
    <>
      <Box sx={{ height: "100%", width: "80%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSelectionModelChange={(ids) => {
            setUserIds(ids);
          }}
          isRowSelectable={(params) => params.row.role !== "ADMIN"}
        />
        <Button onClick={() => openDialog()}>수정하기</Button>
      </Box>

      <Dialog disableEscapeKeyDown open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>변경할 권한 선택</DialogTitle>
        <Divider />
        <DialogContent>
          <Box component='form' sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id='권한 선택 라벨'>권한</InputLabel>
              <Select
                labelId='권한 선택 라벨'
                value={role}
                onChange={(event) => setRole(event.target.value)}
                input={<OutlinedInput label='변경할 권한 선택' />}
              >
                <MenuItem value={EMPTY_STRING}>
                  <em>권한 선택</em>
                </MenuItem>
                <MenuItem value={"MANAGER"}>MANAGER</MenuItem>
                <MenuItem value={"USER"}>USER</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={changeUsersRole}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
