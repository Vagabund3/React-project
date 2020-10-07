import React from "react";
import { Field } from "redux-form";
import styles from "./FormsControls.module.css";

const FormControl = ({ input, meta: { touched, error }, children }) => {
  //если этот элемент был тронут(touched) и meta.error есть. то покажи span,
  //в противном случае span не показывем.
  // Должен быть виден только при обшибке.
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
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

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {}, //по умолчанию будет пустой объект
  text = "" //текста может и не быть,но если он есть,то отобразим рядом с field
) => (
  <div>
    {/*Field - компоненты(контейнерная)  которые отрисовывают указанный элемент, в нашем случае input  */}
    {/* Любая форма должна отправлятся на сервак под каким-то name={""} */}
    {/* Redux-Form будет реагировать на эти Name чтобы обеспечить нашу логику. В Field onChange уже засетаны,они будут брать эти name{"} и будут общаться со своим state */}
    <Field
      placeholder={placeholder}
      name={name}
      validate={validators}
      component={component}
      {...props}
    />
    {text}
  </div>
);
