import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/UsersAva.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

//в props приходит Profile
const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);

  // Если profilе нет(!) то он будет true
  if (!profile) {
    return <Preloader />;
  }

  const mainPicSelected = (e) => {
    //если длинна у файлов есть то тогда вызываю callBack и передаем для загрузки выбранный файл
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  //сюда приходят данные из form, cm.пример в login
  //onSubmit передаем ниже в ProfileDataForm
  //отправл. обновл. на сервак и переходим в режим редактир.(localState меняем на false)
  //если ок то выполним setEditMode
  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        {/*если large-null то тогда все что слева-ложь если нет то исп. userPhoto*/}
        <img src={profile.photos.large || userPhoto} className={s.avaPic} />
        {/*выбор файла для загрузки фото профиля
        вещаем обработчик события на onChange чтобы выбрать фото */}
        {isOwner && <input type={"file"} onChange={mainPicSelected} />}
        {/* если editMode то показыв. PDF если не то PD  */}
        {editMode ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    //эта div должна показываться только если мы Owner
    <div>
      {isOwner && (
        <div>
          {/* если нажать на эту кнопку то сработаем editMode,изменится локалСтэйт на true и PD заменится PDF*/}
          <button onClick={goToEditMode}>Edit</button>
        </div>
      )}
      <div>
        <strong>Full name</strong>: {profile.fullName}
      </div>

      <div>
        <strong>Looking for a job</strong>:
        {profile.lookingForAJob ? "yes" : "no"}
      </div>

      {/* если ищем работу - (? "yes") тогда отобразим div-lookingForAJobDescription */}
      {profile.lookingForAJob && (
        <div>
          <strong>My professional skills</strong>:
          {profile.lookingForAJobDescription}
        </div>
      )}

      <div>
        <strong>About me</strong>:{profile.aboutMe}
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
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

//компонента для контактов потому-что contact это object
//ниже ({key,value})
const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <strong>{contactTitle}</strong>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
