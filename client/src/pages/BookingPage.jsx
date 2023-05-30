
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddessLink";
import PlaceGallery from "../PlaceGallery";
export default function BookingPage(){

const {id} =useParams();
const [booking,setBooking]=useState(null);

useEffect(() => {
    if(id){
        axios.get('/bookings').then(response => {
           const foundBooking= response.data.find(({_id}) => _id === id);
            if (foundBooking){
                setBooking(foundBooking);
            }
        })
    }
})
 if(!booking){
    return'';
 }
    return(
<div className="my-8"> 
    <h1 className="text-3xl">{booking.place.title}</h1>
    <AddressLink className="my-2 block"> {booking.place.address}</AddressLink>
       
       <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
        <h2 className="text-2xl  "> your booking inormation:</h2>
        {/*  */}
       
        <div className="flex items-end">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>

        <div className=" flex gap-2">
        <div className="text-xl">Quantity: </div>  
          <div className=" text-xl"> { booking.price /booking.place.price}</div> 
        </div>

        </div>
       
       {/*  */}
        <div className="flex items-end">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className=" flex gap-2">
        <div className="text-xl">Total price: </div>  
          <div className="text-primary text-xl"> { booking.price }$</div> 
        </div>

        </div>
          
        </div> 
      
        <PlaceGallery place={booking.place}/>

</div>
    );
}