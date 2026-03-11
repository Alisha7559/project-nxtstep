import { call, put, takeEvery } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFail } from "./authSlice";

// Worker saga
function* loginSaga(action) {
  try {
    const { email, password } = action.payload;

    const response = yield call(() =>
      fetch("http://localhost:7000/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
    );

    const data = yield response.json();

    if (!response.ok) throw new Error(data.message || "Login failed");

    yield put(loginSuccess(data.student));
  } catch (err) {
    yield put(loginFail(err.message));
  }
}

// Watcher saga
export default function* watchAuth() {
  yield takeEvery(loginRequest.type, loginSaga);
}