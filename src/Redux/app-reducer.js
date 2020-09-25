import { authApi } from "../api/api";
import { stopSubmit } from "redux-form";
import { getAuthUserData } from "./auth-reducer ";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: false, //сначала приложение не инициализировано
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

//===================================Thunk====================================

//Thunk для инициализации
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData()); //диспачим получение инициализационных данных  и когда эти данные будут получены, возвращаем промис из auth-reducer(thunk getAuthUserData)
//когда пройдет resolve тогда значит асинхронная операция закончена и инициализ. завершена и говорим succsess
  promise.then(() => {
  dispatch(initializedSuccess()); // мы должны диспачить initializedSuccess
  });
};

export default appReducer;
//см. пример и комменты в profile-reducer.js и про reducer

//создаем reducer, который будет отвечать за все приложение
