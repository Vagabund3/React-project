import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
  };
  render() {
    return (
      <div>
        {!this.state.editMode && ( //если не editMode(!) то отобразим span
          <div>
            <span>{this.props.status}</span>
          </div>
        )}
        {this.state.editMode && ( // если editMode то тогда input
          <div>
            <input value={this.props.status} />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
