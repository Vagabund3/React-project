import React from "react";
import styles from "./FormsControls.module.css";

const FormControl = ({ input, meta, child, ...props }) => {
  //если этот элемент был тронут(touched) и meta.error есть. то покажи span,
  //в противном случае span не показывем.
  // Должен быть виден только при обшибке. B meta сидит св-во error.
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{props.children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

//Чтобы избежать дублирования мы создаем child
//Textarea теперь явл. контейнером над FormControl
// Отрисовываем FormControl и внутрь прердаем  textarea(child)
// и получается что FormControl это вся логика выше.
export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props; //restProps-остаточные рrops
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};
