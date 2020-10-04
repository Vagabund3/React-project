import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

import { reduxForm, Field } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={Textarea} //вместо классической textarea отрисовываем Теxtarea наш компонент(метод) должны отрисовывать не как строка а как название функции-ссылка на компонент
          placeholder="Post message"
          validate={[required, maxLength10]} //вызываем thunk из validator
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(
  AddNewPostForm
);

//компонента должна получать данные и callbackИ
//если компоненту нужно оптимизировать,чтобы она лишний раз не вызывала render в функц. компонентах нужно исп. React.memo
//memo-hook который принимает одну компоненту а на выходе возвр. другую, в итоге мы возвращаем MyPosts не которая ниже а ту что создал нам hook
const MyPosts = React.memo((props) => {
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
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
      {/*когда в форме будет Submit-соберет для нас данные, форма вызовет callback который мы ей передадим */}
    </div>
  );
});

export default MyPosts;

//если не понимаешь то включи 44 ролик с 25 минуты

//   !!! каждый шаг см. комменты и в тетради стр 24-25 !!!
