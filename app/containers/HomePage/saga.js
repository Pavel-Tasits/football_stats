import { call, put, takeLatest } from 'redux-saga/effects';
import { API_TOKEN } from '../../utils/constants';
import { GET_LIST_LEAGUES, GET_LIST_LEAGUES_SUCCESS } from './constants';

function* apiFetch(url, method = 'GET') {
  const headers = {
    Accept: '*/*',
    'X-Auth-Token': API_TOKEN,
    'Content-Type': 'application/json',
  };
  const params = { headers, method };
  const response = yield call(fetch, url, params);
  return yield response.json();
}

export function* apiGet(url) {
  return yield apiFetch(url, 'GET');
}

export function* getListLeagues() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/competitions/`;
  try {
    const response = yield call(apiGet, url);
    yield put({ type: GET_LIST_LEAGUES_SUCCESS, listLeagues: response });
  } catch (err) {
    console.log(err);
    /* yield put({
      type: GET_WEATHER_FAILURE,
      dataError: err,
    }); */
  }
}

export default function* homePageSaga() {
  yield takeLatest(GET_LIST_LEAGUES, getListLeagues);
}
