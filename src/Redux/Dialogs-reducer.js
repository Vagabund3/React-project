const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
  dialogs: [
    { id: 1, name: "Michael Palych" },
    { id: 2, name: "Kendrick Perkins" },
    { id: 3, name: "Enes Kanter" },
    { id: 4, name: "Cody Zeller" },
    { id: 5, name: "Jared Dudley" },
  ],
  messages: [
    { id: 1, message: "Ну как там с деньгами?" },
    { id: 2, message: "Как тебе мои разборки с Дюрантом?" },
    { id: 3, message: "Волован брать будешь?" },
    { id: 4, message: "Как я попал в нба?" },
    { id: 5, message: "За Леброна и двор!" },
  ],
  newMessageBody: "",
};
//см. пример в profile-reducer.js
const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body; //Здесь мы обращаемся к dialogsPage  он приходит под именем state
      return state;

    case SEND_MESSAGE:
      let body = state.newMessageBody; //переменная для отправки сооющения (SEND_MESSAGE)
      state.newMessageBody = "";
      state.messages.push({ id: 6, message: body });
      return state;

    default:
      return state;
  }
};

export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});
export const sendMessageCreator = () => ({
  type: SEND_MESSAGE,
});

export default dialogsReducer;

//см. комменты в Profile-reducer.js
