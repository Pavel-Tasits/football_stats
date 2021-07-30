import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import Competition from '../CompetitionItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
}));

function CompetitionsList({ euroComp }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {euroComp.map(item => (
        <Competition key={item.id} competition={item} />
      ))}
    </List>
  );
}

CompetitionsList.propTypes = {
  euroComp: PropTypes.array.isRequired,
};

export default memo(CompetitionsList);
