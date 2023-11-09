import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchTrickDetail(action) {
  try {
    const response = yield axios.get(`/api/trick/${action.payload}`);
    yield put({ type: "SET_TRICK_DETAIL", payload: response.data });
  } catch (error) {
    console.log("Trick get request failed", error);
  }
}

function* trickSaga() {
  yield takeLatest("FETCH_TRICK_DETAIL", fetchTrickDetail);
}

export default trickSaga;
