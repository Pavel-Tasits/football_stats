import { GET_LIST_LEAGUES, GET_TEAMS_LIST } from './constants';

export function setListLeagues() {
  return {
    type: GET_LIST_LEAGUES,
  };
}

export function setTeamsList(id) {
  return {
    type: GET_TEAMS_LIST,
    id,
  };
}
