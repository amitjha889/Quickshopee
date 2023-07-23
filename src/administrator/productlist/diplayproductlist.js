import { useState,useEffect, } from "react";
import { postdata,getdata,serverURL} from "../services/fatchnodeservices";
import MaterialTable from "@material-table/core";
import { Avatar,Button, Grid,FormControl,InputLabel,Select, MenuItem,TextField,IconButton } from "@mui/material";
import { useStyles } from "./productlistcss";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";


export default function Displayproductlist (){
    const navigate=useNavigate()
    const classes=useStyles()
    const [displaytable,setDisplayTable]=useState([])
    const [open,setOpen]=useState(false)
    // all use state of productlist 
    const [categoryList,setCategoryList]=useState([])
    const [subcategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [subcategoryid,setSubcategoryId]=useState('')
    const [categoryid,setCategoryId]=useState('')
    const [productid,setProductId]=useState('')
    const [productlistname,setProductName]=useState('')
    const [discription,setDiscription]=useState('')
    const [rate,setRate]=useState('')
    const [offer,setOffer]=useState('')
    const [weight,setWeight]=useState('')
    const [picture,setPicture]=useState({file:"/assets/cart.png",bytes:""})
    const [stock,setStock]=useState('')
    const [error,setError]=useState('')
    const [stattus,setStattus]=useState('')
    ///
    const [categoryname,setCategoryname]=useState('')
    const [subcategoryname,setsubcategoryname]=useState('')
    const [productname,setProducttName]=useState('')
    // 
    const [editicon,setEditIcon]=useState(false)
    const [oldicon,setOldIcon]=useState("")
    const [productlistid,setProductListId]=useState('')







    ////////////////////////////





    
    // display product list 

    // fatch category dropdown functions

const Fatchcategory=async()=>{

  var result=await getdata('productlist/categorydropdown')
  setCategoryList(result.data)

}

const fillcategorydropdown=()=>{

   return categoryList.map((val)=>{
   return <MenuItem value={val.categoryid}>{val.categoryname}</MenuItem>

  })

}


useEffect(function(){

 Fatchcategory()

},[])


// End fatch category dropdown functions

// fatch subcategory by category functions 

const fatchsubcategory=async(cid)=>{

var result = await postdata("productlist/subcategorydropdownbycategory",{categoryid:cid})
setSubCategoryList(result.data)

}

const fillsubcategorybycategoryid=(event)=>{
  
  fatchsubcategory(event.target.value)
  setCategoryId(event.target.value)

}

const fillsubdropdown=()=>{
 
  return subcategoryList.map((val)=>{
  return <MenuItem value={val.subcategoryid} >{val.subcategoryname}</MenuItem>

  })

}

// fatch product by subcategoryid

const fatchproduct=async(scid)=>{

  var result = await postdata("productlist/productdropdownbysubcategory",{subcategoryid:scid})
  setProductList(result.data)
  
  
  }
  
  const fillproductbysubcategoryid=(event)=>{
      
      fatchproduct(event.target.value)
      setSubcategoryId(event.target.value)
  
  }
  
  const fillproductdropdown=()=>{
     
      return productList.map((val)=>{
      return <MenuItem value={val.productid} >{val.productname}</MenuItem>
  
      })
  
  }

  // end fatch product by subcategoryid

  // get product id 
  const setproductidfunction = (event) =>{

      setProductId(event.target.value)
  }

  // handle product list id 

  const handleproductlistname = (event) =>{

       setProductName(event.target.value)

  }

  //handle discription of product list 

  const handleproductlistdiscription = (event) =>{
   
      setDiscription(event.target.value)
  } 

  // handle rate of product list 

  const handleproductlistrate = (event) =>{
   
      setRate(event.target.value)
  } 

  // handle offer of product list 

 const  handleproductlistoffer = (event) =>{

  setOffer(event.target.value)  

 }
 // handle weight of product list 

 const  handleproductlistwaight = (event) =>{

  setWeight(event.target.value)  

 }

//    handle picture of product list 

const handlepicture = (event) =>{

  setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setEditIcon(true)
}


const handlecancel=()=>{
    setPicture({file:`${serverURL}/images/${oldicon}`,bytes:''})
    setEditIcon(false)
}



// handle stock of product list 

const handlestock= (event) =>{

  setStock(event.target.value)

}

// handle stattus of product list
const handleproductliststattus=(event)=>{

  setStattus(event.target.value)

}

// handle error function 

const handleerror = (input,value) =>{

  setError((prev)=>({...prev,[input]:value}))

}

// handle validtion function 

const validtion = () => {

  var isvalid=true;
  if(!categoryid)
  {
      handleerror('category','Please Selecte Category ')
      isvalid=false;
  }
  if(!subcategoryid)
  {
      handleerror('subcategory','Please Selecte Subcategory ')
      isvalid=false;
  }
  if(!productid)
  {
      handleerror('product','Please Selecte Product ')
      isvalid=false;
  }
  if(!productlistname)
  {
      handleerror('productlistname','Please Selecte Product List Name  ')
      isvalid=false;
  }
  if(!discription)
  {
      handleerror('discription','Please Input Discription Of Product  ')
      isvalid=false;
  }
  if(!rate)
  {
      handleerror('rate','Please Input Rate Of Product  ')
      isvalid=false;
  }
  if(!offer)
  {
      handleerror('offer','Please Input Offer Of Product  ')
      isvalid=false;
  }
  if(!stock)
  {
      handleerror('stock','Please Input Stock Of Product  ')
      isvalid=false;
  }
  if(!weight)
  {
      handleerror('weight','Please Select Weight  ')
      isvalid=false;
  }
  if(!stattus)
  {
      handleerror('stattus','Please Select Stattus ')
      isvalid=false;
  }
//   if(!picture.bytes)
//   {
//       handleerror('picture','Please Select Picture ')
//       isvalid=false;
//   }
  
  return isvalid;
  
}
                 

// submite function 
const submitdataondatabase = async() =>{

  if(validtion())
  {
    var formdata=new FormData()
    formdata.append('categoryid',categoryid)
    formdata.append('subcategoryid',subcategoryid)
    formdata.append('productid',productid)
    formdata.append('productlistname',productlistname)
    formdata.append('discription',discription)
    formdata.append('rate',rate)
    formdata.append('offer',offer)
    formdata.append('weight',weight)
    formdata.append('picture',picture.bytes)
    formdata.append('stock',stock)
    formdata.append('stattus',stattus)
    formdata.append('productlistid',productlistid)

    var result=await postdata('productlist/updateproductlist',formdata)
    alert(result.message)
   
  
     


  }
  getproductlistdata()

}

// data delete by database 
const deletekarodata= async() =>{

var body={productlistid:productlistid}
var result = await postdata ('productlist/deletedata',body)
alert(result.message)
getproductlistdata()


}




const pictureupdate=async()=>{

var formdata=new FormData()
formdata.append('productlistid',productlistid)
formdata.append('picture',picture.bytes)
var result=await postdata('productlist/updateproductlistpicture',formdata)
alert(result.message)
getproductlistdata()
}

    
   function showtable(){

    return(
         <Grid container spacing={2}>
            <Grid item xs={12}>
                <b>
                Product List Form
                </b>             
            </Grid>
           
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryid}
                        label="Category"
                        onChange={fillsubcategorybycategoryid}
                        onFocus={()=>handleerror('category',null)}
                        error={error.category?true:false}
                        
                    
                    >
                        <MenuItem >Select Category</MenuItem>
                        {fillcategorydropdown()}
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
                        label="Subcategory"
                        onChange={fillproductbysubcategoryid}
                        onFocus={()=>handleerror('subcategory',null)}
                        error={error.subcategory?true:false}
                    
                    >
                        <MenuItem >Select Subcategory</MenuItem>
                        {fillsubdropdown()}
                    </Select>
                
                </FormControl>
                {error.subcategory}
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Product</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productid}
                        label="product"
                        onChange={setproductidfunction}
                        onFocus={()=>handleerror('product',null)}
                        error={error.product?true:false}
                    
                    >
                        <MenuItem >Select Product</MenuItem>
                        {fillproductdropdown()}
                    </Select>
                
                </FormControl>
                {error.product}
            </Grid>

            <Grid item xs={12}>
                
                <TextField
                onChange={handleproductlistname}
                 onFocus={()=>handleerror('productlistname',null)}
                 value={productlistname}
                 error={error.productlistname?true:false}
                 helperText={error.productlistname}
                variant="outlined"
                label="Product List Name"
                fullWidth
                />

            </Grid>

            <Grid item xs={12}>
                
                <TextField
                onChange={handleproductlistdiscription}
                 onFocus={()=>handleerror('discription',null)}
                 value={discription}
                 error={error.discription?true:false}
                 helperText={error.discription}
                variant="outlined"
                label="Discription"
                fullWidth
                />

            </Grid>

            <Grid item xs={12}>
                
                <TextField
                onChange={handleproductlistrate}
                value={rate}
                onFocus={()=>handleerror('rate',null)}
                error={error.rate?true:false}
                helperText={error.rate}
                variant="outlined"
                label="Rate"
                fullWidth
                />

            </Grid>

            <Grid item xs={12}>
                
                <TextField
                onChange={handleproductlistoffer}
                onFocus={()=>handleerror('offer',null)}
                value={offer}
                error={error.offer?true:false}
                helperText={error.offer}
                variant="outlined"
                label="Offer"
                fullWidth
                />

            </Grid>

            <Grid item xs={12}>
                
                <TextField
                onChange={handlestock}
                onFocus={()=>handleerror('stock',null)}
                value={stock}
                error={error.stock?true:false}
                helperText={error.stock}
                variant="outlined"
                label="Stock"
                fullWidth
                />

            </Grid>

            <Grid item xs={12}>
                
                <FormControl fullWidth>
                   
                    <InputLabel id="demo-simple-select-label">Weight</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={weight}
                        label="Weight"
                        onChange={handleproductlistwaight}
                        onFocus={()=>handleerror('weight',null)}
                        error={error.weight?true:false}
                    
                    >
                        <MenuItem  >Select Product</MenuItem>
                        <MenuItem value="Liter" >Liter</MenuItem>
                        <MenuItem value="Killogram" >Killogram</MenuItem>
                        <MenuItem value="Piece">Piece</MenuItem>
                    </Select>
                
                </FormControl>
                {error.weight}
            </Grid>

            <Grid item xs={12}>
                
                <FormControl fullWidth>
                   
                    <InputLabel id="demo-simple-select-label">Stattus</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={stattus}
                        label="Weight"
                        onChange={handleproductliststattus}
                        onFocus={()=>handleerror('stattus',null)}
                        error={error.stattus?true:false}
                    
                    >
                        <MenuItem  >Select Product</MenuItem>
                        <MenuItem value="Available" >Available</MenuItem>
                        <MenuItem value="Continue" >Continue</MenuItem>
                        <MenuItem value="Disscontinue">Disscontinue</MenuItem>
                    </Select>
                
                </FormControl>
                {error.stattus}
                
            </Grid>
           
           
            <Grid item xs={4}>
                <IconButton onChange={handlepicture} color="primary" aria-label="upload picture"
                component="label"
                >
                <input
                    onChange={()=>handleerror('picture',null)}
                    error={error.picture?true:false}
                    hidden
                    accept="image/*"
                    type="file"
                />
                <PhotoCamera />
                </IconButton>
                {error.picture}
            </Grid>
            <Grid item xs={4}>
                <Avatar
                variant="rounded"
                alt="icon"
                src={picture.file}
                sx={{ width: 60, height: 60 }}
                />
            </Grid>
            <Grid item xs={4}>
                {editicon?<>
                <Button  onClick={pictureupdate} >Save</Button>
                <Button onClick={handlecancel} >Cancel</Button></>:<></>}
               
            </Grid>
            <Grid item xs={6}>
                <Button onClick={submitdataondatabase} variant="contained" fullWidth>
                 Update
                </Button>
            </Grid>

            <Grid item xs={6}>
                <Button onClick={deletekarodata} variant="contained" type="reset" fullWidth>
                Delete
                </Button>
            </Grid>
            
        
        
         </Grid>


          )



   }




    // get function of getting productlist data by data base 

    const getproductlistdata=async()=>{

     var result=await getdata("productlist/displayproductlis")
     setDisplayTable(result.data)

    }
   
    useEffect(function(){
   
        getproductlistdata()

    },[])


    // function of handle open

   const handleopen=(rowData)=>{
    console.log(rowData)
    fatchsubcategory(rowData.categoryid)
    fatchproduct(rowData.subcategoryid)
    setCategoryId(rowData.categoryid)
    setSubcategoryId(rowData.subcategoryid)    
    setProductId(rowData.productid)
    setProductName(rowData.productlistname)
    setDiscription(rowData.description)
    setRate(rowData.rate)
    setOffer(rowData.offer)
    setWeight(rowData.weight)
    setStock(rowData.stock)
    setStattus(rowData.status)
    setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:""})
    setCategoryname(rowData.categoryname)
    setsubcategoryname(rowData.subcategoryname)
    setProducttName(rowData.productname)
    setOldIcon(rowData.picture)
    setProductListId(rowData.productlistid)
    setOpen(true)
}

 const handleClose=()=>{
    setOpen(false)
 }

//    function of dialogbox 


function dialogbox(){

return(
  <Dialog open={open} onClose={handleClose} >
    <DialogTitle id="alert-dialog-title">
      Edit Product List
    </DialogTitle>
    <DialogContent>
     {showtable()}
      
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
     </DialogActions>
  </Dialog>


)



}



    // function of material table 

 function materialtableforproductlist(){



        return (
            <MaterialTable
            title="Product List"
            columns={[
                { title: 'Productlist ID ', field: 'productlistid' },
                { title: 'Category ID', field: 'categoryid' },
                { title: 'Subcategory ID', field: 'subcategoryid' },
                { title: 'Product ID', field: 'productid' },
                { title: 'Productlist Name', field: 'productlistname' },
                { title: 'Description', field: 'description' },
                { title: 'Rate', field: 'rate' },
                { title: 'Offer', field: 'offer' },
                { title: 'Type', field: 'type' },
                { title: 'Stock', field: 'stock' },
                { title: 'Status', field: 'status' },
                { title: 'Picture', field: 'picture' ,render:rowData=><Avatar src={`${serverURL}/images/${rowData.picture}`} variant={"rounded"} />},
                { title:'weight',field:'proweight'}
            ]}
             data={displaytable}
                
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
                  onClick: (event) => navigate ('/dashboard/productlist')  
                }
            ]}
        />
    
        )

 }

    
    return(

        <div  className={classes.container}>

            <div className={classes.box} >
              {materialtableforproductlist()}
            </div>
                {dialogbox()}
        </div>


        )

 }