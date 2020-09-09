import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  //метод для обработки onDoubleClick
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status); //передаем статус.
  };

  //благодаря (е) узнаем новое значение currentTarget.value и это новое знач. засетаем в качестве статуса local state. На каждое нажатие будет меняться local state, а input зависит от него
  onStatusChange = (e) => {
    this.setState({ status: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        {!this.state.editMode && ( //если не editMode(!) то отобразим span
          <div>
            <span //показывает глобальный state
              onDoubleClick={this.activateEditMode}
            >
              {this.props.status || "-----"} {/* если статуса нет то --- */}
              {/*здесь показываем props потому-что еще не обновился сервак,ушли из editMode,отправили запрос на сервак,он еще думает,а пользователь видит пока старый статус,но потом появл новый,тк в  bll обновился status заново через пропсы пришел акуальный и мы его увидели  */}
            </span>
          </div>
        )}
        {this.state.editMode && ( // если editMode то тогда input
          <div>
            <input //показывает local state
              onChange={this.onStatusChange}
              autoFocus={true} //input когда активируется,он заберет фокус на себя
              onBlur={this.deactivateEditMode} //onBlur фокус в эллементе
              value={this.state.status} //показываем из local state статус
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
