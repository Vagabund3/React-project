const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
  users: [
      
  ]
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        //пробегаем через масcив users с помощью map(), map() создает новый массив
        // элиментоми которого будут те же самые users,users приходит в callback и возвращается обратно
        users: state.users.map((u) => {
          //если id U равен тому id который нужно follow-он сидит в userId(action)
          // то тогда мы должны у этого пользоват. сделать изменения,
          //но так как у нас имьютабельность мы не пожем пользователя изменить,
          // мы должныы скопировать пользователя и вернуть копию
          //если id совпадает то мы возвращаем копию, если нет то возвращаем тот же самый объект (return u)
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SET_USERS: {
      return {
        //c сервера приходят подьзователи, берем старый (...state),
        //берем пользователей,которые там были(users)
        //создаем копию массива и дописываем к ним users которые пришли из (action.users)
        //то есть мы склеиваем 2 массива:которые были в state и которые пришли в aciton
        ...state,
        users: [...state.users, ...action.users],
      };
    }

    default:
      return state;
  }
}; //map() возвращает новый массив на основе страрого массива

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
//action который будет SetАТЬ users-устанавливать users
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersReducer;

//см. пример и комменты в profile-reducer.js и про reducer
