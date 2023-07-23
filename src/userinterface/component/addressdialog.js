import Dialog from '@mui/material/Dialog';
import { Button, DialogContent } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { postdata, serverURL } from '../../administrator/services/fatchnodeservices';
import { Grade } from '@mui/icons-material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Addressdialog(props){

const [open,setOpen]=useState(false)
const [gender,setGender]=useState('') 
const [email,setEmail]=useState('')
const [username,setUserName]=useState('')
const [state,setState]=useState('')
const [city,setCity]=useState('')
const [number,setNumber]=useState('')
const [addone,setAddOne]=useState('')
const [addtwo,setAddTwo]=useState('')
const [status,setStatus]=useState('')
const [zipcode,setZipCode]=useState()






///////////////////// set form values on status 

const handlegender=(event)=>{


    setGender(event.target.value)

}

const handleemail=(event)=>{

    setEmail(event.target.value)

}

const handleusername=(event)=>{

    setUserName(event.target.value)


}

const handlestate=(event)=>{

    setState(event.target.value)


}

const handlecity=(event)=>{

    setCity(event.target.value)


}

const handlenumber=(event)=>{

    setNumber(event.target.value)


}

const handleaddone=(event)=>{

    setAddOne(event.target.value)


}

const handleaddtwo=(event)=>{

    setAddTwo(event.target.value)


}

const handlezip=(event)=>{

    setZipCode(event.target.value)


}

const handlestatus=(event)=>{

    setStatus(event.target.value)


}



//////////////////////////////////submite function 

const handlesubmite=async()=>{
  

var body={treet:gender,email:email,name:username,state:state,city:city,number:number,addone:addone,addtwo:addtwo,zip:zipcode,status:status}

var result=await postdata('userinterface/insertdatafororder',body)
alert(result.massage)
props.addclose()

}

////////////////////////media query tools

const theme = useTheme();

const small = useMediaQuery(theme.breakpoints.down('sm'));
const midium= useMediaQuery(theme.breakpoints.down('md'));
const large= useMediaQuery(theme.breakpoints.down('lg'));

///////////////open dialog by button props

const setopen=()=>{
    
    setOpen(props.addopen)
}

useEffect(function(){
    
    setopen()

},[props])

const handleclose=()=>{
    
    props.addclose()

}



const Showaddview=()=>{


return (

<Grid container spacing={1}>

    {/* start map grid on left */}
    <Grid item xs={6}>


      <img src={`${serverURL}/images/map.png`} style={{width:'100%',height:'102%'}}/>
      


    </Grid>
    {/* end map grid on left */}




    {/* start form grid on right */}

    <Grid  item xs={6}>

            
        <Grid container spacing={1} >
       
            <Grid item xs={11} style={{ display:'flex',flexDirection:'row',fontWeight:'bold',fontSize:19,justifyContent:'space-between',margin:'10px 0px 0px 0px'}} >
                Enter complete address  
            </Grid>
            <Grid  onClick={handleclose}  item xs={1} style={{margin:'10px 0px 0px 0px'}} >
             <CancelIcon />
            </Grid>
           
           
         
            <Grid style={{fontWeight:'bold',fontSize:13,fontFamily:'Montserrat',color:'#576574'}} item xs={12}>
              This allow us to find you easily and give you timely delivery experience
            </Grid>

            <Grid  item xs={3}>
            
               <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Status"
                    onChange={handlegender}
                >
                
                <MenuItem value={"Mr."}>Mr.</MenuItem>
                <MenuItem value={"Miss."}>Miss.</MenuItem>
                <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                </Select>

            </Grid>
          
            <Grid style={{marginTop:22}}  item xs={8.5}>

                <TextField
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Email"
                    placeholder='Enter email..'
                    onChange={handleemail}
                />
                
            </Grid>

            <Grid style={{marginTop:10}}  item xs={6}>

                <TextField
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Name"
                    placeholder='receiver name..'
                    onChange={handleusername}
                />
                
            </Grid>
          
            <Grid style={{marginTop:10}}  item xs={5.5}>

                <TextField
                    fullWidth
                    id="outlined-error-helper-text"
                    label="State"
                    placeholder='Enter state'
                    onChange={handlestate}
                />
                
            </Grid>

            
            <Grid style={{marginTop:10}}  item xs={6}>

                <TextField
                    fullWidth
                    id="outlined-error-helper-text"
                    label="City"
                    placeholder='Enter city'
                    onChange={handlecity}
                />
                
            </Grid>
          
            <Grid style={{marginTop:10}}  item xs={5.5}>

                <TextField
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Phone"
                    placeholder='Enter Number'
                    onChange={handlenumber}
                />
                
            </Grid>
      
            <Grid style={{marginTop:10}}  item xs={11.5}>

                <TextField
                    fullWidth
                    id="outlined-error-helper-text"
                    label="First address"
                    placeholder='Enter address first'
                    onChange={handleaddone}
                />

            </Grid>
            <Grid style={{marginTop:10}}  item xs={11.5}>

                <TextField
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Second address"
                    placeholder='Enter address second'
                    onChange={handleaddtwo}
                />

            </Grid>
           
            

            
            <Grid style={{marginTop:10}}  item xs={8}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">save address as </FormLabel>

                    <RadioGroup  row  aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
                        <FormControlLabel value="Home" control={<Radio  onChange={handlestatus} />} label="Home" />
                        <FormControlLabel value="Work" control={<Radio />} label="Work" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        
                    </RadioGroup>
               
                </FormControl>
              
            </Grid>

            <Grid style={{marginTop:10,paddingRight:'5%'}}  item xs={4}>

                <TextField
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Zipcode"
                    placeholder='Enter Zipcode'
                    onChange={handlezip}
                />

            </Grid>

            <Grid style={{marginTop:10}}  item xs={11.5}>

              <Button onClick={handlesubmite}  fullWidth variant='contained'  >
               Submite
              </Button>
           
            </Grid>





        </Grid>
    
    </Grid>
    {/* end form grid on right */}

</Grid>





)


}

///////////////

return (
   
     
    <Dialog  maxWidth={'lg'}  open={open} onClose={handleclose}  >
         
        <DialogContent style={{display:'flex',flexDirection:'column',alignSelf:'center',width:small?450:midium?500:large?550:840,height:620,padding:0}}>
           {Showaddview()}
        </DialogContent>

    </Dialog>




    )




}