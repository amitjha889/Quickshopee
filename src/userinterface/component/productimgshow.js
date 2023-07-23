
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { postdata, serverURL } from '../../administrator/services/fatchnodeservices';
import { createRef } from 'react';
import { Paper } from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";


export default function Productimgshow(props){

     var img=props.images
     var prolistid=props.proid

     const [getImages,setImages]=useState([])
     const [bigImage,setBigImage]=useState([])
     
   var sliderref=createRef()  
   
   const handlenext=()=>{

    sliderref.current.slickNext()

   }

   const handleback=()=>{

    sliderref.current.slickPrev()

   }

   const handlepicture=(val)=>{


       setBigImage(val)

   }


   ///////////////////////////////////////////////////

   const firstEffectimg=async(proid)=>{


   var result =await postdata('userinterface/fatchfirsteffectimg',{productlistid:proid})
   
   var pictures=(result.data[0].pictures.split(","))
   
   
   setImages(pictures)
   setBigImage(pictures[0])
   
   }


   useEffect(function(){

    firstEffectimg(prolistid)


   },[])


///////////////////////////////////////////////////////////


const setreduxvalue=(pictures)=>{


    setImages(pictures)
    setBigImage(pictures[0])




}

useEffect(function(){

    setreduxvalue(img)

},[img])



   const showimage=()=>{


      return  getImages.map((val)=>{

         return ( 
                 
                <div  onClick={()=>handlepicture(val)}  style={{display:'flex',justifyContent:'center',alignItems:'center',width:'25%'}} >
                    <Paper  variant="outlined" square style={{display:'flex',justifyContent:'center',width:80,height:50,cursor:'pointer'}} >
                     
                       <img src={`${serverURL}/images/${val}`} style={{width:'60%'}} />

                    </Paper>

                </div>
               )


       })



   }






    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows:false
      };


return (
<div   style={{width:'90%',height:'auto',padding:'5%',border:1,borderColor:'black'}}  variant="outlined" square  >

            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} >

                <div style={{width:'45.5vw',height:'60vh',justifyContent:'center',alignItems:'center',display:'flex'}} >


                    <img src={`${serverURL}/images/${bigImage}`} style={{width:'15rem'}} />



                
                </div>


            

                <div  style={{width:'40.5vw',height:'10vh',display:'flex',justifyContent:'center',position:'relative'}} >


                    <div style={{position:'absolute',top:'25%',left:'1.5%',zIndex:'1',backgroundColor:'#fff',width:'35px',height:'35px',borderRadius:'17.5px',display:'flex',justifyContent:'center',alignItems:'center',opacity:0.8}}  >
    
                        <KeyboardArrowLeftIcon style={{color:'black',marginRight:3.5}}  onClick={handleback} />

                    </div>

                    <Slider  {...settings} style={{width:'35vw',height:'7vh',paddingLeft:'1%',marginTop:'1.5%'}} ref={sliderref}  >


                      {showimage()}

                    </Slider>

                    <div style={{position:'absolute',top:'25%',right:'1.5%',zIndex:'1',backgroundColor:'#fff',width:'35px',height:'35px',borderRadius:'17.5px',display:'flex',justifyContent:'center',alignItems:'center',opacity:0.8}}  >
  
                        <KeyboardArrowRightIcon style={{color:'black',marginRight:2.5}}  onClick={handlenext} />

                    </div>
            

                    
                </div>

            </div>

   


            </div>
    
    




)





}