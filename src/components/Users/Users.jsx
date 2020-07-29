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
  //базоваяя задача,передать эти props-передать конструирование родительской компоненте (React.Component)
  constructor(props) {
    super(props);
     Axios.get("https://social-network.samuraijs.com/api/1.0/users").then(
      (response) => {
        this.props.setUsers(response.data.items);
      }
    );
  }

  //let var const - это переменные, мы не имеем права объявлять их внутри классов,
  //все что мы можем объявлять это название методов (Constructor,render и тд.)
  render() {
    return (
      <div>
        {/* //props теперь это св-во объекта поэтому ставим  this */}
        {this.props.users.map((u) => (
          <div key={u.id}>
            <span>
              <div>
                {/* //если small не равен null, тогда берем small  в противном случае берем фиксированную картинку  */}
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
