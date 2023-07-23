import TimerIcon from '@mui/icons-material/Timer';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Divider from '@mui/material/Divider';


export default function Productname({productdetail}){

    const product=(productdetail)

return (

<div >
    
    <div style={{width:'atuo',height:'auto',display:'flex',flexDirection:'column',fontFamily:'Montserrat',wordSpacing:1}}>

    
        <div style={{fontSize:12,fontWeight:'bold'}}>
            
            <span>xxxxx /</span>
            <span> xxxxx /</span>
            <span style={{opacity:'70%'}} >{product.productlistname}</span>
            
        </div>

        <div style={{marginTop:10}}>
        
            <span style={{fontSize:25,fontWeight:'bold'}}>{product.productlistname}</span>

        </div>


        <div style={{width:'3.8rem',height:'1.4rem',borderRadius:'1rem',background:'#bdc3c7',padding:1,display:'flex',justifyContent:'space-evenly',alignItems:'center',marginTop:10}}>

            <TimerIcon style={{width:20}} />
            <span style={{marginBottom:2,fontSize:10,fontWeight:'bold'}} >15 min</span>
            

        </div>

        <div style={{color:'#009432',fontSize:20,fontWeight:'bold',display:'flex',flexDirection:'row',marginTop:15}}>
            <span>{`View all by `}{product.productlistname}</span>
            
            <ArrowRightIcon  /> 
        
        </div>

    
    </div>

</div>






)




}