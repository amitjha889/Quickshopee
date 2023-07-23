import {Routes,BrowserRouter as Router,Route} from "react-router-dom"
import Adminlogin from "./administrator/adminlogin/adminlogin";
import Dashboard from "./administrator/adminlogin/dashboard";
import Home from "./userinterface/screens/home";
import Categoryscreen from "./userinterface/screens/category";
import Productscreen from "./userinterface/screens/productscreen";
import Cart from "./userinterface/screens/cart";
import Makepayment from "./userinterface/screens/makepayment";
export default  function App() {
  return (
      <div>
        <Router>
         
          <Routes>
           
            <Route element={<Adminlogin/>} path="/admininterface"/>
            <Route element={<Dashboard/>} path="/dashboard/*"/>
            <Route element={<Home />} path="/home"/>
            <Route element={<Categoryscreen />} path="/categorypage"/>
            <Route element={<Productscreen />} path="/product"/>
            <Route element={<Cart />} path="/cart"/>
            <Route element={<Makepayment />} path="/makepayment"/>
        
          </Routes> 
       
        </Router>
      </div>
  );
}


