import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import { UserContext } from "./UserContext";
import Cart from "./Cart";

export default function BookingW({place}){
    
    const[name,setName]=useState('');
    const[phone,setPhone]=useState('');
    const[address,setAddress]=useState('');
    const[q,setQ]=useState(1);
    const[redirect,setRedirect]=useState('');
     const {user}=useContext(UserContext);
     
     useEffect (() => {
          if(user){
               setName(user.name);
          }
     },[user])
   
       async function book(){

          if(user===null){
               setRedirect('/login')
          }
            const response= await axios.post('/bookings', {name,phone,
                address,q,
                place:place._id,
                price:place.price*q,
            });
            const bookingId=response.data._id;
            setRedirect(`/account/bookings/${bookingId}`);

        }
   
    if (redirect){
        return <Navigate to={redirect}/>
    }
    console.log(user);
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
        Price:{place.price}$
        <p className="text-sm">Thank you for choseing Saadeh Plants we promise to make you happy</p>
        </div>
        <div className="border  rounded-2xl mt-4"> 
        <div className=" py-3 px-4  border-t ">
             <label>Quantity</label>
             <input type="number" value={q} onChange={ev => setQ(ev.target.value)}/>
        </div>
        <div className="flex">
        <div className=" py-3 px-4 ">
             <label>Your full name:</label>
             <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
        </div>
        <div className=" py-3 px-4  border-t ">
             <label>Phone Number:</label>
             <input type="tel" value={phone} onChange={ev => setPhone (ev.target.value)}/>
        </div>

        </div>
        <div className=" py-3 px-4  border-t ">
             <label>Your address:</label>
             <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}/>
        </div>
        </div>
       
        <div className="flex gap-1">
      
         <button onClick={book} className= "primary ">Buy</button>
        
         <Cart place={place}/> </div>
 </div>
    );
    }