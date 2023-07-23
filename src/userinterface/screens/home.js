import Header from "../component/header"
import Banner from "../component/banner"
import Bannercircular from "../component/circularbanner"
import Showproduct from "../component/product"
import Footer from "../component/footer"
import { Category, PostAdd } from "@mui/icons-material"
import Divider from '@mui/material/Divider';

import { useState,useEffect } from "react"
import { getdata, postdata } from "../../administrator/services/fatchnodeservices"
import Add from "../component/add"

export default function Home(){

  const [banner,setBanner]=useState([])
  const [advertise,setAdd]=useState([])
  const [popularCategory,setPopularCategoy]=useState([])
  const [trendingCategory,setTrendingCategory]=useState([])
  const [product,setProduct]=useState([])

  ////////////////////////////////start banner picture function 
 

 const fatchbanners=async()=>{
 
    var  result=await getdata('userinterface/fetchbanner')
    var banners=result.data.banner.split(",")
    setBanner(banners)
  

  }


  useEffect(function(){
  
    fatchbanners()

  },[])

  ///////////////////////////////////////end banner picture function 


  ////////////////////////////////////// start add function 
  let add=[{addpic:'mangoadd.png'},{addpic:'attaadd.png'},{addpic:'summeradd.png'},{addpic:'motherdayadd.png'}] 

  
  function setaddpicture()
  {
    
    setAdd(add)
   
  }
    
  useEffect(function(){
  
    setaddpicture()

  },[])

  /////////////////////////////////////////end add function 

  //////////////////////////////////////////start popul categoy function 


 const fatchpopularcategory=async(status)=>{

  var result=await postdata('userinterface/fetchpopularcategory',{status:status})

  if(status=='Popular')
  {

    setPopularCategoy(result.data)

  }
  else if (status=='Continue')
  {
    setTrendingCategory(result.data)
    
  }



 }

 //////////////////////////////////////////////


 const fatchproduct=async(subcategoryname)=>{
  
  var result=await postdata('userinterface/fetchproduct',{subcategoryname:subcategoryname})
  
  setProduct(result.data)


 }







 useEffect(function(){

  
  
  fatchpopularcategory('Popular')
  fatchpopularcategory('Continue')
  fatchproduct('Milk, Dahi & Cheese')

},[])





return(

  <div>
      
   <Header/>
       
    <div style={{display:'flex',justifyContent:'center',width:'94%',flexDirection:'column',marginLeft:'3%',marginRight:'3%',marginTop:'1%'}}  >
      
      <div style={{width:'100%'}}>
        <Banner  imagesss={banner}  />
      </div>

     

      <div style={{width:'100%',marginTop:20}}>
        <Add poster={advertise}/>
      </div>


      <div style={{marginTop:'2%'}}  >

        <Divider />

      </div>

      <div style={{width:'100%',marginTop:20}}>
        <Bannercircular  poster={popularCategory}  title="Popular Category" />
      </div>

      <div style={{marginTop:'2%'}}  >

        <Divider />

      </div>

     <div style={{width:'100%',marginTop:20}}>
        <Showproduct show={product} title="Milk, Dahi & Cheese" />
      </div>

      <div style={{marginTop:'2%'}}  >

        <Divider />

      </div>

      <div  style={{width:'100%',marginTop:20,paddingBottom:50}}>
     
        <Bannercircular  poster={trendingCategory}  title="Trending Category" />
     
      </div>

      <div style={{width:'100%',paddingBottom:50}}  >  

       <Footer footertitle="Categories"  />

      </div>

    </div>
    
 




  </div>

)


}