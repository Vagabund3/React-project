import React from "react";
import { connect } from "react-redux";
import {
  unfollow,
  follow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
} from "../../Redux/Users-reducer";
import * as Axios from "axios";  
import Users from "./Users";
import Preloader from "../common/Preloader";

//контейнерная компонента которая делает ajax запросы к серверному API,отрисовывает презентац. компоненту
class UsersContainer extends React.Component {
  //конструирование объекта происходить лишь 1 раз
  //базоваяя задача,передать эти props,передать конструирование родительской компоненте (React.Component)
  // componentDidMount это такие методы которые есть у объекта который, создан с помощью этого класса,
  // этот объект отвечает за компоненту и react взаимодействует с этим объектом
  componentDidMount() {
    this.props.toggleIsFetching(true);
    Axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
      {
        withCredentials: true,
      }
    ).then((response) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(response.data.items); //это и есть массив наших пользоват (response.data.items)
      //количество пользователей
      this.props.setTotalUsersCount(response.data.totalCount); //121
    });
  }

  //Метод чтобы делать ajax запрос во время клика
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    Axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
      {
        withCredentials: true,
      }
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

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage, //pageNumber-номер страницы который нам нужно dispatch
  setTotalUsersCount, //количество пользователей
  toggleIsFetching,
})(UsersContainer);

// создаем еще одну контейнерную компоненту (mapStateToProps) с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
