import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

//делаем двойной connect конектим комп.выше
let mapStateToPropsForRedirect = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
//создаем функцию которая принимает на входе компоненту
//создаем внутри класс (RedirectComponent)
//внутри делаем логику Redirect
//и return - перерисовываем целевую компоненту на входе (Component)-в нее каждый раз придет разная целивая компонент
//в итоге мы создадим отдельный класс (обертку) для каждой целивой компон.
//и будем возвращать свою конт. компоненту для каждой целивой(презентац.) компоненты
export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Redirect to={"/login"} />; //cм. в тетрадь. (!) - это оператор отрицания или NOT
      return <Component {...this.props} />;
    }
  }
//когда пользователь вызывет withAuthRedirect он получает 2 конт. компоненты
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
};
