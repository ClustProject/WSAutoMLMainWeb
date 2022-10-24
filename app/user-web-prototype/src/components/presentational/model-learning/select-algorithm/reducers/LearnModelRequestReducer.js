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

function LearnModelRequestReducer(state, action) {
  const {type, payload} = action;

  if (type === "model") {
    return {
      ...state,
      "model": payload
    }
  }

  if (type === "batch_size") {
    return {
      ...state,
      "batch_size": payload
    }
  }

  if (type === "window_size") {
    return {
      ...state,
      "window_size": payload
    }
  }

  if (type === "epoch") {
    return {
      ...state,
      "epoch": payload
    }
  }

  if (type === "loss") {
    return {
      ...state,
      "loss": payload
    }
  }

  if (type === "optimizer") {
    return {
      ...state,
      "optimizer": payload
    }
  }

  if (type === "metrics") {
    return {
      ...state,
      "metrics": payload
    }
  }

  if (type === "test_set") {
    return {
      ...state,
      "test_set": payload
    }
  }

  throw new Error("Can't find type");
}

export default LearnModelRequestReducer;
