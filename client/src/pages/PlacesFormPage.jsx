import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
export default function PlacesFormPage(){
    const {id}=useParams();

    const [title,setTitle]= useState('');
    const [address,setAddress]= useState('');
    const [addedPhotos,setAddedPhotos]= useState([]);
    const [description,setDescription]= useState('');
    const [perks,setPerks]= useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [price,setPrice]=useState(100);
    const [redirect,setRedirect]=useState(false);

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/VandE/'+id).then(response => {
            const {data}=response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setPrice(data.price);
        });  
    },[id]);
    
    function inputHeader(text){
        return(

            <h2 className="text-2xl mt-4">{text}</h2>
            
        );
    }
    function inputDescription(text){
        return(

            <p className="text-gray-500 text-sm" >{text}</p>
            
        );
    }
    function preInput(header,description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
            
        );
    }
    async function savePlace(ev){
        ev.preventDefault();
        const placeData={title, address,
        addedPhotos,description, 
        perks,extraInfo, price}
        if(id){
            //update
            await axios.put('/VandE',
            {id, ...placeData
          });
          setRedirect(true);
          
        }else{
            //new
            await axios.post('/VandE',placeData);
          setRedirect(true);
          }
        }
     
    if(redirect){
        return <Navigate to={'/account/VandE'}/>
    }
    return(
        <div>
            <AccountNav/>
        <form onSubmit={savePlace} >
        {preInput('Title','Title for your product. should be short and catchy as in advertisement')}
        <input type="text"
         value={title}
          onChange={ev=>setTitle(ev.target.value)}
           placeholder="title, for example:Juri"/>
        
        {preInput('Address','Where is this product available')}
        <input type="text"
         value={address}
          onChange={ev=> setAddress(ev.target.value)} 
          placeholder="address"/>
        
        {preInput('Photos','more = better')}
        
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
        {preInput('Description','description of the plant')}
        <textarea value={description}
         onChange={ev=> setDescription(ev.target.value)}/>
        
        {preInput('Perks','Select all the perks you need')}
           <Perks selected={perks}
            onChange={ setPerks}/>
            {preInput('Extra Information','hints about this plant .For example:You should put this plant under sun light')}
             <textarea value={extraInfo}
              onChange={ev=> setExtraInfo(ev.target.value)}/>
        {preInput('Price','')}
        < input type="number" value={price} onChange={ev=> setPrice(ev.target.value)}/>
        {/* <h2 className="text-2xl mt-4">Quantity</h2>
        <p className="text-gray-500 text-sm" ></p>
        <div className="grid sm:grid-cols-3 ">
        <input type="number" placeholder="1" className="border rounded-xl text-center gap-2 mt-4 mb-4"/>
        </div> */}
        
            <button className="primary my-4">Save</button>
        
        </form>
        </div>
        );
        
}