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

const dialogsReducer = (state = initialState, action) => {
  //мы должны копировать только то что должны изменить
  //создали новый объект и соответ. Dilogs перерисуеться.
  // Для чего нужно копирование и как работпет  см 48 с 21 мин. и(см 47 видос с 12 мин и с 18)

  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body, //Здесь мы обращаемся к dialogsPage  он приходит под именем state
      };

    case SEND_MESSAGE:
      let body = state.newMessageBody; //переменная для отправки сооющения (SEND_MESSAGE)
      return {
        ...state, //cоздали новый массив,слева закидываем все элем из страрого messages
        // а справа //пушим этот элем. в массив
        messages: [...state.messages, { id: 6, message: body }],
        newMessageBody: "",
      };

    default:
      return state;
  }
};

export const updateNewMessageBody = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});
export const sendMessage = () => ({
  type: SEND_MESSAGE,
});

export default dialogsReducer;

//см. пример и комменты в profile-reducer.js и про reducer
