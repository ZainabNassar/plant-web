import {Route,Routes} from "react-router-dom";
import './App.css'
import Layout from "./Layout";
import ProfilePage from "./pages/ProfilePage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import {UserContextProvider} from "./UserContext";
import PlacePage from "./pages/PlacePage";
import BookingPage from "./pages/BookingPage";
import BookingsPage from "./pages/BookingsPage";
import axios from "axios";
import Orders from "./pages/Orders";
import AddCart from "./pages/AddCart";


axios.defaults.baseURL='http://127.0.0.1:4000';
axios.defaults.withCredentials=true;
function App() {
  

  return (
    <UserContextProvider>
     <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<IndexPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/account" element={<ProfilePage />}/>
      <Route path="/account/VandE" element={<PlacesPage />}/>
      <Route path="/account/VandE/new" element={<PlacesFormPage />}/>
      <Route path="/account/VandE/:id" element={<PlacesFormPage />}/>
      <Route path="/account/bookings" element={<BookingsPage />}/>
      <Route path="/account/bookings/:id" element={<BookingPage />}/>
      <Route path="/VandE/:id" element={<PlacePage />}/>
      <Route path="/account/VOrders" element={<Orders/>}/>
      <Route path="/account/cart" element={<AddCart/>}/>
      {/* <Route path="/account/history" element={<AccountPage />}/>
      <Route path="/account/VandE" element={<AccountPage />}/> */}
      </Route>
     
    </Routes>
    </UserContextProvider>
   
    
  )
}

export default App
