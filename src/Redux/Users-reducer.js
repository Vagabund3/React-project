import { usersApi } from "../api/api";
import { updateObjectInArray } from "../utils/object-helper";

//BLL
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true, //крутилка
  //в процессе запроса блокируем кнопку чтобы предотвратить многократные запросы на серв.
  //сделаем массивом и в него будем помещать id того пользователя котрого будем follow/unfollow
  //задача в том что когда идет подписка нужно помещать в массив id пользователя
  // когда отписка, то из массива забираем
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        //вспомогательная функция(updateObjectInArray)которая помогает имьютабельно изменить в массиве какой-либо объект
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
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

    case TOGGLE_IS_FETCHING: {
      return {
        ...state, //в action будет сидеть либо true либо false который надо установить
        isFetching: action.isFetching,
      };
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? //если true когда идет подписка то добавляем новую id которая приходит в action
            [...state.followingInProgress, action.userId]
          : // а если false то отфильтруем не нужного пользователя,пропускаем только ту id, которая не равна id из в action (userId)
            state.followingInProgress.filter((id) => id !== action.userId),
      };
    }

    default:
      return state;
  }
}; //map() возвращает новый массив на основе страрого массива

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
//action который будет SetАТЬ users-устанавливать users
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
//количество пользователей
export const setTotalUsersCount = (totalUserCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUserCount,
});
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const toggleIsFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

//================================Thunk=======================================

export const requestUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page)); //диспачим actions
    //вызываем getUsers из api.js
    let data = await usersApi.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false)); //диспачим actions
    dispatch(setCurrentPage(page)); //диспачим actions
    dispatch(setUsers(data.items)); //это и есть массив наших пользоват (response.data.items)
    dispatch(setTotalUsersCount(data.totalCount)); //121  //количество пользователей
  };
};

//Общий метод внутри которогонаписаны параметры которые принимают ThunkИ - follow u unfollow
//вся дублирующиеся логика перенесли сюда
const followUnfollowFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator
) => {
  dispatch(toggleIsFollowingProgress(true, userId)); // перед запросом диспачим true
  let response = await apiMethod(userId); //"посредник в виде DAL как на схеме"
  //сервер подтв. что подписка или отписка произошла
  //и мы должны задиспачить этот callback в reducer
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowingProgress(false, userId)); //когда запрос закончится то диспачим false
};

export const follow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersApi.follow.bind(usersApi),
      followSuccess
    );
  };
};
export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersApi.unfollow.bind(usersApi),
      unfollowSuccess
    );
  };
};

export default usersReducer;

//см. пример и комменты в profile-reducer.js и про reducer
