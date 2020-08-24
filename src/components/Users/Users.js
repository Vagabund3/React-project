import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/UsersAva.png";
import { NavLink } from "react-router-dom";
import Axios from "axios";

// чистая функциональная презентац. компонента
//получает только данные из props и возвращает callback ниже
let Users = (props) => {
  //Math.ceil округляет до целого числа  делим количество пользователей(сколько всего) на размер страницы и получаем кол-во страниц
  let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
  // и рисуем кол-во этих страниц - создаем массив
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  //делаем 2 callback на подписку и отписку

  return (
    <div>
      <div>
        {pages.map((p) => {
          return (
            <span
              //если currentPage равна {p}-(которую мы push выше)
              //то тогда styles.selectedPage прийдет в className
              className={props.currentPage === p && styles.selectedPage}
              //(р) по которой мы итерируемся-(пробегем),
              // она будет текущей страницей при нажатии и изменитсья CurrentPage
              //обработчиком события будет эта функция
              onClick={(e) => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          ); //{p} - номер страницы
        })}
      </div>

      {/* //когда у нас map или массив не забываем ставить key={} */}
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                {/* //если small не равен null, тогда берем small 
            // в противном случае берем фиксированную картинку  */}
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {/* исп. тернарный оператор (? и :)
            когда кликнут,отработает callback функция (которую создает connect)
            и возьмет в пропсах follow или unfollow  и передаст туда id
            в этих обработчиках делаем AJAX запросы
            */}
              {u.followed ? (
                <button
                  onClick={() => {
                    //для отписки шлем delete запрос
                    Axios.delete(
                      `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                      {
                        withCredentials: true,
                        headers: {
                          "API-KEY": "970d33ed-72c4-40d8-a0e3-60b5a333afee",
                        },
                      }
                    ).then((response) => {
                      //сервер подтв. что подписка или отписка произошла
                      //и мы должны задиспачить этот callback в reducer
                      if (response.data.resultCode === 0) {
                        props.unfollow(u.id);
                      }
                    });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    Axios.post(
                      `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                      {},
                      {
                        withCredentials: true,
                        headers: {
                          "API-KEY": "970d33ed-72c4-40d8-a0e3-60b5a333afee",
                        },
                      }
                    ).then((response) => {
                      if (response.data.resultCode === 0) {
                        props.follow(u.id);
                      }
                    });
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
};

export default Users;
