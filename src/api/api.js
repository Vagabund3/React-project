import * as Axios from "axios";
import { follow, unfollow } from "../Redux/Users-reducer";

// Создаем конкретный экземпляр AxiosA-(Instance)- это объекты которые содержат настройки по работе с конкретной API
const instance = Axios.create({
  withCredentials: true, // в котором сидят настройки запроса,помогает узнать авторизованы или нет,помогает узнать авторизованы или нет.

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
    return instance.post(`follow/${userId}`);
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },

  //backward compatibility
  getProfile(userId) {
    console.warn("Obsolete method. Please profileApi object.");
    return profileApi.getProfile(userId);
  },
};

export const profileApi = {
  getProfile(userId) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {
      status: status, //отправляем на сервак объект у которого есть св-во status, см.документацию put запрос
    });
  },
};

//авторизация
//auth me вернет нам результат отработки метода get
//метода get у instance возвращает промис и на этот промис мы подписываемся методом .then в headerCont..
export const authApi = {
  me() {
    return instance.get(`auth/me`);
  },
};
