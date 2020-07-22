import { createStore, combineReducers } from "redux";
import sidebarReducer from "./Sidebar-reducer";
import dialogsReducer from "./Dialogs-reducer";
import profileReducer from "./Profile-reducer";
import usersReducer from "./Users-reducer";

//Фукция которая объединяет все reducer
//ветки голобального state
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
});

//createStore создает внутри себя
//state у которого есть 3 наших св-ва
let store = createStore(reducers);

window.store = store;

export default store;
