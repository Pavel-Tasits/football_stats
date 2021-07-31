import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectTeamsList } from '../HomePage/selectors';
import { setListLeagues } from '../HomePage/actions';

export function TeamsListPage({ teamsList }) {
  console.log('teamsList', teamsList);

  return <div>hallo</div>;
}

TeamsListPage.propTypes = {
  teamsList: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teamsList: selectTeamsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetListLeagues: () => dispatch(setListLeagues()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TeamsListPage);
