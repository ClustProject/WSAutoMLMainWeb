import React from "react";
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

function ModelLearningSideBar() {
  return (
    <Box marginTop='50px'>
      <List>
        <Link href='/model-learning' underline='none'>
          <ListItem button>
            <ListItemIcon>
              <ModelTrainingIcon />
            </ListItemIcon>
            <ListItemText
              primary='모델 학습'
              primaryTypographyProps={{ sx: { fontSize: 20 } }}
            />
          </ListItem>
        </Link>
        <Link href='/model-operation' underline='none'>
          <ListItem button>
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText
              primary='모델 운영'
              primaryTypographyProps={{ sx: { fontSize: 20 } }}
            />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}

export default ModelLearningSideBar;
