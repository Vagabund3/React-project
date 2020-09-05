import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUsersProfile } from "../../Redux/Profile-reducer";
import { withRouter, Redirect } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

// Чтобы React понимал и взвимодействовал с этим классом как с производителем компонент необходимо (extends)
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUsersProfile(userId);
  }

  render() {
    // берем props,раскрываем(...) и раскидываем как атрибуты для профиля
    // (Profile компонента)-презентационная получает объект Profile в props
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}


//основной connect. Берет только данные из профиля
let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};

//===============================HOC=======================================================================

//см. комменты в DialogsContainer!!!
export default compose(
  connect(mapStateToProps, { getUsersProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
//===============================HOC=======================================================================


// создаем еще одну контейнерную компоненту (mapStateToProps) с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
// про HOC и его логику дополнительно см. в withAuthRedirect
