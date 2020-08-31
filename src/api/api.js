import * as Axios from "axios";
import { follow, unfollow } from "../Redux/Users-reducer";

// Создаем конкретный экземпляр AxiosA-(Instance)- это объекты которые содержат настройки по работе с конкретной API
const instance = Axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "970d33ed-72c4-40d8-a0e3-60b5a333afee",
  },
});

// вспомогательный, который не содержит данных, но содержит методы,  объект с методом getUsers
export const usersApi = {
  //Запрос чтобы получить Users и тд
  // Если функции нужны данные которых у нее нет она получает данные из параметров (currentPag,pageSize)
  getUsers(currentPage = 1, pageSize = 10) {
    //ruturn то что возвращает нам Get
    return instance
      .get(
        `users?page=${currentPage}&count=${pageSize}`
        //return не тот промис который возвращается методом get выше,
        // а тот что вернул нам .then,  а он возвращает другой промис,
        //в котором сидит не весь response,а только data из response
        //из этого response берем date и возвращаем ее
      )
      .then((response) => {
        return response.data;
      });
  }, 

  follow(userId) {
    return instance.post(
      `https://social-network.samuraijs.com/api/1.0/follow/${userId}`
    );
  },

  unfollow(userId) {
    return instance.delete(
      `https://social-network.samuraijs.com/api/1.0/follow/${userId}`
    );
  },
};
