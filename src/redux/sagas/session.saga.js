import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchTricks() {
  try {
    const session = yield axios.get("/api/session");
    yield put({ type: "SET_TRICKS", payload: session.data });
    yield put({ type: "FINISH_LOADING" });
  } catch (error) {
    console.log("Error getting tricks", error);
  }
}

function* putSessionData(action) {
  try {
    const response = yield axios.put("/api/session", action.payload);
    yield put({
      type: "SET_PROFICIENCY",
      payload: response.data.totalProficiencyPoints,
    });

    const userDetail = yield axios.get("/api/user", action.payload);
    yield put({ type: "SET_USER", payload: userDetail.data });

    yield put({ type: "SET_SESSION_VIEW", payload: "RESULT" });
  } catch (error) {
    console.log("Error updating session data", error);
  } finally {
    yield put({ type: "FINISH_LOADING" });
  }
}

function* sessionSaga() {
  yield takeLatest("FETCH_TRICKS", fetchTricks);
  yield takeLatest("UPDATE_SESSION_DATA", putSessionData);
}

export default sessionSaga;
