import { useStyles } from "./productpicturecss"
import { useState,useEffect } from "react"
import { Grid,FormControl,InputLabel,Select,MenuItem,Button} from "@mui/material"
import { getdata,postdata} from "../services/fatchnodeservices"
import { DropzoneArea } from "material-ui-dropzone"


export default function Productpicture(){

    const clasess=useStyles()
    const [categorylist,setCategoryList]=useState([])
    const [categoryid,setCategoryId]=useState('')
    const [subcategorylist,setSubcategoryList]=useState([])
    const [subcategoryid,setSubcategoryId]=useState('')
    const [productlist,setProductList]=useState([])
    const [productid,setProductId]=useState('')
    const [productlist_List,setProductlist_List]=useState([])
    const [productlistid,setProductListId]=useState('')
    const [picture,setPicture]=useState('')

    // fatch category list from database function 
    const categoryfatching=async()=>{
   
       var  result=await getdata('productpicture/fatchcategory')
    
       setCategoryList(result.data)
       
    }

    const fillcategorydrp=()=>{

        return categorylist.map((val)=>{
        return <MenuItem value={val.categoryid} >{val.categoryname}</MenuItem>

        })
    }

    useEffect(function(){

        categoryfatching()

    },[])
    /////  end fatch category list by database function

    // fatch subcategory list by categoryid from data base 

    const fatchsubcategorybycategoryid =async(cid)=>{

       var result =await postdata('productpicture/fatchsubcategory',{categoryid:cid})
       setSubcategoryList(result.data)

    }

    const fillsubcategorylist=(event)=>{
    
       
     fatchsubcategorybycategoryid(event.target.value) 
     setCategoryId(event.target.value)


    }
    
    const subcategorydrpdown=()=>{

        

       return subcategorylist.map((val)=>{

         return <MenuItem value={val.subcategoryid} >{val.subcategoryname}</MenuItem>
        })

    }

    // end fatch subcategory list by categoryid from data base 

     //  fatch product list by subcategoryid from data base 

      const fatchproductbysubcategoryidfromdatabase=async(sid)=>{

      var result=await postdata ('productpicture/fatchproduct',{subcategoryid:sid})
        setProductList(result.data)

        // console.log(result.data)
      }

      const fillproductlist=(event)=>{

        fatchproductbysubcategoryidfromdatabase(event.target.value)
        setSubcategoryId(event.target.value)


      }

      const fillproductdrpdown=()=>{

          return  productlist.map((val)=>{

           return <MenuItem value={val.productid} >{val.productname}</MenuItem>

        })
      }

  // end fatch product list by subcategoryid from data base

   //  fatch productlist list by productid from data base

   const fatchproductlistbyproductid=async(pid)=>{

    var result =await postdata('productpicture/fatchproductlist',{productid:pid})
    setProductlist_List(result.data)

   }

 const fillproductlist_List=(event)=>{
 
    fatchproductlistbyproductid(event.target.value)
    setProductId(event.target.value)

 }

 const fillproductlistdrpdown=()=>{

 return   productlist_List.map((val)=>{

    return <MenuItem value={val.productlistid} >{val.productlistname}</MenuItem>
  
    })
 }

 const handleproductlist_list=(event)=>{

    setProductListId(event.target.value)

 }

//////////////////////////////////////////////////////////

const submitekaro=async()=>{

    let formdata=new FormData()
    formdata.append('categoryid',categoryid)
    formdata.append('subcategoryid',subcategoryid)
    formdata.append('productid',productid)
    formdata.append('productlistid',productlistid)
    
    
    picture.map((val,index)=>{

    formdata.append('picture'+index,val)

    })

  var  result=await postdata('productpicture/postproductpicturedata',formdata)
  alert(result.massage)

  

}





return(
  
    <div  className={clasess.container} >
    
       <div  className={clasess.box} >
          
          <Grid  container spacing={2}  >
            
          <Grid item xs={12}>
            <div className={clasess.hedingstyle} >Product Picture</div>
          </Grid>

            <Grid item xs={3}>
               
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryid}
                        label="Category"
                        onChange={fillsubcategorylist}
                        // onFocus={()=>handleerror('category',null)}
                        // error={error.category?true:false}
                      >
                        <MenuItem >Select Category</MenuItem>
                        {fillcategorydrp()}
                    
                    </Select>
                
                    
                </FormControl>


            </Grid>
            <Grid item xs={3}>
               
               <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={subcategoryid}
                        label="Subcategory"
                        onChange={fillproductlist}
                        // onFocus={()=>handleerror('category',null)}
                        // error={error.category?true:false}
                        
                    
                    >

                        <MenuItem >Select Subcategory</MenuItem>
                        {subcategorydrpdown()}
                    
                    </Select>
                
                   
                </FormControl>


           </Grid>

           <Grid item xs={3}>
               
               <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Product</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productid}
                        label="Product"
                       onChange={fillproductlist_List}
                        // onFocus={()=>handleerror('category',null)}
                        // error={error.category?true:false}
                        
                    
                    >

                        <MenuItem >Select product</MenuItem>
                        {fillproductdrpdown()}
                    
                    </Select>
                
                   
                </FormControl>


           </Grid>

           <Grid item xs={3}>
               
               <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Product List</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productlistid}
                        label="Product List"
                         onChange={handleproductlist_list}
                        // onFocus={()=>handleerror('category',null)}
                        // error={error.category?true:false}
                        
                    
                    >

                        <MenuItem >Select ProductList</MenuItem>
                        {fillproductlistdrpdown()}
                    
                    </Select>
                
                   
                </FormControl>


           </Grid>

           <Grid item xs={12}>

            <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
                filesLimit={6}
               onChange={(files) => setPicture(files)}

           />
              


           </Grid>

           
            <Grid item xs={6}>
             <Button  onClick={submitekaro}  variant="contained" fullWidth  >Submite</Button>
            </Grid>

            <Grid item xs={6}>
             <Button variant="contained" fullWidth >reset</Button>
            </Grid>

        





          </Grid>

        



       </div>


    </div>



)





}