import {Route,Routes} from "react-router-dom";
import './App.css'
import Layout from "./Layout";
import AccountPage from "./pages/AccountPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./UserContext";
const apiUrl = 'http://127.0.0.1:4000';
function App() {
  

  return (
    <UserContextProvider>
     <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<IndexPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/account/:subpage?" element={<AccountPage />}/>
      <Route path="/account/:subpage/:action" element={<AccountPage />}/>
      {/* <Route path="/account/history" element={<AccountPage />}/>
      <Route path="/account/VandE" element={<AccountPage />}/> */}
      </Route>
     
    </Routes>
    </UserContextProvider>
   
    
  )
}

export default App
