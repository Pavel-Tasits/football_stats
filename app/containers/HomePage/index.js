import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Container from '@material-ui/core/Container';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { setListLeagues } from './actions';
import { selectEuroCompetitions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import CompetitionsList from '../../components/CompetitionsList';

const key = 'home';

export function HomePage({ handleGetListLeagues, euroCompetitions }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [euroComp, setEuroComp] = useState([]);

  useEffect(() => {
    handleGetListLeagues();
  }, []);

  useEffect(() => {
    if (euroCompetitions) {
      euroCompetitions.competitions.forEach(item => {
        if (item.area.id === 2077) {
          setEuroComp(prev => [item, ...prev]);
        }
      });
    }
  }, [euroCompetitions]);

  console.log('euroComp', euroComp);

  return (
    <Container maxWidth="lg">
      <CompetitionsList euroComp={euroComp} />
    </Container>
  );
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
