import React from "react";
import { reduxForm, Field } from "redux-form";



const LoginForm = (props) => {
  return (
    //при вводе в пропсах приходит callback "handleSubmit" (который дает ReduxForm) мы должны повесить на его на событие формы onSubmit и доверяем ему обработку handleSubmit
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Login"} name={"login"} component={"input"} />
        {/*Field - компоненты(контейнерная)  которые отрисовывают указанный элемент, в нашем случае input  */}
        {/* Любая форма должна отправлятся на сервак под каким-то name={""} */}
        {/* Redux-Form будет реагировать на эти Name чтобы обеспечить нашу логику. В Field onChange уже засетаны,они будут брать эти name{"} и будут общаться со своим state */}
      </div>
      <div>
        <Field placeholder={"Password"} name={"password"} component={"input"} />
      </div>
      <div>
        <Field component={"input"} name={"remember me"} type={"checkbox"} />
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
    console.log(formData);
  };
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
export default Login;
