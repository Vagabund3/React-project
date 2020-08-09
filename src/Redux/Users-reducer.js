const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
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
        //перезатираем массив новыи пользователи которые пришли из (action.users)
        ...state,
        users: action.users,
      };
    }
    //при клике меняем текущую страницу(currentPage)
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.count,
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
export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
//количество пользователей
export const setUsersTotalCountAC = (totalUserCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUserCount,
});

export default usersReducer;

//см. пример и комменты в profile-reducer.js и про reducer
