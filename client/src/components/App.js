import React, { Suspense } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Auth from '../hoc/auth';
import Navbar from './views/Navbar/Navbar';
import ContentsPage from './views/contentsPage/ContentsPage';
import LikePage from './views/LikePage/LikePage';
import SearchMovie from './views/SearchMovie/SearchMovie';
import ViewAllPage from './views/ViewAllPage/ViewAllPage'
import PageNotFound from './views/utils/PageNotFound';


function App() {
  return (
    <Suspense fallback={<div>Loaidng</div>}>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)}></Route>
        <Route exact path="/login" component={Auth(LoginPage, false)}></Route>
        <Route
          exact
          path="/register"
          component={Auth(RegisterPage, false)}
        ></Route>
        <Route
          exact
          path="/contents/:movieId"
          component={Auth(ContentsPage, null)}
        ></Route>
        <Route exact path="/like" component={Auth(LikePage, true)}></Route>
        <Route
          exact
          path="/search/:movieTitle"
          component={Auth(SearchMovie, null)}
        ></Route>
        <Route 
        exact
        path="/view/:category"
        component={Auth(ViewAllPage, null)}></Route>
        <Route path="/" component={PageNotFound}></Route>
      </Switch>
    </Suspense>
  );
}

export default App;
