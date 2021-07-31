import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { setListLeagues } from './actions';
import { selectEuroCompetitions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import CompetitionsList from '../../components/CompetitionsList';

const key = 'home';

function comparedLeagues(arr1, arr2) {
  return arr1.filter(itemA => arr2.find(itemB => itemA.code === itemB));
}

const compCodesArr = ['CL', 'PPL', 'PL', 'DED', 'BL1', 'FL1', 'SA', 'PD'];

export function HomePage({ handleGetListLeagues, euroCompetitions }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [euroComp, setEuroComp] = useState([]);

  useEffect(() => {
    if (euroCompetitions.length === 0) {
      handleGetListLeagues();
    }
  }, []);

  useEffect(() => {
    if (euroCompetitions) {
      setEuroComp(comparedLeagues(euroCompetitions.competitions, compCodesArr));
    }
  }, [euroCompetitions]);

  return <CompetitionsList euroComp={euroComp} />;
}

HomePage.propTypes = {
  handleGetListLeagues: PropTypes.func.isRequired,
  euroCompetitions: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  euroCompetitions: selectEuroCompetitions(),
});

export function mapDispatchToProps(dispatch) {
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
)(HomePage);
