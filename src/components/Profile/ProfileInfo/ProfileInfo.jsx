import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/UsersAva.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

//в props приходит Profile
const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
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

  return (
    <div>
      <div className={s.descriptionBlock}>
        {/*если large-null то тогда все что слева-ложь если нет то исп. userPhoto*/}
        <img src={profile.photos.large || userPhoto} className={s.avaPic} />
        {/*выбор файла для загрузки фото профиля
        вещаем обработчик события на onChange чтобы выбрать фото */}
        {isOwner && <input type={"file"} onChange={mainPicSelected} />}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
