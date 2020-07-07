import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://hiphop4real.com/wp-content/uploads/2018/08/Lil-Xan-1280x720.jpg" />
      {props.message}
      <div>
        <span>Like</span>
        {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
