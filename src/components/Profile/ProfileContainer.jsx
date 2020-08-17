import React from "react";
import Profile from "./Profile";
import Axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from "../../Redux/Profile-reducer";

// Чтобы React понимал и взвимодействовал с этим классом как с производителем компонент необходимо (extends)
class ProfileContainer extends React.Component {
  componentDidMount() {
    Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(
      (response) => {
        this.props.setUserProfile(response.data); //это и есть массив наших пользоват (response.data.items)
      }
    );
  }

  render() {
    // берем props,раскрываем(...) и раскидываем как атрибуты для профиля
    // (Profile компонента)-презентационная получает объект Profile в props
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);

// создаем контейнерную компоненту с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
