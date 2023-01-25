import AppContext from "./AppContext"

const AppProvider = ({children}) => {


    return (
        <AppContext.Provider>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider