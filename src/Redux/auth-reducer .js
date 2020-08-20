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

export default authReducer;

//см. пример и комменты в profile-reducer.js и про reducer
