import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { postdata } from '../../administrator/services/fatchnodeservices';
import Addressdialog from './addressdialog';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Showotp(props){


    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [getOpen,setOpen]=useState(false)
    const [number,setNumber]=useState()
    const [enteredotp,setEnteredOtp]=useState()
    const [addOpen,setAddOpen]=useState(false)
   


    
    const setopen=()=>{

        setOpen(props.open)

    }

    useEffect(function(){

        setopen()

    },[props])


    const handleclose=()=>{

        setOpen(false)
        props.falseset()
       props.removenumber()

    }
    //////////////////////////////////set otp send number

    const setnumber=()=>{

        setNumber(props.number)
    }
  
    useEffect(function(){
        setnumber()
    },[props.number])

    ////////////////////////////////////view of otp box 

    /////////////////////////////////////auto focus element function 


    const handleotp=(event)=>{

        var otp=''
        

     if((document.getElementById('first').value).length==1)
     {  
        
        document.getElementById('second').focus()
        otp+=document.getElementById('first').value

     }

     if((document.getElementById('second').value).length==1)
     {  
        document.getElementById('third').focus()
        otp+=document.getElementById('second').value

     }
     if((document.getElementById('third').value).length==1)
     {  
        document.getElementById('fourth').focus()
        otp+=document.getElementById('third').value

     }
     if((document.getElementById('fourth').value).length==1)
     {  
        
        otp+=document.getElementById('fourth').value
        setEnteredOtp(otp)

     }


    }
   
    //////////////////////campare gerate otp and enter otp function 

    const  handlepage=async()=>{

        

     if(parseInt(props.otp)==parseInt(enteredotp))
     {
        props.falseset()

        var getUserInfo=await postdata('userinterface/fatchusernumber',{mobileno:number})
        
       
        if(getUserInfo.data.length>0)
        {
            var getAddressInfo=await postdata('userinterface/fatchuseraddress',{mobileno:number})
            props.getAdress(getAddressInfo.data)
            
           
            if(getAddressInfo.data.length>0)
            {   
                // alert('proseed to payment')
                dispatch({type:'Add_User',payload:[getAddressInfo.data[0]]})
                props.setbtnname('Go for payment ')
                setAddOpen(false)
            }

            else
            {
               setAddOpen(true)
            }
             
               
        }
        else
        {
            setAddOpen(true)
 
        }

       
     }
     else
     {

        alert('Invalid OTP Please Enter Correct OTP ')

     }

    

    }

    //////////////////////////////
    const closeadd=()=>{

        setAddOpen(false)

    }



    const showOTPformat=()=>{


      return(
        
        <div style={{display:'flex',flexDirection:'column',height:'auto'}}>
           
            <div  style={{height:'7vh',display:'flex',justifyContent:'center',alignItems:'center',background:'#f5f6fa'}} >

                <div  style={{fontWeight:'bold',fontSize:'1.5rem'}} >
                   
                    Phone Verification
                
                </div>

            </div>

            
            <div  style={{height:229,paddingBottom:'1rem',display:'flex',flexDirection:'column',alignItems:'center',background:'#ced6e0'}} >
                
                <div style={{marginTop:'1rem'}}>
                    Enter 4 digit code sent to your phone 
                </div>

                <div style={{width:'80%',display:'flex',justifyContent:'center',marginTop:'.5rem'}}>
                    +91-{number}
                </div>

                <div  style={{width:'100%',display:'flex',marginTop:'.8rem',justifyContent:'center'}}  > 
             
                   <input  id='first' onChange={(event)=>handleotp(event)} style={{width:'9%',padding:'10px',fontWeight:'bold',fontSize:'15px',background:'#ced6e0',margin:'2px',textAlign:'center',border:'1px solid #273c75'}}  type='text' maxLength={1} />
                   <input  id='second' onChange={(event)=>handleotp(event)} style={{width:'9%',padding:'10px',fontWeight:'bold',fontSize:'15px',background:'#ced6e0',margin:'2px',textAlign:'center',border:'1px solid #273c75'}}  type='text' maxLength={1} />
                   <input id='third' onChange={(event)=>handleotp(event)} style={{width:'9%',padding:'10px',fontWeight:'bold',fontSize:'15px',background:'#ced6e0',margin:'2px',textAlign:'center',border:'1px solid #273c75'}}  type='text' maxLength={1} />
                   <input id='fourth' onChange={(event)=>handleotp(event)} style={{width:'9%',padding:'10px',fontWeight:'bold',fontSize:'15px',background:'#ced6e0',margin:'2px',textAlign:'center',border:'1px solid #273c75'}}   type='text' maxLength={1} />


                </div>
                
                <div  style={{width:'20%',display:'flex',marginTop:'1rem',color:'#273c75'}} >  

                  <Button   onClick={handlepage} fullWidth variant='contained' >

                    Next

                  </Button>

                </div>

                
            </div>
       
       
       
       
        </div>



      )

  
    }





    /////////////////////////////////////////////////////end of otp view
    
    
    
    return(
      
      <div>
        <div>

           
            <Dialog  open={getOpen} onClose={handleclose}  >
                
                        <DialogContent style={{display:'flex',flexDirection:'column',alignSelf:'center',width:550,height:296,padding:0}} >
                            {showOTPformat()}
                        </DialogContent>
                    
            </Dialog>

        </div>
       
        <Addressdialog  addopen={addOpen}  addclose={closeadd}  />
          
        </div>



    )




}