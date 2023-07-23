import { useState,useEffect } from "react"
import { getdata,serverURL } from "../services/fatchnodeservices"
import MaterialTable from "@material-table/core"
import {TextField, Button, Grid,FormControl, Select,InputLabel,MenuItem,IconButton,Avatar, Menu,} from "@mui/material";
import { postdata } from "../services/fatchnodeservices";
import { useStyles } from "./subcategorycss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { ConstructionOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";




 export default function Displayallsubcategory(){

    const navigate =useNavigate()
    const classes=useStyles();
    const[subcategorylist,setSubcategorylist]=useState([])
    const [open,setOpen]=useState(false)
    // usestate of subcategory
    const [status, setStatus] = useState("");
    const [icon, setIcon] = useState({ file: "assets/cart.png", bytes: "" });
    const [subcategory, setSubcategory] = useState("");
    const [subcategoryid, setSubcategoryid] = useState("");
    const [categoryid, setCategoryid] = useState("");
    const [error, setError] = useState({});
    const [categoryname,setCategoryname]=useState('')
    const[editicon,setEditicon]=useState(false)
    const[oldicon,setOldicon]=useState('')
    const[categorylist,setCategoryList]=useState([])


    const fatchcategoryinedit=async()=>{

    var result=await getdata('subcategory/subcategorylist')
    setCategoryList(result.data)

    }

    const fillcategoryinedit=()=>{
  
      return categorylist.map((val)=>{

        return <MenuItem value={val.categoryid}>{val.categoryname}</MenuItem>
      })

    }

    useEffect(function(){


      fatchcategoryinedit()
    },[])


   const handleupdateicon=async()=>{
    var Formdata=new FormData()
    Formdata.append("icon",icon.bytes)
    Formdata.append("subcategoryid",subcategoryid)
    console.log(Formdata)
   var result=await postdata('subcategory/updateicon',Formdata)
    alert(result.message)
   
    getsubcategory()
   }



    const handlecancel=()=>{
      setEditicon(false)
      setIcon({file:`${serverURL}/images/${oldicon}`,bytes:''})
     
      
    }

  //  delete data function 

   const deleteSubCategory=async()=>{

    var body={subcategoryid:subcategoryid}
    
    var result=await postdata('subcategory/deletesubcategory',body)
    alert(result.message)

   }

    // handle status function 

    function handleStatus(event) {
      setStatus(event.target.value);
    }
    //    handle icon function
    function handleicon(event) {
      setIcon({
        file: URL.createObjectURL(event.target.files[0]),
        bytes: event.target.files[0],
      });
      setEditicon(true);
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
      // if (!icon.bytes) {
      //   Handleerror("icon", "Please Select Icon");
      //   isvalid = false;
      // }
  
      return isvalid;
    };
  
    //  handle click Submit
    const submitekaro = async () => {
      if (validation()) {
        var body={subcategoryid:subcategoryid,subcategoryname:subcategory,categoryid:categoryid,categoryname:categoryname,status:status }
      var result=await postdata('subcategory/updatesubcategory',body)
      } else {
      }
      getsubcategory()
    };
  
    // show Subcategory  edit form 
  

    const showsubcategoryform=()=>{


      return(

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={subcategory}
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
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryid}
                label="Status"
                onChange={handleCategoryid}
                onFocus={() => Handleerror("category", null)}
                error={error.category ? true : false}
              >
                <MenuItem >Select Category</MenuItem>
                {fillcategoryinedit()}
              </Select>
            </FormControl>
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
          <Grid item xs={4}>
            <IconButton
              
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                onChange={handleicon}

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
          <Grid item xs={4}>
            <Avatar
              variant="rounded"
              alt="Remy Sharp"
              src={icon.file}
              sx={{ width: 60, height: 60 }}
            />
          </Grid>

          <Grid item xs={4}>
            {editicon?<>
            <Button onClick={handleupdateicon} >Save</Button>
            <Button onClick={handlecancel} >Cancel</Button></>:<></>}
          </Grid> 

          <Grid item xs={6}>
            <Button onClick={submitekaro} variant="contained" fullWidth>
              Submite
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button onClick={deleteSubCategory} variant="contained" type="reset" fullWidth>
              Delete
            </Button>
          </Grid>
        </Grid>


      )
     



    }

 
// getting data function from data base 

const getsubcategory=async()=>{

var result=await getdata("subcategory/subcategoryget")
setSubcategorylist(result.data)
}

useEffect(function(){

    getsubcategory()
},[])


// handle close function

const handleClose=()=>{


      setOpen(false)

}

// handle Open function

const handleOpen=(rowData)=>{
    
      console.log(rowData)
      setSubcategoryid(rowData.subcategoryid)
      setSubcategory(rowData.subcategoryname)
      setCategoryid(rowData.categoryid)
      setCategoryname(rowData.categoryname)
      setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
      setStatus(rowData.status)
      setOldicon(rowData.icon)
      setOpen(true)
  
    }



/// show dialog box

const showDialogbox=()=>{

  return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle >
          Edit/Delete Subcategory
        </DialogTitle>
        <DialogContent>
        {showsubcategoryform()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        </Dialog>

        )


}

//// show table data

function Showcategorylist() {
    return (
      <MaterialTable
        title="Subcategory List"
        columns={[
          { title: 'Subcategory Id', field: 'subcategoryid' },
          { title: 'Name', field: 'subcategoryname' },
          { title: 'Category', field: 'categoryname' },
          { title: 'Icon', field: 'icon', render: rowData => <Avatar src={`${serverURL}/images/${rowData.icon}`}style={{width: 50}} variant="rounded" /> },
          { title: 'Status', field: 'status'},
          
        ]}
        data={subcategorylist} 

              
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Subcategory',
            onClick: (event, rowData) => handleOpen(rowData) 
          },
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => navigate ('/dashboard/subcategoryinterface')  
          }
        ]}
      />
    )
  }



 
 return(<div className={classes.container} >

<div  className={classes.box}  >
{Showcategorylist()}
</div>
{showDialogbox()}
</div>)

 } 