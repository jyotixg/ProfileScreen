import { Box, Button, Card, Grid, Icon, Input, Modal, Tooltip, Typography, Avatar } from '@mui/material'
// import MDAvatar from 'components/MDAvatar'
// import MDBox from 'components/MDBox';
// import MDTypography from 'components/MDTypography';
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import React, { useEffect, useRef, useState } from 'react'
import AthleteImg from './athlete-profile.jpg';
// import MDInput from 'components/MDInput';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AthleteProfile = () => {
    const [name, setName] = useState("Richard");
    const [email, setEmail] = useState("richard@gmail.com");
    const [age, setAge] = useState(18);
    const [guardian, setGuardian] = useState("Saina");
    const [img, setImg] = useState(AthleteImg);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showEditButton, setShowEditButton] = useState(false);
    const hiddenFileInput = useRef(null);
    const nameRef = useRef();
    const handleOpen = () => setOpenEditModal(true);
    const handleClose = () => setOpenEditModal(false);

    const imgClickHandler = () => {
        hiddenFileInput.current.click();
    }

    const fileChangeHandler = (e) => {
        setTimeout(() => {
            setImg(URL.createObjectURL(e.target.files[0]))
        }, 700);
    }

    const editSubmitHandler = (e) => {
        e.preventDefault();
        const nameValue = nameRef.current.value;
        handleClose();
        setTimeout(() => {
            setName(nameValue);
        }, 800);
    }

    useEffect(() => {
        if (age >= 18) {
            setShowEditButton(true);
        }
    }, [])

    return (
        < div data-testid="athlete_component" style={{ display: "flex", margin: "auto", marginTop: "10px" }}>
            <Grid container spacing={3} alignItems="center">
                <Grid item display="flex" alignItems="left" justifyContent="left" flexDirection="column" >
                    <Avatar sx={{ height: 100, width: 100 }} onClick={imgClickHandler} src={img} alt="athlete-profile-image" size="xxl" shadow="sm" />
                    <input type="file" onChange={fileChangeHandler} style={{ display: 'none' }} ref={hiddenFileInput} />
                </Grid>

                <Grid item xs="8" display="flex" alignItems="left" >
                    <Box height="100%" mt={0.5} lineHeight={1}>
                        <Typography variant="h4" fontWeight="medium">
                            {name}
                        </Typography>
                        <Typography variant="h5" color="text" fontWeight="regular">
                            Athlete
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs="8" >
                    <Card style={{ padding: "30px", width:"650px" }} display="flex" alignItems="center" justifyContent="center">
                        <Box display="flex" justifyContent="space-between" >
                            <Typography variant="h4" >Profile Information</Typography>
                            {
                                showEditButton &&
                                <EditIcon data-testid="edit_icon" onClick={handleOpen}
                                    style={{ marginLeft: "10px", cursor: "pointer", color: "#0AB2D6" }}
                                />
                            }
                        </Box>
                        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }} >
                            <Typography variant='p' fontSize={15} mt={2} mb={2} >Hi, I'm {name}, Decisions:
                                If you can't decide, the answer is no. If two equally difficult paths, 
                                choose the one more painful in the short term.</Typography>
                            <Typography variant="p" fontSize={15} mb={1} ><b>Name: </b>{name}</Typography>
                            <Typography variant="p" fontSize={15} mb={1} ><b>Email: </b>{email}</Typography>
                            <Typography variant="p" fontSize={15} mb={1} ><b>Guardian: </b>{guardian}</Typography>
                        </div>
                    </Card>
                </Grid>
            </Grid>

            <Modal
                open={openEditModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={editSubmitHandler} >
                    <Box sx={style}>
                        <CloseIcon data-testid="close_icon" fontSize='medium' style={{ color: "red", display: "block", marginLeft: "auto", cursor: "pointer" }} onClick={handleClose} />
                        <Typography data-testid="modal_name" variant="h6" mb={2}>Name:
                            <Input
                                rows="1"
                                name="name"
                                type="text"
                                data-testid="name_field"
                                defaultValue={name}
                                inputRef={nameRef}
                                multiline
                                fullWidth
                            />
                        </Typography>
                        <Button type="submit" data-testid="save_btn" style={{ color: "white", background: "#0AB2D6" }} >Save Changes</Button>
                    </Box>
                </form>
            </Modal>
        </div>
    )
}

export default AthleteProfile