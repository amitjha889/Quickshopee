import Avatar from '@mui/material/Avatar';



export default function Aboutweb(){


return(

<div style={{display:'flex',flexDirection:'column',fontFamily:'Montserrat'}} >


<div>
      <span style={{fontSize:15,fontWeight:'bold'}}>Why shop from quckshopee?</span>
</div>


<div style={{marginTop:'2rem',display:'flex',flexDirection:'row',alignItems:'center'}} >

   <Avatar src='/assets/superfast.png' sx={{ width: 56, height: 56 }} />
   
    <div  style={{display:'flex',flexDirection:'column',marginLeft:'1rem'}}>

        <div style={{fontSize:12,fontWeight:'bold'}} >
            Superfast Delivery
        </div>
       
        <div style={{fontSize:10,fontWeight:'lighter'}} > 
           Get your order delivered to your doorstep at the earliest from dark stores near you.
        </div>


    </div>


      
</div>


<div style={{marginTop:'2rem',display:'flex',flexDirection:'row',alignItems:'center'}} >

   <Avatar src='/assets/bestprice.png' sx={{ width: 56, height: 56 }} />

    <div  style={{display:'flex',flexDirection:'column',marginLeft:'1rem'}}>

        <div style={{fontSize:12,fontWeight:'bold'}} >
            	
           Best Prices & Offers
        </div>

        <div style={{fontSize:10,fontWeight:'lighter'}} > 
           Best price destination with offers directly from the manufacturers.
        </div>


    </div>
      
</div>


<div style={{marginTop:'2rem',display:'flex',flexDirection:'row',alignItems:'center'}} >

   <Avatar src='/assets/wide.png' sx={{ width: 56, height: 56 }} />
    
    <div  style={{display:'flex',flexDirection:'column',marginLeft:'1rem'}}>

        <div style={{fontSize:12,fontWeight:'bold'}} >
        	
           Wide Assortment
        </div>

        <div style={{fontSize:10,fontWeight:'lighter'}} > 
           Choose from 5000+ products across food, personal care, household & other categories.
        </div>


    </div>


      
</div>










</div>


)





}