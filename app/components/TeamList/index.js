import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import TeamItem from '../TeamItem/Loadable';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    overflow: 'auto',
    height: '90vh',
    width: '40%',
  },
}));

function TeamList({ teamsList }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <List className={classes.root}>
        {teamsList &&
          teamsList.teams.map(item => <TeamItem key={item.id} team={item} />)}
      </List>
    </Paper>
  );
}

TeamList.propTypes = {
  teamsList: PropTypes.object.isRequired,
};

export default memo(TeamList);
