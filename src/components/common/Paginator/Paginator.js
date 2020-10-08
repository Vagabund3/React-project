import React from "react";
import styles from "./../Paginator/Paginator.module.css";

// чистая функциональная презентац. компонента
//получает только данные из props и возвращает callback ниже
let Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
  //Math.ceil округляет до целого числа  делим количество пользователей(сколько всего) на размер страницы и получаем кол-во страниц
  let pageCount = Math.ceil(totalUsersCount / pageSize);
  // и рисуем кол-во этих страниц - создаем массив
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((p) => {
        return (
          <span
            //если currentPage равна {p}-(которую мы push выше)
            //то тогда styles.selectedPage прийдет в className
            className={currentPage === p && styles.selectedPage}
            //(р) по которой мы итерируемся-(пробегем),
            // она будет текущей страницей при нажатии и изменитсья CurrentPage
            //обработчиком события будет эта функция
            onClick={(e) => {
              onPageChanged(p);
            }}
          >
            {p}
          </span>
        ); //{p} - номер страницы
      })}
    </div>
  );
};

export default Paginator;
