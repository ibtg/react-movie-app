import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Auth from '../hoc/auth';
import Navbar from './views/Navbar/Navbar';
import MoviePage from './views/MoviePage/MoviePage';

function App() {
  return (
    <Suspense fallback={<div>Loaidng</div>}>
      <Router>
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
            path="/movie/:movieId"
            component={Auth(MoviePage, null)}
          ></Route>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
