import { useEffect } from "react";
import {createContext, useState} from "react";


export const UserContext =createContext({});

export  function  UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [ready,setReady]=useState(false);

useEffect(() => {
  if (!user) {
    fetch('http://127.0.0.1:4000/profile', {
      //mafrood 5173 msh 4000
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setReady(true);
      })
      .catch(error => console.error(error));
  }
}, []);
console.log(user);
    return(
        <UserContext.Provider value={{user,setUser,ready,setReady}}> 
             {children}
             </UserContext.Provider>
             
       
    );
}