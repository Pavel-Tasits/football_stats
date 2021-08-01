import produce from 'immer';
import {
  GET_LIST_LEAGUES,
  GET_LIST_LEAGUES_SUCCESS,
  GET_TEAMS_LIST,
  GET_TEAMS_LIST_SUCCESS,
  TEAM_ID,
  TEAM_MATCHES,
  GET_SELECTED_TEAM,
} from './constants';

// The initial state of the App
export const initialState = {
  listLeagues: '',
  teamsList: '',
  teamId: '',
  teamMatches: '',
  selectedTeam: '',
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_LEAGUES_SUCCESS:
        draft.listLeagues = action.listLeagues;
        draft.loading = false;
        break;
      case GET_TEAMS_LIST_SUCCESS:
        draft.teamsList = action.teamsList;
        draft.loading = false;
        break;
      case TEAM_ID:
        draft.teamId = action.teamId;
        break;
      case GET_LIST_LEAGUES:
        draft.loading = true;
        break;
      case GET_TEAMS_LIST:
        draft.loading = true;
        break;
      case TEAM_MATCHES:
        draft.teamMatches = action.teamMatches;
        break;
      case GET_SELECTED_TEAM:
        draft.selectedTeam = action.selectedTeam;
        break;
    }
  });

export default homeReducer;
