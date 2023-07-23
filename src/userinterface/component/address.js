import { Button } from "@mui/material"
import Showaddressdialog from "./phonedialog"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Address(props){

    const navigate=useNavigate()
    const [getOpen,setOpne]=useState(false)
    

    const handlesetopen=()=>{
        if(props.addressbtnname=='Go')
        {
            setOpne(true)
        }
        else{
            navigate('/makepayment')
        }
       
    }

    const handlesetclose=()=>{

       
        setOpne(false)
       
    }
   
   
   


return(



    <div   style={{background:'#fff',width:'100%',height:'7rem',borderRadius:'1%',display:'flex',flexDirection:'column',paddingTop:'1rem',paddingBottom:'1rem',alignItems:'center',fontSize:'15px'}} >
             
        <div style={{display:'flex',flexDirection:'row',height:'4rem',width:'75%',alignItems:'center',justifyContent:'space-between'}}>

            <div>

                <img src="/assets/add.png"/>
            
            </div>

            <div style={{fontSize:'18px',fontFamily:'Montserrat',fontWeight:'bold',wordSpacing:1}}>
            
        
                { props.setAdress() }
         
            </div>

        </div>

        <div style={{width:'80%',marginTop:'1rem',wordSpacing:1,display:'flex',justifyContent:'center'}}>
            <Button onClick={handlesetopen}   variant="contained">
               {props.addressbtnname}
            </Button>
        </div>
        
       
        <Showaddressdialog    getAdress={props.getAdress}  setbtnname={props.setbtnname}  open={getOpen}  handlesetclose={handlesetclose}   />

        
         
    
    </div>

)


}