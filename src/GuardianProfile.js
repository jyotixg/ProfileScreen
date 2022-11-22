import { Box, Button, Card, Grid, Modal, Typography, Input, Avatar } from '@mui/material'
// import MDAvatar from 'components/MDAvatar'
// import MDBox from 'components/MDBox';
// import MDInput from 'components/MDInput';
// import MDTypography from 'components/MDTypography';
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import React, { useRef, useState } from 'react'
import GuardianImg from './guardian-profile.jpg';
import EditIcon from '@mui/icons-material/Edit';
import ChildrenTable from './ChildrenTable';
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
    textAlign: "center"
};

const GuardianProfile = () => {
    const [name, setName] = useState("anne");
    const [email, setEmail] = useState("anne@gmail.com");
    const [img, setImg] = useState(GuardianImg);
    const [openEditModal, setOpenEditModal] = useState(false);
    const hiddenFileInput = useRef(null);
    const nameRef = useRef();
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

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
        setOpenEditModal(false);
        setTimeout(() => {
            setName(nameValue);
        }, 800);
    }

    return (
        < div style={{ display: "flex", margin: "auto", marginTop: "10px" }}>
            <Grid container spacing={3} alignItems="center">
                <Grid item display="flex" alignItems="left" justifyContent="left" flexDirection="column">
                    <Avatar onClick={imgClickHandler} src={img} alt="guardian-profile-image" sx={{ width: 100, height: 100 }} shadow="sm" />
                    <input type="file" onChange={fileChangeHandler} style={{ display: 'none' }} ref={hiddenFileInput} />
                </Grid>

                <Grid  item xs="8" display="flex" alignItems= "left"  >
                    <Box height="100%" mt={0.5} lineHeight={1}>
                        <Typography variant="h4" fontWeight="medium">
                            {name}
                        </Typography>
                        <Typography variant="h5" color="text" fontWeight="regular">
                            Guardian
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs="10" >
                    <Card style={{ padding: "30px" }}>
                        <Typography variant="h4" textAlign="left" >Profile Information</Typography>
                        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }} >
                            <Typography variant='p' fontSize={15} mt={2} mb={2} >Hi, I’m {name}, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.<br /> Sed cursus ante dapibus diam. Sed nisi.</Typography>
                            <Box display="flex" justifyContent="" gap="10px" >
                                <Typography variant="p" fontSize={15} mb={1} ><b>Name: </b>{name}</Typography>
                                <EditIcon data-testid="edit_icon" onClick={handleOpenEditModal}
                                    style={{ marginLeft: "10px", cursor: "pointer", color: "#0AB2D6" }}
                                />
                            </Box>
                            <Typography variant="p" fontSize={15} mb={1} ><b>Email: </b>{email}</Typography>
                            <ChildrenTable />
                        </div>
                    </Card>
                </Grid>
            </Grid>

            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={editSubmitHandler} >
                    <Box sx={style}>
                        <CloseIcon fontSize='medium' onClick={handleCloseEditModal} style={{ color: "red", display: "block", marginLeft: "auto", cursor: "pointer" }} />
                        <Typography variant="h6" textAlign="left" mb={2}>Name:
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

                        <Button type="submit" data-testid="save_btn"
                            style={{ color: "white", background: "#0AB2D6", display: "block", marginRight: "auto" }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </form>
            </Modal>
        </div>
    )
}

export default GuardianProfile