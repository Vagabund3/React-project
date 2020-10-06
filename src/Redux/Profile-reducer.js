import { authApi, usersApi, profileApi } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
// const DELETE_POST = "DELETE_POST";

//Инициализирует profileReducer в случае если state не прийдет в функцию
let initialState = {
  posts: [
    { id: 1, message: "Я вложил в капитал", likesCount: 10 },
    { id: 2, message: "Хочешь знать в какой?", likesCount: 23 },
    { id: 3, message: "Капитал прожиточного минимума", likesCount: 133 },
  ],
  profile: null,
  status: "",
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
        message: action.newPostText,
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

    case SET_USER_PROFILE: {
      return {
        ...state,
        //меняем profile на profile который сидит в action
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }

    // //для примера теста
    // case SET_STATUS: {
    //   return {
    //     ...state, posts: state.posts.filter(p => p.id !=action.postId)
    //   };
    // }

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
export const addPostCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({ type: SET_STATUS, status });

// export const deletePost = (postId) => ({ type: DELETE_POST, postId });

//===================================Thunk====================================

//Thunk-функция которая принемает-(метод dispatch) все что нужно thunk из данных диспачим в (thunkCreator)
//(thunkCreator) функция которая что-то принемает и возвращает thunk (функция возвращающая др. функц. благодаря замыканию)
//диспачим вызов ActionCreatorОВ
//(thunkCreator) ниже. принимает в параметрах нужные данные
//а потом возвращает саму thunk, потом через замыкание к этим данным может достучаться

export const getUsersProfile = (userId) => async (dispatch) => {
  let response = await usersApi.getProfile(userId);
  dispatch(setUserProfile(response.data)); //это и есть массив наших пользоват (response.data.items)
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileApi.getStatus(userId);
  dispatch(setStatus(response.data));
};

//thunk которая будет слать запрос на сервак чтобы обновить статус
//тот status который сюда пришел-(первая строчка) мы его сетаем(setStatus) чтобы его отобразить
export const updateStatus = (status) => async (dispatch) => {
  let response = await profileApi.updateStatus(status);
  //если resultCode 1 то какая-то ощибка, если 0 о то все ок
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;

//пустой шаблон thunk
// export const getAuthUserData = () => (dispatch) => {
// }
