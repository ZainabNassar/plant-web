
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
        <h2 className="text-xl"> your booking inormation:</h2>
        <div>
            Total price:
            {booking.price }
        </div>
        </div> 
      
        <PlaceGallery place={booking.place}/>

</div>
    );
}