import React from "react";
import style from "../../common/FormsControls/FormsControls.module.css";
import { reduxForm } from "redux-form";
import s from "./ProfileInfo.module.css";
import {
  createField,
  Input,
  Textarea,
} from "../../common/FormsControls/FormsControls";

//режим редактирования
const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* если нажать на эту кнопку то сработаем editMode,изменится локалСтэйт на true и PD заменится PDF*/}
        <button>Save</button>
      </div>
      {/* //показываем props.error только тогда когда есть ошибка */}
      {error && <div className={style.formSummaryError}>{error}</div>}

      <div>
        <strong>Full name</strong>: {createField("Full name", "fullName", [], Input)}
      </div>

      <div>
        <strong>Looking for a job</strong>:
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>

      <div>
        <strong>My professional skills</strong>:
        {createField("...", "lookingForAJobDescription", [], Textarea)}
      </div>

      <div>
        <strong>About me</strong>:{createField("...", "aboutMe", [], Textarea)}
      </div>

      <div>
        {/* Object.keys - глобал. конструктор с помощью которого можно создавать object и в него засовываем object ключи которого необходмо получить - () 
Object.keys пробежится по объекту contacts и завернет название св-в(все соц.сети) в массив строк и все соц сети станут как строка
это все станут ключи по которым сможем пробежатся и сделать map
на базе каждого ключа теперь отрисовываем компоненту contact
передать ей в качестве пропсов contactTitle-ключ
а в качестве value обратимся к контактам и через [key] прочитаем значение св-ва по этому ключу  */}
        <strong>Contacts</strong>:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contact}>
              {/*название контакта который редактируем и input для редактир. */}
              <b>
                {key}
                {createField(key, "contacts." + key, [], Input)}
              </b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

//reduxForm конт. компонента созданная с помощью hoc reduxForm
//форма должна быть reduxForm, делаем по примеру FormControls и login
const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
