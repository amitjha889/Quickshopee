import Header from '../component/header';
import Showsidelist from '../component/sidelistbar';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import Divider from '@mui/material/Divider';
/////////////////////////////////////////
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
//////////////////////////////////////////////
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation ,useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
///////////////////////////////////////////////

import { postdata, serverURL } from '../../administrator/services/fatchnodeservices';
import Singleproduct from '../component/singleproduct';




export default function Categoryscreen(){

    
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.up('sm'));
    const mid = useMediaQuery(theme.breakpoints.down('md'));
    const large = useMediaQuery(theme.breakpoints.up('lg'));
    const smalld = useMediaQuery(theme.breakpoints.down('sm'));
    const [subcategory,setSubcategory]=useState([])
    const [subcategoryid,setSubCategoryId]=useState('')
    const [productlist,setProductList]=useState([])
    const [subcategoryname,setSubCategoryName]=useState([])
    const location =useLocation()
    const navigate=useNavigate()
    const categoryiid=location.state.categoryid
    
     
    
    

  const fatchsubcategory=async()=>{

   let result=await postdata('userinterface/fetchsubcategory',{categoryid:location.state.categoryid})
  
   setSubcategory(result.data)
   
  }

  useEffect(function(){
    fatchsubcategory()
},[])


  //////////////////////////////////////////////////////////////fatch subcategoryid from sidelistbar (fatch productlist by subcategoryid)

  const fatchproductbysubcategoryid=async(scid)=>{

  var result=await postdata('userinterface/fetchproductbysubcategoryid',{subcategoryid:scid})
      
      setProductList(result.data)

  }


////////////////////////////////////////////////////////////////////////////   

  const fatchsubcategoryidfromsidelistbar=(scid,name)=>{

    setSubCategoryId(scid)
   
    fatchproductbysubcategoryid(scid)

    setSubCategoryName(name)



  }


///////////////////////////////////////////////////

const showproductlist=()=>{

    return productlist.map((val)=>{

     return <Singleproduct  val={val} url={'/product'}    />

    })


}

 ////////////////////////////////////////////////////////////////fatch productlist by categoryid


 const fatchProductByCategoryId=async(cid)=>{

    var result=await postdata('userinterface/fetchproductbycategoryid',{categoryid:cid})
        
        setProductList(result.data)
  
    }

useEffect(function(){

fatchProductByCategoryId(categoryiid)


},[])




     
    return(

        <div>  

          <Header/>
          
            
            <div style={{display:'flex',flexDirection:'row',width:'100vw'}}>
  
                <div style={{width:'32%',marginLeft:'5%',marginTop:'1%',height:'auto'}}>
                
             
                    <Box sx={{ width:'100%', maxWidth: 360,bgcolor: 'background.paper' }}>
                        <nav aria-label="main mailbox folders">
                            
                            <List>
                            
                               <Showsidelist  subcat={subcategory}    subcategoryid={fatchsubcategoryidfromsidelistbar}   />
                            
                            </List>
                        
                
                        </nav>
                       
                           
                    
                        
                                        
                    </Box>
                   
                </div>
                
                <Divider orientation="vertical" flexItem />
                
                <div style={{display:'flex',flexDirection:'column',width:'100%'}} >
                    
                    <div style={{padding:17,fontFamily:'Montserrat',fontWeight:'bold',height:15,fontSize:'120%',marginBottom:'1%'}}  >
                      
                      
                      {productlist?<> {subcategoryname} </>:<></>} 
                      ( {productlist.length} )  
                       {' item'}
                     
                     </div>   

                      
                      
               
                

                    <div style={{marginLeft:26 }}>
                        
                        <Grid container spacing={1}>
                           
                          
                          {showproductlist()}
                       
                       
                        </Grid>
                
                    </div>  

                </div>
                    
            
            </div>
                

         

        </div>




    )


}