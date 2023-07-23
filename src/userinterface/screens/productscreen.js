import Divider from "@mui/material/Divider";
import Header from "../component/header";
import Productimgshow from "../component/productimgshow";
import Showproductdetail from "../component/productdetail";
import Footer from "../component/footer";
import Productname from "../component/productname";
import Redux from "../component/productredux";
import Aboutweb from "../component/aboutquckshopee";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { postdata } from "../../administrator/services/fatchnodeservices";
import { useEffect } from "react";



export default function Productscreen() {
  var location = useLocation();
  
  var product = location.state.product;
  var productid = product.productid;
  var proid=product.productlistid
  const [refresh,setRfresh]=useState(false)



  const refreshiting=()=>{

    setRfresh(!refresh)


  }

  
  
 

  const [productListmMultiple, setProductListmMultiple] = useState([]);
  const [productlistid,setProductListId]=useState('')
  const [productListPicture,setProductListPicture]=useState([])
 
 
  
/////////////////////////////////////////////////////////////////////// multiple product by same product id 
  const fatchprductlistbyproductid = async (pid) => {
    let result = await postdata("userinterface/fatchprductlistbyproductid", { productid: pid,});

    setProductListmMultiple(result.data);
   
  };

  
  useEffect(function(){
  
    fatchprductlistbyproductid(productid)

  },[])
  //////////////////////////////////////////////////////////////////////////////get image by productlist id


  const fatchproductpicturebyproductid =async(prid) => {


    setProductListId(prid)
    let result = await postdata("userinterface/fatchprductpicturebyproductlistid", {productlistid:prid});
    var picture=result.data[0].pictures.split(",")
    setProductListPicture(picture)
   

  };
  ///////////////////////////////////////////////////////////////////////////

  return (
<div>
  <Header   />

  <div  style={{display:'flex',flexDirection:'row',paddingLeft:'2rem',paddingRight:'2rem'}} >

    <div style={{marginTop:'.1rem',display:'flex',flexDirection:'column',width:'50%'}} >
      


      <div>

        <Productimgshow      proid={proid}  images={productListPicture} />
      
      </div>

      
      <div style={{ marginTop: "2%" }}>
        <Divider />
      </div>

      <div>
          <Showproductdetail />
      </div>
    
  
    </div>


    <div style={{ marginLeft:1 }}>
      <Divider orientation="vertical" />
    </div>

    



    <div style={{marginTop:'.1rem',display:'flex',flexDirection:'column',width:'50%'}} >


      <div style={{paddingTop:'5rem',marginLeft: "4.7rem",width:'auto'}}>
      
        <Productname productdetail={product} />
      
      </div>

      <div style={{marginTop:'1rem'}}>
        <Divider />
      </div>

      <div  > 
        <Redux refreshit={refreshiting} similarproductlist={productListmMultiple} picture={fatchproductpicturebyproductid} productlist={product}/>
      
      </div>

      <div style={{marginTop:'2rem'}}>
        <Divider />
      </div>

      <div style={{ marginLeft: "4.7rem",marginTop:'2rem'}}  >

      <Aboutweb />
      </div>

      
    
  
    </div>

    
  </div>
  
  <div style={{paddingLeft:'2rem',paddingRight:'2rem'}} >


    <Footer footertitle="Categories" />

  </div>
  
    
</div>
  );
}
