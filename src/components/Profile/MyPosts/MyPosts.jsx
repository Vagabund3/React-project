import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";


//компонента должна получать данные и callbackИ
const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));
  let newPostElement = React.createRef();

  // onPostChange и onAddPost это callbackИ
  //этот addPost идет на onClick,который находиться ниже
  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    //вызываем из пропсов и передаем внутрь текст в MyPostsContainer.jsx
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
          />
        </div>
        <div>
          {/* когда происходит onClick вызывается функция addPost из пропсов, см выше */}
          <button onClick={onAddPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;

//если не понимаешь то включи 44 ролик с 25 минуты
 