import { authApi, usersApi } from "../api/api";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
//Инициализирует profileReducer в случае если state не прийдет в функцию
let initialState = {
  posts: [
    { id: 1, message: "Я вложил в капитал", likesCount: 10 },
    { id: 2, message: "Хочешь знать в какой?", likesCount: 23 },
    { id: 3, message: "Капитал прожиточного минимума", likesCount: 133 },
  ],
  newPostText: "Вводи текст здесь",
  profile: null,
};
//Reducer принимает state и action преобразовывает и возвращает преобразованный state
//приходит не весь state а только та часть которая нужна конкретному Reducer
const profileReducer = (state = initialState, action) => {
  //Конструкция switch заменяет собой сразу несколько if.
  //Она представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      // Для чего нужно копирование и как работпет  см 48 с 21 мин.
      // копия state. (см 47 видос с 12 мин и с 18)
      return {
        ...state,
        //копия массива из state  см. выше
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    case UPDATE_NEW_POST_TEXT: {
      //также копируем
      return {
        ...state,
        newPostText: action.newText,
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        //меняем profile на profile который сидит в action
        profile: action.profile,
      };
    }

    default:
      return state; // case по умолчанию
  }
};
// В каждом case нужно делать break иначе он будет проваливаться дальше,
// но мы внутри каджного case будем возвращать return, когда return посреди функции она перестает работать,
// значит дальше в case проваливаться она не будет ,break можно не использовать

//Функция ничего не принемает и возвращает объект (ADD_POST)
// addPostActionCreator вспомогательная функция которая помогает не ошибиться в создании Action
//ActionCreator необходимо создавать чтобы их заДиспачить (dispatch)
//ActionCreator пользуються пользователи UI
export const addPost = () => ({ type: ADD_POST });
export const updateNewPostText = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});


//======================================================================= Thunk


//(thunkCreator) функция которая что-то принемает и возвращать thunk (функция возвращающая др. функц.)
//все что нужно thunk из данных диспачим в (thunkCreator)
//диспачим вызов ActionCreatorОВ
//(thunkCreator) ниже. принимает в параметрах нужные данные
//а потом возвращает саму thunk, потом через замыкание к этим данным может достучаться

export const getUsersProfile = (userId) => {
  return (dispatch) => {
    usersApi.getProfile(userId).then((response) => {
      dispatch(setUserProfile(response.data)); //это и есть массив наших пользоват (response.data.items)
    });
  };
};

export default profileReducer;



//пустой шаблон thunk
// export const getAuthUserData = () => (dispatch) => {
// }