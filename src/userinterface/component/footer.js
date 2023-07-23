import { Grid } from "@mui/material"
import { getdata,serverURL } from "../../administrator/services/fatchnodeservices"
import Divider from '@mui/material/Divider';
import { useEffect,useState} from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';





export default function Footer(props){

const [categoryFooter,setCategoryFooter]=useState([])

const theme = useTheme();
const large = useMediaQuery(theme.breakpoints.down('xl'));
const mid = useMediaQuery(theme.breakpoints.down('lg'));
const small = useMediaQuery(theme.breakpoints.down('md'));
const xs = useMediaQuery(theme.breakpoints.down('sm'));

const fatchCategoryForFooter=async()=>{

var result=await getdata('userinterface/fetchfootercategory')
setCategoryFooter(result.data)



}

useEffect(function(){

    fatchCategoryForFooter()

},[])


const showcategoryonfooter=()=>{

  return categoryFooter.map((val)=>{
     
  return(
        
         

                <Grid itme xs={3}  style={{fontFamily:'Montserrat',fontWeight:'bold',fontSize:xs?10:small?11:mid?12:15}} >

                  <p>{val.categoryname}</p>

                </Grid>
            


            

       
        )
   


  })


}

return(
<div>

    <Divider />
        
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}} >



        <div  style={{fontFamily:'Montserrat',fontWeight:'bold',fontSize:'20px',marginTop:20}}  >

           {props.footertitle}
       
        </div>


        <div  style={{display:'flex',flexDirection:'row',marginTop:30,marginLeft:'5%'}} >
           
            <Grid  container spacing={2}>
                
              {showcategoryonfooter()} 

            </Grid>
       
        </div>

    </div>

    <Divider />
    

    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}} >

     <Grid container spacing={2} style={{marginTop:'2px'}}>


     <Grid  item xs={3}  >
        
        
        
          <div>
          
            <img src={`/assets/qc.png`} style={{width:xs?100:small?130:mid?170:200}} />
         
          </div>
         
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
         
            <div style={{marginLeft:xs?25:small?40:mid?55:65}} >
              <InstagramIcon color="disabled" style={{width:xs?15:small?18:mid?20:25}} />
            </div>
           
            <div >
              <FacebookIcon color="disabled" style={{marginLeft:xs?3:small?6:mid?8:10,width:xs?15:small?18:mid?20:25}} />
            </div>

           
          </div>  

          <div  style={{display:'flex',alignItems:'center'}} >
            <div style={{marginLeft:small?23:0}}>
              <CopyrightIcon color="disabled"  style={{width:xs?15:small?18:mid?20:25}}  />
            </div>
           <span style={{marginLeft:5,fontWeight:'bold',fontFamily:'Montserrat',color:"#b2bec3",fontSize:xs?8:small?10:mid?10.5:13}}>
            { small?`QC Pvt. Ltd.`:`Quickshopee Private Limited`}
           </span>

          </div>


      </Grid>


      
      
      <Grid item xs={3} >
       
        <div   style={{paddingLeft:'3%',fontFamily:'Montserrat',fontSize:xs?10:small?13:mid?15:18}}>
        
              
          <div style={{marginTop:'3%'}} >Home</div> 
          <div style={{marginTop:'3%'}} >Delivery Areas</div> 
          <div style={{marginTop:'3%'}} >Careers</div>  
          <div style={{marginTop:'3%'}} >Customer Support</div>  
          <div style={{marginTop:'3%'}} >Press</div>           

        

        </div>

      </Grid>



      <Grid item xs={3} >
       
        <div   style={{paddingLeft:'3%',fontFamily:'Montserrat',fontSize:xs?10:small?13:mid?15:18}}>
        
          
          <div  style={{marginTop:'3%'}} >Privacy Policy</div> 
          <div style={{marginTop:'3%'}} >Terms of Use</div> 
          <div style={{marginTop:'3%'}} >Responsible Disclosure Policy</div>  
                    

        </div>

      </Grid>

      
      

      <Grid item xs={3} >
       
        <div style={{paddingLeft:'3%',fontFamily:'Montserrat'}}>

          <div style={{fontFamily:'Montserrat',fontSize:xs?8:small?10:mid?13:16,fontWeight:'bold'}} >
            Download App
          </div>

          <div style={{marginTop:xs?15:small?20:mid?25:30}}>
             <Paper elevation={2} variant="outlined" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'4%',flexDirection:small?"column":"row"}} >
              <img src={`${serverURL}/images/playstore.png`}  style={{width:20}}/>
              <span style={{paddingLeft:xs?10:20,fontWeight:'bold',fontFamily:'Montserrat',fontSize:xs?8:small?9:mid?11:13}} >Get it on play store</span>
             </Paper>
            
          </div>

          <div style={{marginTop:20}}>
             <Paper elevation={2} variant="outlined" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'4%',flexDirection:small?"column":"row"}} >
              <img src={`${serverURL}/images/apple.png`} style={{width:20}} />
              <span style={{paddingLeft:xs?10:20,fontWeight:'bold',fontFamily:'Montserrat',fontSize:xs?8:small?9:mid?11:13}} >Get it on app store</span>
             </Paper>
          </div>
        
          

        </div>

      </Grid>






     </Grid>



    </div>





</div>
)





}