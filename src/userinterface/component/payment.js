import { Divider} from "@mui/material"
import shadows from "@mui/material/styles/shadows"
import { useEffect ,useState} from "react"
import { useSelector } from "react-redux"




export default function Paymentshow(props){

    var cart=useSelector((state)=>state.product)
    var cartdata=Object.values(cart)

    const [handlingCharge,setHandlingCharge]=useState(5)
    const [deliverCharge,setDeliverCharge]=useState(0)


    var totaloffer=cartdata.reduce((of1,of2)=>{

        return of1+(of2.offer*of2.qty)

    },0)
    var totalammount=cartdata.reduce((of1,of2)=>{

        return of1+(of2.rate*of2.qty)

    },0)

    //////////////////////////////
   

    ////////////////////////////page refresh function 


     useEffect(function(){

       props.refresh()
     

     },[])
    ////////////////////////////

    const payto=()=>{

        if(totaloffer+totalammount==0)
        {
           setHandlingCharge(0)
        }
   
       }

       useEffect(function(){

        payto()
      
 
      })

   

   
   


return (

       
   

    <div style={{background:'#fff',width:'100%',height:'auto',borderRadius:'1%',display:'flex',flexDirection:'column',paddingTop:'1rem',paddingBottom:'1rem',justifyContent:'center',alignItems:'center',fontSize:'15px'}} >
             
        <div style={{display:'flex',flexDirection:'row',width:'85%',justifyContent:'space-between'}} >

            <div style={{fontFamily:'Montserrat',fontWeight:'bold'}} >
                Item Total 
            </div> 

            {totaloffer!=0?<div>
                    <s>&#8377; {totalammount}</s> &#8377; {totaloffer}
            </div>:<div>
                    &#8377; {totalammount}
            </div>}

        </div>


        <div style={{display:'flex',flexDirection:'row',width:'85%',justifyContent:'space-between',marginTop:'.5rem'}} >

            <div style={{fontFamily:'Montserrat',fontWeight:'bold',color:'#b2bec3',fontSize:'13px'}} >
           
               Handling Charge
           
            </div> 

            <div style={{display:'flex',flexDirection:'row',width:'auto',justifyContent:'space-evenly'}} >
                    <s>&#8377; 15</s> <div style={{color:'#2ecc71',marginLeft:'0.5rem'}} >&#8377; {handlingCharge}</div> 
            </div>

        </div>

        <div style={{display:'flex',flexDirection:'row',width:'85%',justifyContent:'space-between',marginTop:'.5rem'}} >

            <div  style={{fontFamily:'Montserrat',fontWeight:'bold',color:'#b2bec3',fontSize:'13px'}} >
            
              Delivery Fee
            
            </div> 

            <div style={{display:'flex',flexDirection:'row',width:'auto',justifyContent:'space-evenly'}} >
                    <s>&#8377; 35</s> <div style={{color:'#2ecc71',marginLeft:'0.5rem'}} >&#8377; {deliverCharge}</div>  
            </div>

        </div>

       


        <div style={{display:'flex',flexDirection:'row',width:'85%',justifyContent:'space-between'}} >
           
            

                <div style={{fontFamily:'Montserrat',fontWeight:'bold'}} >
                    To Pay 
                </div> 

               
               
               {totaloffer!=0?<div >
                        &#8377;{(totaloffer)+(handlingCharge)} 
                </div>:<div >
                        &#8377;{(totalammount)+(handlingCharge)} 
                </div>}

              

           
            
        </div> 
    
    
    
    </div>


  



   )


}