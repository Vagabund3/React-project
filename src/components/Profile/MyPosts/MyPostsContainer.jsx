import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

//компонента должна получать только данные и callback
const MyPostsContainer = (props) => {
  // let state = props.store.getState();

  return (
    //Потребитель родительского контекста StoreContext
    <StoreContext.Consumer>
      {/* //store-значение из контекста */}
      {(store) => {
        let state = store.getState();
        let addPost = () => {
          store.dispatch(addPostActionCreator());
        };
        let onPostChange = (text) => {
          //Функция которая создаст ActionCreator и задиспачит его
          let action = updateNewPostTextActionCreator(text);
          store.dispatch(action);
        };
        return (
          <MyPosts
            updateNewPostText={onPostChange}
            addPost={addPost}
            posts={store.getState().profilePage.posts}
            newPostText={store.getState().profilePage.newPostText}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

export default MyPostsContainer;

//вся инфа в комментах про StoreContext в index.js
// и в 44 ролике с 10 мин