import React,{useEffect, useState} from 'react'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import {  Grid, IconButton, Typography,Modal , TextField, Button } from '@mui/material';
import CircularProgress, {CircularProgressProps,} from '@mui/material/CircularProgress';
import VerifiedIcon from '@mui/icons-material/Verified';
import useReqLesson from '../Hooks/useReqLesson';
import useReqCourse from '../Hooks/useReqCourse';

type Props ={
    variant: "manage"|"use",
    title: string,
    courseId: string
}

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


function CircularProgressWithLabel(props: CircularProgressProps & { value: number },) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Typography
                variant="caption"
                component="div"
                color="#ffffff"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}


function CourseAccordion({variant,title, courseId}:Props) {

    const {
      data:lessons, 
      datum: lesson,
      loading,
      error,
      createLesson, 
      deleteLesson, 
      updateLesson, 
      getLessons,
      getLesson
    } = useReqLesson();
    const {postCourse:createCourse} = useReqCourse();
    
    useEffect(()=>{
      getLessons({
        courseId: courseId
      })
    },[])

    // * Modal Open
    const [open, setOpen] = useState("");
    const [form,setForm] = useState({
        title:"",
        description:"",
        file:""
    })
    const [selectedLesson, setSelectedLesson] = useState('')

    const [editForm, setEditForm] = useState({
      title:"",
      description:"",
      file:""
  })

    const[openAccordion,setOpenAccordion] = useState(false);

    async function create(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      createLesson({
        courseId: courseId,
        title: form.title,
        description: form.description,
        file: form.file
      });
    };

    async function delLesson(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      deleteLesson({
        lessonId: selectedLesson
      });
    };

    async function editLesson(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      updateLesson({
        lessonId: selectedLesson,
        title: editForm.title,
        description: editForm.description,
        file: editForm.file
      });
    };

    

    return <>
        <div style={{display:"flex",flexDirection:"column",gap:"25px"}}>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",gap:"5px",background:"#2F2E5A",display:"flex",alignItems:"center",cursor:"pointer"}}>
                <div style={{flexGrow:"1"}} onClick={()=>{setOpenAccordion(!openAccordion)}}>
                    <Typography variant="h6" color="primary">{title}</Typography>
                    <div style={{display:"flex",gap:"15px"}}>
                        {variant === "manage"?<>
                                <Typography variant="body2" color="#F0F0F0">{lessons?.length} Total Lessons</Typography>
                            </>:<>
                                <Typography variant="body2" color="#F0F0F0"> 4 Done</Typography>
                                <Typography variant="body2" color="#F0F0F0"> 3 Remaining</Typography>
                            </>
                        }
                    </div>
                </div>
                {variant === "manage"?
                    <IconButton aria-label="add" onClick={()=>{setOpen("add")}}>
                        <AddIcon sx={{fill:"#F0F0F0"}}/>
                    </IconButton>
                :
                    <CircularProgressWithLabel defaultValue={0} value={60} />
                }
                <IconButton aria-label="add" onClick={()=>{setOpenAccordion(!openAccordion)}}>
                    {openAccordion?<KeyboardArrowDownIcon sx={{fill:"#F0F0F0"}}/>:<NavigateNextIcon sx={{fill:"#F0F0F0"}}/>}
                </IconButton>
            </Paper>
            {openAccordion?
              <>
                {lessons.map((lesson)=>(
                  <Paper variant="elevation" elevation={2} sx={{background:"white",display:"flex",gap:"5px",alignItems:"center",cursor:"pointer",paddingRight:"1em"}}>
                      <div style={{flexGrow:"1"}}>
                          <a href="courses/lesson" >
                              <div style={{padding:"1em"}}>
                                  <Typography variant="body1" color="initial">{lesson.title}</Typography>
                              </div>
                          </a>
                      </div>
                      {variant === "manage"?<>
                          <IconButton 
                            aria-label="add" 
                            onClick={()=>{
                              setOpen('edit'); 
                              setSelectedLesson(lesson.lessonId); 
                              getLesson({courseId: courseId, lessonId: lesson.lessonId});
                              setEditForm({
                                title: lesson.title, 
                                description: lesson.description, 
                                file: lesson.file
                              })
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="add" onClick={()=>{setOpen('delete');setSelectedLesson(lesson.lessonId)}}>
                              <DeleteIcon />
                          </IconButton>
                      </>:<>
                          <VerifiedIcon sx={{fill:"#E24B5B"}}/>
                      </>}
                  </Paper>
                ))}
              </>
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
                {open === "edit"?<>
                    <form onSubmit={editLesson}>
                        <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                            Edit Lesson
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
                                    value={editForm.title}
                                    onChange={(event)=>{setEditForm({...editForm, title : event.target.value })}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="description"
                                    label="Description"
                                    value={editForm.description}
                                    onChange={(event)=>{setEditForm({...editForm, description : event.target.value })}}
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
                                <Button variant="contained" fullWidth color="primary" type='submit'>
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>:""}
                    {open === "add"?<>
                        <form onSubmit={create}>
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
                                    <Button variant="contained" fullWidth color="primary" type="submit">
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </>:""}
                    {open === "delete"?<>
                        <form onSubmit={delLesson}>
                            <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                Delete Lesson
                            </Typography>
                            <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                                Are you sure you want to remove this lesson? 
                            </Typography>

                            {/* <TextField
                                fullWidth
                                required
                                id="reason"
                                label="Reason"
                                value={form.title}
                                onChange={(event)=>{setForm({...form, title : event.target.value })}}
                            /> */}

                            <Grid container spacing={1} mt={3}>
                                <Grid item sm={4} xs={12}>
                                    <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                      Cancel
                                    </Button>
                                </Grid>
                                <Grid item sm={8} xs={12}>
                                    <Button variant="contained" fullWidth color="primary" type="submit">
                                      Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </>:""}
                </Box>
            </Modal>
        </div>
    </>
}

export default CourseAccordion