import { createStore, combineReducers } from "redux";
import sidebarReducer from "./Sidebar-reducer";
import dialogsReducer from "./Dialogs-reducer";
import profileReducer from "./Profile-reducer";

//Фукция которая объединяет все reducer
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
});

//createStore создает внутри себя
//state у которого есть 3 наших св-ва
let store = createStore(reducers);

window.store = store;

export default store;
