export const INIT_DISTRIBUTION_ARGS = {};

export default function DistributionReducer(state, action) {
  const {type, payload} = action;

  if (type === "clear") {
    return {
      ...INIT_DISTRIBUTION_ARGS
    }
  }

  return {
    ...state,
    [payload.name]: payload.value
  };
}

