import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
  };

  //метод для обработки onDoubleClick
  activateEditMode() {
    this.setState({
      editMode: true,
    });
  }

  deactivateEditMode() {
    this.setState({
      editMode: false,
    });
  }

  render() {
    return (
      <div>
        {!this.state.editMode && ( //если не editMode(!) то отобразим span
          <div>
            <span onDoubleClick={this.activateEditMode.bind(this)}>
              {this.props.status}
            </span>
          </div>
        )}
        {this.state.editMode && ( // если editMode то тогда input
          <div>
            <input
              autoFocus={true} //input когда активируется,он заберет фокус на себя
              onBlur={this.deactivateEditMode.bind(this)} //onBlur фокус в эллементе
              value={this.props.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
