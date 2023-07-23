import { useState,useEffect } from "react"
import { getdata,serverURL} from "../services/fatchnodeservices"
import MaterialTable from "@material-table/core"
import {Avatar,IconButton,TextField,Grid,FormControl,InputLabel,Select,MenuItem,Button,} from "@mui/material"
import { useStyles } from "./categorycss"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import swal from "sweetalert"
// category form import
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { postdata } from "../services/fatchnodeservices";
import { useNavigate } from "react-router-dom"


export default function Displayallcategory(){
    const navigate=useNavigate()
    const clasess=useStyles()
    const [categorylist,setCategorylist]=useState([])
    const [open,setOpen]=useState(false)
    const [status, setStatus] = useState("");
    const [icon, setIcon] = useState({ file: "/assets/cart.png", bytes: "" });
    const [category, setCategory] = useState("");
    const [categoryid, setCategoryid] = useState("");
    const [error, setError] = useState({});
    const[editicon,setEditicon]=useState(false)
    const[cancel,setCancel]=useState('')
    const[oldicon,setOldicon]=useState('')

    // delete data row from data base
    
    const  deleteDataFunction=async()=>{
     var body = {categoryid:categoryid}
     var result = await postdata ('category/deletedata',body)
     fatchcategorylist()


    }




    //  update icon function 

    const postupdateicon=async()=>{


      var Formdata= new FormData();
      Formdata.append('icon',icon.bytes)
      Formdata.append('categoryid',categoryid)
      var result=await postdata('category/editicon',Formdata)
      console.log(result.message)
      fatchcategorylist()
      setEditicon(false)
 
    }


    // handle $ validation function from category interface 


    // set old images function 

    const Handlecancel=()=>{

      setIcon({file:`${serverURL}/images/${oldicon}`,bytes:''})
      setEditicon(false)

    }

    function handelPicture(event) {
      setIcon({

        file: URL.createObjectURL(event.target.files[0]),
        bytes: event.target.files[0],
       
        
      });
      setEditicon(true)
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
        Handelerror("categoryName", "Please Input Category");
        isvalid = false;
      }
      if (!status) {
        Handelerror("status", "Please Input Status");
        isvalid = false;
      }
      // if (!icon.bytes) {
      //   Handelerror("icon", "Please Input picture");
      //   isvalid = false;
      // }

      return isvalid;
    };
    const Clickcheck = async () => {
      setOpen(false)
      if (validation()) {
      var body={categoryid:categoryid,categoryname:category,status:status}
      var result=await postdata('category/updatedata',body)
      alert(result.message)
      
      } else {
        return null;
      }
      fatchcategorylist()
    };
    

    // end validation 

    // show category form function 

    const showcategoryform=()=>{

  return(
  <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={category}
                error={error.categoryName ? true : false}
                helperText={error.categoryName}
                onFocus={() => Handelerror("categoryName", null)}
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
              <div style={{ fontSize: 14, paddingLeft: 14, color: "#c0392b" }} >{error.status}</div>
            </Grid>

            <Grid item xs={4}>
              <IconButton
                
                style={{ position: "relative", top: 15 }}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                 onChange={handelPicture}
                  hidden
                  accept="image/*"
                  type="file"
                />
                <PhotoCamera />
              </IconButton>
              <div style={{ fontSize: 14, paddingLeft: 14, color: "#c0392b" }} >{error.icon}</div>
            </Grid>

            <Grid item xs={4}>
              <Avatar
                variant="rounded"
                alt="Icon"
                src={icon.file}
                style={{ width: 56, height: 56 }}
              />
            </Grid>
            
            <Grid item xs={4}>
              {editicon?<>
             <Button onClick={postupdateicon} >Save</Button>
             <Button onClick={Handlecancel}  >Cancel</Button></>:<></>}
             
            </Grid>

            <Grid item xs={6}>
              <Button onClick={Clickcheck} fullWidth variant="contained">
                Edit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={deleteDataFunction} type="reset" fullWidth variant="contained">
                Delete
              </Button>
            </Grid>
          </Grid>

    
  )

    }




  // for get data by data base 
    const fatchcategorylist=async()=>{

      var result= await getdata('category/categoryget')
      setCategorylist(result.data)
      
    }

      // for render the category list before randring page

    useEffect(function(){
    
        fatchcategorylist()
        
    
      },[])

      // handle close
      const handleClose=()=>{
      
        setOpen(false)

      }
      const handleOpen=(rowData)=>{
      
        setEditicon(false)
        setCategoryid(rowData.categoryid)
        setCategory(rowData.categoryname)
        setStatus(rowData.status)
        setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
        setOldicon(rowData.icon)
        setOpen(true)
      }

      // dialog box
      const DisplayCategoryDialog=()=>{

        return(
                
          <Dialog open={open} onClose={handleClose}>
          <DialogTitle >
            Edit/Delete Category
          </DialogTitle>
          <DialogContent>
          {showcategoryform()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      
      )


      }
      
      /// table for show data 

      function Showcategorylist() {

        return (
            
          <MaterialTable
            title="Category List"
            columns={[
              { title: 'Category ID', field: 'categoryid' },
              { title: 'Category Name', field: 'categoryname' },
              { title: 'Icon', field: 'icon', render: rowData => <Avatar src={`${serverURL}/images/${rowData.icon}`}style={{width: 50}} variant="rounded" /> },
              { title: 'Status', field: 'status'},
            ]}
            
            data={categorylist} 

                  
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Category',
                  onClick: (event,rowData) =>handleOpen(rowData)
                },
                {
                  icon: 'add',
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: (event) => navigate('/dashboard/categoryinterface')  
                }
              ]}
          />
        )
      }

      
      return(<div className={clasess.container} >

        <div className={clasess.box} > 
        {Showcategorylist() }
        </div>
          { DisplayCategoryDialog()}
      </div>)


} 
 