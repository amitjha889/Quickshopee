import { useStyles } from "./subcategorycss";
import { useEffect, useState } from "react";
import {TextField, Button, Grid,FormControl, Select,InputLabel,MenuItem,IconButton,Avatar,} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import { getdata, postdata } from "../services/fatchnodeservices";
import ViewListIcon from '@mui/icons-material/ViewList';

export default function Subcategory() {
  const navigate=useNavigate()
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: "assets/cart.png", bytes: "" });
  const [subcategory, setSubcategory] = useState("");
  const [categoryid, setCategoryid] = useState("");
  const [error, setError] = useState({});
  const [categorylist,setCategoryList]=useState([])
  


  // handle fatch cotegorylist for dropdown 

  const fatchcategory=async()=>{

    var result=await getdata('subcategory/subcategorylist')
   
    setCategoryList(result.data)

  }

  const fillcategory=()=>{
    
  return categorylist.map((val)=>{
    
    return <MenuItem value={val.categoryid}>{val.categoryname}</MenuItem>

  })
    

  }

  // useEffect for fill categoryid dropdown

  useEffect(function(){

    fatchcategory()
  },[])




  //    handle status function
  function handleStatus(event) {
    setStatus(event.target.value);
  }
  //    handle icon function
  function handleicon(event) {
    setIcon({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  }
  //    handle subcategory function
  function handlesubcategory(event) {
    setSubcategory(event.target.value);
  }
  //    handle categoryid function
  function handleCategoryid(event) {
    setCategoryid(event.target.value);
  }
  //    handle error function

  const Handleerror = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  // validation function

  const validation = () => {
    var isvalid = true;
    if (!subcategory) {
      Handleerror("subcategory", "Please Enter Subcategory");
      isvalid = false;
    }
    if (!categoryid) {
      Handleerror("category", "Please Enter Category ID");
      isvalid = false;
    }
    if (!status) {
      Handleerror("status", "Please Select Status");
      isvalid = false;
    }
    if (!icon.bytes) {
      Handleerror("icon", "Please Select Icon");
      isvalid = false;
    }

    return isvalid;
  };

  //  handle click Submit
  const submitekaro = async () => {
    if (validation()) {
      var formdata = new FormData();
      formdata.append("subcategory", subcategory);
      formdata.append("categoryid", categoryid);
      formdata.append("status", status);
      formdata.append("icon", icon.bytes);
      console.log(formdata);
      var result = await postdata("subcategory/subcategoryfatch", formdata);
       alert(result.massage)
    
    } else {
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>

              
        <Grid item xs={12} style={{fontWeight:'bold',display:"flex",flexDirection:"row",justifyContent:'space-between'}} >
              
              <div >
                    Subcategory Interface
              </div>
              <div> 
                <ViewListIcon  onClick={ ()=>navigate('/dashboard/displaysubcategory') } />
              </div>
            
            </Grid>

          <Grid item xs={12}>
            <TextField
              error={error.subcategory ? true : false}
              helperText={error.subcategory}
              onFocus={() => Handleerror("subcategory", null)}
              onChange={handlesubcategory}
              variant="outlined"
              label="Subcategory"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category ID</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryid}
                label="Status"
                onChange={handleCategoryid}
                onFocus={() => Handleerror("category", null)}
                error={error.category? true : false}
              
              >
                <MenuItem >Select Category </MenuItem>
                {fillcategory()}
                
              </Select>
            </ FormControl>
            <div style={{ fontSize: 14, paddingLeft: 14, color: "#c0392b" }}>
            {error.category}    
              </div>
           </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleStatus}
                onFocus={() => Handleerror("status", null)}
                error={error.status ? true : false}
              >
                <MenuItem value="Discontinue">Discontinue</MenuItem>
                <MenuItem value="Continue">Continue</MenuItem>
                <MenuItem value="Popular">Popular</MenuItem>
                <MenuItem value="Trending">Trending</MenuItem>
              </Select>
              <div style={{ fontSize: 14, paddingLeft: 14, color: "#c0392b" }}>
                {error.status}
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <IconButton
              onChange={handleicon}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                error={error.icon ? true : false}
                onChange={() => Handleerror("icon", null)}
                hidden
                accept="image/*"
                type="file"
              />
              <PhotoCamera />
            </IconButton>
            <div style={{ fontSize: 14, paddingLeft: 14, color: "#c0392b" }}>
              {error.icon}
            </div>
          </Grid>
          <Grid item xs={6}>
            <Avatar
              variant="rounded"
              alt="Remy Sharp"
              src={icon.file}
              sx={{ width: 60, height: 60 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button onClick={submitekaro} variant="contained" fullWidth>
              Submite
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" type="reset" fullWidth>
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
