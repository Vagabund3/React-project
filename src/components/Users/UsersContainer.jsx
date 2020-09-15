//UI
import React from "react";
import { connect } from "react-redux";
import {
  unfollow,
  follow,
  setCurrentPage,
  toggleIsFollowingProgress,
  getUsers,
} from "../../Redux/Users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

//теперь UI у нас нaпрямую общается с BLL

class UsersContainer extends React.Component {
  //конструирование объекта происходить лишь 1 раз
  //базоваяя задача,передать эти props,передать конструирование родительской компоненте (React.Component)
  // componentDidMount это такие методы которые есть у объекта который, создан с помощью этого класса,
  // этот объект отвечает за компоненту и react взаимодействует с этим объектом
  //компонента через пропсы обращается к BLL
  componentDidMount() {
    //сюда попадает не thunk a callback
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  //Метод чтобы делать ajax запрос во время клика
  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize); //getUsers вызывает calback который пришел от родителя
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
          followingInProgress={this.props.followingInProgress}
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
    followingInProgress: state.usersPage.followingInProgress,
  };
};

//===============================HOC=======================================================================

//см. комменты в DialogsContainer!!!
export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage, //pageNumber-номер страницы который нам нужно dispatch
    toggleIsFollowingProgress,
    getUsers, //создается callback который внутри себя вызовит эту thunk и задиспачит ее результат
  })
)(UsersContainer);
//===============================HOC=======================================================================

// создаем еще одну контейнерную компоненту (mapStateToProps) с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
