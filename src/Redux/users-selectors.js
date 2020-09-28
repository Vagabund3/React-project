import { createSelector } from "reselect";

//Селекторы

//cелектор который работает без фильтрации а из state возвращает-users
const getUsersSelector = (state) => {
  return state.usersPage.users;
};

// cелектор который занимается фильтрацией - ему нужны users, он их берет спомощью другого селектора-более примитивного
//Hаш селектор всегда будет зависить не от всего state целиком а от его частей
//создаем с помощью специальной функции(createSelector), которая приходит из reselect библиотеки
//во внутрь-() передаем функцию которая будет выбирать что-то из state
//этой функции чтобы сделать свою логику выборки, нужно получить на входе то из чего эта выборка будет происходить-(users) и на основании этой выборке будем возвращать результат
//а первым параметром передаем тот селектор, который будет использоваться для того чтобы получить значения из функции выше и потом их закинуть сюда - (users).
export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true);
});

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress;
};

//селектор это функция  которая принимает state целиком, берет из него то что нужно и возвращает BLL
// Логика: прежеде чем перезапускать функцию, библетека reselect посмотрит зависимости, не изменилось ли что-то в памяти и только потом перезапустит функцию и нам вернется новый результат
