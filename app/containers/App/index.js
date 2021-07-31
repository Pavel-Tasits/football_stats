import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import HomePage from '../HomePage/Loadable';
import FeaturePage from '../FeaturePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';
import MenuComponent from '../../components/MenuComponent';
import TeamsListPage from '../TeamsListPage/Loadable';

const useStyles = makeStyles(() => ({
  switch: {
    padding: '30px auto 10px',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg" className={classes.switch}>
        <MenuComponent />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/teams_list" component={TeamsListPage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Container>
      <GlobalStyle />
    </>
  );
}
