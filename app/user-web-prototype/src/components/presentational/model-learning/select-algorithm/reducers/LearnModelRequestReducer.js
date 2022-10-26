export const INIT_LEARN_MODEL_REQUEST = {
  "model": "LSTM",
  "batch_size": 32,
  "window_size": 72,
  "epoch": 100,
  "loss": "mse",
  "optimizer": "Adam",
  "metrics": "acc",
  "test_set": 20
}

const PROPERTIES = [
  "model",
  "batch_size",
  "window_size",
  "epoch",
  "loss",
  "optimizer",
  "metrics",
  "test_set",
]

function LearnModelRequestReducer(state, action) {
  const {type, payload} = action;

  if (PROPERTIES.includes(type)) {
    return {
      ...state,
      type: payload
    }
  }

  throw new Error("Can't find type");
}

export default LearnModelRequestReducer;
