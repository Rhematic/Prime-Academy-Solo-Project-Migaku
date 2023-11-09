import { combineReducers } from "redux";

const tricks = (state = [], action) => {
  switch (action.type) {
    case "SET_TRICKS":
      return action.payload;
    case "UPDATE_TRICK_MASTERY":
      return state.map((trick) => {
        if (trick.trick_id === action.payload.trick_id) {
          return {
            ...trick,
            mastery_level: action.payload.mastery_level,
            session_countdown: action.payload.session_countdown,
          };
        } else {
          return trick;
        }
      });
    case "UPDATE_TRICK_NOTE":
      return state.map((trick) => {
        if (trick.trick_id === action.payload.trick_id) {
          return {
            ...trick,
            note: action.payload.note,
          };
        } else {
          return trick;
        }
      });
    case "CLEAR_TRICKS":
      return [];
    default:
      return state;
  }
};

const trickDetail = (state = {}, action) => {
  switch (action.type) {
    case "SET_TRICK_DETAIL":
      return action.payload;
    case "CLEAR_TRICK_DETAIL":
      return {};
    default:
      return state;
  }
};

const view = (state = "FRONT", action) => {
  switch (action.type) {
    case "SET_SESSION_VIEW":
      return action.payload;
    default:
      return state;
  }
};

const currentTrickIndex = (state = 0, action) => {
  switch (action.type) {
    case "SET_CURRENT_TRICK_INDEX":
      return action.payload;
    case "CLEAR_CURRENT_TRICK_INDEX":
      return 0;
    default:
      return state;
  }
};

const proficiency = (state = 0, action) => {
  switch (action.type) {
    case "SET_PROFICIENCY":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  tricks,
  trickDetail,
  view,
  currentTrickIndex,
  proficiency,
});
