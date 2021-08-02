import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {
  selectTeamsList,
  selectSelectedTeam,
  selectTeamMatchesList,
} from '../HomePage/selectors';
import {
  setTeamsList,
  setTeamId,
  setTeamMatches,
  getSelectedTeam,
} from '../HomePage/actions';
import TeamList from '../../components/TeamList/Loadable';
import DatePicker from '../../components/DatePicker/Loadable';
import reducer from '../HomePage/reducer';
import saga from '../HomePage/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import MatchesList from '../../components/MatchesList/Loadable';

const useStyles = makeStyles(theme => ({
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
  text: {
    margin: '300px auto 0',
    fontSize: 20,
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
    marginTop: 15,
  },
}));

const key = 'home';

export function TeamsListPage({
  teamsList,
  handleGetTeamsList,
  getSelectTeam,
  teamMatches,
  history,
  handleSetTeamId,
  selectTeam,
  handleTeamMatches,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();

  const perfEntries = performance.getEntriesByType('navigation');
  const url = new URL(window.location.href);
  const league = url.searchParams.get('league');

  const handleGoBack = () => {
    handleSetTeamId('');
    handleTeamMatches('');
    selectTeam('');
    history.push(`/`);
  };

  useEffect(() => {
    if (perfEntries[0].type === 'reload') {
      handleGetTeamsList(league);
    }
  }, []);

  return (
    <>
      <div className={classes.root}>
        <TeamList teamsList={teamsList} />
        <div className={classes.wrapper}>
          {getSelectTeam ? (
            <DatePicker league={league} />
          ) : (
            <div className={classes.text}>
              Выберите команду и укажите промежуток дат
            </div>
          )}
          {teamMatches && <MatchesList />}
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleGoBack}
      >
        Назад
      </Button>
    </>
  );
}

TeamsListPage.propTypes = {
  teamsList: PropTypes.object.isRequired,
  handleGetTeamsList: PropTypes.func.isRequired,
  getSelectTeam: PropTypes.number.isRequired,
  teamMatches: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleSetTeamId: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired,
  handleTeamMatches: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teamsList: selectTeamsList(),
  getSelectTeam: selectSelectedTeam(),
  teamMatches: selectTeamMatchesList(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetTeamsList: id => dispatch(setTeamsList(id)),
    handleTeamMatches: id => dispatch(setTeamMatches(id)),
    handleSetTeamId: id => dispatch(setTeamId(id)),
    selectTeam: id => dispatch(getSelectedTeam(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(TeamsListPage);
