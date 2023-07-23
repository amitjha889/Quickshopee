import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { useStyles } from "./bannercss";
import { Grid,Button} from "@mui/material";
import { postdata } from "../services/fatchnodeservices";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';






export default function Banner(){
const clasess=useStyles()
const [banner,setBanner]=useState('')
const [status,setStatus]=useState('')

const handlestatus=(event)=>{

    setStatus(event.target.value)

}

const submitkaro=async()=>{
  
    
    var formdata=new FormData()
    
    formdata.append('status',status)
   
     banner.map((val,index)=>{
  
         formdata.append('picture'+index,val)
  
     })

     var result=await postdata ('banners/banner_images_post',formdata)
     alert(result.massage)
   

}




return(

 <div className={clasess.container} >

   <div className={clasess.box} >
      
   <Grid container spacing={2}>
     
      <Grid item xs={12}>
        <div className={clasess.hedingstyle}>
            Banner's images
        </div>
      </Grid>

      <Grid item xs={12}>
          
        <DropzoneArea
           
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            filesLimit={6}
            onChange={(files) => setBanner(files) }
          
        />
       
      </Grid>
   
      
      <Grid item xs={12}>

        <FormControl>
        
        <FormLabel style={{fontFamily:'Montserrat, sans-serif',fontWeight:'bold'}} id="demo-row-radio-buttons-group-label">Status</FormLabel>
        
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel value="Show" control={<Radio onChange={handlestatus} />} label="Show" />
                <FormControlLabel value="Hide" control={<Radio />} label="Hide" />
            </RadioGroup>
        
        
        </FormControl>
            
      </Grid>

      <Grid item xs={6}>

        <Button  onClick={submitkaro}  variant="contained"  fullWidth >Submite</Button>  
      
      </Grid>

      <Grid item xs={6}>
          
        <Button variant="contained" fullWidth >Reset</Button>  
      
      </Grid>
   

     
       
      </Grid>
   </div>

 </div>


)





}