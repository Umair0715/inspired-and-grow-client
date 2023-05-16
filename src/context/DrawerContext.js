import { useContext , createContext , useState } from "react";

const DrawerContext = createContext();

export const useDrawerContext = () => useContext(DrawerContext)

const DrawerContextProvider = ({ children }) => {
    const [showDrawer , setShowDrawer] = useState(false);
    const user = {
        name : 'test',
    }
    const buyer = {
        name : 'text',
        age : 20
    }

    return (
        <DrawerContext.Provider 
            value={{
                showDrawer , setShowDrawer ,
                user , buyer 
            }}
        >
            {children}
        </DrawerContext.Provider>
    )
}

 
export default DrawerContextProvider;