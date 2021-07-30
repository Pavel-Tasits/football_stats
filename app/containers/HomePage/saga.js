/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { API_TOKEN } from '../../utils/constants';
import { GET_LIST_LEAGUES, GET_LIST_LEAGUES_SUCCESS } from './constants';

/**
 * Github repos request/response handler
 */
/* export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
} */

/**
 * Root saga manages watcher lifecycle
 */
/* export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
} */

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
