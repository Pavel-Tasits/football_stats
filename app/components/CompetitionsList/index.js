import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import CompetitionItem from '../CompetitionItem/Loadable';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    margin: '10px auto',
    backgroundColor: theme.palette.background.paper,
  },
}));

function CompetitionsList({ euroComp }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {euroComp.map(item => (
        <CompetitionItem key={item.id} competition={item} />
      ))}
    </List>
  );
}

CompetitionsList.propTypes = {
  euroComp: PropTypes.object.isRequired,
};

export default memo(CompetitionsList);
