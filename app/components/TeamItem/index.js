import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from '../../containers/HomePage/reducer';
import saga from '../../containers/HomePage/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getSelectedTeam } from '../../containers/HomePage/actions';

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
    '&:hover': {
      border: '1px solid #FFEF05',
      backgroundColor: 'rgba(255, 239, 5, .1)',
    },
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

const key = 'home';

function TeamItem({ team, selectTeam }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();

  const handleSelectTeam = id => {
    selectTeam(id);
  };

  return (
    <div className={classes.root}>
      <ListItem
        alignItems="center"
        className={classes.listItem}
        onClick={() => handleSelectTeam(team.id)}
      >
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
  selectTeam: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    selectTeam: id => dispatch(getSelectedTeam(id)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TeamItem);
