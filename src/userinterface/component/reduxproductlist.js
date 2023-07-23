import { serverURL } from "../../administrator/services/fatchnodeservices"
import { Divider,Button } from "@mui/material"

import { useEffect } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import Additem from "./addredux";
import { useDispatch } from "react-redux";


export default function Reduxaddproduct(props){

    var cart =useSelector((state)=>state.product)
    var cartdata=Object.values(cart)
   

    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('sm'));

    /////////////////////////////////////////use Dispatch component

    var dispatch = useDispatch()


    ///////////////////////////////////////show item value
    const showitemaddvalue=(val,value)=>{

     var product=val
     

     if(value>=1)
     {
        product['qty']=value
        dispatch({type:'Add_Product',payload:[product.productlistid,product]})
     }
     else
     {
       
        product['qty']=0
        dispatch({type:'Delete_product',payload:[product.productlistid,product]})

       
     }

     props.refresh()
     
    }




const ShowProductRedux=()=>{

 return cartdata.map((val)=>{


 return(

    <div>
        <div style={{width:'100%',height:'auto'}}  >


            <div  style={{display:'flex',flexDirection:'row',padding:'1rem'}}>

                <div  style={{width:'4rem',height:'4.5rem',display:'flex',justifyContent:'center',alignItems:'center'}}>

                    <img src={`${serverURL}/images/${val.picture}`} style={{width:'45px'}} />

                
                </div>

                <div style={{display:'flex',flexDirection:'column',width:'20rem',paddingLeft:'1rem',fontFamily:'Montserrat'}}  >

                    <div  style={{fontWeight:'bold',paddingTop:'0.3rem'}}>
                        {val.productlistname}
                    </div>
                    
                    <div style={{fontSize:'10px',paddingTop:'0.3rem'}}>
                        {val.proweight} {val.type}
                    </div>
                   
                   <div  style={{fontSize:'12px',paddingTop:'0.3rem'}}>
                        {val.offer==0?<div >
                           {(val.rate)*(val.qty)}   &#8377;  
                        </div>:<div>
                            <s>{(val.rate)*(val.qty)}   &#8377;</s>  {(val.offer)*(val.qty)}    &#8377;
                        </div>}
                    </div>



                </div>

                <div style={{width:'5rem'}} >
        
                     <Additem   refreshit={props.refresh}  qty={val?.qty} valueshow={(value)=>showitemaddvalue(val,value)} />
                
                </div>



            </div>

        
            


        </div>
        
        <div>

            <Divider   />

        </div>


    </div>


    )




})




}


return (

<div   >

{ShowProductRedux()}

</div>


)



}