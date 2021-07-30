import { GET_LIST_LEAGUES, GET_LIST_LEAGUES_SUCCESS } from './constants';

export function setListLeagues() {
  return {
    type: GET_LIST_LEAGUES,
  };
}

export function getListLeaguesSuccess(list) {
  return {
    type: GET_LIST_LEAGUES_SUCCESS,
    list,
  };
}
