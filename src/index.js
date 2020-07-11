import store from "./Redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./StoreContext";

let rerenderEntireTree = (state) => {
  // rerenderEntireTree отрисовываетс все дерево компонент
  ReactDOM.render(
    <BrowserRouter>
      {/* //Теперь любая дочернея компонента может обратиться к StorУ с помощью StoreContext
      это попозволяет нам не использовать props */}
      <Provider store={store}>
        <App />
      </Provider>
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
