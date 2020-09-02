import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import News from "./components/News/News";
import Video from "./components/Video/Video";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";

const App = (props) => {
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
};

export default App;
