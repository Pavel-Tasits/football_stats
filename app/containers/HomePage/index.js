import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { setListLeagues } from './actions';
import { selectEuroCompetitions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import CompetitionsList from '../../components/CompetitionsList';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const key = 'home';

function comparedLeagues(arr1, arr2) {
  return arr1.filter(itemA => arr2.find(itemB => itemA.code === itemB));
}

const compCodesArr = ['CL', 'PPL', 'PL', 'DED', 'BL1', 'FL1', 'SA', 'PD'];

export function HomePage({ handleGetListLeagues, euroCompetitions }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [euroComp, setEuroComp] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (euroCompetitions.length === 0) {
      handleGetListLeagues();
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (euroCompetitions) {
      setEuroComp(comparedLeagues(euroCompetitions.competitions, compCodesArr));
    }
  }, [euroCompetitions]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <CompetitionsList euroComp={euroComp} />
      {!euroCompetitions && (
        <Snackbar open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            Если во время первого запуска приложения, данные не загрузились,
            перейдите по адресу
            https://cors-anywhere.herokuapp.com/https://api.football-data.org/v2/competitions
            и разрешите доступ. После этого перезагрузите страницу приложения
          </Alert>
        </Snackbar>
      )}
    </>
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
