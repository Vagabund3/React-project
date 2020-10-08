import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/UsersAva.png";
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

// чистая функциональная презентац. компонента
//получает только данные из props и возвращает callback ниже
//для отрисовки нужен только user
let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            {/* //если small не равен null, тогда берем small 
            // в противном случае берем фиксированную картинку  */}
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {/* исп. тернарный оператор (? и :)
            когда кликнут,отработает callback функция (которую создает connect)
            и возьмет в пропсах follow или unfollow  и передаст туда id
            */}
          {user.followed ? (
            <button //если кто-нибудь в этом массиве равен user.id то тогда метод some вернет true или false
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                //во время onClick мы вызываем то что приходит из пропсов
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>

      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"user.location.country"}</div>
          <div>{"user.location.city"}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
