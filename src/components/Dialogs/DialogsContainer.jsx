import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
  updateNewMessageBodyCreator,
  sendMessageCreator,
} from "../../Redux/Dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

//компонента должна получать только данные и callback

//формируе 2 объекта которые соединяються в
//один и приходят как пропсы внутрь (Dilogs)
//Смысл первой функции замапить State:
//превратить часть State(state.dialogsPage) в пропсы.
const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: () => {
      dispatch(sendMessageCreator());
    },

    sendMessage: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
  };
};
//Контейнерная компонента, вызываем функцию connect и она возвращает другую функцию
//и мы вызываем потом ту функцию,которую вернул нам предыдущий вызов
//Dialogs законектили к storУ.
//      Функция connect создает контейн.компоненту, внутри этой компоненты
//      она рендерит презентац компоненту-см.выше и в нее в качестве пропсов
//      передает те св-ва которые сидят в  mapStateToProps  и mapDispatchToProps

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;

//инфу o store вынесли в контейнерную компоненту
//Весь смысл контейнерной компоненты просто быть оберткой и снабдить данными презентационную компоненту. ту MyPosts.jsx,
// для обычной-функциональной компоненты в нашем случае Dialogs.jsx
