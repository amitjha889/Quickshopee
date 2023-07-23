import { useStyles } from "./productlistcss";
import { useState,useEffect } from "react";
import { postdata,getdata,serverURL } from "../services/fatchnodeservices";
import { Grid,FormControl,InputLabel,Select, MenuItem,TextField,IconButton,Avatar,Button } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";



export default function Productlist(){
const navigate=useNavigate()
const clasess=useStyles()
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
const [proweight,setProWeight]=useState('')
const [picture,setPicture]=useState({file:"/assets/cart.png",bytes:""})
const [stock,setStock]=useState('')
const [error,setError]=useState('')
const [stattus,setStattus]=useState('')





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

const   fillsubcategorybycategoryid=(event)=>{
    
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

   // handle proweight of product list
   const  handleproductlistprowaight = (event) =>{

    setProWeight(event.target.value)  

   }

//    handle picture of product list 

const handlepicture = (event) =>{

    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
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
        handleerror('weight','Please Select Type  ')
        isvalid=false;
    }
    if(!proweight)
    {
        handleerror('weight','Please Select Weight  ')
        isvalid=false;
    }

    if(!stattus)
    {
        handleerror('stattus','Please Select Stattus ')
        isvalid=false;
    }
    if(!picture.bytes)
    {
        handleerror('picture','Please Select Picture ')
        isvalid=false;
    }
    
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
      formdata.append('proweight',proweight)
      formdata.append('picture',picture.bytes)
      formdata.append('stock',stock)
      formdata.append('stattus',stattus)
      var result=await postdata('productlist/submittedproductlist',formdata)
      alert(result.message)
       


    }


    
   
 }


return(
    
    <div className={clasess.container}>


        <div className={clasess.box}>
            
         <Grid container spacing={2}>

           
                <Grid item xs={12} style={{fontWeight:'bold',display:"flex",flexDirection:"row",justifyContent:'space-between'}} >
                
                            <div >
                                    Productlist Interface
                            </div>
                            <div> 
                                <ViewListIcon  onClick={ ()=>navigate('/dashboard/displayproductlist') } />
                            </div>
                            
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
                error={error.stock?true:false}
                helperText={error.stock}
                variant="outlined"
                label="Stock"
                fullWidth
                />

            </Grid>

            <Grid item xs={12}>
                
                <FormControl fullWidth>
                   
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={weight}
                        label="Type"
                        onChange={handleproductlistwaight}
                        onFocus={()=>handleerror('weight',null)}
                        error={error.weight?true:false}
                    
                    >
                        <MenuItem  >Select Product</MenuItem>
                        <MenuItem value="Liter" >L</MenuItem>
                        <MenuItem value="miliLiter" >ML</MenuItem>
                        <MenuItem value="Grams" >Gm</MenuItem>
                        <MenuItem value="Killogram" >Kg</MenuItem>
                        <MenuItem value="Piece">Pcs</MenuItem>
                    </Select>
                
                </FormControl>
                {error.weight}
            </Grid>


            <Grid item xs={12}>


            <TextField
                onChange={handleproductlistprowaight}
                onFocus={()=>handleerror('proweight',null)}
                error={error.proweight?true:false}
                helperText={error.proweight}
                variant="outlined"
                label="Weight"
                fullWidth
                />
                
             

                   
                    
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
                        <MenuItem value="Out Of Stock">Out of stock</MenuItem>
                    </Select>
                
                </FormControl>
                {error.stattus}
                
            </Grid>
           
           
            <Grid item xs={6}>
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
            <Grid item xs={6}>
                <Avatar
                variant="rounded"
                alt="icon"
                src={picture.file}
                sx={{ width: 60, height: 60 }}
                />
            </Grid>
            <Grid item xs={6}>
                <Button onClick={submitdataondatabase} variant="contained" fullWidth>
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
    

    )


}