import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
const Header = (props) => {
  return (
    <header className={s.header}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png" />

      {/* //если мы авторизованы то покажем login,
        // если нет то показ. ссылку на  авторизацию */}
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Logout</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
