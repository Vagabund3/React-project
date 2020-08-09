import React from "react";
import { connect } from "react-redux";
import {
  unfollowAC,
  followAC,
  setUsersAC,
  setCurrentPageAC,
  setUsersTotalCountAC,
} from "../../Redux/Users-reducer";
import * as Axios from "axios";
import Users from "./Users";

//контейнерная компонента которая делает ajax запросы к серверному API,отрисовывает презентац. компоненту
class UsersContainer extends React.Component {
  //конструирование объекта происходить лишь 1 раз
  //базоваяя задача,передать эти props,передать конструирование родительской компоненте (React.Component)
  componentDidMount() {
    Axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
    ).then((response) => {
      this.props.setUsers(response.data.items); //это и есть массив наших пользоват (response.data.items)
      //количество пользователей
      this.props.setTotalUsersCount(response.data.totalCount);
    });
  }

  //Метод чтобы делать ajax запрос во время клика
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    Axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
    ).then((response) => {
      this.props.setUsers(response.data.items);
    });
  };

  render() {
    //Презентац компонента
    return (
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        unfollow={this.props.unfollow}
        follow={this.props.follow}
      />
    );
  }
}

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

//контейнерная компонента над другой контейнерной компонентой
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

// создаем контейнерную компоненту с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
