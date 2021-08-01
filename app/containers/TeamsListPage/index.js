import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import {
  selectTeamsList,
  selectSelectedTeam,
  selectTeamMatchesList,
} from '../HomePage/selectors';
import { setTeamMatchesWatcher, setTeamsList } from '../HomePage/actions';
import TeamList from '../../components/TeamList/Loadable';
import DatePicker from '../../components/DatePicker/Loadable';
import reducer from '../HomePage/reducer';
import saga from '../HomePage/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import MatchesList from '../../components/MatchesList/Loadable';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
}));

const key = 'home';

export function TeamsListPage({
  teamsList,
  handleGetTeamsList,
  getSelectedTeam,
  teamMatches,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();

  const perfEntries = performance.getEntriesByType('navigation');
  const url = new URL(window.location.href);
  const league = url.searchParams.get('league');

  useEffect(() => {
    if (perfEntries[0].type === 'reload') {
      handleGetTeamsList(league);
    }
  }, []);

  return (
    <div className={classes.root}>
      <TeamList teamsList={teamsList} />
      <div className={classes.wrapper}>
        {getSelectedTeam && <DatePicker league={league} />}
        {teamMatches && <MatchesList />}
      </div>
    </div>
  );
}

TeamsListPage.propTypes = {
  teamsList: PropTypes.object.isRequired,
  handleGetTeamsList: PropTypes.func.isRequired,
  getSelectedTeam: PropTypes.number.isRequired,
  teamMatches: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teamsList: selectTeamsList(),
  getSelectedTeam: selectSelectedTeam(),
  teamMatches: selectTeamMatchesList(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetTeamsList: id => dispatch(setTeamsList(id)),
    setTeamMatches: id => dispatch(setTeamMatchesWatcher(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TeamsListPage);
