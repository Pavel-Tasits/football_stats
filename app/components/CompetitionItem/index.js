import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  inline: {
    display: 'inline',
  },
}));

function Competition({ competition }) {
  const classes = useStyles();
  return (
    <>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={
              competition.emblemUrl
                ? competition.emblemUrl
                : `/static/images/avatar/1.jpg`
            }
          />
        </ListItemAvatar>
        <ListItemText
          primary={competition.name}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`${competition.currentSeason.startDate} — ${
                  competition.currentSeason.endDate
                }`}
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
}

Competition.propTypes = {
  competition: PropTypes.object.isRequired,
};

export default memo(Competition);
