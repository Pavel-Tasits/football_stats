import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { setTeamsList } from '../../containers/HomePage/actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    alignItems: 'center',
  },
  listItem: {
    width: '50%',
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

function CompetitionItem({ competition, handleGetTeamsList }) {
  const classes = useStyles();

  const handlePickCompetition = id => {
    // event.preventDefault();
    handleGetTeamsList(id);
    console.log('did it', id);
  };

  return (
    <div className={classes.root}>
      <ListItem alignItems="center" className={classes.listItem}>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={
              competition.area.ensignUrl
                ? competition.area.ensignUrl
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
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => handlePickCompetition(competition.id)}
      >
        Перейти
      </Button>
    </div>
  );
}
CompetitionItem.propTypes = {
  competition: PropTypes.object.isRequired,
  handleGetTeamsList: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleGetTeamsList: id => dispatch(setTeamsList(id)),
  };
}

export default memo(CompetitionItem);
