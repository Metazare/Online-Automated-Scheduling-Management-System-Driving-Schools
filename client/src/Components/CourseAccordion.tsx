import React,{useState} from 'react'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import {  Grid, IconButton, Typography,Modal , TextField, Button } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4,
}; 

function CourseAccordion() {
    // * Modal Open
    const [open, setOpen] = useState("");
    const [form,setForm] = useState({
        title:"",
        description:"",
        file:""
    })
    const[openAccordion,setOpenAccordion] = useState(false);
    return <>
        <div style={{display:"flex",flexDirection:"column",gap:"25px"}}>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",gap:"5px",background:"#2F2E5A",display:"flex",alignItems:"center",cursor:"pointer"}}>
                <div style={{flexGrow:"1"}} onClick={()=>{setOpenAccordion(!openAccordion)}}>
                    <Typography variant="h6" color="primary"> Theoretical Driving</Typography>
                    <Typography variant="body2" color="#F0F0F0"> Theoretical Driving</Typography>
                </div>
                <IconButton aria-label="add" onClick={()=>{setOpen("add")}}>
                    <AddIcon sx={{fill:"#F0F0F0"}}/>
                </IconButton>
                <IconButton aria-label="add" onClick={()=>{setOpenAccordion(!openAccordion)}}>
                    {openAccordion?<KeyboardArrowDownIcon sx={{fill:"#F0F0F0"}}/>:<NavigateNextIcon sx={{fill:"#F0F0F0"}}/>}
                </IconButton>
            </Paper>
            {openAccordion?
                <Paper variant="elevation" elevation={2} sx={{padding:"1em",background:"white",display:"flex",gap:"5px",alignItems:"center",cursor:"pointer"}}>
                    <div style={{flexGrow:"1"}}>
                        <Typography variant="body1" color="initial">Lesson #1</Typography>
                    </div>
                    <IconButton aria-label="add" onClick={()=>{}}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="add" onClick={()=>{}}>
                        <DeleteIcon />
                    </IconButton>
                </Paper>
            :""}

        </div>
        <div>
            <Modal
                open={open.length > 0}
                onClose={()=>{setOpen("")}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {open === "add"?<>
                        <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                            Add Lesson
                        </Typography>
                        <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                            Please fill up lesson form 
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="title"
                                    label="Title"
                                    value={form.title}
                                    onChange={(event)=>{setForm({...form, title : event.target.value })}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="description"
                                    label="Description"
                                    value={form.description}
                                    onChange={(event)=>{setForm({...form, description : event.target.value })}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    type='file'
                                />
                            </Grid>
                            
                            <Grid item sm={4} xs={12}>
                                <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                    cancel
                                </Button>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Button variant="contained" fullWidth color="primary">
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </>:""}
                </Box>
            </Modal>
        </div>
    </>
}

export default CourseAccordion