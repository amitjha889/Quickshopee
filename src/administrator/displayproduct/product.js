import {useStyles} from "./productcss"
import { TextField,IconButton,Grid,Avatar,Button,MenuItem,FormControl,Select,InputLabel } from "@mui/material"
import { useEffect, useState } from "react"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import { getdata, postdata } from "../services/fatchnodeservices";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";

export default function Product(){
const navigate =useNavigate()
const classes=useStyles()
const [status,setStatus]=useState('')
const [icon,setIcon]=useState({file:"/assets/cart.png",bytes:""})
const [product,setProduct]=useState('')
const [categoryid,setCategoryid]=useState('')
const [subcategoryid,setSubcategoryid]=useState('')
const [error,setError]=useState({})
const [categorylist,setCategoryList]=useState([])
const [subcategorylistt,setSubCategoryList]=useState([])

  // fatch categorylist form product interface 

  const fatchcategory=async()=>{

    var result=await getdata('subcategory/subcategorylist')
    setCategoryList(result.data)

  }

  const fillcategorydrop=()=>{

    return categorylist.map((val)=>{
    return <MenuItem value={val.categoryid}>{val.categoryname}</MenuItem>
    })


  }

  useEffect(function(){

    fatchcategory()

  },[])

  ///////////////////////////

  // fatch Subcategorylist form product interface 

  const fatchsubcategory=async(cid)=>{

    var result=await postdata('subcategory/subcategorylistget',{categoryid:cid})
    setSubCategoryList(result.data)

  }

  const filldatasubcategorylistdropdown=(event)=>{

    fatchsubcategory(event.target.value)
    setCategoryid(event.target.value)


  }

  const fillsubcategorydrop=()=>{

    return subcategorylistt.map((val)=>{
    return <MenuItem value={val.subcategoryid} >{val.subcategoryname}</MenuItem>
    })


  }

 
  ///////////////////////////







// handleproduct 
function handleproduct(event){

setProduct(event.target.value)

}
// handleproduct 
// function handlecategoryid(event){

//     setCategoryid(event.target.value)
    
// }
// handleproduct 
function handlesubcategoryid(event){

    setSubcategoryid(event.target.value)
    
}

//handlestatus
function handlestatus(event){

  setStatus(event.target.value)  
}

//handleicon

function handleicon (event){

    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})  
  }

  // handleerror

const handleerror=(input,value)=>{

  setError((prev)=>({...prev,[input]:value}))

  }

  // validation

    const validation=()=>{

        var isvalid=true;
        
        if(!product)
        {
            handleerror('product','Please Enter Product Name..')
            isvalid=false;

        } 
        if(!categoryid)
        {
            handleerror('category','Please Enter Category ID..')
            isvalid=false;

        } 
        if(!subcategoryid)
        {
            handleerror('subcategory','Please Enter subcategory ID..')
            isvalid=false;

        } 
        if(!status)
        {
            handleerror('status','Please Select Status  Name..')
            isvalid=false;

        } 
        if(!icon.bytes)
        {
            handleerror('icon','Please Select Icon..')
            isvalid=false;

        } 


     return isvalid;


    }     

    // click chekc validation 

const click = async()=>{
   
        if(validation()){
            var formdata= new FormData();
            formdata.append("product",product)
            formdata.append("categoryid",categoryid)
            formdata.append("subcategoryid",subcategoryid)
            formdata.append("status",status)
            formdata.append("icon",icon.bytes)
            var result=await postdata('product/productfatch',formdata)
            alert(result.massage)
          }
        else{

        }
   

    }



return(

<div className={classes.container} >
  
  <div className={classes.box}>
  <Grid container spacing={2}>
 
        <Grid item xs={12} style={{fontWeight:'bold',display:"flex",flexDirection:"row",justifyContent:'space-between'}} >
          
          <div >
                Product Interface
          </div>
          <div> 
            <ViewListIcon  onClick={ ()=>navigate('/dashboard/displayproduct') } />
          </div>
        
        </Grid>


          <Grid item xs={12}>
            <TextField
              onChange={handleproduct}
              onFocus={()=>handleerror('product',null)}
              error={error.product?true:false}
              helperText={error.product}
              variant="outlined"
              label="product"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryid}
                label="Categoryid"
                onChange={filldatasubcategorylistdropdown}
                onFocus={()=>handleerror('category',null)}
                error={error.category?true:false}
               
              >
                <MenuItem >Select Category</MenuItem>
                {fillcategorydrop()}
              </Select>
              {error.category}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subcategoryid}
                label="Subcategoryid"
                onChange={handlesubcategoryid}
                onFocus={()=>handleerror('subcategory',null)}
                error={error.subcategory?true:false}
               
              >
                <MenuItem >Select </MenuItem>
                {fillsubcategorydrop()}
              </Select>
              {error.subcategory}
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handlestatus}
                onFocus={()=>handleerror('status',null)}
                error={error.status?true:false}
              >
                <MenuItem value="Discontinue">Discontinue</MenuItem>
                <MenuItem value="Continue">Continue</MenuItem>
                <MenuItem value="Popular">Popular</MenuItem>
                <MenuItem value="Trending">Trending</MenuItem>
              </Select>
              <div style={{ fontSize: 14, paddingLeft: 14, color: "#c0392b" }}>
               {error.status}
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <IconButton
              onChange={handleicon}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                onChange={()=>handleerror('icon',null)}
                error={error.icon?true:false}
                hidden
                accept="image/*"
                type="file"
              />
              <PhotoCamera />
            </IconButton>
            <div style={{ fontSize: 14, paddingLeft: 14, color: "#c0392b" }}>
             {error.icon}
            </div>
          </Grid>
          <Grid item xs={6}>
            <Avatar
              variant="rounded"
              alt="icon"
              src={icon.file}
              sx={{ width: 60, height: 60 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button onClick={click}  variant="contained" fullWidth>
              Submite
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" type="reset" fullWidth>
              Reset
            </Button>
          </Grid>
        </Grid>


    </div>
 
 

</div>

// end container 

)



}
