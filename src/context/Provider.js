import { useState } from "react"
import AppContext from "./AppContext"

const AppProvider = ({children}) => {
    const [token, setToken] = useState([])
    const [user, setUser] = useState()
    const [userId, setUserId] = useState()
    const [cartItems, setCartItems] = useState([])
    const [orders, setOrders] = useState([])

    return (
        <AppContext.Provider value={{token, setToken, user, setUser, userId, setUserId, cartItems, setCartItems, orders, setOrders}}>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider