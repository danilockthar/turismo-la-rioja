import React, {useState, useEffect} from 'react'

export const ContextState = React.createContext();

export const CartProvider = (props) => {
    const [itemCart, setItemCart] = useState([]);

    return(
        <ContextState.Provider value={[itemCart, setItemCart]}>
                {props.children}
        </ContextState.Provider>
    )
}
