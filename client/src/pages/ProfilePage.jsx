import { useContext,useState } from "react";
import { UserContext } from "../UserContext";
import {Link, Navigate,useParams} from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";


export default function ProfilePage(){
    
    const [redirect, setRedirect] = useState(null);
    const {ready,user,setUser}=useContext(UserContext);

    let {subpage}= useParams();
    if (subpage === undefined) {
         subpage = 'profile';
        }
        async function Logout() {
            await fetch('http://127.0.0.1:4000/logout', {
              method: 'POST'
            });
            setRedirect('/');
            setUser(null);
        }
          

    if (!ready) {
        return 'Loading... ';
    }

        if(ready && !user && !redirect){
            return <Navigate to={'http://127.0.0.1:4000/login'}/>
        }

         
            if (redirect) {
                return <Navigate to={redirect} />
                }
    return(


        <div>
            <AccountNav/>
             {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email})<br />
            <button onClick={Logout} className="primary max-w-sm mt-2"> Logout</button>
            </div>
            )}

            {subpage === 'VandE' && (
                <PlacesPage />
            )}
        </div>
    );

}