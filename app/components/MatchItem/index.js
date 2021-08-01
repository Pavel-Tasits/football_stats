import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  listItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  inline: {
    display: 'inline',
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function MatchItem({ match }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ListItem alignItems="center" className={classes.listItem}>
        <ListItemText primary={match.homeTeam.name} />
        <ListItemText primary={match.awayTeam.name} />
        <ListItemText primary={match.utcDate} />
      </ListItem>
    </div>
  );
}

MatchItem.propTypes = {
  match: PropTypes.object.isRequired,
};

export default memo(MatchItem);
