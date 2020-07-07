import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      <div className={s.imgTrash}>
        <img src="https://cs11.pikabu.ru/post_img/2018/09/19/8/1537358733118760299.jpg"></img>
      </div>
      <div className={s.descriptionBlock}>
      ava + description</div>
    </div>
  );
};

export default ProfileInfo;
