import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";

//компонента должна получать только данные и callback
const MyPostsContainer = (props) => {
  let state = props.store.getState();

  let addPost = () => {
    props.store.dispatch(addPostActionCreator());
  };

  let onPostChange = (text) => {
    //Функция которая создаст ActionCreator и задиспачит его
    let action = updateNewPostTextActionCreator(text);
    props.store.dispatch(action);
  };
  //эти параметры мы получаем из MyPosts.jsx
  return (
    <MyPosts
      updateNewPostText={onPostChange}
      addPost={addPost} 
      posts={state.profilePage.posts}
      newPostText={state.profilePage.newPostText}
    />
  );
};

export default MyPostsContainer;

//инфу o store вынесли в контейнерную компоненту
//Весь смысл контейнерной компоненты просто быть оберткой и снабдить данными презентационную компоненту. ту MyPosts.jsx,
// для обычной-функциональной компоненты в нашем случае MyPosts.jsx
