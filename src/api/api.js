import * as Axios from "axios";

//Запрос чтобы получить Users и тд
// Если функции нужны данные которых у нее нет она получает данные из параметров (currentPag,pageSize)
export const getUsers = (currentPage = 1, pageSize = 10) => {
  //ruturn то что возвращает нам Get
  return Axios.get(
    `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
    {
      withCredentials: true,
    }
    //return не тот промис который возвращается методом get выше, а тот что вернул нам .then,  а он возвращает другой промис,в котором сидит не весь response,а только data из response
    //из этого response берем date и возвращаем ее
  ).then((response) => {
    return response.data;
  });
};
