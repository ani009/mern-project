import React, { createContext, useContext, useReducer } from 'react';
const cartStatecontext=createContext();
const cartDispatchContext=createContext();

const reducer=(state,action)=>{
    switch(action.type){
        case "ADD":
            return [...state,{id:action.id,
                name:action.name,
                price:action.price,
                qty:action.qty,
                size:action.size}]
        default:
            console.log("error in reducer");
    }
}
const CartProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,[]);
    return(
        <cartDispatchContext.Provider value={dispatch}>
        <cartStatecontext.Provider value={state}>
            {children}
        </cartStatecontext.Provider>
        </cartDispatchContext.Provider>
    )
}
export default CartProvider;
export const useCart=()=>useContext(cartStatecontext);
export const useDispatch=()=>useContext(cartDispatchContext);