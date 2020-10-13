import profileReducer, { addPostCreator, deletePost } from "./Profile-reducer";
import React from "react";

let state = {
  posts: [
    { id: 1, message: "Я вложил в капитал", likesCount: 10 },
    { id: 2, message: "Хочешь знать в какой?", likesCount: 23 },
    { id: 3, message: "Капитал прожиточного минимума", likesCount: 133 },
  ],
};

//чтобы среда тестирования поняла что это test нужно обернуть ее
//сначала пишим название теста-что мы тестируем,потом передаем callback который будет тестом
it("length of post should be incremented", () => {
  //функция из profile-Reducer,которая добавляет post
  // передаем какой-либо {state} u {action} и получим newState, проверим что этот newState (при переданном старом state и action) такой,какой мы ожидаем получить
  //в profile-Reducer ADD_POST диспачим с помощью addPostCreator поэтому вызываем его здесь
  //1. test data
  let action = addPostCreator("newPostTextTest");

  //2. action
  let newState = profileReducer(state, action);

  //3. expectation(ожидание), ожидаем что в значение переданное во внутрь expect будет равна 4. т.к. постов у нас 3 и мы хотим добавить 4-й пост - newPostTextTest
  expect(newState.posts.length).toBe(4);
});

it("length of new post should be correct", () => {
  //1. test data
  let action = addPostCreator("newPostTextTest");

  //2. action
  let newState = profileReducer(state, action);

  //3. expectation(ожидание), ожидаем что в значение переданное во внутрь expect будет равна 4. т.к. постов у нас 3 и мы хотим добавить 4-й пост - newPostTextTest
  expect(newState.posts[3].message).toBe("newPostTextTest");
});




// //пишим тест на ту логику которой у нас пока нет
// it("after deleting length of messages should be decrement", () => {
//   //1. test data
//   let action = deletePost(1);

//   //2. action
//   let newState = profileReducer(state, action);

//   //3. expectation(ожидание)
//   expect(newState.posts.length).toBe(3);
// });

// //пишим тест на ту логику которой у нас пока нет

// it("after deleting length of messages should be decrement if ID is incorrect", () => {
//   //1. test data
//   let action = deletePost(1000);

//   //2. action
//   let newState = profileReducer(state, action);

//   //3. expectation(ожидание)
//   expect(newState.posts.length).toBe(3);
// })
  