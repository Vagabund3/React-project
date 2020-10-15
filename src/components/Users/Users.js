import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

//эта страница отрисовывает paginator и каждого пользователя
// чистая функциональная презентац. компонента
//получает только данные из props и возвращает callback ниже
let Users = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  users,
  ...props
}) => {
  return (
    <div>
      {/*занимаеться отрисовкой кнопок при переходе между страницами*/}
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {/* //когда у нас map или массив не забываем ставить key={} */}
        {users.map((u) => (
          <User
            user={u}
            followingInProgress={props.followingInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
            key={u.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
