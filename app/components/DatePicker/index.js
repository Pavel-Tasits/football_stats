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
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns';
import reducer from '../../containers/HomePage/reducer';
import saga from '../../containers/HomePage/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { setTeamMatchesWatcher } from '../../containers/HomePage/actions';
import { selectSelectedTeam } from '../../containers/HomePage/selectors';

const useStyles = makeStyles(() => ({
  paper: {
    overflow: 'auto',
    height: 140,
    width: '100%',
  },
  button: {
    display: 'block',
    margin: '7px 58px 0 auto',
  },
}));

const key = 'home';

function DatePicker({ setTeamMatches, getSelectedTeam }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState(new Date('2020-01-01'));
  const [dateTo, setDateTo] = useState(new Date('2021-01-01'));

  const handleDateFromChange = date => {
    setDateFrom(date);
  };

  const handleDateToChange = date => {
    setDateTo(date);
  };

  const handleGetTeamMatches = () => {
    setTeamMatches([
      `${getSelectedTeam}`,
      `${format(dateFrom, 'yyyy-MM-dd')}`,
      `${format(dateTo, 'yyyy-MM-dd')}`,
    ]);
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
            id="dateFrom-picker-inline"
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
            id="dateTo-picker-inline"
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
  getSelectedTeam: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  getSelectedTeam: selectSelectedTeam(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(DatePicker);
