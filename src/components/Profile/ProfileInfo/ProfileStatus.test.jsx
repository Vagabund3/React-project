import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

//status из props должен перейти в status в state
//describe описывает компонент который тестим
describe("ProfileStatus component", () => {
    test("status from props shoud be in state", () => {
      const component = create(<ProfileStatus status= "Тестируем статус и ищем работу" />);
      const instance = component.getInstance();//экземпляр объекта с которым взаимодейсвуем
      expect(instance.state.status).toBe("Тестируем статус и ищем работу");//toBe - "должен буть"
    });

    test("after create span should be displayed", () => {
      const component = create(<ProfileStatus status= "Тестируем статус и ищем работу" />);
      const root = component.root;
      let span = root.findByType("span")
      expect(span).not.toBeNull();
    });

//input не должно быть
    test("after create input should`t be displayed", () => {
      const component = create(<ProfileStatus status= "Тестируем статус и ищем работу" />);
      const root = component.root;
      expect (() => {
      let input = root.findByType("input")
       }).toThrow();
    });

    //отрисовывем компоненту и записываем в props статус
    test("after create span  should be correct status", () => {
      const component = create(<ProfileStatus status= "Тестируем статус и ищем работу" />);
      const root = component.root;
    let span = root.findByType("span")
      expect(span.children[0]).toBe("Тестируем статус и ищем работу");
    });

    //переход в editMode
    //у span есть props и в них сидит onDoubleClick-его вызываем,
    //если onDoubleClick произойдет то запустится activateEditMode и  станет-editMode: true. 
    //В итоге должен появится input вместо span
    test("input should be displayed in editMode instead of span ", () => {
      const component = create(<ProfileStatus status= "Тестируем статус и ищем работу" />);
      const root = component.root;
      let span = root.findByType("span")
    span.props.onDoubleClick(); 
    let input = root.findByType("input")
    expect(input.props.value).toBe("Тестируем статус и ищем работу");
    })
  });