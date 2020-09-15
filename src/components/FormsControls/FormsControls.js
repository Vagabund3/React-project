import React from "react";
import styles from "./FormsControls.module.css";

export const Textarea = ({ input, meta, ...props }) => {
  //если этот элемент был тронут(touched) и meta.error есть. то покажи span,
  //в противном случае span не показывем.
  // Должен быть виден только при обшибке. B meta сидит св-во error.
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}{" "}
    </div>
  );
};

//компонента(метод) renderField которая подсвечивает input
// import styles from "./FormsControls.module.css";
