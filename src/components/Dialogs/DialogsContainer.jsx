import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { updateNewMessageBody, sendMessage } from "../../Redux/Dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";   

//компонента должна получать только данные и callbacku

//формируем 2 объекта которые соединяються в
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
////Все callbackИ, которые DispatchАТ что-то в state мы закидываем в mapDispatchToProps
//служит для того чтобы передавать дочерней презентационной компоненте,через пропсы callback
//про эту функцию (mapDispatchToProps) смотри объяснение в 49 ролике, с 38.25
//мы dispatch не (actionCreator) мы dispatch результат работы (actionCreator)
//мы его вызываем а он возвращает нам action,тое-есть dispatch всегда action

//Контейнерная компонента, вызываем функцию connect и она возвращает другую функцию
//и мы вызываем потом ту функцию,которую вернул нам предыдущий вызов
//Так же conect делает запрос к store и получет от него callback
// Контейнерная компонента обязана перенаправить все что приходит в нее, в дочернею презентац. компоненту

//Dialogs законектили к storУ.
//      Функция connect создает контейн.компоненту ??????????????????77(mapStateToProps), внутри этой компоненты
//      она рендерит презентац компоненту-см.выше и в нее в качестве пропсов
//      передает те св-ва которые сидят в  mapStateToProps  и mapDispatchToProps
//      connect делает запросы к store

//UPDATE  mapDispatchToProps
//Контейнерная компонента над другой контейнерной компонентой
// Это объект АС(ов) который мы закидываем вторым параметром в функцию connect
// можно не писать dispatch каждый раз тк. connect может это сделать автоматически
//автоматически  обертывание calback(АМИ)
// connect определяет что к нему пришла не функция а объкт
//И еще, если мы в объекте пишем (name:name) как делаем это ниже
// то мы можем написать просто (name),это означает,я создам в объекте св-во (name)
//значением которого возьму значение переменной

export default connect(mapStateToProps, {
  sendMessage,
  updateNewMessageBody,
})(Dialogs);

//инфу o store вынесли в контейнерную компоненту
//Весь смысл контейнерной компоненты просто быть оберткой и снабдить данными презентационную компоненту. ту Dialogs.jsx,
// для обычной-функциональной компоненты в нашем случае Dialogs.jsx

//           CONNECT помогает делать локальные перерисовки и внутри он сам делает subscribe
//           давая нам возможеность не вызывать subscribe
