import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { reduxForm, Field } from "redux-form";

//компонента должна получать данные и callbackИ
const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));
  let newPostElement = React.createRef();

  // onAddPost это callback в values сидит newPostText
  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div className={s.posts}>{postsElements}</div>
      <AddNewPostFormRedux onSubmit={onAddPost} />{" "}
      {/*когда в форме будет Submit-соберет для нас данные, форма вызовет callback который мы ей передадим */}
    </div>
  );
};

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="newPostText" component="textarea" />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({form:"ProfileAddNewPostForm" })(
  AddNewPostForm
);

export default MyPosts;

//если не понимаешь то включи 44 ролик с 25 минуты

//   !!! каждый шаг см. комменты и в тетради стр 20-23 !!!

