import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { login } from "../../Redux/auth-reducer ";
import style from "./../common/FormsControls/FormsControls.module.css";

//деструктуризация параметров, вместо того чтобы постоянно писать props записываем то что они передаеют
const LoginForm = ({ handleSubmit, error }) => {
  return (
    //при вводе в пропсах приходит callback "handleSubmit" (который дает ReduxForm) мы должны повесить на него на событие формы onSubmit и доверяем ему обработку handleSubmit
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", [required], Input)}
      {createField("Password", "password", [required], Input, {
        type: "password",
      })}
      {createField(
        null,
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "rememberMe"
      )}

      {/* //показываем props.error только тогда когда есть ошибка */}
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

//LoginReduxForm обрачивает LoginForm. reduxForm(hoc)
const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

//сюда придут все значения из form
const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe); //из пропсов вызываем логин он приходит благодаря connect.(Но здесь приходит не login из thunkCreatorA ниже). Когда поподает сюда в пропсы, connect засовывает под тем же самым именем другую функцию-callback,которая внутри себя диспачит вызов {login}-thunkCreatorA
    //Итог: callback принимает параметры с (formData...) а потом диспачит вызов thunkCreatorA-{login} и в него передаются эти же параметры что передаются в callback
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  //возвращ объект
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login); //здесь login явл. thunkCreatorOM
