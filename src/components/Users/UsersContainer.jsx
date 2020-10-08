//UI
import React from "react";
import { connect } from "react-redux";
import {
  unfollow,
  follow,
  setCurrentPage,
  toggleIsFollowingProgress,
  requestUsers,
} from "../../Redux/Users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../Redux/users-selectors";

//теперь UI у нас нaпрямую общается с BLL

class UsersContainer extends React.Component {
  //конструирование объекта происходить лишь 1 раз
  //базоваяя задача,передать эти props,передать конструирование родительской компоненте (React.Component)
  // componentDidMount это такие методы которые есть у объекта который, создан с помощью этого класса,
  // этот объект отвечает за компоненту и react взаимодействует с этим объектом
  //компонента через пропсы обращается к BLL
  componentDidMount() {
    //сюда попадает не thunk a callback
    const {currentPage, pageSize} = this.props
    this.props.getUsers(currentPage, pageSize);
  }

  //Метод чтобы делать ajax запрос во время клика
  onPageChanged = (pageNumber) => {
    const {pageSize} = this.props
    this.props.getUsers(pageNumber, pageSize); //getUsers вызывает calback который пришел от родителя
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
    //значения из initialState-cелекторы из user-reducers
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
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
    //создается callback который внутри себя вызовит эту thunk и задиспачит ее результат
    getUsers: requestUsers,
  })
)(UsersContainer);
//===============================HOC=======================================================================

// создаем еще одну контейнерную компоненту (mapStateToProps) с помощью Функции connect
//   !!! каждый шаг см. комменты в DialogsContainer!!!
