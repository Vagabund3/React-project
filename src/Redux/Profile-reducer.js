import { stopSubmit } from "redux-form";
import { authApi, usersApi, profileApi } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
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

    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        //делаем копию того профайла что был,а раздел photos поменять на те photos которые пришли в action
        profile: { ...state.profile, photos: action.photos },
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
export const addPostCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({ type: SET_STATUS, status });

export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

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
  //если прийдет негатив(403 code). ответ то упадет catch то перехватим эту ошибку (catch error)
  try {
    //если resultCode 1 то какая-то ошибка, если 0 то все ок
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
   }
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileApi.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

//если сервак сказалл да и обновил инфу в профиле то еще раз запрашиваем getUsersProfile
// чтобы после обновление он возвращ новый профайл с измененными данными
//в thunk помимо dispatch приходит функция которая позволяет взять State целиком-getState
//не запрещенно в рвмках 1 reducer обращатся к другим reducer
export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId; //текущий пользовательчкий Id
  let response = await profileApi.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getUsersProfile(userId));
  } else {
    //общая ощибка заполнения формы ссылок и возвращ promise reject(reason) возвращает объект Promise, который был отклонен по указанной причине.
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;

//пустой шаблон thunk
// export const getAuthUserData = () => (dispatch) => {
// }
