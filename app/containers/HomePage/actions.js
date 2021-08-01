import {
  GET_LIST_LEAGUES,
  GET_TEAMS_LIST,
  TEAM_ID,
  TEAM_MATCHES,
  TEAM_MATCHES_WATCHER,
} from './constants';

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

export function setTeamId(id) {
  return {
    type: TEAM_ID,
    teamId: id,
  };
}

export function setTeamMatchesWatcher(arg) {
  return {
    type: TEAM_MATCHES_WATCHER,
    params: {
      teamId: arg[0],
      dateFrom: arg[1],
      dateTo: arg[2],
    },
  };
}

export function setTeamMatches(arr) {
  return {
    type: TEAM_MATCHES,
    teamMatches: arr,
  };
}
