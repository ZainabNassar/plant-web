import { useEffect } from "react";
import {createContext, useState} from "react";


export const UserContext =createContext({});

export  function  UserContextProvider({children}){
    const [user, setUser] = useState(null);

useEffect(() => {
  if (!user) {
    fetch('http://127.0.0.1:4000/profile', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => console.error(error));
  }
}, []);
    return(
        <UserContext.Provider value={{user,setUser}}> 
             {children}
             </UserContext.Provider>
       
    );
}