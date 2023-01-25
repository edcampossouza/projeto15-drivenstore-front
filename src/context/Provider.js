import { useState } from "react"
import AppContext from "./AppContext"

const AppProvider = ({children}) => {
    const [token, setToken] = useState([])
    const [user, setUser] = useState()
    const [userId, setUserId] = useState()


    return (
        <AppContext.Provider value={{token, setToken, user, setUser, userId, setUserId}}>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider