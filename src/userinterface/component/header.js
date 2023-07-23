import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { useEffect } from 'react';

export default function Header({refresh}){

  const theme = useTheme();
  const navigate=useNavigate()
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  var productt=useSelector((state)=>state.product)
  var totalproduct=Object.keys(productt)







  const handlehomepage=()=>{
  
    navigate('/home')


  }


return(
    
    <div>
       
        <AppBar  position="static" style={{backgroundColor:'#fff'}}>

            <Toolbar>

               
                <div style={{display:"flex",width:'99%',alignItems:'center'}}>

                    <div  onClick={()=>handlehomepage()}  style={{fontFamily:'Montserrat',color:'#000',fontWeight:'bold',fontSize:24}}  >
                      {matches?`Quckshopee`:`QS`}
                        
                    </div>  
                    
                    
                    <div style={{width:'80%',display:'flex',justifyContent:'center',paddingLeft:3,paddingRight:3}}>
                    <FormControl sx={{ m: 1, width:matches?'60%':'75%' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                    </div>
                        




                    <div style={{color:'#2980b9',marginLeft:'auto'}}>
                    
                        <div  style={{display:'flex',justifyContent:'space-between'}}>
                         
                         <div onClick={()=>navigate('/cart')} >
                            <Badge badgeContent={totalproduct.length} color="success">
                                <ShoppingCartIcon  />
                            </Badge>
                        </div>

                            <PersonIcon  style={{padding:'3%'}}/>
    
                        </div>
                    </div>  

                
                </div>
               


            </Toolbar>



        </AppBar>

    </div>



)


}