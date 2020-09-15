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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
