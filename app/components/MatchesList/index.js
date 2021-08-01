import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from '../../containers/HomePage/reducer';
import saga from '../../containers/HomePage/saga';
import { selectTeamMatchesList } from '../../containers/HomePage/selectors';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  paper: {
    overflow: 'auto',
    height: 550,
    width: '100%',
    marginTop: 10,
  },
});

const key = 'home';

function MatchesList({ teamMatches }) {
  const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  function createData(id, command1, command2, date, score) {
    return { id, command1, command2, date, score };
  }

  const myRows = [];
  teamMatches.matches.forEach(item => {
    myRows.push(
      createData(
        `${item.id}`,
        `${item.homeTeam.name}`,
        `${item.awayTeam.name}`,
        `${item.utcDate}`,
        `${item.score.fullTime.homeTeam} - ${item.score.fullTime.awayTeam}`,
      ),
    );
  });

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Команда 1</TableCell>
            <TableCell>Команда 2</TableCell>
            <TableCell>Дата игры</TableCell>
            <TableCell>Счет</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myRows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.command1}
              </TableCell>
              <TableCell>{row.command2}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MatchesList.propTypes = {
  teamMatches: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teamMatches: selectTeamMatchesList(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(MatchesList);
