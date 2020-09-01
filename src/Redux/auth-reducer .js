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
        ...action.data,
        //если пришли пользовательские данные,isAuth делаем true
        isAuth: true,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (id, email, login) => ({
  type: SET_USER_DATA,
  data: { id, email, login },
});

//======================================================================= Thunk

export const getAuthUserData = () => (dispatch) => {
  authApi.me()//me() никакие параменты не принимат поэтому (значит для запроса не нужно ничего знать) в thunCreator()- ничего не передаем

  .then((response) => {
     //если if то в этом случае мы залогинены и диспачим эти авторизационные данные
     if (response.data.resultCode === 0) {
       let { id, email, login } = response.data.data;
       dispatch(setAuthUserData(id, email, login)); //и вызываем АС с теми данными которые получили из response из сервака
      }
   });
};


export default authReducer;

//см. пример и комменты в profile-reducer.js и про reducer
