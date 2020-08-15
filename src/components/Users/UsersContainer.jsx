import React from "react";
import { connect } from "react-redux";
import {
  unfollowAC,
  followAC,
  setUsersAC,
  setCurrentPageAC,
  setUsersTotalCountAC,
  ToggleIsFetchingAC,
} from "../../Redux/Users-reducer";
import * as Axios from "axios";
import Users from "./Users";
import preloader from "../../assets/images/preloader.svg";
import Preloader from "../common/Preloader";

//контейнерная компонента которая делает ajax запросы к серверному API,отрисовывает презентац. компоненту
class UsersContainer extends React.Component {
  //конструирование объекта происходить лишь 1 раз
  //базоваяя задача,передать эти props,передать конструирование родительской компоненте (React.Component)
  componentDidMount() {
    this.props.toggleIsFetching(true);
    Axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
    ).then((response) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(response.data.items); //это и есть массив наших пользоват (response.data.items)
      //количество пользователей
      this.props.setTotalUsersCount(response.data.totalCount);
    });
  }

  //Метод чтобы делать ajax запрос во время клика
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    Axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
    ).then((response) => {
      this.props.setUsers(response.data.items);
      this.props.toggleIsFetching(false);
    });
  };

  render() {
    //Презентац компонента
    // <>-это React фрагмент, мы возвращаем больше чем 1 компоненту
    return (
      <>
        {/* //если данные приходят то отобразим img если нет то null */}
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
        />
      </>
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
    isFetching: state.usersPage.isFetching,
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
    toggleIsFetching: (isFetching) => {
      dispatch(ToggleIsFetchingAC(isFetching));
    },
  };
};

//контейнерная компонента над другой контейнерной компонентой
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

// создаем контейнерную компоненту с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
