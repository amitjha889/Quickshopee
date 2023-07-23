import { useEffect } from "react";
import useRazorpay from "react-razorpay";
import { serverURL } from "../../administrator/services/fatchnodeservices";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Makepayment() {
    const navigate=useNavigate()
    const Razorpay = useRazorpay();
    const dispatch=useDispatch()
    var userdata=useSelector((state)=>state.user) 
    console.log(userdata)
    var pro=useSelector((state)=>state.product) 
    var products=Object.values(pro)
    let total=products.reduce((a,b)=>{
      
        return a+b.offer*b.qty
    },0)

    const handlePayment=()=>{

    
   const options = {
     
      key: "rzp_test_gFYEFi7rWpNujG",
      amount: total*100,
      currency: "INR",
      name: "Quick Shopee",
      description: "Test Transaction",
      image: `https://${serverURL}/images/qc.png`,
     
      handler: (res) => {
        dispatch({type:'Clear_Product',payload:[]})
        navigate("/home")
      },
      prefill: {
        name: userdata.username,
        email: userdata.emailid,
        contact: userdata.mobileno ,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }

  useEffect(function(){
 
    const timeout=setTimeout(() => {
       
        handlePayment()
   
    }, 1000);

  },[])

  return (
    <div className="App">
     
    </div>
  );
}