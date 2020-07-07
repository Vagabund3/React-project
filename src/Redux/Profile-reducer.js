const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
 
//Инициализирует profileReducer в случае если state не прийдет в функцию
let initialState =  {
  posts: [
    { id: 1, message: "Я вложил в капитал", likesCount: 10 },
    { id: 2, message: "Хочешь знать в какой?", likesCount: 23 },
    { id: 3, message: "Капитал прожиточного минимума", likesCount: 133 },
  ],
  newPostText: "хуй что введешь"
};
//Reducer принимает state и action преобразовывает и возвращает преобразованный state
//приходит не весь state а только та часть которая нужна конкретному Reducer
const profileReducer = (state = initialState,action) => {
   
  //Конструкция switch заменяет собой сразу несколько if.
  //Она представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      state.posts.push(newPost); //Здесь мы обращаемся к profilePage  он приходит под именем state
      state.newPostText = "";
      return state;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;

    default:
      return state; // case по умолчанию

    // В каждом case нужно делать break иначе он будет проваливаться дальше,
    // но мы внутри каджного case будем возвращать return, когда return посреди функции она перестает работать,
    // значит дальше в case проваливаться она не будет ,break можно не использовать
  }
};

//Функция ничего не принемает и возвращает объект (ADD_POST)
// addPostActionCreator вспомогательная функция которая помогает не ошибиться в создании Action
//ActionCreator необходимо создавать чтобы их заДиспачить (dispatch)
//ActionCreator пользуються пользователи UI
export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});

export default profileReducer;
