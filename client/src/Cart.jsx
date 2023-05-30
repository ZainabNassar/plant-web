import axios from "axios";
import { useState ,useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";
export default function Cart({place}){

    const[redirect,setRedirect]=useState('')
    const {ready,user,setUser}=useContext(UserContext);

  
   async function addToCart(){
      if(user===null){
        setRedirect('/login')

      }else{
        const response= await axios.post('/cart' , {place:place._id});
        // const cartId=response.data._id;
        setRedirect('/account/cart')
      }
      
    }

  if (redirect){
    return < Navigate to={redirect}/>
  }
    return(
        <div className="">
          <button onClick={addToCart}   className="primary">Cart</button>
        </div>
    );
    
    }