// import sidebarReducer from "./Sidebar-reducer";
// import dialogsReducer from "./Dialogs-reducer";
// import profileReducer from "./Profile-reducer";

// let store = {
//   _state: {
//     profilePage: {
//       posts: [
//         { id: 1, message: "Я вложил в капитал", likesCount: 10 },
//         { id: 2, message: "Хочешь знать в какой?", likesCount: 23 },
//         { id: 3, message: "Капитал прожиточного минимума", likesCount: 133 },
//       ],
//       newPostText: "Вводи текст здесь,козел",
//     },

//     dialogsPage: {
//       dialogs: [
//         { id: 1, name: "Michael Palych" },
//         { id: 2, name: "Kendrick Perkins" },
//         { id: 3, name: "Enes Kanter" },
//         { id: 4, name: "Cody Zeller" },
//         { id: 5, name: "Jared Dudley" },
//       ],
//       messages: [
//         { id: 1, message: "Ну как там с деньгами?" },
//         { id: 2, message: "Как тебе мои разборки с Дюрантом?" },
//         { id: 3, message: "Волован брать будешь?" },
//         { id: 4, message: "Как я попал в нба?" },
//         { id: 5, message: "За Леброна и двор!" },
//       ],
//       newMessageBody: "",
//     },
//   },
//   _callSubscriber() {
//     // Метод объекта store
//     console.log("state changed");
//   },
//   sidebar: {},
//   //Возвращает state
//   getState() {
//     return this._state; // к свойству объекта всегда обращаться через this
//   },
//   subscribe(observer) {
//     this._callSubscriber = observer; // Наблюдатель-Паттерн
//   },

//   // все что нужно менять во внешнем мире использовать метод Dispatch() чтобы им пользоваться
//   // необходимо использовать:  (Action)-объект,у него должно быть св-во type например: {type: 'AddPost'}  AddPost-название действия
//   dispatch(action) {
//     //Отдаем reducerУ то что ему конкретно нужно,
//     // правая часть это новый преобразованный profilePage который приходит из Profile-reducer.js и тд.
//     this._state.profilePage = profileReducer(this._state.profilePage, action);
//     this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//     this._state.sidebar = sidebarReducer(this._state.sidebar, action);

//     this._callSubscriber(this._state); //coобщает что State изменился и передает его
//     // см. index.js про  subscribe в Redux
//   },
// };

// export default store;
// window.state = store;
