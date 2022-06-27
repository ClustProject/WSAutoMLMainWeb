import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import {getUsers, putUsersRole} from "../../../api/user";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from "@mui/material";

const columns = [
  {
    field: 'id',
    headerName: '아이디',
    width: 90
  },
  {
    field: 'name',
    headerName: '이름',
    width: 150,
  },
  {
    field: 'email',
    headerName: '이메일',
    width: 150,
  },
  {
    field: 'role',
    headerName: '권한',
    width: 110,
  },
];

export default function UserGrid() {
  const [users, setUsers] = useState([]);
  const [ids, setIds] = useState([]);
  const [role, setRole] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getUsers()
      .then(users => setUsers(users));
  }, []);

  const openDialog = () => {
    setDialogOpen(true);
  }

  const closeDialog = () => {
    setDialogOpen(false);
  }

  const changeUsersRole = () => {
    putUsersRole(ids, role)
      .then(value => {
        alert("변경 완료되었습니다.")
        window.location.reload();
      })
      .catch(err => {
        alert(`에러가 발생했습니다: ${err.message}`);
        window.location.reload();
      });
  }

  return <>
    <Box sx={{height: 400, width: '70%'}}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          setIds(ids);
        }}
      />
      <Button onClick={() => openDialog()}>
        수정하기
      </Button>
    </Box>

    <Dialog disableEscapeKeyDown open={dialogOpen} onClose={closeDialog}>
      <DialogTitle>변경할 권한 선택</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
          <FormControl sx={{m: 1, minWidth: 200}}>
            <InputLabel id="demo-dialog-select-label">권한</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={role}
              onChange={event => setRole(event.target.value)}
              input={<OutlinedInput label="변경할 권한 선택"/>}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"USER"}>USER</MenuItem>
              <MenuItem value={"MANAGER"}>MANAGER</MenuItem>
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

}
