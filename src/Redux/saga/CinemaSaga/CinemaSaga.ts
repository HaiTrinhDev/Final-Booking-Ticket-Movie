import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_CINEMA } from "../../constant/CinemaConstants";
import { LoadingSagaAction } from "Redux/reducer/LoadingReducer";
import { GROUP_ID, http } from "util/setting";
import { ListCinemaAction } from "Redux/reducer/ListCinemaSagaReducer";
export function* getAllCinemaSaga(): SagaIterator {
  try {
    yield put(LoadingSagaAction.setLoading(true));
    let { data } = yield call(() => {
      return http.get(
        `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
      );
    });
    yield put(ListCinemaAction.getAllListCinema(data.content));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingSagaAction.setLoading(false));
  }
}

export function* actionGetAllCinema() {
  yield takeLatest(GET_ALL_CINEMA, getAllCinemaSaga);
}
