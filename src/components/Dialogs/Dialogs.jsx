import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
  updateNewMessageBodyCreator,
  sendMessageCreator,
} from "../../Redux/Dialogs-reducer";

const Dialogs = (props) => {
  let state = props.store.getState().dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} />
  ));
  let newMessageBody = state.newMessageBody;

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };

  let onNewMessageChange = (e) => {
    //textarea помещает сюда объект-событие (event)
    //c помощью (е) можно достучаться до объекта с которым произошло событие, с помощью-см. ниже
    let body = e.target.value;
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <div>
            {/* // Любые значения которые отбражаються в UI - нужно фиксировать, 
            //эти значения должны приходить из propsОВ. */}
            <textarea
              value={newMessageBody}
              onChange={onNewMessageChange} //эту функцию вызывает textarea
              // Чтобы newMessageBody каждый раз менялся и приходил другой необходимо событие onChange,
              // когда мы что-то вводим оно срабатывает внутри этого события как в этом примере:{onNewMessageChange}, делаем Dicpanch
              //  в BLL, BLL там меняеться, к нам приходят новые Props с новым value и новый value отображаеться.
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            {/*кнопка вызывает функцию onSendMessageClick */}
            <button onClick={onSendMessageClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
