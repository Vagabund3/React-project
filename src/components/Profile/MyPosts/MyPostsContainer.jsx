import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

// когда происходят любые изменения в state запускается эта функция
// и формир. новый объект и сравн. внутренности этих объектов
const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts, //posts в statE изменился и произошла перерисовка. В pofile-reducer
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      let action = updateNewPostTextActionCreator(text);
      dispatch(action);
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

//инфу o store вынесли в контейнерную компоненту
//Весь смысл контейнерной компоненты просто быть оберткой и снабдить данными презентационную компоненту. ту MyPosts.jsx,
// для обычной-функциональной компоненты в нашем случае MyPosts.jsx

//           CONNECT помогает делать локальные перерисовки и внутри он сам делает subscribe
//           давая нам возможеность не вызывать subscribe. Про connect см коммент. в DalogsCont..
