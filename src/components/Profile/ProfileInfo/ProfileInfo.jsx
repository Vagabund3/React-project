import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

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
        <ProfileStatus
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
