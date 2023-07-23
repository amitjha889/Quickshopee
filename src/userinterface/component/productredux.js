import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Additem from "./addredux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Redux(props) {



  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up('sm'));
  const mid = useMediaQuery(theme.breakpoints.down('md'));
  const large = useMediaQuery(theme.breakpoints.down('lg'));
  const smalld = useMediaQuery(theme.breakpoints.down('sm'));



  const similarproduct = props.similarproductlist;
  const [selectedProduct, setSelectedProduct] = useState(props.productlist);
   
 

  var dispatch = useDispatch();

  ///////////////////////////////check redux data for manage +- box

  var product = useSelector((state) => state.product);
  var products = Object.values(product);
  

  const managereduxbox = () => {
    
    var exectproduct = products.filter((vel) => {
    
     return vel.productlistid==selectedProduct.productlistid
      
    });
  
    if(exectproduct?.length!=0)
  {
    setSelectedProduct(exectproduct[0])

  }
  else
  {
    selectedProduct['qty']=0
    setSelectedProduct(props.productlist)


  }

  
  
  };

  useEffect(function (){
    managereduxbox();
  }, []);

  const handleclick = (val, index) => {
    var product=val

    var finalproduct = products.filter((vel) => {
    
      return vel.productlistid==product.productlistid
       
     });

     if(finalproduct?.length!=0)
     {
       setSelectedProduct(finalproduct[0])
   
     }
     else
     {
      product['qty']=0
      setSelectedProduct(product);
   
   
     }

     
    props.picture(val.productlistid);
    
    
  };

  const showSimilarproduct = () => {
    return similarproduct.map((val, index) => {
      return (
       
          <div
            onClick={() => handleclick(val, index)}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              width: "7.5rem",
              height: "5rem",
              display: "flex",
              alignItems: "center",
              border:
                val.productlistid == selectedProduct.productlistid
                  ? "2px solid #192a56"
                  : "1px solid #487eb0",
              borderRadius: "10px",
              flexDirection: "column",
              marginTop:mid?'3px':'0'
            }}
          >
            {val.status == "Out Of Stock" ? (
              <>
                {" "}
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 10,
                    marginTop: "1rem",
                    color: "#b2bec3",
                  }}
                >
                  {val.proweight} {val.type}
                </div>{" "}
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    marginTop: "0.8rem",
                    color: "#b2bec3",
                  }}
                >
                  {val.status}
                </div>
              </>
            ) : (
              <>
                {val.offer == 0 ? (
                  <></>
                ) : (
                  <>
                    <div
                      style={{
                        width: "4.5rem",
                        height: "1.2rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "0.5px solid #2980b9",
                        borderBottomLeftRadius: "3px",
                        borderBottomRightRadius: "3px",
                        flexDirection: "column",
                        background: "#2980b9",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {parseInt(((val.rate - val.offer) / val.offer) * 100)} %
                      OFF
                    </div>
                  </>
                )}

                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    marginTop: val.offer == 0 ? "1.7rem" : "0.8rem",
                  }}
                >
                  {val.proweight} {val.type}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    marginTop: "0.4rem",
                  }}
                >
                  {val.offer == 0 ? (
                    <>&#8377; {val.rate}</>
                  ) : (
                    <>
                      {" "}
                      <s>&#8377; {val.rate}</s>
                    </>
                  )}{" "}
                  {val.offer == 0 ? <></> : <>&#8377; {val.offer}</>}
                </div>
              </>
            )}
          </div>
      
      );
    });
  };

  const showitemaddvalue = (value) => {
    var product = selectedProduct;


    if (value>=1) 
    {
      product["qty"] = value;
     
      dispatch({type: "Add_Product",payload: [product.productlistid, product]});
    }
     else
    {

      product['qty']=0
      dispatch({ type: "Delete_Product",payload: [product.productlistid, product],});
    }

   
  props.refreshit();
    
  };

  return (
    <div style={{width: "100%",height: "100%",display: "flex",fontFamily: "Montserrat",wordSpacing: 1,flexDirection: "column",background:'blue'}}>
      <p style={{ fontWeight: "bold", fontSize: 10 }}>Select Unit</p>

      <div style={{display: "flex",flexDirection:mid?"column":"row",justifyContent: "space-evenly",background:'red',paddingLeft:mid?'40px':'0px'}}>
        {showSimilarproduct()}
      </div>

      <div>
        <Additem qty={selectedProduct?.qty} valueshow={showitemaddvalue} />
      </div>
    </div>
  );
}
