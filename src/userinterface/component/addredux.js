import { Button } from "@mui/material"
import { useState } from "react"

import { useEffect } from "react"

export default function Additem(props){

const [value,setValue]=useState()



useEffect(function(){

    setValue(props.qty)
    
    
    
    
},[props])




const handleClickPlus=()=>{


    setValue((prev)=>{
         
        if(prev<5)
        {
            props.valueshow(prev+1)
            return prev+1
           

        }
        else
        {   props.valueshow(prev)
            return prev
        }
        
        })           

}


const handleClickMinus=()=>{


    setValue((prev)=>{
        
        props.valueshow(prev-1)
        return prev-1
    
    })           

}

return (

  <div>
   
   {value==0? <div  onClick={handleClickPlus}  style={{marginTop:'1.5rem'}}>
      <Button variant="outlined" style={{width:'3rem',height:'2rem'}} >Add</Button>
   </div>:<div style={{marginTop:'1.5rem',width:75,display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid #192a56',flexDirection:'row'}} >
    

    <div onClick={handleClickMinus} style={{cursor:'pointer',width:25,height:25,display:'flex',justifyContent:'center',alignItems:'center',background:'#2980b9',color:'#fff'}} >  - </div>   
    <div  style={{fontSize:15,fontWeight:'bold'}}  >  {value}  </div> 
    <div onClick={handleClickPlus} style={{cursor:'pointer',width:25,height:25,display:'flex',justifyContent:'center',alignItems:'center',background:'#2980b9',color:'#fff'}} >  +  </div>


    </div>}
   
   
   
   </div>
)



}