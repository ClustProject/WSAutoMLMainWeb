export const INIT_LEARN_MODEL_REQUEST = {
  model: "LSTM",
  batch_size: 32,
  window_size: 72,
  epoch: 100,
  loss: "mean_squared_error",
  optimizer: "Adam",
  metrics: "mean_squared_error",
  test_set: 20,
};

export const METRICS_MAPPING = {
  MSE: "mean_squared_error",
  RMSE: "root_mean_squared_error",
  MAE: "mean_absolute_error",
  MAPE: "mean_absolute_percentage_error",
  MSLE: "mean_squared_logarithmic_error",
  CS: "cosine_similarity",
  LCE: "logcosh",
};

export const LOSS_MAPPING = {
  MSE: "mean_squared_error",
  MAE: "mean_absolute_error",
  MAPE: "mean_absolute_percentage_error",
  MSLE: "mean_squared_logarithmic_error",
  CS: "cosine_similarity",
  Huber: "huber_loss",
  LogCosh: "log_cosh",
};

const PROPERTIES = [
  "model",
  "batch_size",
  "window_size",
  "epoch",
  "loss",
  "optimizer",
  "metrics",
  "test_set",
];

function LearnModelRequestReducer(state, action) {
  const { type, payload } = action;

  if (PROPERTIES.includes(type)) {
    return {
      ...state,
      type: payload,
    };
  }

  throw new Error("Can't find type");
}

export default LearnModelRequestReducer;
