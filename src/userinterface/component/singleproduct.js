import React from "react";
import { serverURL } from "../../administrator/services/fatchnodeservices";
import { Paper } from "@mui/material";
///////////////////////////////////////////
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
/////////////////////////////////
import Grid from "@mui/material";

export default function Singleproduct(props) {
  var navigate = useNavigate();
  var val = props.val;
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const mid = useMediaQuery(theme.breakpoints.down("md"));
  const large = useMediaQuery(theme.breakpoints.down("lg"));
  const smalld = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => {
    navigate(props.url, { state: { product: val } });
  };

  const showpro = () => {
    return (
      <div style={{ margin: 1 }}>
        <Paper
          onClick={handleClick}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: 180,
            height: 250,
          }}
          elevation={2}
          variant="outlined"
        >
          <div style={{ paddingBottom: "5%" }}>
            <div style={{display: "flex",justifyContent: "center", alignItems: "center", width: 178, height: 120,}}>
              <img src={`${serverURL}/images/${val.picture}`} style={{ width: "60%" }}/>
            </div>

            <div style={{ fontFamily: "Montserrat, sans-serif",color: "#000",fontWeight: "bold",width: 150,display: "flex",justifyContent: "center",marginTop: "4%",}}>
              {val.productlistname}
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: 10,
                fontWeight: "bold",
                padding: "2%",
                paddingLeft: "5%",
              }}
            >
              {`${val.proweight} ${val.type}`}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "5%",
                  paddingTop: "5%",
                }}
              >
                <div
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 10,
                    fontWeight: "bold",
                    paddingBottom: "2%",
                  }}
                >
                  {val.offer == 0 ? (
                    <>&#8377; {val.rate}</>
                  ) : (
                    <s>&#8377; {val.rate}</s>
                  )}{" "}
                </div>
                <div
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                >
                  {val.offer == 0 ? <></> : <>&#8377; {val.offer}</>}
                </div>
              </div>

              <div style={{ paddingRight: "10%" }}>
                <Button variant="outlined">Add</Button>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  };

  return <div>{showpro()}</div>;
}
