const DEFAULT_STATE = {
  tab: 1,
};

export const movieReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "ACTIVATE_TAB_1": {
      return {
        ...state,
        tab: 1,
      };
    }
    case "ACTIVATE_TAB_2": {
      return {
        ...state,
        tab: 2,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
