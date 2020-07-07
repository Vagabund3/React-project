import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";

//компонента должна получать данные и callback
const MyPostsContainer = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let addPost = () => {
    //props.addPost();
    props.dispatch(addPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    //props.updateNewPostText(text);
    //  let action = { type: "UPDATE-NEW-POST-TEXT", newText: text };

    let action = updateNewPostTextActionCreator(text);
    props.dispatch(action);
  };

  return <MyPosts />;
};

export default MyPosts;
