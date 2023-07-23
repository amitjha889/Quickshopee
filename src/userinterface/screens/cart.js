import Divider from "@mui/material/Divider";
import Header from "../component/header";
import { Button } from "@mui/material";
import Reduxaddproduct from "../component/reduxproductlist";
import Deliverpartner from "../component/deliverpartner";
import Showrider from "../component/rider";
import Showoffercoupon from "../component/offercoupon";
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import Paymentshow from "../component/payment";
import Address from "../component/address";
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";


export default function Cart(){
    
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('sm'));
    const [addressbtnname,setAddressbtnname]=useState('Go')
    const [address,setAdress]=useState([])

   
    
    var cart=useSelector((state)=>state.product)
    var cartdata=Object.values(cart)
   //////////////////////////////refresh function 
    const [refresh,setRefresh]=useState(false)
/////////////////////////////////////////////

const refreshit=()=>{
    setRefresh(!refresh)

}
///////////////////////set address button name


const setbtnname=(name)=>{

    setAddressbtnname(name)

}
///////////////////////////set addressinfo address.js
const setaddforaddresh=()=>{

   return address.map((val)=>{
     
    return(
           <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
             
            <div>

                {val.gender} {val.username}
            
            </div>
             
            <div>
              {val.addressone}
            </div>

            <div>
              {val.addresstwo}
            </div>
            
            <div>
                {val.mobileno}
                
            </div>

           </div>

          )



    })


}




    

////////////////////main view of this page
    return (

       <div style={{width:'98.9vw',height:'100vh'}} >
          <Header />

          

            <div style={{width:'98.9vw',height:'100vh',background:'#dfe6e9',display:'flex',justifyContent:'center',paddingBottom:'5rem'}}>
                    
                <div style={{width:'90%',height:'auto',marginTop:'5rem',display:'flex',flexDirection:'column',background:'red'}}>

                    <div style={{width:'100%',height:'7vh',display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center',background:'pink'}} >

                        <div style={{fontFamily:'Montserrat',fontSize:'100%',fontWeight:'bold',marginLeft:'2%'}} >

                            Cart ( {cartdata.length} Items )

                        </div>

                        <div style={{marginRight:'2%'}}>
                            
                            <Button  variant="outlined">
                            Empty
                            </Button>
                            
                        </div>

                    </div>
                    
                    <div style={{display:'flex',width:'100%',height:'100%',flexDirection:'row'}}>
                        
                    
                        <div style={{display:'flex',flexDirection:'column',width:'50%',height:'auto',background:'black'}}>

                            
                            <div style={{background:'#fff'}} >
                                <Reduxaddproduct  refresh={refreshit}   />
                            </div>

                          

                            <div style={{marginTop:'0.8rem'}}>
                            
                                <Deliverpartner/>
                            
                            </div>
                        
                            <div style={{marginTop:'0.8rem'}}>

                             <Showrider/>
                        
                            </div>

                            
                        </div>

                        <div style={{display:'flex',flexDirection:'column',width:'50%',height:'auto',background:'blue'}}>
                           
                            <div >
                                
                                
                                <Showoffercoupon/>
                                
                                
                            </div>
                                
                            <div style={{marginTop:'0.8rem'}}>
                        
                                <Paymentshow  refresh={refreshit}  />
                    
                            </div> 

                            <div style={{marginTop:'0.8rem'}}>
                        
                                <Address  setAdress={setaddforaddresh}  getAdress={setAdress}  addressbtnname={addressbtnname}  setbtnname={setbtnname}  />
                
                            </div> 


                        
                        </div>

                    </div>  

                    
                </div>


        
            </div>
        
       
        </div>

      


    )




}