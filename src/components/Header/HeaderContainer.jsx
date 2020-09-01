import React from "react";
import Header from "./Header";
import Axios from "axios";
import { connect } from "react-redux";
import { getAuthUserData } from "../../Redux/auth-reducer ";
import { authApi } from "../../api/api";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData();
  }
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);

// создаем еще одну контейнерную компоненту (mapStateToProps) с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
