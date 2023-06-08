import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import {
  INIT_LEARN_MODEL_REQUEST,
  METRICS_MAPPING,
  LOSS_MAPPING,
} from "./reducers/LearnModelRequestReducer";

const ContentWrappingBox = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: "25px",
});

const SpaceBetweenFlexBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
});

const ParameterTitleTypography = (props) => {
  return (
    <Typography
      variant='subtitle1'
      sx={{
        marginTop: "13px",
        marginRight: "20px",
        width: "40%",
      }}
    >
      {props.children}
    </Typography>
  );
};

const StandardTextField = (props) => {
  return (
    <TextField
      variant='standard'
      label={props.label}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      sx={{
        width: "60%",
      }}
    />
  );
};

const SelectForm = (props) => {
  const { type, label, items, onChange } = props;

  return (
    <FormControl sx={{ width: "60%" }}>
      <InputLabel id={`${type}-select-id`}>{label}</InputLabel>
      <Select
        labelId={`${type}-label`}
        id={`${type}-loss-select`}
        label='loss'
        onChange={onChange}
        defaultValue={items[0]}
      >
        {items.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const TestSetSlider = (props) => {
  return (
    <Slider
      defaultValue={INIT_LEARN_MODEL_REQUEST.test_set}
      step={10}
      min={INIT_LEARN_MODEL_REQUEST.test_set}
      max={50}
      getAriaValueText={(value) => `${value}%`}
      marks={TEST_DATA_SET_SLIDER_MARKS}
      valueLabelDisplay='on'
      onChange={props.onChange}
    />
  );
};

const TEST_DATA_SET_SLIDER_MARKS = [
  {
    value: 20,
    label: "20%",
  },
  {
    value: 30,
    label: "30%",
  },
  {
    value: 50,
    label: "50%",
  },
];

const EMPTY_STRING = "";

const MODEL_NUMBER_MAP = {
  0: {
    name: "LSTM",
    imageUrl: "/static/images/cards/LSTM.png",
    toolTipTitle: (
      <div>
        Long-Short Term Memory
        <br /> <br />
        순환신경망 기반의 장/단기 메모리 분석 방법
      </div>
    ),
  },
  1: {
    name: "RNN",
    imageUrl: "/static/images/cards/RNN.png",
    toolTipTitle: (
      <div>
        Recurrent Neural Network
        <br /> <br />
        인공 신경망의 한 종류로, 유닛간의 연결이 순환적 구조를 갖는 특징을 갖고
        있다.
      </div>
    ),
  },
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const CONTENT_HEIGHT = "300px";
const SelectAlgorithmContent = (props) => {
  const {
    dispatchLearnModelRequest,
    setAllLearnModelRequestFilled,
    payload,
    setPayload,
  } = props;
  const [modelNumber, setModelNumber] = useState(0);
  const [model, setModel] = useState(MODEL_NUMBER_MAP[0].name);

  const updatePayload = (payload, model, params) => {
    return {
      ...payload,
      model,
      params,
    };
  };

  useEffect(() => {
    dispatchLearnModelRequest({
      type: "model",
      payload: model,
    });

    const currentParams = payload.params || [
      INIT_LEARN_MODEL_REQUEST.batch_size,
      INIT_LEARN_MODEL_REQUEST.window_size,
      INIT_LEARN_MODEL_REQUEST.epoch,
      INIT_LEARN_MODEL_REQUEST.loss,
      INIT_LEARN_MODEL_REQUEST.optimizer,
      INIT_LEARN_MODEL_REQUEST.metrics,
      INIT_LEARN_MODEL_REQUEST.test_set,
    ];

    setPayload(
      updatePayload(payload, model, [
        currentParams[0], // batch_size
        currentParams[1], // window_size
        currentParams[2], // epoch
        currentParams[3], // loss
        currentParams[4], // optimizer
        currentParams[5], // metrics
        currentParams[6], // test_set
      ])
    );
  }, [modelNumber]);

  const handleTapChange = (_event, newModelNumber) => {
    setModelNumber(newModelNumber);
    setModel(MODEL_NUMBER_MAP[newModelNumber].name);
    dispatchLearnModelRequest({
      type: "model",
      payload: MODEL_NUMBER_MAP[newModelNumber].name,
    });
  };

  const handleInputChange = (type, index, event) => {
    const inputValue = event.target.value;

    if (inputValue === EMPTY_STRING) {
      setAllLearnModelRequestFilled(false);
    }

    // Convert value to integer for batch_size, window_size, and epoch
    let processedValue = inputValue;
    if (index === 0 || index === 1 || index === 2) {
      processedValue = parseInt(inputValue, 10);
    } else if (type === "loss") {
      processedValue = LOSS_MAPPING[inputValue];
    } else if (type === "metrics") {
      processedValue = METRICS_MAPPING[inputValue];
    }

    dispatchLearnModelRequest({
      type: type,
      payload: processedValue,
    });

    // Update params array with the new value
    const newParams = [...payload.params];
    newParams[index] = processedValue;
    setPayload({ ...payload, params: newParams });
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Box
        sx={{
          bgcolor: "background.paper",
          marginTop: "25px",
        }}
      >
        <AppBar position='static' style={{ backgroundColor: "#7986cb" }}>
          <Tabs
            value={modelNumber}
            onChange={handleTapChange}
            indicatorColor='secondary'
            textColor='inherit'
            variant='fullWidth'
            aria-label='model algorithm'
            backgroundColor='#7986cb'
          >
            <Tab label='LSTM' {...a11yProps(0)} />
            <Tab label='RNN' {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <ContentWrappingBox>
          <Box
            sx={{
              height: CONTENT_HEIGHT,
              padding: "25px",
              width: "50%",
            }}
          >
            {
              <>
                <Typography variant='h5'>
                  {MODEL_NUMBER_MAP[modelNumber].name}
                  <Tooltip
                    title={MODEL_NUMBER_MAP[modelNumber].toolTipTitle}
                    placement='top'
                  >
                    <IconButton>
                      <InfoIcon color='primary' />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </>
            }

            <Card sx={{ width: "90%" }}>
              <CardMedia
                component='img'
                image={MODEL_NUMBER_MAP[modelNumber].imageUrl}
                alt='algorithm preview image'
                sx={{ maxHeight: "300px" }}
              />
            </Card>
          </Box>

          <Divider
            orientation='vertical'
            flexItem
            sx={{
              mx: "25px",
            }}
          />

          <Box
            sx={{
              overflow: "auto",
              height: CONTENT_HEIGHT,
              padding: "25px",
              width: "50%",
            }}
          >
            <SpaceBetweenFlexBox>
              <ParameterTitleTypography> Batch Size: </ParameterTitleTypography>
              <StandardTextField
                label='가중치 연산을 위한 샘플 개수'
                defaultValue={INIT_LEARN_MODEL_REQUEST.batch_size}
                onChange={(event) => handleInputChange("batch_size", 0, event)}
              />
            </SpaceBetweenFlexBox>

            <SpaceBetweenFlexBox>
              <ParameterTitleTypography>Window Size:</ParameterTitleTypography>
              <StandardTextField
                label='입력 시퀀스의 개수'
                defaultValue={INIT_LEARN_MODEL_REQUEST.window_size}
                onChange={(event) => handleInputChange("window_size", 1, event)}
              />
            </SpaceBetweenFlexBox>

            <SpaceBetweenFlexBox>
              <ParameterTitleTypography>Epoch: </ParameterTitleTypography>
              <StandardTextField
                label='학습 반복 횟수'
                defaultValue={INIT_LEARN_MODEL_REQUEST.epoch}
                onChange={(event) => handleInputChange("epoch", 2, event)}
              />
            </SpaceBetweenFlexBox>

            <SpaceBetweenFlexBox>
              <ParameterTitleTypography>Loss: </ParameterTitleTypography>
              <SelectForm
                type='loss'
                label='손실함수'
                items={["MSE", "MAE", "MAPE", "MSLE", "CS", "Huber", "LogCosh"]}
                onChange={(event) => handleInputChange("loss", 3, event)}
              />
            </SpaceBetweenFlexBox>

            <SpaceBetweenFlexBox>
              <ParameterTitleTypography>Optimizer: </ParameterTitleTypography>
              <SelectForm
                type='optimizer'
                label='최적화 기법'
                items={[
                  "Adam",
                  "Adamw",
                  "Adadelta",
                  "Adagrad",
                  "Adamax",
                  "Adafactor",
                  "SGD",
                  "RMSprop",
                  "Nadam",
                  "Ftrl",
                ]}
                onChange={(event) => handleInputChange("optimizer", 4, event)}
              />
            </SpaceBetweenFlexBox>

            <SpaceBetweenFlexBox>
              <ParameterTitleTypography> Metrics:</ParameterTitleTypography>
              <SelectForm
                type='metrics'
                label='성능 평가 기준'
                items={["MSE", "RMSE", "MAE", "MAPE", "MSLE", "CS", "LCE"]}
                onChange={(event) => handleInputChange("metrics", 5, event)}
              />
            </SpaceBetweenFlexBox>

            <Typography variant='subtitle1'>
              테스트 셋 비율을 선택해 주십시오.
            </Typography>
            <TestSetSlider
              onChange={(event) => handleInputChange("test_set", 6, event)}
            />
          </Box>
        </ContentWrappingBox>
      </Box>
    </Box>
  );
};

export default SelectAlgorithmContent;
