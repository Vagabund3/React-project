import React from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
          {/*чтобы происходила смена url в браузере без перезагрузки страницы,использ. NavLink*/}
          Profile
        </NavLink>
      </div>

      <div className={`${s.item} ${s.active}`}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink to="/video" activeClassName={s.activeLink}>
          Video
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink to="/settings" activeClassName={s.activeLink}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
