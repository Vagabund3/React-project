import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from "../../Redux/auth-reducer ";

const LoginForm = (props) => {
  return (
    //при вводе в пропсах приходит callback "handleSubmit" (который дает ReduxForm) мы должны повесить на его на событие формы onSubmit и доверяем ему обработку handleSubmit
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"Email"}
          name={"email"}
          component={Input}
          validate={[required]}
        />
        {/*Field - компоненты(контейнерная)  которые отрисовывают указанный элемент, в нашем случае input  */}
        {/* Любая форма должна отправлятся на сервак под каким-то name={""} */}
        {/* Redux-Form будет реагировать на эти Name чтобы обеспечить нашу логику. В Field onChange уже засетаны,они будут брать эти name{"} и будут общаться со своим state */}
      </div>
      <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          component={Input}
          validate={[required]}
          type={"password"}
        />
      </div>
      <div>
        <Field
          component={Input}
          name={"rememberMe"}
          type={"checkbox"}
          validate={[required]}
        />
        Remember me
      </div>
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
const mapStateToProps = (state) => ({//возвращ объект
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login); //здесь login явл. thunkCreatorOM
