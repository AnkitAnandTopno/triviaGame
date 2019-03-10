import { createActions, handleActions } from "redux-actions";
import _ from "lodash";
const defaultState = {
  categoryIndex: 9
};

export const { setCategoryIndex } = createActions({
  SET_CATEGORY_INDEX: categoryIndex => categoryIndex
});

// Reducer
const reducer = handleActions(
  {
    SET_CATEGORY_INDEX: (state, action) => {
      return _.assign({}, state, action.payload);
    }
  },
  defaultState
);
export default reducer;

export const getCategoryIndex = state => state.trivia.categoryIndex;
