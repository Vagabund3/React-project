import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";

//в props приходит Profile
const ProfileInfo = (props) => {
  // Если profilе нет(!) то он будет true
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.imgTrash}>
        <img src=""></img>
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} />
        ava + description
      </div>
    </div>
  );
};

export default ProfileInfo;
