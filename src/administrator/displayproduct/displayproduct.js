import { useStyles } from "./productcss"
import MaterialTable from "@material-table/core"
import React,{ useState,useEffect } from "react"
import {getdata,serverURL,postdata} from "../services/fatchnodeservices"
import { Avatar,Dialog,DialogTitle,DialogContent,DialogActions,Button } from "@mui/material"
import { TextField,IconButton,Grid,MenuItem,FormControl,Select,InputLabel } from "@mui/material"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import { useNavigate } from "react-router-dom"

export default function Displayproduct(){

   const navigate =useNavigate()
    
    const clasess=useStyles()
    const [productslist,setProductsList]=useState([])
    const [open,setOpen]=useState(false)
  //////////////////////////////////////
  const [status,setStatus]=useState('')
  const [icon,setIcon]=useState({file:"/assets/cart.png",bytes:""})
  const [product,setProduct]=useState('')
  const [productid,setPorductId]=useState('')
  const [categoryid,setCategoryid]=useState('')
  const [subcategoryid,setSubcategoryid]=useState('')
  const [error,setError]=useState({})
  const [categorylist,setCategoryList]=useState([])
  const [subcategorylist,setSubCategoryList]=useState([])
  const [editicon,setEditIcon]=useState(false)
  const [oldicon,setOldIcon]=useState('')


//////////////////////////////validation of product 

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

    return subcategorylist.map((val)=>{
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

// handleicon

function handleicon (event){

    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})  
    setEditIcon(true)
  }




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
    // if(!icon.bytes)
    // {
    //     handleerror('icon','Please Select Icon..')
    //     isvalid=false;

    // } 


 return isvalid;


}     

     // click chekc validation 

  const updatekaro =async()=>{


  if(validation())
  {
 
    var body={productname:product,productid:productid,categoryid:categoryid,subcategoryid:subcategoryid,status:status}
    var result=await postdata('product/updateproductinformation',body)
    console.log(result.massage)
    
  }

  fatchproductfortable()

  }

  // cancel icon updation 

const canceliconedit=()=>{
  
  setIcon({file:`${serverURL}/images/${oldicon}`,bytes:''})
  setEditIcon(false)

}

// edit icon updation 

const saveiconedit=async()=>{
var formdata=new FormData()
formdata.append('icon',icon.bytes);
formdata.append('productid',productid);
var result=await postdata('product/updateicon',formdata)
alert(result.massage)

fatchproductfortable()
}

  



//////////////////////////////validation end of product 
    
  
    // show edit form function 
    
 const  showeditform=()=>{

      return(
       
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              value={product}
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
                <MenuItem >Select Subcategory</MenuItem>
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
          <Grid item xs={4}>
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
          
          <Grid item xs={4}>
            <Avatar
              
              variant="rounded"
              alt="icon"
              src={icon.file}
              sx={{ width: 60, height: 60 }}
            />
          </Grid>
          
          <Grid item xs={4}>
           {editicon?<>
           <Button onClick={saveiconedit} >Save</Button>
           <Button onClick={canceliconedit} >Cancel</Button></>:<></>}
          </Grid>
          
          <Grid item xs={6}>
            <Button  onClick={updatekaro} variant="contained" fullWidth>
              Edit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" type="reset" fullWidth>
              Cancel
            </Button>
          </Grid>
        </Grid>



      )


    }
    

   

    // handleclose function 

    const handleClose=()=>{
        setOpen(false)
    }

    // showdialog box function 

    function Dialogbox(){

     return(
        <Dialog open={open} onClose={handleClose} >
        <DialogTitle>
         Edit Product
        </DialogTitle>
        <DialogContent>
          {showeditform()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      )


    }



     

    //    fatchproduct data from database function 
    
    const fatchproductfortable=async()=>{
        
        
        var result=await getdata('product/getproduct')
    
        setProductsList(result.data)

    }

    useEffect(function(){

        fatchproductfortable()
    },[])
    
     // handleopen function 

     const handleopen=(rowData)=>{

      
      fatchsubcategory(rowData.categoryid)
      setStatus(rowData.stattus)
      setProduct(rowData.productname)
      setPorductId(rowData.productid)
      setCategoryid(rowData.categoryid)
      setSubcategoryid(rowData.subcategoryid)
      setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
      setOldIcon(rowData.icon)
      setOpen(true)

    }
    
   




    // material table 

    function Materialtable(){

        return(
        <MaterialTable
            title="Product List"
            columns={[
                { title: 'Product ID', field: 'productid' },
                { title: 'Product', field: 'productname' },
                { title: 'Category', field: 'categoryid' },
                { title: 'Subcategory', field: 'subcategoryid' },
                { title: 'Status', field: 'stattus' },
                { title: 'Icon', field: 'icon' ,render:rowData=><Avatar src={`${serverURL}/images/${rowData.icon}`} variant={"rounded"} />},
            ]}
            data={productslist}
                 
            actions={[
                {
                icon: 'edit',
                tooltip: 'Edit product',
                 onClick: (event, rowData) => handleopen(rowData)
                },
                {
                  icon: 'add',
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: (event) => navigate ('/dashboard/productinterface')  
                }
            ]}
        />
        
        )
    
    }

    


    return(
       
        <div className={clasess.container} >

            <div className={clasess.box}>

                {Materialtable()}
                
            </div>
            {Dialogbox()}
       </div>

    )


}