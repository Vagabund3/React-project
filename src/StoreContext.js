import React from "react";

const StoreContext = React.createContext(null);

{
  /* //Теперь любая дочернея компонента может обратиться к StorУ с помощью StoreContext
      это попозволяет нам не использовать props */
}

export const Provider = (props) => {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
