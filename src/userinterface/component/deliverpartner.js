
import { useState } from "react"

export default function Deliverpartner (){

    const [value,setValue]=useState('')
    

    const tip=[10,20,30,40,50]

    const handleclick=(val)=>{

        setValue(val)

    }


    const setvalueoftip=()=>{

        return tip.map((val)=>{
           
           return(
             
             <div onClick={()=>handleclick(val)} style={{width:'13%',height:'2rem',border:'1px solid #2e86de',borderRadius:'40%',marginLeft:'1rem',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              
                <div >
                  <img src="/assets/coin.png"  style={{width:'1.2rem',height:'1.2rem'}} />
                </div>
              
                <div>
                  
                  &#8377; {val}

                </div>

            </div>
           
           )

        })


    }

return(

    <div style={{background:'#fff',width:'100%',height:'auto',borderRadius:'1%',display:'flex',flexDirection:'column',paddingTop:'1rem',paddingBottom:'1rem'}} >


      <div style={{marginLeft:'1rem',fontFamily:'Montserrat',fontSize:'17px',fontWeight:'bold'}} >
        Delivery Partner Tip
      </div>

      <div style={{marginLeft:'1rem',fontFamily:'Montserrat',fontSize:'12px',fontWeight:'bold',color:'#b2bec3',marginTop:'1rem'}} >
           The entire amount will be sent to your delivery partner
      </div>

      <div style={{fontFamily:'Montserrat',fontSize:'12px',fontWeight:'bold',marginTop:'1rem',display:'flex',flexDirection:'row'}} >
         
        {setvalueoftip()} 
      </div>
 
     




    </div>

)



}