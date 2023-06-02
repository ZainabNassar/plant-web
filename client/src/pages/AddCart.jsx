import AccountNav from "../AccountNav";
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import PlaceImg from "../PlaceImg";

export default function AddCart({}){
 
    const[cart,setCart]=useState([]);
    useEffect(() => {
        axios.get('/cart').then(response => {
            setCart(response.data);
        });
    },[])
     console.log(cart)
   
    //  function remove(ev,id){
    //     ev.preventDefault();
    //     onChange([...addedPhotos.filter(photo => photo!== filename)]);
    //   }
    const remove = (itemId) => {
        axios.delete(`/cart/${itemId}`).then(() => {
          setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
        });
      };
   
   
   return(<>
    <AccountNav/>
    <div>


    {cart?.length >0 && cart.map(cart => (
        

<Link to={'/VandE/'+ cart.place._id } className=" mt-4 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden ">
  <div className="w-48">
    <PlaceImg place={cart.place}/>
  </div>
  <div className="py-3 pr-3 grow">
    <h2 className="text-3xl">{cart.place.title}</h2>
  
  <div className="text-xl border-t border-gray-300 mt-2 py-2">
    <div className="flex gap-2 items-end">
    

    <br/>
    </div>
    <div className="flex gap-2 items-end">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>

  Total Price$: {cart.place.price}
  </div>
  <button onClick={() => remove(cart._id)} className="primary my-3 "style={{width:"7%"}} > Delete</button>
  </div>
  </div>
</Link>
   
))}
    </div>
    
    
    
    </>)
}