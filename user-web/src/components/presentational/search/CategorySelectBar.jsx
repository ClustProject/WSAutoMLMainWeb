import React from "react";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Divider, ListSubheader, Typography} from "@mui/material";

const categories = [
  {
    "name": "도메인", children: [
      {"name": "대기 환경", "count": 10},
      {"name": "농장", "count": 0},
      {"name": "공장", "count": 0},
      {"name": "생체", "count": 0},
      {"name": "생활/영상", "count": 0},
      {"name": "에너지", "count": 0},
      {"name": "환경", "count": 0},
      {"name": "도시", "count": 0},
      {"name": "오픈데이터", "count": 0},
    ],
  },

  {
    "name": "주제", children: [
      {"name": "공기질", "count": 0},
      {"name": "농장환경", "count": 0},
      {"name": "공장모터", "count": 0},
      {"name": "건설장비", "count": 0},
      {"name": "작업자", "count": 0},
      {"name": "음성", "count": 0},
      {"name": "움직임", "count": 0},
      {"name": "생체 데이터", "count": 0},
      {"name": "활동 영상", "count": 0},
      {"name": "태양광", "count": 0},
      {"name": "전력", "count": 0},
      {"name": "실외대기", "count": 0},
      {"name": "방문객", "count": 0},
      {"name": "교통", "count": 0},
      {"name": "캘린더", "count": 0},
    ],
  },

  {
    "name": "기관", children: [
      {"name": "한국전자기술연구원", "count": 0},
      {"name": "달리웍스㈜", "count": 0},
      {"name": "㈜위세아이텍", "count": 0},
      {"name": "케이웨더㈜", "count": 0},
      {"name": "고려대학교", "count": 0},
      {"name": "광운대학교", "count": 0},
    ]
  },

  {
    "name": "시간단위", children: [
      {"name": "1분", "count": 0},
      {"name": "5분", "count": 0},
      {"name": "15분", "count": 0},
      {"name": "30분", "count": 0},
      {"name": "1시간", "count": 0},
      {"name": "기타", "count": 0},

    ]
  }

]

export default function CategorySelectBar() {
  return (
    <Box sx={{
      width: '25%',
      border: '1px solid gray'
    }}>
      {categories.map(category => (
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{
              backgroundColor: '#6573c3',
              color: 'white'
            }}>
              <Typography variant="h5">
                {category.name}
              </Typography>
            </ListSubheader>
          }
        >

          {category.children.map(children => (
            <>
              <Divider/>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={children.name}/>
                  <ListItemText primary={children.count} sx={{
                    textAlign: "right"
                  }}/>
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>

      ))}

    </Box>
  );
}
