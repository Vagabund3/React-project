import React, { useState } from "react";
import styles from "./../Paginator/Paginator.module.css";
import cn from "classnames";

//Paginator служит для постраничного вывода пользователей

// чистая функциональная презентац. компонента
//получает только данные из props и возвращает callback ниже
let Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  //Math.ceil округляет до целого числа, делим количество пользователей(сколько всего) на размер страницы и получаем кол-во страниц
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  // и рисуем кол-во этих страниц - создаем массив
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  //определяем границы см тетрадь
  let portionCount = Math.ceil(pagesCount / portionSize); //берем все стр которые получили выше,(все pageCount-вся огромная полоса из чисел страниц) и делим на размер порции (portionSize-кол-во станиц котрые хотим видеть) и выводиться 10 стр.
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; //определяем левую границу порции(leftPortionPageNumber)
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {/* показываем PREV если portionNumber > 1 и потом установи setPortionNumber(функция из хука) установи portionNumber(текущая порция) минус 1 */}
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber //нужно отрисовать только те страницы которые больше левой границы(leftPortionPageNumber-номер страницы левой границы)  //проверяем, те страницы фильтрация которых вернет true, т.е.(для страниц, которые больше или равно левой границы и меньше либо равно правой границы)
        )
        .map((p) => {
          return (
            <span
              //если currentPage равна {p}-(которую мы push выше)
              //то тогда styles.selectedPage прийдет в className
              className={cn(
                {
                  [styles.selectedPage]: currentPage === p,
                },
                styles.pageNumber
              )}
              //(р) по которой мы итерируемся-(пробегем),
              // она будет текущей страницей при нажатии и изменитсья CurrentPage
              //обработчиком события будет эта функция
              key={p}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </span> //{p} - номер страницы
          );
        })}
      {/* А NEXT показываем тогда когда мы знаем что кол-во порций > чем текущая порция которую показываем*/}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1); //а если NEXT показывается,то при клике на эту кнопку мы уст. portionNumber на 1 больше, тем та что есть
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
