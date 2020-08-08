import React from "react";
import styles from "./users.module.css";
import * as Axios from "axios";
import userPhoto from "../../assets/images/UsersAva.png";

// в mapStateToProps мы вернули именно users
//когда у нас map или массив не забываем ставить key={}

//будем setaТЬ userOВ только втом случае кгда у нас их еще нет
//если в пропсах нет пользователей (см 49  на 57 мин.)

//классовая компонента
class Users extends React.Component {
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

  //Метод. чтобы делать ajax запрос во время клика
  onePageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    Axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
    ).then((response) => {
      this.props.setUsers(response.data.items);
    });
  };

  //let var const - это переменные, мы не имеем права объявлять их внутри классов,
  //все что мы можем объявлять это название методов (Constructor,render и тд.)
  render() {
    //Math.ceil округляет до целого числа  делим количество пользователей(сколько всего) на размер страницы и получаем кол-во страниц
    let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    // и рисуем кол-во этих страниц - создаем массив
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }

    return (
      <div>
        <div>
          {pages.map((p) => {
            return (
              <span
                //если currentPage равна {p}-(которую мы push выше)
                //то тогда styles.selectedPage прийдет в className
                className={this.props.currentPage === p && styles.selectedPage}
                //(р) по которой мы итерируемся-(пробегем),
                // она будет текущей страницей при нажатии и изменитсья CurrentPage
                //обработчиком события будет эта функция
                onClick={(e) => {
                  this.onePageChanged(p);
                }}
              >
                {p}
              </span>
            ); //{p} - номер страницы
          })}
        </div>

        {/* //props теперь это св-во объекта поэтому ставим  this */}
        {this.props.users.map((u) => (
          <div key={u.id}>
            <span>
              <div>
                {/* //если small не равен null, тогда берем small 
                // в противном случае берем фиксированную картинку  */}
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </div>
              <div>
                {/* исп. тернарный оператор (? и :)
                когда кликнут,отработает callback функция и возьмет в пропсах follow и передаст туда id*/}
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>

            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
