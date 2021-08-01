import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from '../../containers/HomePage/reducer';
import saga from '../../containers/HomePage/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { setTeamMatchesWatcher } from '../../containers/HomePage/actions';
const useStyles = makeStyles(() => ({
  paper: {
    overflow: 'auto',
    height: '15vh',
    width: '60%',
  },
  button: {
    display: 'block',
    margin: '7px 58px 0 auto',
  },
}));

const key = 'home';

function DatePicker({ setTeamMatches, team }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState(new Date('2014-08-18T21:11:54'));
  const [dateTo, setDateTo] = useState(new Date('2014-08-18T21:11:54'));

  const handleDateFromChange = date => {
    setDateFrom(date);
  };

  const handleDateToChange = date => {
    setDateTo(date);
  };

  const handleGetTeamMatches = () => {
    setTeamMatches([team, 'dfgsdfg', 'dsfgdf']);
    console.log('team!!!', team);
  };

  return (
    <Paper className={classes.paper}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={dateFrom}
            onChange={handleDateFromChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={dateTo}
            onChange={handleDateToChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleGetTeamMatches}
      >
        Применить
      </Button>
    </Paper>
  );
}

DatePicker.propTypes = {
  setTeamMatches: PropTypes.func.isRequired,
  team: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    setTeamMatches: id => dispatch(setTeamMatchesWatcher(id)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DatePicker);
