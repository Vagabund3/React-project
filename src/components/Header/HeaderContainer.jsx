import React from "react";
import Header from "./Header";
import Axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../Redux/auth-reducer ";

class HeaderContainer extends React.Component {
  componentDidMount() {
    Axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
      // Объект в котором сидят настройки запроса,помогает узнать авторизованы или нет.
      // И теперь может задиспачит эту инфу в Reducer
      withCredentials: true,
    }).then((response) => {
      //если if то в этом случае мы залогинены и диспачим эти авторизационные данные
      if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        this.props.setAuthUserData(id, email, login);
      }
    });
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

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);
