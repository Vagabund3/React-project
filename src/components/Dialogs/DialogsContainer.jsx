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

//компонента должна получать только данные и callbacku

//формируе 2 объекта которые соединяються в
//один и приходят как пропсы внутрь (Dilogs)
//Смысл первой функции принимать весь глобальный state целиком-
//-(глобальный state) всего приложения и возвращает объект
// только с теми данными которые нам нужны

//превратить часть State(state.dialogsPage) в пропсы.
let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

//служит для того чтобы передавать дочерней презентационной компоненте,через пропсы callback
//про эту функцию (mapDispatchToProps) смотри объяснение в 49 ролике, с 38.25
//мы dispatch не (actionCreator) мы dispatch результат работы (actionCreator) 
//мы его вызываем а он возвращает нам action,тое-есть dispatch всегда action
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },

    updateNewMessageBody: (body) => {
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

//           CONNECT помогает делать локальные перерисовки и внутри он сам делает subscribe
//           давая нам возможеность не вызывать subscribe
