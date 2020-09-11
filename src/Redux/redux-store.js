import { createStore, combineReducers, applyMiddleware } from "redux";
import sidebarReducer from "./Sidebar-reducer";
import dialogsReducer from "./Dialogs-reducer";
import profileReducer from "./Profile-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./auth-reducer ";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";

//Фукция которая объединяет все reducer
//ветки голобального state
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware)); //в скобках передаем Middleware которую хотим внедрить

window.store = store;

export default store;
