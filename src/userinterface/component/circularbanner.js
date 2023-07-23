import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { serverURL } from "../../administrator/services/fatchnodeservices";
import { createRef } from "react";
import { Paper } from "@mui/material";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { propsToClassKey } from "@mui/styles";
///////////////////////////////////////////////
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";


///////////////////////////////////////////////

export default function Bannercircular(props){

  const navigate=useNavigate()
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up('sm'));
  const mid = useMediaQuery(theme.breakpoints.down('md'));
  const large = useMediaQuery(theme.breakpoints.down('lg'));
  const smalld = useMediaQuery(theme.breakpoints.down('sm'));

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
        slidesToShow:smalld?3: mid?4:large?5:6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000
      
      }

    
    const color=['#34495e','#bdc3c7','#c7ecee','#95afc0','#535c68','#718093','#353b48','#dcdde1'] 






  const showbanner=()=>{

    return props.poster.map((val)=>{

      return ( 
      
        <div   onClick={()=>handleClick(val.categoryid)}  style={{ cursor:'pointer',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
          
          <div style={{ display:'flex',justifyContent:'center',alignItems:'center',width:smalld?110:130,height:smalld?110:130,borderRadius:smalld?55:65,background:color[parseInt(Math.random()*(color.length-1))]}} > 
            <img src={`${serverURL}/images/${val.icon}`}  style={{width:"75%"}}/>   
          </div>
          
          <div style={{fontFamily:'Montserrat, sans-serif',color:'#000',fontWeight:'bold',width:smalld?80:140,display:'flex',justifyContent:'center',marginTop:'4%',paddingLeft:10}}>
            {val.categoryname}
          </div>  
      
        </div>
      )

    })


  }

  const handleClick=(categoryid)=>{
  
    navigate("/categorypage",{state:{categoryid:categoryid}})
   

  }




return(

    <div>

      <div style={{padding:5,display:'flex',justifyContent:'space-between',alignItems:'center'}}>

         <div  style={{marginBottom:smalld?10:20}} >
            <div  style={{fontFamily:'Montserrat, sans-serif',color:'#000',fontWeight:'bold',fontSize:smalld?'100%':'150%'}}>
              {props.title}
            </div>
          </div> 

          <div style={{display:'flex',flexDirection:'row'}}>

            <div>
              <KeyboardArrowLeftIcon style={{color:'#000',marginRight:4}} onClick={handlenextarrow}/>
            </div>
            <div>
              <KeyboardArrowRightIcon style={{color:'#000',marginRight:3}} onClick={handlebackarrow} />
            </div>
    
          </div>
     
        
         
      </div>  

     
      <Slider {...settings}   ref={sliderref}  style={{paddingLeft:45}} >
            {showbanner()}  
      </Slider>


      

    </div>

)


} 