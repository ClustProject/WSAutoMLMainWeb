import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import {Divider, FormControl, InputLabel, Select, Slider, TextField, Typography} from "@mui/material";
import {styled} from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import {INIT_LEARN_MODEL_REQUEST} from "./reducers/LearnModelRequestReducer";

const ContentWrappingBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '30px'
});

const SpaceBetweenFlexBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px'
});

const H6Typography = (props) => {
  return (
    <Typography variant="h6" sx={props.sx}>
      {props.children}
    </Typography>
  )
}

const ParameterTitleTypography = (props) => {
  return (
    <H6Typography
      sx={{
        marginTop: '13px',
        marginRight: '20px'
      }}
    >
      {props.children}
    </H6Typography>
  )
}

const StandardTextField = (props) => {
  return (
    <TextField
      variant="standard"
      label={props.label}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      sx={{
        minWidth: '200px'
      }}
    />
  );
}

const SelectForm = (props) => {
  const {type, label, items, onChange} = props;

  return (
    <FormControl fullWidth>
      <InputLabel id={`${type}-select-id`}>{label}</InputLabel>
      <Select
        labelId={`${type}-label`}
        id={`${type}-loss-select`}
        label="loss"
        onChange={onChange}
        defaultValue={items[0]}
      >
        {
          items.map(item => (
            <MenuItem value={item}>{item}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

const ModelPreviewImageCard = styled(Card)({
  width: 250,
  height: 150
})

const TEST_DATA_SET_SLIDER_MARKS = [
  {
    value: 20,
    label: '20%',
  },
  {
    value: 30,
    label: '30%',
  },
  {
    value: 50,
    label: '50%',
  },
];

const EMPTY_STRING = "";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const SelectAlgorithmContent = (props) => {
  const {
    dispatchLearnModelRequest,
    setAllLearnModelRequestFilled
  } = props;

  const [modelNumber, setModelNumber] = useState(0);

  useEffect(() => {
    dispatchLearnModelRequest({
      type: "model",
      payload: "LSTM"
    });
  }, []);

  const handleTapChange = (_event, newModelNumber) => {
    setModelNumber(newModelNumber);
    dispatchLearnModelRequest({
      "type": "model",
      "payload": newModelNumber === 0 ? "LSTM" : "RNN"
    });
  };

  const dispatchAndHandleNextStepButton = (type, event) => {
    const value = event.target.value;

    if (value === EMPTY_STRING) {
      setAllLearnModelRequestFilled(false);
    }

    dispatchLearnModelRequest({
      "type": type,
      "payload": value
    });
  };

  return (
    <Box>
      <Box sx={{
        bgcolor: 'background.paper',
        width: 750,
        marginTop: '25px'
      }}>
        <AppBar position="static">
          <Tabs
            value={modelNumber}
            onChange={handleTapChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="model algorithm"
          >
            <Tab label="LSTM" {...a11yProps(0)} />
            <Tab label="RNN" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <ContentWrappingBox>
          <ModelPreviewImageCard>
            {
              modelNumber === 0 ?
                <CardMedia
                  component="img"
                  image={"/static/images/cards/LSTM.png"}
                  alt="algorithm preview image"
                />
                :
                <CardMedia
                  component="img"
                  image={"/static/images/cards/RNN.png"}
                  alt="algorithm preview image"
                />
            }
          </ModelPreviewImageCard>

          <Divider orientation="vertical" flexItem sx={{
            mx: '25px'
          }}/>

          <Box>
            <SpaceBetweenFlexBox>
              <ParameterTitleTypography> Batch Size: </ParameterTitleTypography>
              <StandardTextField
                label="가중치 연산을 위한 샘플 개수"
                defaultValue={INIT_LEARN_MODEL_REQUEST.batch_size}
                onChange={(event) => dispatchAndHandleNextStepButton("batch_size", event)}
              />
            </SpaceBetweenFlexBox>
            <SpaceBetweenFlexBox>
              <ParameterTitleTypography> Window Size: </ParameterTitleTypography>
              <StandardTextField
                label="입력 시퀀스의 개수"
                defaultValue={INIT_LEARN_MODEL_REQUEST.window_size}
                onChange={(event) => dispatchAndHandleNextStepButton("window_size", event)}
              />
            </SpaceBetweenFlexBox>
            <SpaceBetweenFlexBox>
              <ParameterTitleTypography>Epoch: </ParameterTitleTypography>
              <StandardTextField
                label="학습 반복 횟수"
                defaultValue={INIT_LEARN_MODEL_REQUEST.epoch}
                onChange={(event) => dispatchAndHandleNextStepButton("epoch", event)}
              />
            </SpaceBetweenFlexBox>
            <SpaceBetweenFlexBox>
              <ParameterTitleTypography>Loss: </ParameterTitleTypography>
              <SelectForm
                type="loss"
                label="손실함수"
                items={["mse", "mae", "mape"]}
                onChange={(event) => dispatchAndHandleNextStepButton("loss", event)}
              />
            </SpaceBetweenFlexBox>
            <SpaceBetweenFlexBox>
              <ParameterTitleTypography>Optimizer: </ParameterTitleTypography>
              <SelectForm
                type="optimizer"
                label="최적화 기법"
                items={["Adam", "SGD"]}
                onChange={(event) => dispatchAndHandleNextStepButton("optimizer", event)}
              />
            </SpaceBetweenFlexBox>
            <SpaceBetweenFlexBox>
              <ParameterTitleTypography> Metrics:</ParameterTitleTypography>
              <SelectForm
                type="metrics"
                label="성능 평가 기준"
                items={["acc", "mae", "mse"]}
                onChange={(event) => dispatchAndHandleNextStepButton("metrics", event)}
              />
            </SpaceBetweenFlexBox>

            <H6Typography> 테스트 셋 비율을 선택해 주십시오. </H6Typography>
            <Slider
              defaultValue={INIT_LEARN_MODEL_REQUEST.test_set}
              step={10}
              min={INIT_LEARN_MODEL_REQUEST.test_set}
              max={50}
              getAriaValueText={(value) => `${value}%`}
              marks={TEST_DATA_SET_SLIDER_MARKS}
              valueLabelDisplay="on"
              onChange={(event) => dispatchAndHandleNextStepButton("test_set", event)}
            />
          </Box>

        </ContentWrappingBox>
      </Box>

    </Box>
  );
};

export default SelectAlgorithmContent;
