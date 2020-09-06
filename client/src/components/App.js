import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Auth from '../hoc/auth';
import Navbar from './views/Navbar/Navbar';
import MoviePage from './views/moviePage/MoviePage';
import LikePage from './views/LikePage/LikePage';
import SearchMovie from './views/SearchMovie/SearchMovie';
import PageNotFound from './views/utils/PageNotFound';

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
          <Route exact path="/like" component={Auth(LikePage, true)}></Route>
          <Route
            exact
            path="/search/:movieTitle"
            component={Auth(SearchMovie, null)}
          ></Route>
          <Route path="/" component={PageNotFound}></Route>
        </Switch>
      </Router>
    </Suspense>
  );
}
// 404 page error 추가
// movie id처럼, navbar 검색하면 그 페이지로 갈 수 있도록
// form에서 제출하면, 새로운 페이지로 이동한다
// 그 새로운 페이지에서는 grid 컴포넌트를 불러와서 보여준다

export default App;
