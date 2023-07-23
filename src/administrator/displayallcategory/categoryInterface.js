import { useState } from "react";
import { Avatar,IconButton,TextField,Grid,FormControl,InputLabel,Select,MenuItem,Button} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { postdata } from "../services/fatchnodeservices";
import { useStyles } from "./categorycss";
import { Title } from "@mui/icons-material";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";


export default function CategoryInterface() {
  const navigate = useNavigate() 
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: "/assets/cart.png", bytes: "" });
  const [category, setCategory] = useState("");
  const [error, setError] = useState({});

  function handelPicture(event) {
    setIcon({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0]
    });
  }

  function Handelstatus(event) {
    setStatus(event.target.value);
  }

  const Handelerror = (input, value) => {
    console.log(input, value);
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isvalid = true;
    if (!category) {
      Handelerror("category", "Please Input Category");
      isvalid = false;
    }
    if (!status) {
      Handelerror("status", "Please Input Status");
      isvalid = false;
    }
    if (!icon.bytes) {
      Handelerror("icon", "Please Input picture");
      isvalid = false;
    }

    return isvalid;
  };
  const Clickcheck = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("category", category);
      formData.append("status", status);
      formData.append("icon", icon.bytes);
      console.log(formData);
      var result = await postdata("category/categoryfatch", formData);
      alert(result.message)
     
     
    } else {
    }
  };

  return (
    <div className={classes.container}>
      
      <div className={classes.box}>
     

        <Grid container spacing={2}>
         
          <Grid item xs={12} style={{fontWeight:'bold',display:"flex",flexDirection:"row",justifyContent:'space-between'}} >
           
               <div >
                     Category Interface
              </div>
              <div> 
                <ViewListIcon  onClick={ ()=>navigate('/dashboard/displaycategory') } />
              </div>
            
          </Grid>

           
           <Grid item xs={12}>
            <TextField
              error={error.category ? true : false}
              helperText={error.category}
              onFocus={() => Handelerror("category", null)}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              variant="filled"
              label="Category Name "
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={Handelstatus}
                onFocus={() => Handelerror("status", null)}
                error={error.status ? true : false}
              >
                <MenuItem value="selecte status">selecte status</MenuItem>
                <MenuItem value="Continue">Continue</MenuItem>
                <MenuItem value="Discontinue">Discontinue</MenuItem>
                <MenuItem value="Popular">Popular</MenuItem>
              </Select>
            </FormControl>
            <div style={{ fontSize: 14, paddingLeft: 14, color: "#c0392b" }}>
              {error.status}
            </div>
          </Grid>

          <Grid item xs={5}>
            <IconButton
              onChange={handelPicture}
              style={{ position: "relative", top: 15 }}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                error={error.icon ? true : false}
                onChange={() => Handelerror("icon", null)}
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

          <Grid item xs={7}>
            <Avatar
              variant="rounded"
              alt="Icon"
              src={icon.file}
              style={{ width: 56, height: 56 }}
            />
          </Grid>

          <Grid item xs={6}>
            <Button onClick={Clickcheck} fullWidth variant="contained">
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="reset" fullWidth variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
