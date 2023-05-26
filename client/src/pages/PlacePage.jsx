import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios  from "axios";
import BookingW from "../BookingW";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddessLink";


export default function PlacePage(){
const{id}  =useParams(); 
const [place,setPlace]= useState(null);

useEffect(() => {
if (!id){
    return;
}
axios.get(`/VandE/${ id}`).then(response => {
    setPlace(response.data);
});

},[id])

if (!place) return '';


console.log(place);
 return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
           <h1 className="text-3xl">{place.title}</h1>
         <AddressLink> {place.address}</AddressLink>
       
          <PlaceGallery place={place}/>
          <div className="mt-8 mb-8  gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
            <div className="my-4">
            <h2 className="font-semibold text-2xl"> Description</h2>
            {place.description}
          </div>
          <div className="grid grid-cols-2">
            <div>
              Check-in:  <br />
              Check-out: <br /> 
              Max number: 
            </div>
          </div>
            </div>
            
           <div>
            <BookingW place={place} />
           </div>
          </div>
          <div className="bg-white -mx-8 px-8 py-8 border-t ">
          <div>
            <h2 className="font-semibold text-2xl"> Extra Info</h2>
          </div>
          <div className=" mb-4  mt-2 text-sm text-gray-600 leading-5">  {place.extraInfo}</div>
          </div>
          
        </div>  
    );
}