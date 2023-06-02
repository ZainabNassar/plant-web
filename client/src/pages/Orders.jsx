import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";

export default function Orders( ){
 const[done,setDone]=useState(false);
    const[bookings,setBookings]=useState([]);
    const[data,setData]=useState([]);
    const [showTick, setShowTick] = useState(false);
  
 

    useEffect(() => {
        axios.get('/orders').then(response => {
            setBookings(response.data);
        });
    },[])
    
    console.log(bookings);
  
    // async function doneO(){
    //     setDone(true);
    //      await axios.post('/done', {booking:bookings._id, done:done,
    //     });
        

    // }

    // useEffect(() => {
    //     axios.get('/getdone').then(response => {
    //         setData(response.data);
    //     });
    // },[])
   

    const [doneStatus, setDoneStatus] = useState({});

  const handleDoneClick = (id) => {
    setDoneStatus((prevState) => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the "done" state for the specific ID
    }));

    localStorage.setItem(`showTick_${id}`, !doneStatus[id] ? 'true' : 'false');
  };

  useEffect(() => {
    bookings.forEach((booking) => {
      const savedShowTick = localStorage.getItem(`showTick_${booking._id}`);
      setDoneStatus((prevState) => ({
        ...prevState,
        [booking._id]: savedShowTick === 'true' // Set the "done" state based on the stored value
      }));
    });
  }, [bookings]);
    
return(
<div>
    
    <AccountNav />
    <div >
    {bookings?.length > 0 &&
    bookings.slice().reverse().map(booking => (

            <Link  className=" mt-4 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden ">
                
              <div className="w-48">
                <PlaceImg place={booking.place}/>
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-3xl">{booking.place.title}</h2>
                
              <div className="text-xl border-t border-gray-300 mt-2 py-2">

<div className="flex items-center gap-1">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bolder">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>{booking.name} | <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg> {booking.address} |<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
</svg>
{booking.phone}

</div>
             

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
              {/* <div  >{showTick ? "Done" : "Not Done"}</div>
              <button className="rounded text-white " onClick={() => handleDoneClick(booking._id)} >Done</button> */}
             <div className=" items-center ">

             {/* <div className="">{doneStatus[booking._id] ? 'Done' : 'Not Done'}</div> */}
             <button
  className={`rounded text-white ${doneStatus[booking._id] ? 'primary' : 'red'}`}
  style={{ width: '7%' }}
  onClick={() => handleDoneClick(booking._id)}
>
  {doneStatus[booking._id] ? 'done' : 'undone'}
</button>

             </div>
             
              </div>
            
            </Link>
        ))}
    </div>
</div>


);

}