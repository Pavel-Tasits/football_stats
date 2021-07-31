import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TeamItem from '../TeamItem/Loadable';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    margin: '10px auto',
    backgroundColor: theme.palette.background.paper,
  },
}));

function TeamList({ teamsList }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {teamsList &&
        teamsList.teams.map(item => <TeamItem key={item.id} team={item} />)}
    </List>
  );
}

TeamList.propTypes = {
  teamsList: PropTypes.object.isRequired,
};

export default memo(TeamList);
