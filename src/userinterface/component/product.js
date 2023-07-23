import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { serverURL } from "../../administrator/services/fatchnodeservices";
import { createRef } from "react";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Paper } from "@mui/material";
///////////////////////////////////////////
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
/////////////////////////////////



export default function Showproduct (props){


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
        slidesToShow: smalld?2: mid?3:large?4:6,
        slidesToScroll: 2,
        autoplay: false,
        autoplaySpeed: 2000
      
      }

      const banner =[{id:1,banner:'p1.png',name:'Bread',waight:'500g',rate:'30',offer:'25'},{id:2,banner:'p2.png',name:'Amule Butter',waight:'250g',rate:'55',offer:'40'},{id:3,banner:'p3.png',name:'Cocacola',waight:'1pcs',rate:'35',offer:'30'},{id:4,banner:'p4.png',name:'Maaza',waight:'1L',rate:'55',offer:'45'},{id:5,banner:'p5.png',name:'Dahi',waight:'500g',rate:'70',offer:'60'},{id:6,banner:'p6.png',name:'Papad',waight:'500g',rate:'130',offer:'105'},{id:7,banner:'p7.png',name:'Redbull',waight:'250ml',rate:'125',offer:'110'},{id:8,banner:'p8.png',name:'Soda',waight:'500ml',rate:'70',offer:'65'}]
   

     const showpro=()=>{

         return props.show.map((val)=>{
  
        return ( 
          <div style={{margin:1}}>
          <Paper style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',width:180,height:250}} elevation={2} variant="outlined" >
            
              <div style={{paddingBottom:'5%'}} >
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:178,height:120}} > 
                  <img src={`${serverURL}/images/${val.picture}`}  style={{width:"60%"}}/>   
                </div>
              
                <div style={{fontFamily:'Montserrat, sans-serif',color:'#000',fontWeight:'bold',width:150,display:'flex',justifyContent:'center',marginTop:'4%'}}>
                  {val.productlistname}
                </div>

              

              </div>

            <div  style={{display:'flex',flexDirection:'column',width:'100%'}}>

              <div  style={{fontFamily:'Montserrat',fontSize:10,fontWeight:'bold',padding:'2%',paddingLeft:'5%'}}>
              
                {`${val.proweight} ${val.type}`}
              
              </div>
            
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

                <div style={{display:'flex',flexDirection:'column',paddingLeft:'5%',paddingTop:'5%'}}>
                
                  <div  style={{fontFamily:'Montserrat',fontSize:10,fontWeight:'bold',paddingBottom:'2%'}}>{val.offer==0?<>&#8377; {val.rate}</>:<s>&#8377; {val.rate}</s>  } </div>
                  <div  style={{fontFamily:'Montserrat',fontSize:10,fontWeight:'bold'}}>{val.offer==0?<></>:<>&#8377; {val.offer}</>}</div>
              
                </div>
            
                <div style={{paddingRight:'10%'}}>
                  <Button variant="outlined">Add</Button>
                </div>

              
              </div>
            
            </div>

          </Paper>
          </div>
        )

          })


     }

return(

    <div  >

        <div style={{padding:5,margin:5,display:'flex',justifyContent:'space-between',alignItems:'center'}}>

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

     
      <Slider {...settings}   ref={sliderref}   >
            {showpro()}  
      </Slider>


      

    </div>

)


} 
