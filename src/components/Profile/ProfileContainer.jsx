import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUsersProfile,
  getStatus,
  updateStatus,
  savePhoto,
} from "../../Redux/Profile-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

// Чтобы React понимал и взвимодействовал с этим классом как с производителем компонент необходимо (extends)

class ProfileContainer extends React.Component {
  refreshProfile() {
    // 1.если userId нет и мы не 3. авторизованы то делаем redirect
    // в противном случае загружаем пользователя с this...(userId)
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId; //11007 //11582
      if (!userId) {
        //если userId нет то тогда Redirect на логин
        this.props.history.push("/login"); //Redirect создавали с помошью компоненты здесь не можем сделать,поэтому делаем так: В пропсах есть объект history и у него есть метод push который можно вызвать и в history можем pushИТЬ новый path(путь) и у нас перейдет переход на новую страницу
      }
    }
    this.props.getUsersProfile(userId); //запрос на профайл
    this.props.getStatus(userId); //запрос на статус
  }

  //чтобы избежать дублирования создал переменную refreshProfile;
  //нужно обновлять-refreshProfile когда в пропсах изменится значение userId выше
  //и если он изменился то тогда есть смысл вызывать refreshProfile

  componentDidMount() {
    this.refreshProfile();
  }
  //если ID из текущих пропсов не равна ID из предыдущих пропсов
  // то меняем props на prevProps
  //и если они не равны то запрашиваем новые данные
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId != prevProps.match.params.userId)
      this.refreshProfile();
  }

  render() {
    // берем props,раскрываем(...) и раскидываем как атрибуты для профиля
    // (Profile компонента)-презентационная получает объект Profile в props
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId} //если Id нет то я owner,в личном profile нет uID
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

//основной connect. Берет только данные из профиля
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

//===============================HOC=======================================================================

//см. комменты в DialogsContainer!!!
export default compose(
  connect(mapStateToProps, {
    getUsersProfile,
    getStatus,
    updateStatus,
    savePhoto,
  }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
//===============================HOC=======================================================================

// создаем еще одну контейнерную компоненту (mapStateToProps) с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
// про HOC и его логику дополнительно см. в withAuthRedirect
