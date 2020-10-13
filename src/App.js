import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import News from "./components/News/News";
import Video from "./components/Video/Video";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { connect, Provider } from "react-redux";
import { initializeApp } from "./Redux/app-reducer";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./Redux/redux-store";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
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
          <Route
            path="/profile/:userId?" //userId говорит что в url есть params{}, ? говорит что параметр не обязат.19 мин 60 видео
            render={() => <ProfileContainer />}
          />
          <Route //следит за url,смотрит на адресную строку
            path="/dialogs"
            render={() => <DialogsContainer />}
          />
          <Route path="/users" render={() => <UsersContainer />} />

          <Route path="/login" render={() => <LoginPage />} />

          <Route path="/news" render={() => <News />} />
          <Route path="/video" render={() => <Video />} />
          <Route path="/settings" render={() => <Settings />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized, //на это initialize будем равнятся в return который выше
  //то есть мы будем возвращать всю разметку только тогда когда мы проинициализировались
});

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
