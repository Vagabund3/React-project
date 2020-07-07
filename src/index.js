import store from "./Redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

let rerenderEntireTree = (state) => {
  // rerenderEntireTree отрисовываетс все дерево компонент
  ReactDOM.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
      {/*Вызываем этот метод из Store.js и передаем его в App state */}
    </BrowserRouter>,
    document.getElementById("root")
  );
};

rerenderEntireTree(store.getState()); //getState не надо bindить потому-что мы его вызываем от имени StorA

//отдаем storУ в качестве подписчика эту функцию,
//когда state изменится stor вызовет ее
store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});

//Про  subscribe:
//Редаксовский stor когда уведомляет подписчиков он не передает и state
