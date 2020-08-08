import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import {
  unfollowAC,
  followAC,
  setUsersAC,
  setCurrentPageAC,
  setUsersTotalCountAC,
} from "../../Redux/Users-reducer";

let mapStateToProps = (state) => {
  return {
    //значения из initialState
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};
////Все callbackИ, которые DispatchАТ что-то в state мы закидываем в mapDispatchToProps
let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },

    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
    //pageNumber-номер страницы который нам нужно dispatch
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageAC(pageNumber));
    },
    //количество пользователей
    setTotalUsersCount: (totalCount) => {
      dispatch(setUsersTotalCountAC(totalCount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

// создаем контейнерную компоненту с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
