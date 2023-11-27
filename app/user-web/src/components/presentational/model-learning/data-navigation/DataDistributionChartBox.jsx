import React from "react";
import {
  Modal,
  Box,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function DataDistributionChartBox({
  isOpen,
  closeModal,
  imageUrl,
  value,
  handleChange,
}) {
  const imageDescriptions = {
    "scatter.png": "수치형 변수에 대한 Scatter Plot 이미지 입니다.",
    "count.png": "Count Plot에 대한 이미지 입니다.",
    "box.png": "Box Plot에 대한 이미지 입니다.",
    "density.png": "Density Plot에 대한 이미지 입니다.",
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pt: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "45%",
          height: "75%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          overflow: "auto",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            데이터 분포
          </Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          aria-label='Plot'
        >
          {imageUrl.map((url) => {
            let label = "";
            if (url.endsWith("scatter.png")) {
              label = "Scatter Plot";
            } else if (url.endsWith("count.png")) {
              label = "Count Plot";
            } else if (url.endsWith("box.png")) {
              label = "Box Plot";
            } else if (url.endsWith("density.png")) {
              label = "Density Plot";
            }

            return <Tab label={label} />;
          })}
        </Tabs>
        {imageUrl.map((url, index) => (
          <TabPanel value={value} index={index}>
            <Typography variant='subtitle2'>
              {imageDescriptions[url.split(" ").pop()]}
            </Typography>
            <div
              style={{
                overflowX: "auto",
                overflowY: "hidden",
              }}
            >
              <img
                src={url}
                alt={`S3 이미지 ${index + 1}`}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
          </TabPanel>
        ))}
      </Box>
    </Modal>
  );
}

export default DataDistributionChartBox;
