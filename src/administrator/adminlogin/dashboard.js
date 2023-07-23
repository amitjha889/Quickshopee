import { useState } from "react"
import { useStyles } from "./dashboradcss"
import { AppBar,Toolbar,Grid,Paper,Avatar} from "@mui/material"
import { serverURL } from "../services/fatchnodeservices"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { Routes,Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CategoryInterface from "../displayallcategory/categoryInterface";
import Displayallcategory from "../displayallcategory/displayallcategory";
import Subcategory from "../displayallsubcategory/subcategory";
import Displayallsubcategory from "../displayallsubcategory/displayallsubcategory";
import Product from "../displayproduct/product";
import Displayproduct from "../displayproduct/displayproduct";
import Productlist from "../productlist/productlist";
import Displayproductlist from "../productlist/diplayproductlist";
import Banner from "../banners/banner";
import Productpicture from "../productpicture/productpicture";



export default function Dashboard(){

    var navigate=useNavigate()
    const clasess= useStyles()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))


return(

<div>
    <AppBar  >

        <Toolbar className={clasess.appbar} >
        
        <div className={clasess.font}  >      
            quckshopee
        </div>

        </Toolbar>
        
    </AppBar>

    <div  className={clasess.divalin}  >
    
        <Grid container spacing={2}>

        <Grid item xs={2}>
        
        

                <Paper  className={clasess.flex} >

                    <Paper style={{backgroundColor:'#bdc3c7'}} elevation={3} className={clasess.fontpaper} >
                    
                        <div style={{display:'flex',justifyContent:"center",paddingBottom:"5%"}}>
                        <Avatar src={`${serverURL}/images/${admin.picture}`} />
                        </div>
                        <div style={{display:'flex', justifyContent:'center',alignSelf:'center',paddingBottom:"5%"}} >{admin.adminname}</div>
                        <div style={{display:'flex', justifyContent:'center',alignSelf:'center',fontSize:'10px'}}  >{admin.emailid}</div>
                        

                    </Paper>

                
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton  onClick={()=>navigate('/dashboard/displaycategory')}  >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={clasess.fontpaper} >Category</span>} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/dashboard/displaysubcategory')} >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={clasess.fontpaper} >Subcategory</span>} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton  onClick={()=>navigate('/dashboard/displayproduct')}   >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={clasess.fontpaper} >Product</span>} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton  onClick={()=>navigate('/dashboard/displayproductlist')}  >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={clasess.fontpaper} >Productlist</span>} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton  onClick={()=>navigate('/dashboard/Productpicture')}    >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={clasess.fontpaper} >Productpicture</span>} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                      
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton  onClick={()=>navigate('/dashboard/banner')}    >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={clasess.fontpaper} >Banner</span>} />
                                </ListItemButton>
                            </ListItem>
                        </List>

                        <Divider/>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton  onClick={()=>navigate('/admininterface')}   >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={clasess.fontpaper} >Logout </span>} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    

                        
                </Paper>
            
        
        
        </Grid>

        <Grid item xs={10}>
        <Routes>
           
           <Route element={< CategoryInterface/>} path="/categoryinterface"/>
           <Route element={< Displayallcategory/>} path="/displaycategory"/>
           <Route element={< Subcategory/>} path="/subcategoryinterface"/>
           <Route element={< Displayallsubcategory/>} path="/displaysubcategory"/>
           <Route element={< Product/>} path="/productinterface"/>
           <Route element={< Displayproduct />} path="/displayproduct"/>
           <Route element={< Productlist />} path="/productlist"/>
           <Route element={<Displayproductlist/>} path="/displayproductlist"/>
           <Route element={<Banner/>} path="/banner"/>
           <Route element={<Productpicture/>} path="/Productpicture"/>
       
        </Routes>
        </Grid>



    </Grid>
    </div>



</div>

)



}
