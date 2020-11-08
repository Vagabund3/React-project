import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import News from "./components/News/News";
import Video from "./components/Video/Video";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { connect, Provider } from "react-redux";
import { initializeApp } from "./Redux/app-reducer";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./Redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";
const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
); //есть какая-то компонента но она отрисуется только тогда когда за ней удет запрос,но в итоговый бандл эта комонента не попадает,что значит снижает нагрузку при отрисовке
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

class App extends Component {
  //отлавливаем ошибки
  catchAllUnhandledErrors = (promise, reason) => {
    //alert("some error");
    //console.log(promiseRejectionEvents)
  };
  componentDidMount() {
    this.props.initializeApp();
    //когда произ. событие не перехваченное rejection нужно вызвать наш метод
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  //если в компонентах добовляем addEventListener обязательно к нему нужно добовлять removeEventListener
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    //если не проиниц. то вернем Preloader
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          {/*switch идет по route сверху вниз и как только попадет на нужный по запросу route он отбрасывает лижнее и отрисовывает то что нужно  */}
          <Switch>
            <Route path="/" exact>
              <Redirect to="/profile" />
            </Route>

            <Route
              path="/profile/:userId?" //userId говорит что в url есть params{}, ? говорит что параметр не обязат.19 мин 60 видео
              render={withSuspense(ProfileContainer)}
            />
            <Route //следит за url,смотрит на адресную строку
              path="/dialogs"
              render={withSuspense(DialogsContainer)}
            />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginPage />} />

            <Route path="/news" render={() => <News />} />
            <Route path="/video" render={() => <Video />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized, //на это initialize будем равнятся в return который выше
  //то есть мы будем возвращать всю разметку только тогда когда мы проинициализировались
});

//compose принимает hoc
let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App); //диспачим thunk initializeApp

//cм стр 28(getAuthUserData)

//все оборачивание которое происходило в index.js переносим сюда
const ReactApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default ReactApp;
