import { authApi, securityApi } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "social-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false, //еси true то показываем login (булево значение)
  captchaUrl: null,
  // isFetching: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        // в data сидят объекты из initialState
        ...action.payload,
      };

    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

//===================================Thunk====================================

export const getAuthUserData = () => async (dispatch) => {
  let response = await authApi.me(); //по факту me() возвращает нам промис и мы на него thenМся (любой then тоже возвращает промис)  //me() никакие параменты не принимат поэтому (значит для запроса не нужно ничего знать) в thunCreator()- ничего не передаем
  //если if то в этом случае мы залогинены и диспачим эти авторизационные данные
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true)); //и вызываем АС с теми данными которые получили из response из сервака
  }
};

export const login = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  let response = await authApi.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    //авторизовались и получаем дополнительные данные
    dispatch(getAuthUserData()); //Диспачим thunk чтобы получить инфу обо мне
  } else {
    //если все плохо по причине resultCode 10 то тогда запрашиваем getCaptchaUrl
    //captchaUrl запросится, url запишится в state выше и уже в UI можем определить
    //что если url присутствует то показыв. пользователю картинку
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message })); //проблемное поле которое вызвало ошибку(stopSubmit)) cтр 26!!!
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityApi.getCaptchaUrl();
  const captchaUrl = response.data.url; //url должен попасть в UI только если он станет state
  dispatch(getCaptchaUrlSuccess(captchaUrl)); //отправив thunk-(getCaptchaUrl) она дает ответ url и после ее диспачим state
};

//когда делается logout сервак удаляет cookie и мы должны зачистить состояние
export const logout = () => async (dispatch) => {
  let response = await authApi.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false)); // делается logout должны занулить все что знали о пользователе
  }
};

export default authReducer;
//см. пример и комменты в profile-reducer.js и про reducer
