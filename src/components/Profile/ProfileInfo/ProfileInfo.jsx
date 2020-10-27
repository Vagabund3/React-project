import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/UsersAva.png";

import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

//в props приходит Profile
const ProfileInfo = ({ profile, status, updateStatus }) => {
  // Если profilе нет(!) то он будет true
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        {/*если large-null то тогда все что слева-ложь если нет то исп. userPhoto*/}
        <img src={profile.photos.large || userPhoto} className={s.avaPic} />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
