import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { selectTeamsList } from '../HomePage/selectors';
import { setTeamMatchesWatcher, setTeamsList } from '../HomePage/actions';
import TeamList from '../../components/TeamList/Loadable';
import DatePicker from '../../components/DatePicker/Loadable';
import reducer from '../HomePage/reducer';
import saga from '../HomePage/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const key = 'home';

export function TeamsListPage({ teamsList, handleGetTeamsList }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();

  const perfEntries = performance.getEntriesByType('navigation');

  const url = new URL(window.location.href);
  const team = url.searchParams.get('team');

  useEffect(() => {
    if (perfEntries[0].type === 'reload') {
      handleGetTeamsList(team);
    }
  }, []);

  return (
    <div className={classes.root}>
      <TeamList teamsList={teamsList} />
      <DatePicker team={team} />
    </div>
  );
}

TeamsListPage.propTypes = {
  teamsList: PropTypes.object.isRequired,
  handleGetTeamsList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teamsList: selectTeamsList(),
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
