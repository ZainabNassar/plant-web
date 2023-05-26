import { useState ,useEffect } from "react";
export default function Cart(){

    const [cartItems, setCartItems] = useState([]);
    const [userInfo, setUserInfo] = useState(localStorage.getItem('placesInfo'));

  

  console.log("data",userInfo);
  
    return(
        <div></div>
    );
    
    }