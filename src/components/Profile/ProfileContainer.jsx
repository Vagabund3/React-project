import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUsersProfile } from "../../Redux/Profile-reducer";
import { withRouter, Redirect } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

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

//см в тетради 13 стр.
let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//основной connect. Берет только данные из профиля
let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};


;

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, { getUsersProfile })(
  WithUrlDataContainerComponent
);

// создаем еще одну контейнерную компоненту (mapStateToProps) с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
// про HOC и его логику дополнительно см. в withAuthRedirect
