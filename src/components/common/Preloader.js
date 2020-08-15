import React from "react";
import preloader from "../../assets/images/preloader.svg";

// Компонента заргрузочной картинки
let Preloader = (props) => {
  return (
    <div>
      <img src={preloader} />
    </div>
  );
};

export default Preloader;
  