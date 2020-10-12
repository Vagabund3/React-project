import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import sidebarReducer from "./Sidebar-reducer";
import dialogsReducer from "./Dialogs-reducer";
import profileReducer from "./Profile-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./auth-reducer ";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";

//Фукция которая объединяет все reducer
//ветки голобального state
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //это св-во добавляет extension(расширение) если оно подключено то оно добавит в глобальный объект window это св-во то оно будет работать в качестве расширителя если нет то тогда исп compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);


window._store_ = store;

export default store;
