import React, { useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";

//функционал. компонента должна отбразить статус пришедший из props

const ProfileStatusWithHooks = (props) => {
  // let arr = [0,() => {}]; пример того что мы делаем ниже - Деструктурирующее присваивание
  // let [a, setA] = arr
  //значение по умолчанию false

  let [editMode, setEditMode] = useState(false); //useState возвращ значение(editMode) и функцию к которой можем это значение менять-setEditMode. и useState возвращ. массив и из него достаем первый элемент editMode и второй элемент setEditMode и записываем их в переменную
  let [status, setStatus] = useState(props.status); //localState

  //hook который говорит закиньте в меня функцию которую я выполню кoгда произойдет отрисовка
  //когда компонента отрисовалась мы можем засинхронизировать setStatus который хранится в state c помощью useState, засинхронить теми данными которые пришли из props
  //здесь нужно сказать ReactУ,что useEffect наш запускай не всегда,а только 1 раз, в момент когда происходит отрисовка
  //хотим  чтобы useEffect запускался когда будет изменен props.status,говорим ReactУ что зависим от props.status
  //Если props.status при очередной отрисовки будет не таким каким он был раньше то запускается useEffect
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  //сетаем локальный state
  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status); //передаем статус.
  };

  //при каждом напечатывании символа изменяем localState с помощью setStatus
  //благодаря (е) узнаем новое значение currentTarget.value и это новое знач. засетаем в качестве статуса local state. На каждое нажатие будет меняться local state, а input зависит от него
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && ( //если не editMode то показ span
        <div>
          <b>Status</b>:&nbsp;
          <span onDoubleClick={activateEditMode}>
            {props.status || "-----"} {/* если статуса нет то --- */}
            {/*здесь показываем props потому-что еще не обновился сервак,ушли из editMode,отправили запрос на сервак,он еще думает,а пользователь видит пока старый статус,но потом появл новый,тк в  bll обновился status заново через пропсы пришел акуальный и мы его увидели  */}
          </span>
        </div>
      )}

      {editMode && (
        <div>
          <input
            //показывает local state
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode} //onBlur фокус в эллементе
            value={status} //показываем из local state статус
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
