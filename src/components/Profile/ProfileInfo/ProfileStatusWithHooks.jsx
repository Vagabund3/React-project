import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";

//функциональ компонента должна ообразить статус пришедший из props

const ProfileStatusWithHooks = (props) => {
  //значение по умолчанию false
  let stateWithSetState = useState(false); //useState возвращ. массив и в нем сидит 2 элемента //вторым элементом в этом массиве,сидит функция,которая будет изменять одиночное значение(setEditMode)
  let editMode = stateWithSetState[0];
  let setEditMode = stateWithSetState[1];

  return (
    <div>
      {!editMode && ( //если не editMode то показ span
        <div>
          <span>
            {props.status || "-----"} {/* если статуса нет то --- */}
            {/*здесь показываем props потому-что еще не обновился сервак,ушли из editMode,отправили запрос на сервак,он еще думает,а пользователь видит пока старый статус,но потом появл новый,тк в  bll обновился status заново через пропсы пришел акуальный и мы его увидели  */}
          </span>
        </div>
      )}

      {editMode && (
        <div>
          <input autoFocus={true} />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
