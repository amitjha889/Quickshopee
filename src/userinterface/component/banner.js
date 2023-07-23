import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { serverURL } from "../../administrator/services/fatchnodeservices";
import { createRef } from "react";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

////////////////////////////////////
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//////////////////////////////////

export default function Banner(props){

  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up('sm'));


   var sliderref=createRef()

   const handlenextarrow=()=>{

        sliderref.current.slickPrev()
   }

   const handlebackarrow=()=>{

    sliderref.current.slickNext()
   }



    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
      
      }

      
     
     const showbanner=()=>{

         return props.imagesss.map((val)=>{
   
        return ( 
          
          <div> 
            <img src={`${serverURL}/images/${val}`}  style={{width:"100%"}}/>   
          </div>
        )

          })


     }

return(

    <div  style={{position:'relative'}}>


    

      {small?<><div style={{position:'absolute',top:'45%',left:'1.5%',zIndex:'1',backgroundColor:'#fff',width:'35px',height:'35px',borderRadius:'17.5px',display:'flex',justifyContent:'center',alignItems:'center',opacity:0.8}}  >
  
        <KeyboardArrowLeftIcon style={{color:'black',marginRight:4}} onClick={handlenextarrow}/>

      </div></>:<></>}

     


      <Slider {...settings}   ref={sliderref}   >
            {showbanner()}  
            
      </Slider>



      {small?<><div style={{position:'absolute',top:'45%',right:'1.5%',zIndex:'1',backgroundColor:'#fff',width:'35px',height:'35px',borderRadius:'17.5px',display:'flex',justifyContent:'center',alignItems:'center',opacity:0.8}}  >
  
        <KeyboardArrowRightIcon style={{color:'black',marginRight:3}} onClick={handlebackarrow} />

      </div></>:<></>}

    </div>

)


} 