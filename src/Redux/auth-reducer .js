import { authApi } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false, //еси true то показываем login (булево значение)
  // isFetching: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        // в data сидят объекты из initialState
        ...action.payload,
        //если пришли пользовательские данные,isAuth делаем true
        isAuth: true,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userid, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userid, email, login, isAuth },
});

//===================================Thunk====================================

export const getAuthUserData = () => (dispatch) => {
  authApi
    .me() //me() никакие параменты не принимат поэтому (значит для запроса не нужно ничего знать) в thunCreator()- ничего не передаем
    .then((response) => {
      //если if то в этом случае мы залогинены и диспачим эти авторизационные данные
      if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true)); //и вызываем АС с теми данными которые получили из response из сервака
      }
    });
};

export const login = (email, password, rememberMe) => (dispatch) => {
  authApi.login(email, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    }
  });
};

export const logout = () => (dispatch) => {
  authApi.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
//см. пример и комменты в profile-reducer.js и про reducer
