
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Showotp from './otpdialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useEffect, useState } from 'react';

export default function Showphone(props){

const [gettOpen,setOpne]=useState(false)
const [getOtpOpen,setOtpOpen]=useState(false)
const [number,setNumber]=useState()
const [error,setError]=useState({})
const [getotp,setOtp]=useState('')



useEffect(function(){

    setOpne(props.open)
},[props])  


const handleClose=()=>{
  
  setOpne(false)
  props.handlesetclose()

}
////////////////////////////////////////////////otp genrater

const Otpgenrater=()=>{

const otp=parseInt(Math.random()*8999)+1000
setOtp(otp)
alert(otp)



}


/////////////////////////////////////////////////////////for otp function 

const Submite=()=>{

  if(validation())
  {
    setOtpOpen(true)
    props.handlesetclose()
    Otpgenrater()

  }

 
  
}

const handleotpclose=()=>{

  setOtpOpen(false)

}




//////////////////////////////////////////////////////////media query 
const theme = useTheme();
const xsmall = useMediaQuery(theme.breakpoints.down('xs'));
const small = useMediaQuery(theme.breakpoints.down('sm'));
const midium= useMediaQuery(theme.breakpoints.down('md'));
const large= useMediaQuery(theme.breakpoints.down('lg'));

////////////////////////////////handle number && set checks 

const handlenumber=(value)=>{
  if(isNaN(value))
  {


  }
  else{
    
    if(value.length==10)
    {
   
      setNumber(value)
    
     }


  }

}

const removenumber=()=>{


  setNumber()
}

//////////////////////handle error

const handleError=(input,value)=>{

  setError((prev)=>({...prev,[input]:value}))


}

//////////////////////////validation check



const validation=()=>{

  var isvalid=true  
  
  if(!number)
  {
    
    handleError('number','Please Enter 10 digit number')
    isvalid=false

  }


 return isvalid;


}





const MakeFormatForPhoneNumber=()=>{


  return (

    <div style={{height:'auto',display:'flex',flexDirection:'column'}}>
      
      <div style={{height:'4rem',background:'#f5f6fa',display:'flex',justifyContent:'center',alignItems:'center'}} >

        <div style={{color:'#747d8c',fontSize:small?'0.6rem':midium?'0.8rem':large?'1rem':'1.2rem',fontWeight:'bold'}}>
            Phone Number Verification
        </div>
      </div>
    
      <div style={{width:'100%',height:'32vh',background:'#ced6e0',color:'#7f8c8d',fontSize:small?'0.6rem':midium?'0.8rem':large?'1rem':'1.2rem',display:'flex',flexDirection:'column',alignItems:'center'}} >

        <div style={{marginTop:'1.2rem'}} >
          Enter your phone number to Login/Sign up 
          {/* {large} */}
        </div>

        <div  style={{marginTop:'1.8rem',width:'80%',height:'6vh',display:'flex',alignItems:'center'}}>
          <Input   error={error.number?true:false}  onFocus={()=>handleError('number',null)}  onChange={(event)=>handlenumber(event.target.value)}  fullWidth style={{border:'none'}}
          
            startAdornment={
            
            <InputAdornment position="start">
              <PhoneIphoneIcon/> +91
            </InputAdornment>
          
            }
        
          />
      
        </div>
        <div style={{fontSize:15,color:'#c23616'}}>
          {error.number}
        </div>
        
        <div style={{width:'80%',marginTop:'1rem'}} >

          <Button fullWidth variant='contained'  onClick={Submite}>
            Next
          </Button>
              
        </div>

        <div style={{width:'80%',marginTop:'0.5rem'}} >

          <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
            By continuing, you agree to our 
          </div>
              
        </div>

        
      
      </div>


    </div>
      


  )



}

/////////////////////////////////////////////////////////////////////////////



return (

    <div >

      <div>
        <Dialog  open={gettOpen} onClose={handleClose}  >
         
              <DialogContent style={{display:'flex',flexDirection:'column',alignSelf:'center',width:small?400:midium?450:large?500:550,height:330,padding:0}}>
                 {MakeFormatForPhoneNumber()}
              </DialogContent>
          
        </Dialog>
     </div>

     <Showotp   getAdress={props.getAdress}   setbtnname={props.setbtnname}  otp={getotp} removenumber={removenumber} number={number} open={getOtpOpen}  falseset={handleotpclose}  />
  </div>







)


}