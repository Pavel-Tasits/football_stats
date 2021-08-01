/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';
export const GET_LIST_LEAGUES = 'boilerplate/Home/GET_LIST_LEAGUES';
export const GET_LIST_LEAGUES_SUCCESS =
  'boilerplate/Home/GET_LIST_LEAGUES_SUCCESS';
export const GET_TEAMS_LIST = 'boilerplate/Home/GET_TEAMS_LIST';
export const GET_TEAMS_LIST_SUCCESS = 'boilerplate/Home/GET_TEAMS_LIST_SUCCESS';
export const TEAM_ID = 'boilerplate/Home/TEAM_ID';
export const TEAM_MATCHES = 'boilerplate/Home/TEAM_MATCHES';
export const TEAM_MATCHES_WATCHER = 'boilerplate/Home/TEAM_MATCHES_WATCHER';
