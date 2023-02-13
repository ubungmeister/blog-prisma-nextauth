import {createContext, useContext, useState} from 'react';

interface UserContextData {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}

const AppContext = createContext<UserContextData>({
    isLogin: true,
    setIsLogin: () => {}

})

export const AppContextProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AppContext.Provider value={{isLogin, setIsLogin}}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext =()=>useContext(AppContext)