import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";


export default function BookingsPage(){
    const[bookings,setBookings]=useState([]);
useEffect(() => {
    axios.get('/bookings').then(response => {
        setBookings(response.data);
    });
},[])

    return(

<div>
    <AccountNav/>
    <div>
    {bookings?.length > 0 &&
    bookings.slice().reverse().map(booking => (

            <Link to={`/account/bookings/${booking._id}`} className=" mt-4 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden ">
              <div className="w-48">
                <PlaceImg place={booking.place}/>
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-3xl">{booking.place.title}</h2>
              
              <div className="text-xl border-t border-gray-300 mt-2 py-2">
                <div className="flex gap-2 items-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
</svg>

                Quantity: {booking.price/booking.place.price}<br/>
                </div>
                <div className="flex gap-2 items-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>

              Total Price$: {booking.price}
              </div>
              </div>
              </div>
            </Link>
        ))}
    </div>
</div>

    );
}