## Project

- 영화를 검색해서 정보를 얻을 수 있고 자신이 좋아하는 영화를 좋아요 버튼을 누를 수 있는 앱입니다
- heroku를 사용해서 배포하였습니다.
- [https://the-movie-api-app.herokuapp.com/](https://the-movie-api-app.herokuapp.com/)

---

## Installation

- dev.js 파일을 `server/config` 폴더 안에 추가합니다.

```jsx
module.exports = {
  mongoURI: 'mongoDB URL',
};
```

- Root Directory

```bash
$ npm install
```

- Client Directory

```bash
$ cd client
$ npm instal
```

---

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                       | last versions                                                                                                                                                                                                     | last versions                                                                                                                                                                                                 |

---

## APIs

- [The Movie API](https://developers.themoviedb.org/3)

---

## Backend

&nbsp;

- Skill Stack

  - express를 사용하여 Node 서버를 구축
  - Database는 MongoDB 사용

  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="128px">

  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg" width="128px">

&nbsp;

- Folder Structure

```
├─ server
├─── config
├─── middleware
├─── models
├─── routes
├─── index.js

```

- config

  - DB접근에 관련된 작업을 처리

- middleware

  - 인증처리를 하기위한 auth.js 파일이 있습니다

  - frontend에서는 모든 페이지에서 Authentification을 하기 때문에 auth에 관련된 endpoint로 요청을 하는데 그 전에 middleware에서 필요한 처리를 해줍니다

  - 클라이언트의 request 쿠키에서 토큰을 가져오고 토큰을 복호화 한 다음에 유저 정보 또는 로그인 상태를 파악해서 endpoint에서 적절한 결과를 frontend에 전달해줍니다

- models

  - likes

    - like기능과 관련된 스키마 있는 폴더

  - users
    - 유저에 관련된 스키마 및 함수들이 있는 폴더
    - 유저가 입력한 비밀번호를 관리자를 포함해서 다른 사람들이 알 수 없도록 토큰화

- routes

  - likes
    - like 기능과 관련된 endpoint가 있는 폴더
    - `/likeNumber` - 해당 영화를 얼마나 많은 사람들이 좋아하는지
    - `/liked` - 내가 이 영화에 대해서 좋아요 버튼을 눌렀는지를 보여줍니다
    - `/removeFromLiked` - 좋아요 취소
    - `/addToLike` - 좋아요 버튼 클릭
    - `/getLikedMovie` - My Page에서 내가 좋아요 버튼을 누른 영화들을 보여줍니다
    - `/removeFromLike` - My Page에서 내가 좋아요 버튼을 누른 영화들을 삭제할 수 있습니다
  - users - 유저에 관련된 endpoint가 있습니다
    - `/login` - 로그인 endpoint
    - `/auth` - 인증처리를 위한 endpoint, 유저의 상태에 따른결과를 frontend에 보내줍니다
    - `/register` - 회원가입 endpint
    - `/logout` - 로그아웃 endpoint

---

### Client

- Skill Stacks

  - react와 sass를 사용해서 프론트엔드를 구현

  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="64px">

  <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg" width="64px">

&nbsp;

- Folder Structure

```
├─ client/src
├─── _actions
├─── _reducers
├─── components/views
├─── components/utils
├─── hoc

```

- \_actions - redux를 위한 folder

- \_reducers - redux를 위한 folder

- components

  - views
    - page에 나타나는 화면을 위한 폴더
  - utils
    - 여러가지 상황에서 사용될 수 있는 컴포넌트를 위한 폴더

- hoc

  - authentificaton을 위한 auth 컴포넌트가 있는 폴더

  - Auth

    - 앱에서 이동할 수 있는 모든 페이지에는 권한에 따라 접근할 수 있는지 없는지가 정해집니다

    - 아래 코드는 App.js 파일의 소스코드입니다

    - 소스코드에서 확인할 수 있듯이 Auth 컴포넌트를 사용해서 Authentification check를 합니다

    - Auth 컴포넌트에 두번째로 전달되는 인자에 따라서 페이지 권한이 정해집니다

      - null : for every users
      - true : for login user
      - false : user who did not login

```jsx
// App.js

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
    </Suspense>
  );
}
```

- Auth 컴포넌트에서 redux를 사용하였습니다

- Auth 컴포넌트에서 action을 dispatch를 에 전달하면 reducer가 새로운 상태를 반환합니다

- 인증 확인 뿐 아니라 LoginPage, RegisterPage에서 Login과 Register 기능도 redux를 사용해서 구현하였습니다

- 이 과정은 아래 두 폴더에서 확인할 수 있습니다

- \_actions

```jsx
// _actions

import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';
import axios from 'axios';

// auth
export function auth() {
  const request = axios
    .get('/api/users/auth')
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

// login
export function loginUser(dataTosubmit) {
  const request = axios
    .post('/api/users/login', dataTosubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

// register
export function registerUser(dataToSubmit) {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
```

- \_reducers

```jsx
//_reducers

import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    default:
      return state;
  }
}
```

- Navbar

  - navbar에서 영화를 검색할 수 있습니다.

- Landing Page

  - Loadmore 버튼을 누르면 계속해서 새로운 영화를 추가적으로 불러올 수 있습니다

- Movie Page

  - 영화 포스터를 클릭하면 해당 영화에 대한 간략한 정보와 감독, 출연 배우를 알 수 있습니다

  - 그리고 오른쪽 상단에 좋아요 버튼 옆에는 사람들이 이 영화를 얼마나 좋아하는지가 숫자로 나타나있습니다

- Likes
  - 자신이 좋아하는 영화를 좋아요 버튼이 누르면 My Page에서 해당 영화를 확인할 수 있습니다
  - 그리고 My Page에서 영화를 삭제할 수 도 있습니다
