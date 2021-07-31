/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const selectEuroCompetitions = () =>
  createSelector(
    selectHome,
    homeState => homeState.listLeagues,
  );

const selectTeamsList = () =>
  createSelector(
    selectHome,
    homeState => homeState.teamsList,
  );

export { selectHome, selectEuroCompetitions, selectTeamsList };
