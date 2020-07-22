import React from "react";
import styles from "./users.module.css";

//в props users потому-что в userContainer
// в mapStateToProps мы вернули именно users
//когда у нас map или массив не забываем ставить key={}

//будем setaТЬ userOВ только втом случае кгда у нас их еще нет
//если в пропсах нет пользователей (см 49  на 57 мин.)
let Users = (props) => {
   if (props.users.length === 0) {
    props.setUsers([
      ({
        id: 1,
        photoUrl:
          "https://cdn.vox-cdn.com/thumbor/D-hzXDL9SipPL1607SkIBeOwk5g=/0x0:5568x3712/1200x800/filters:focal(2149x940:3039x1830)/cdn.vox-cdn.com/uploads/chorus_image/image/59349533/853722898.jpg.0.jpg",
        followed: false,
        fullName: "Kendrick Perkins",
        status: "I am best center of all time",
        location: { city: "OKC", country: "USA" },
      },
      {
        id: 2,
        photoUrl:
          "https://cdn.vox-cdn.com/thumbor/D-hzXDL9SipPL1607SkIBeOwk5g=/0x0:5568x3712/1200x800/filters:focal(2149x940:3039x1830)/cdn.vox-cdn.com/uploads/chorus_image/image/59349533/853722898.jpg.0.jpg",
        followed: true,
        fullName: "Enes Kanter",
        status: "kebab",
        location: { city: "Boston", country: "Turkey" },
      },
      {
        id: 3,
        photoUrl:
          "https://cdn.vox-cdn.com/thumbor/D-hzXDL9SipPL1607SkIBeOwk5g=/0x0:5568x3712/1200x800/filters:focal(2149x940:3039x1830)/cdn.vox-cdn.com/uploads/chorus_image/image/59349533/853722898.jpg.0.jpg",
        followed: false,
        fullName: "Cody Zeller",
        status: "MVP",
        location: { city: "unknown", country: "unknown" },
      }),
    ]);
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} className={styles.userPhoto} />
            </div>
            <div>
              {/* исп. тернарный оператор (? и :)
              когда кликнут,отработает callback функция и возьмет в пропсах follow и передаст туда id*/}
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
