import store from "./Redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

let rerenderEntireTree = (state) => {
  // rerenderEntireTree отрисовываетс все дерево компонент
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      {/*Вызываем этот метод из Store.js и передаем его в App state */}
    </BrowserRouter>,
    document.getElementById("root")
  );
};

rerenderEntireTree(); //getState не надо bindить потому-что мы его вызываем от имени StorA

//отдаем storУ в качестве подписчика эту функцию,
//когда state изменится stor вызовет ее
store.subscribe(() => {
  rerenderEntireTree();
});

//Про  subscribe:
//Редаксовский stor когда уведомляет подписчиков он не передает и state
