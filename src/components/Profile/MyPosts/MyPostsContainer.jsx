import React from "react";
import { addPost, updateNewPostText } from "../../../Redux/Profile-reducer";
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

export default connect(mapStateToProps, { updateNewPostText, addPost })(
  MyPosts
);

//инфу o store вынесли в контейнерную компоненту
//Весь смысл контейнерной компоненты просто быть оберткой и снабдить данными презентационную компоненту. ту MyPosts.jsx,
// для обычной-функциональной компоненты в нашем случае MyPosts.jsx
//           давая нам возможеность не вызывать subscribe. Про connect см коммент. в DalogsCont..

//   !!! каждый шаг см. комменты в DialogsContainer!!!
