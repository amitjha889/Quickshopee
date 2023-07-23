import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Divider } from '@mui/material';
import { useState,useEffect} from 'react';
import { getdata } from '../../administrator/services/fatchnodeservices';
import Avatar from '@mui/material/Avatar';
import { serverURL } from "../../administrator/services/fatchnodeservices";
import Paper from '@mui/material/Paper';





export default function Showsidelist({subcat,subcategoryid}){


    const handleclick=(scid)=>{

        subcategoryid(scid.subcategoryid,scid.subcategoryname)
           
     }


   

    const Showpicturefunction=()=>{

        

        return subcat.map((val)=>{

            return(
      

                
               
                <ListItem disablePadding>
                    <ListItemButton  onClick={()=>handleclick(val)}    >
                        <ListItemIcon >
                        
                            <div     style={{display:'flex',justifyContent:'center',alignItems:'center',width:60,height:60,borderRadius:30,background:'#ecf0f1'}}>
                                <Avatar
                                alt="Remy Sharp"
                                src={`${serverURL}/images/${val.icon}`}
                                sx={{ width: 40, height: 40 }}
                            
                                />
                            </div> 
                        </ListItemIcon>

                       
                        <ListItemText primary={val.subcategoryname}  style={{fontFamily:'Montserrat, sans-serif',color:'#000',fontWeight:'bold',marginLeft:'8%',color:'#6F1E51'}} />
                      
                    </ListItemButton>
                </ListItem>
                
                   


            ) 

            
        })

      
    }


    
var picture=''
     
subcat.map((val)=>{

     picture=val.icon

    })

       
      
     


return(
      
   
    
        <Box sx={{ width: '100%', maxWidth: 360,bgcolor: 'background.paper' }}>


            <Paper  elevation={3}  style={{width:'15rem',height:'7rem',marginLeft:'3.5rem',marginBottom:'1rem'}}>

                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'15rem',height:'8rem',borderRadius:30,flexDirection:'column'}}>
                    <Avatar
                        
                        alt="Remy Sharp"
                        src={`${serverURL}/images/${picture}`}
                        sx={{ width: 40, height: 40 }}
                   
                    />

                    <div>
                        <h4>
                            Top Product
                        </h4>
                    </div>

                </div> 


            </Paper>
           
           
            <nav aria-label="main mailbox folders">
                
                <List>

                  {Showpicturefunction()}
                
                </List>
              
    
            </nav>
           
            
                            
        </Box>
       
      
 


   



    )



}