import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    alignItems: 'center',
  },
  listItem: {
    width: '80%',
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

function TeamItem({ team }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ListItem alignItems="center" className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={team.crestUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={team.name}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`${team.phone} / ${team.email}`}
              </Typography>
            </>
          }
        />
      </ListItem>
    </div>
  );
}

TeamItem.propTypes = {
  team: PropTypes.object.isRequired,
};

export default memo(TeamItem);
