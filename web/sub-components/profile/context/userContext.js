import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props)=>{
    const [userId, setUserId] = useState();
    const [routeProfile, setRouteProfile] = useState();

    const changeUserId = (id)=>{
        setUserId(id);
    }

    const changeRouteProfile = (route)=>{
        setRouteProfile(route)
    }

    return(
        <UserContext.Provider value={{userId, changeUserId, changeRouteProfile, routeProfile}}>
            {props.children}
        </UserContext.Provider>
    )
}